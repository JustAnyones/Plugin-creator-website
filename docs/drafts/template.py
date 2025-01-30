# pyright: reportImplicitRelativeImport=false
from base import Attribute, BaseDraft

class TemplateDraft(BaseDraft):

    """
    Template drafts are special in a way that they provide implementations for other draft types.

    You can define any attribute, even if it's not listed under the [attributes](#attributes) section
    and any draft that uses the template draft as their template will inherit those values.

    You can even reference other template drafts using the [template](#template) attribute.
    """

    __name__ = "Template"
    __file__ = "template.md"

    def __init__(self):
        super().__init__()
        self.additive: Attribute = Attribute(
            "additive",
            "boolean",
        )
