from markdown import Markdown
from typing_extensions import override

from xml.etree.ElementTree import Element

from markdown.extensions import Extension
from markdown.treeprocessors import Treeprocessor

from .attribute import AttributePreprocessor
from .inclusion import InclusionPreprocessor
from .types import DataDict

class CustomTreeprocessor(Treeprocessor):

    def __init__(self, md: Markdown, data: DataDict) -> None:
        super().__init__(md)
        self.data: DataDict = data

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

                    if not element.text:
                        continue

                    if self.data[element.text].get("required", False):
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
        md.preprocessors.register(InclusionPreprocessor(md), "inclusion-preprocessor", 100)
        md.preprocessors.register(AttributePreprocessor(md, self.data), "attribute-preprocessing", 90)
        md.treeprocessors.register(CustomTreeprocessor(md, self.data), "attribute-sorting2", -999)


def makeExtension(**kwargs): # pyright: ignore[reportUnknownParameterType, reportMissingParameterType]
    return CustomExtension(**kwargs)
