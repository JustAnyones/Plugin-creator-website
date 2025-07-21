import enum

class ChangeType(enum.Enum):
    ADDED = "version-added"
    REMOVED = "version-removed"
    CHANGED = "version-changed"
