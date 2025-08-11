from markdown import Markdown
from typing import Any
from typing_extensions import override

from markdown.preprocessors import Preprocessor

from .mapping import AttributeCollection, type_to_link
from .types import DataDict

def extend_with_newline(into: list[str], source: list[str]):
    if len(source) == 0:
        return

    if into[-1].strip() == "" or source[0].strip() == "":
        return into.extend(source)

    into.append("")
    into.extend(source)

class AttributeLineFormatter:
    """
    This class is used to format the lines of an attribute section.
    """

    def __init__(self, lines: list[str]) -> None:
        # The first line is the header line, which contains the attribute name
        self.__header_line: str = lines[0]
        # Stores the type lines
        self.__type_lines: list[str] = []
        # Stores the lines that are not metadata
        self.__content_lines: list[str] = []
        # Stores the version lines, if any
        self.__version_lines: list[str] = []
        # Stores the deprecation lines, if any
        self.__deprecated_lines: list[str] = []

        self.values: dict[str, Any] = {}
        self.format_lines(lines[1:]) # don't include the header line in the formatting

    def format_lines(self, lines: list[str]):
        line_broken = False
        current_metadata_key = None
        for line in lines:

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
                self.__content_lines.append(line)
                continue
            
            # If it uses the ::: separator, but does not contain key/value pair, skip the line as content
            split = line[4:].split(":", 2)
            if len(split) != 2:
                self.__content_lines.append(line)
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
        if key == "version-changed":
            return self.format_version_changed(value)
        if key == "version-removed":
            return self.format_version_removed(value)
        if key == "required":
            self.values["required"] = bool(value)
            return
        if key == "default":
            # TODO: don't know how I will want to parse defaults
            return

        print("Unknown key/value pair:", f"{key}: {value}")

    def resolve_concrete_type(self, value: str):
        array_levels = 0
        wrap_in_attribute_collection = False
        while value.endswith("[]"):
            value = value[:-2]
            array_levels += 1
        if value.endswith("*"):
            value = value[:-1]
            wrap_in_attribute_collection = True

        match value:
            case "int" | "integer":
                inner_type = int
            case "str" | "string":
                inner_type = str
            case "float":
                inner_type = float
            case "bool" | "boolean":
                inner_type = bool
            case _:
                inner_type = value

        if array_levels == 0:
            if wrap_in_attribute_collection:
                return AttributeCollection(inner_type)
            return inner_type
        if array_levels == 1:
            return list[inner_type]
        if array_levels == 2:
            return list[list[inner_type]]
        raise RuntimeError(f"{array_levels}-dimensional arrays are not supported")

    def format_type(self, value: str):
        split = value.split("|")
        # If it has optionals
        # we put optionals in a tuple since there's no such structure in JSON
        if len(split) > 1:
            actual_type = tuple(self.resolve_concrete_type(item) for item in split)
        else:
            actual_type = self.resolve_concrete_type(value)

        self.__type_lines.append(f"Type: {type_to_link(actual_type)}")

    def format_version_added(self, value: str):
        self.__version_lines.append("")
        self.__version_lines.append(f'!!! info "Added in version {value}"')

    def format_version_changed(self, value: str):
        parts = value.split(" ", 1)
        version = value
        reason = ""
        if len(parts) > 1:
            version = parts[0]
            reason = parts[1]

        self.__version_lines.append("")
        self.__version_lines.append(f'!!! warning "Changed in version {version}:"')
        if reason:
            self.__version_lines.append(f"    {reason}")

    def format_version_removed(self, value: str):
        parts = value.split(" ", 1)
        version = value
        reason = ""
        if len(parts) > 1:
            version = parts[0]
            reason = parts[1]

        self.__version_lines.append("")
        self.__version_lines.append(f'!!! failure "Removed in version {version}:"')
        if reason:
            self.__version_lines.append(f"    {reason}")

    def format_deprecated(self, value: str):
        if len(self.__deprecated_lines) == 0:
            self.__deprecated_lines.append("")
            self.__deprecated_lines.append('!!! warning "Deprecated"')
            self.__deprecated_lines.append(f"    {value}")
        else:
            self.__deprecated_lines[-1] = self.__deprecated_lines[-1] + value

    def get_lines(self) -> list[str]:
        new_lines: list[str] = []
        new_lines.append(self.__header_line)
        new_lines.extend(self.__type_lines)
        extend_with_newline(new_lines, self.__content_lines)
        extend_with_newline(new_lines, self.__version_lines)
        new_lines.extend(self.__deprecated_lines)
        return new_lines

    def get_values(self):
        return self.values

ATTRIBUTE_LIST_START = "::: attribute-list-start"
ATTRIBUTE_LIST_END = "::: attribute-list-end"

class AttributePreprocessor(Preprocessor):
    """
    This processor parses sections of the documentation that look like this:
    ```

    ## Attributes
    ::: attribute-list-start
    ### Attribute name
    ::: type: str
    ::: deprecated: This attribute is deprecated.
    ::: attribute-list-end
    ```

    The attribute that will be parsed will be considered the first heading after the start of the attribute list.
    """

    def __init__(self, md: Markdown, data: DataDict):
        super().__init__(md)
        self.data: DataDict = data

    def parse_attribute(self, name: str, lines: list[str]):
        formatter = AttributeLineFormatter(lines)
        # this is used to send this data to the treeprocessor
        self.data[name] = formatter.get_values()
        return formatter.get_lines()

    @override
    def run(self, lines: list[str]) -> list[str]:
        """Receives a list of lines and parses the attribute list section."""

        # List of new lines to return after parsing
        new_lines: list[str] = []

        # Whether we are currently in the attribute list section
        # If we are in the attribute list section, we will parse it
        currently_in_attribute_list = False

        # This stores the list of lines for each attribute
        attribute_lines: dict[str, list[str]] = {}

        # This is the depth of the attribute header, 0 if we haven't found one yet
        attribute_header_depth = 0

        # This is the name of the current attribute we are parsing
        current_attribute_name = None


        for line in lines:
            # Check if we're at the start of the attribute list
            is_attribute_start = line.startswith(ATTRIBUTE_LIST_START)
            if is_attribute_start:
                # If we are, skip the line and begin parsing the next lines
                currently_in_attribute_list = True
                continue

            # If we encounter the end of the attribute list, we stop parsing and add the lines
            if currently_in_attribute_list and line.startswith(ATTRIBUTE_LIST_END):
                currently_in_attribute_list = False
                for attr_name in sorted(attribute_lines.keys()):
                    new_lines.extend(self.parse_attribute(attr_name, attribute_lines[attr_name]))
                continue

            # If we're not in attributes, copy over the line
            if not currently_in_attribute_list:
                new_lines.append(line)
                continue
            
            # By now, we are now in the attribute list section
            # If we come across a line that starts with "#" and we don't know how nested attribute name is,
            # consider it as the nesting of the attribute name
            if line.startswith("#") and attribute_header_depth == 0:
                # Determine the amount of hashtags before a whitespace
                # and consider it as the depth of the attribute header
                attribute_header_depth = line.split()[0].count("#")

            # If we encounter an attribute header, we set it as the current attribute name
            # and create a new list for it
            if line.startswith(f"{'#'*attribute_header_depth} "):
                current_attribute_name = line[attribute_header_depth:].strip()
                attribute_lines[current_attribute_name] = []

            # If we are not analysing an attribute yet, just copy over the line
            if current_attribute_name is None:
                new_lines.append(line)
                continue
            
            # Otherwise, it's attribute related and slap it into the attribute container
            attribute_lines[current_attribute_name].append(line)

        return new_lines
