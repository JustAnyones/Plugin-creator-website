from .base import BaseDraft, Attribute

class SpawnableDraft(BaseDraft):

    """
    This is a stub for drafts that can be spawned on the map during generation.

    This includes building, tree and ground drafts.
    """
        
    def __init__(self):
        super().__init__()
        self.spawn: Attribute = Attribute(
            "spawn",
            "LegacySpawner",
            """
            Used for spawning draft objects on the map during generation.
            """,
            deprecated="""
            Following the biome update this method of building spawning is considered obsolete.
            Use the new [biomes](#biomes) attribute instead.
            """
        )
        self.biomes: Attribute = Attribute(
            "biomes",
            "BiomeSpawner",
            "Used for spawning draft objects on the map during generation."
        )
