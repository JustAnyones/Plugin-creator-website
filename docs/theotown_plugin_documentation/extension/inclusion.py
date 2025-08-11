import os
import re

from dataclasses import dataclass
from markdown import Markdown
from typing_extensions import override

from markdown.preprocessors import Preprocessor

PATTERN = re.compile(r"::: inherit-h(\d) (?:\"([^\"]+)\"|(\S+)) (\S+) *(\S*)")

ROOT_PATH = "docs"

@dataclass
class InclusionContext:
    name: str
    level: int
    extra: str | None

    header_before_level: int
    header_before_name: str | None

    @property
    def prefix_name(self) -> bool:
        if self.extra is None or self.header_before_name is None:
            return False
        return "synthetic" in self.extra.split(";")

    @property
    def increase_nesting(self) -> bool:
        if not self.extra:
            return False
        return "nest" in self.extra.split(";")
    

def include_header_from_lines(ctx: InclusionContext, lines: list[str]) -> list[str]:
    header_section_lines: list[str] = []
    in_header = False
    header_line = '#' * ctx.level + f" {ctx.name}"

    previous_header_level = -1
    previous_header_name = None
    for line in lines:
        line = line.rstrip()

        if line.startswith("#"):
            split = line.split(" ", 1)
            previous_header_level = len(split[0])
            previous_header_name = split[1]

        # Detect the start of the header
        if line == header_line:
            in_header = True
            continue

        # Detect the end of the header
        if in_header and line.startswith("#"):
            if len(line.split(" ")[0]) <= ctx.level:
                in_header = False
                break
        
        # If we're currently analyzing header lines
        if in_header:

            # Is it another include statement?
            match = re.match(PATTERN, line)
            if match:
                path = os.path.join(ROOT_PATH, match.group(4).strip())
                new_ctx = InclusionContext(
                    match.group(2) or match.group(3),
                    int(match.group(1)),
                    match.group(5),
                    previous_header_level,
                    previous_header_name
                )
                header_section_lines.extend(
                    include_header_from_file(new_ctx, path)
                )
            
            # Otherwise, a regular line to be included
            else:

                # If it's a header
                if line.startswith("#"):
                    tags, name = line.split(" ", 1)
                    if ctx.prefix_name:
                        name = f"{ctx.header_before_name} " + name
                    if ctx.increase_nesting:
                        tags += "#"
                    line = f"{tags} {name}"

                header_section_lines.append(line)

    return header_section_lines

def include_header_from_file(ctx: InclusionContext, file_path: str) -> list[str]:
    if not os.path.exists(file_path):
        print(f"Cannot include h{ctx.level} '{ctx.name}' from", file_path)
        return []
    
    with open(file_path, "r") as f:
        lines = f.readlines()

    lines = include_header_from_lines(ctx, lines)
    return lines

class InclusionPreprocessor(Preprocessor):
    """This preprocessor deals with header inclusion from other files."""

    def __init__(self, md: Markdown):
        super().__init__(md)

    @override
    def run(self, lines: list[str]) -> list[str]:
        new_lines: list[str] = []

        previous_header_level = -1
        previous_header_name = None
        for line in lines:

            if line.startswith("#"):
                split = line.split(" ", 1)
                previous_header_level = len(split[0])
                previous_header_name = split[1]

            if line.startswith("::: "):
                match = re.match(PATTERN, line)
                if match:
                    ctx = InclusionContext(
                        match.group(2) or match.group(3),
                        int(match.group(1)),
                        match.group(5),
                        previous_header_level,
                        previous_header_name
                    )
                    path = os.path.join(ROOT_PATH, match.group(4).strip())
                    new_lines.extend(include_header_from_file(ctx, path))
                    continue
            
            new_lines.append(line)
        return new_lines
