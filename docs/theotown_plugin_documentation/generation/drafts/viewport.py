from .base import Attribute, BaseDraft

class ViewportDraft(BaseDraft):

    def __init__(self):
        super().__init__()
        self.frames: Attribute = Attribute(
            "frames",
            "Frame[]",
            """
            Graphic frames definition of the draft.
            """
        )
        self.framesWinter: Attribute = Attribute(
            "frames winter",
            "Frame[]",
        )
