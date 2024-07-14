import os

from markdown import Markdown
from typing_extensions import override

from markdown.preprocessors import Preprocessor

from .types import DataDict

ROOT_PATH = "docs"

def include_attributes_from_lines(lines: list[str], include_header: bool = False) -> list[str]:
    attribute_section_lines: list[str] = []
    in_attributes = False
    for line in lines:
        line = line.rstrip()

        # Detect the start of attributes section
        if line == "## Attributes":
            in_attributes = True
            continue

        # Detect the end of attributes section
        if in_attributes and (line.startswith("## ") or line.startswith("# ")):
            in_attributes = False
            break
        
        # If we're currently analyzing attribute lines
        if in_attributes:

            # Is it another include statement?
            if line.startswith("::: inherit-attributes "):
                path = os.path.join(ROOT_PATH, line.split(' ')[2].strip())
                attribute_section_lines.extend(include_attributes_from_file(path))
            
            # Otherwise, a regular attribute line to be included
            else:
                attribute_section_lines.append(line)

    return attribute_section_lines

def include_attributes_from_file(file_path: str) -> list[str]:
    if not os.path.exists(file_path):
        print("Cannot include attributes from", file_path)
        return []
    
    with open(file_path, "r") as f:
        lines = f.readlines()

    return include_attributes_from_lines(lines)

class AttributeImportPreprocessor(Preprocessor):

    def __init__(self, md: Markdown, data: DataDict):
        super().__init__(md)

    @override
    def run(self, lines: list[str]) -> list[str]:
        new_lines: list[str] = []
        in_attributes = False
        for line in lines:
            if line.startswith("## Attributes"):
                in_attributes = True
                new_lines.append(line)
                continue

            if in_attributes and line.startswith("## ") or line.startswith("# "):
                in_attributes = False

            if in_attributes and line.startswith("::: inherit-attributes "):
                path = os.path.join(ROOT_PATH, line.split(' ')[2].strip())
                new_lines.extend(include_attributes_from_file(path))
            else:
                new_lines.append(line)
        return new_lines
