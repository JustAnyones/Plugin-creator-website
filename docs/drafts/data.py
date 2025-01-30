# pyright: reportImplicitRelativeImport=false
from base import BaseDraft

class DataDraft(BaseDraft):

    """
    Data drafts have the type of `data`.

    Data drafts are useful for storing extra data as serialized JSON content is kept in memory.
    """

    __name__ = "Data"
    __file__ = "data.md"
