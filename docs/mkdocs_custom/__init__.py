from xml.etree import ElementTree
from markdown import Markdown
from typing import Any
from typing_extensions import override

from xml.etree.ElementTree import Element

from markdown.extensions import Extension
from markdown.preprocessors import Preprocessor
from markdown.treeprocessors import Treeprocessor


def extend_with_newline(into: list[str], source: list[str]):
    if len(source) == 0:
        return

    if into[-1].strip() == "" or source[0].strip() == "":
        return into.extend(source)

    into.append("")
    into.extend(source)

class AttributeLineFormatter:

    def __init__(self, lines: list[str]) -> None:
        self.original_lines = lines[1:]
        self.header_line = lines[0]
        self.content_lines: list[str] = []
        self.deprecated_lines: list[str] = []
        self.version_added_lines: list[str] = []
        self.type_lines: list[str] = []
        self.values: dict[str, Any] = {}

    def format_lines(self):
        line_broken = False
        current_metadata_key = None
        for line in self.original_lines:

            # line was broken
            if line_broken:
                assert current_metadata_key is not None
                line_broken = line.endswith("\\")
                if line_broken:
                    self.format_metadata(current_metadata_key, line[:-1])
                else:
                    self.format_metadata(current_metadata_key, line)
                continue

            # If it's not any data, skip the line
            if not line.startswith("::: "):
                self.content_lines.append(line)
                continue
            
            # If it uses the ::: separator, but does not contain key/value pair, skip the line as content
            split = line[4:].split(":", 2)
            if len(split) != 2:
                self.content_lines.append(line)
                continue
            
            # If metadata line gets broken onto a new line
            if line.endswith("\\"):
                line_broken = True

            key, value = split
            value = value.strip()

            current_metadata_key = key
            if line_broken:
                self.format_metadata(key, value[:-1])
            else:
                self.format_metadata(key, value)

    def format_metadata(self, key: str, value: str):
        if key == "deprecated":
            return self.format_deprecated(value)
        if key == "type":
            return self.format_type(value)
        if key == "version-added":
            return self.format_version_added(value)
        if key == "required":
            self.values["required"] = bool(value)
            return

        print("Unknown key/value pair:", f"{key}: {value}")
        
    def format_type(self, value: str):
        self.values["type"] = value
        self.type_lines.append(f"Type: `{value}`")

    def format_version_added(self, value: str):
        self.values["version_added"] = value
        self.version_added_lines.append("")
        self.version_added_lines.append(f'!!! info "Added in {value}"')

    def format_deprecated(self, value: str):
        if len(self.deprecated_lines) == 0:
            self.deprecated_lines.append("")
            self.deprecated_lines.append('!!! warning "Deprecated"')
            self.deprecated_lines.append(f"    {value}")
        else:
            self.deprecated_lines[-1] = self.deprecated_lines[-1] + value

    def format(self):
        self.format_lines()
        return self

    def get_lines(self) -> list[str]:
        new_lines: list[str] = []
        new_lines.append(self.header_line)
        new_lines.extend(self.type_lines)
        extend_with_newline(new_lines, self.content_lines)
        extend_with_newline(new_lines, self.version_added_lines)
        new_lines.extend(self.deprecated_lines)
        return new_lines

    def get_attribute_name(self) -> str:
        return self.header_line[3:].strip()

    def get_values(self):
        return self.values


def format_attribute_lines(attribute_lines: list[str]):
    formatter = AttributeLineFormatter(attribute_lines)
    lines = formatter.format()
    print(formatter.get_values())
    return lines

DataDict = dict[str, dict[str, Any]]

