from base import Attribute, BaseDraft


class ViewportDraft(BaseDraft):

    def __init__(self):
        super().__init__()
        self.frames = Attribute(
            "frames",
            "Frame[]",
        )
        self.framesWinter = Attribute(
            "frames winter",
            "Frame[]",
        )
