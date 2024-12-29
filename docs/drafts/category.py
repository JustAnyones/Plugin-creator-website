from viewport import ViewportDraft

class CategoryDraft(ViewportDraft):

    """
    Category drafts have the type of `category`.

    By default, category drafts have the category of `$cat_root00`.

    Either [frames](#frames) or [preview frames](#preview_frames) are required.
    """

    def __init__(self):
        super().__init__()