class AttributeParsingPreprocessor(Preprocessor):

    def __init__(self, md: Markdown, data: DataDict):
        super().__init__(md)
        self.data = data

    def parse_attribute_lines(self, attribute_lines: list[str]):
        formatter = AttributeLineFormatter(attribute_lines).format()
        self.data[formatter.get_attribute_name()] = formatter.get_values()
        return formatter.get_lines()

    @override
    def run(self, lines: list[str]) -> list[str]:

        new_lines: list[str] = []

        attribute_container: list[list[str]] = []
        index = -1

        inAttributes = False
        analyzingAttribute = False
        for line in lines:
            # Check if we're at the opening of attributes heading
            if line.startswith("## Attributes"):
                inAttributes = True
                new_lines.append(line)
                continue
            
            # If we encounter another level 2 heading and we're in attributes,
            # that means we exited the attributes are and we stop modifications
            if (line.startswith("## ") or line.startswith("# ")) and inAttributes:
                inAttributes = False
                # Copy over the sorted lines
                for line_list in sorted(attribute_container, key=lambda element: element[0]):
                    new_lines.extend(self.parse_attribute_lines(line_list))

            # If we're not in attributes, copy over the line
            if not inAttributes:
                new_lines.append(line)
                continue

            # If this line begins with attribute name
            if line.startswith("### "):
                analyzingAttribute = True
                attribute_container.append([])
                index += 1

            # If we're not analyzing an attribute yet, parse that line
            if not analyzingAttribute:
                new_lines.append(line)
                continue
            
            # Otherwise, it's attribute related and slap it into the attribute container
            attribute_container[index].append(line)

        # If at the end of the loop we are still in attributes, that means we reached end of the document
        # so we copy the rest over
        if inAttributes:
            for line_list in sorted(attribute_container, key=lambda element: element[0]):
                new_lines.extend(self.parse_attribute_lines(line_list))

        return new_lines

# TODO: implement
class AttributeInheritancePreprocessor(Preprocessor):
    """Turn special notes into standardized Markdown admonitions."""

    def __init__(self, md: Markdown, data: DataDict):
        super().__init__(md)

    @override
    def run(self, lines: list[str]) -> list[str]:
        """Preprocess the provided Markdown source text.

        Looks for any lines that match any of the ANNOTATION regexes, for example:

        - `+++ 1.1.0`
        - `+/- 0.1`
        - `    --- 2.0 "Support for older PostgreSQL versions"`

        and converts them to the standard `!!!` admonitions used elsewhere.

        Args:
            lines: List of strings corresponding to the lines of the input file.

        Returns:
            List of processed strings.
        """
        new_lines: list[str] = []
        for line in lines:
            if line.startswith("::: inherit-attributes "):
                #print(line.split(" ")[2])
                path = line.split(' ')[2]
                new_lines.append(f"{{!{path}!}}")
            else:
                new_lines.append(line)
        return new_lines

class CustomTreeprocessor(Treeprocessor):

    def __init__(self, md: Markdown, data: DataDict) -> None:
        super().__init__(md)
        self.data = data

    @override
    def run(self, root: Element) -> Element | None:
        in_attributes = False
        for element in root.iter():
            if element.tag == "h2" or element.tag == "h1" and in_attributes:
                in_attributes = False

            if element.tag == "h2" and element.text == "Attributes":
                in_attributes = True

            if in_attributes:
                if element.tag == "h3":
                    if element.text and self.data[element.text].get("required", False):
                        element.text = element.text + " "
                        new_element = Element("span")
                        new_element.text = "*"
                        new_element.attrib["style"] = "color:red"
                        element.insert(0, new_element)
        return root

class CustomExtension(Extension):

    def __init__(self, **kwargs):  # pyright: ignore[reportAny, reportMissingParameterType]
        super().__init__(**kwargs)
        self.data: DataDict = {}

    @override
    def extendMarkdown(self, md: Markdown):
        md.preprocessors.register(AttributeInheritancePreprocessor(md, self.data), "attribute-inheritance", 1000)
        md.preprocessors.register(AttributeParsingPreprocessor(md, self.data), "attribute-parsing", 90)
        md.treeprocessors.register(CustomTreeprocessor(md, self.data), "attribute-sorting2", -999)


def makeExtension(**kwargs): # pyright: ignore[reportUnknownParameterType, reportMissingParameterType]
    return CustomExtension(**kwargs)
