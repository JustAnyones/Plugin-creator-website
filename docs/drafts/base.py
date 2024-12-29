import re
import textwrap

from dataclasses import dataclass

@dataclass
class Attribute:
    name: str
    type: str
    description: str = ""

    version_added: str | None = None
    deprecated: str | None = None
    required: bool = False
    default: str | None = None


class BaseDraft:

    def __init__(self):
        super().__init__()
        self.id = Attribute(
            "id",
            "string",
            "Unique identifier of the draft.",
            required=True
        )
        self.type = Attribute(
            "type",
            "string",
            "A special attribute that determines what kind of attributes and abilities a draft has.",
            required=True
        )
        self.active = Attribute(
            "active",
            "boolean",
            "Whether the draft is active and should be loaded by the game.",
        )
        self.premium = Attribute(
            "premium",
            "boolean",
            """
            Whether the draft is premium.
            A premium draft will not be active in non premium versions of the game.
            """,
        )
        self.once = Attribute(
            "once",
            "boolean",
            """
            Whether the draft should be loaded once.
            
            What this means is that if another draft is encountered with the same ID,
            the game will ignore loading it rather than failing with an error message.
            """,
        )
        self.mute = Attribute(
            "mute",
            "boolean",
            "Whether to suppress any errors that have occurred while loading the draft."
        )
        self.privileged = Attribute(
            "privileged",
            "string",
            """
            Privileged key for your draft.
            Allows the use of special features, which are restricted to trusted plugin creators only.
            """,
            deprecated="""
            Due to a change in how the privilege system works,
            you are now recommended to use [require privileges](#require_privileges)
            or [require super privileges](#require_super_privileges).
            """
        )
        self.requirePrivileges = Attribute(
            "require privileges",
            "boolean",
            "Whether the draft requires features such as monthly income, frame placement, etc.",
            version_added="1.11.73",
            default="false"
        )
        self.requireSuperPrivileges = Attribute(
            "require super privileges",
            "boolean",
            "Whether the draft requires features that are restricted to official game content such as DSA.",
            version_added="1.11.73",
            default="false"
        )
        self.inherit = Attribute(
            "inherit",
            "boolean",
            "Whether to modify a draft of the same ID by inheriting values."
        )
        self.override = Attribute(
            "override",
            "boolean",
            """
            Whether to modify a draft of the same ID by replacing values.
            
            Rather than replacing the values, you may want to add or only change specific values of the draft.
            For that, refer to the [inherit](#inherit) attribute.
            """,
        )
        self.minVersion = Attribute(
            "min version",
            "integer",
            "The minimum game version required to run the draft."
        )
        self.maxVersion = Attribute(
            "max version",
            "integer",
            "The maximum game version that will run the draft."
        )
        self.title = Attribute(
            "title",
            "string",
            "Title, usually of the building."
        )
        self.text = Attribute(
            "text",
            "string",
            "Description, usually of the building."
        )

        self.hidden = Attribute(
            "hidden",
            "boolean",
            """
            Whether the draft shows up in the toolbar. If set to true, the draft will not be available in the toolbar.
            """,
            default="false"
        )

        self.author = Attribute(
            "author",
            "string",
            "The name of the author behind the draft.",
            default="Lobby & theotheoderich"
        )

        self.final = Attribute(
            "final",
            "boolean",
            "If set to true, the draft can no longer be overridden."
        )

        self.hideId = Attribute(
            "hide id",
            "boolean",
            """
            Whether to hide the draft ID even when the debug mode is enabled.
            This will automatically be set to true if final is set to true or if your draft is part of an encrypted plugin file.
            """,
        )

        self.muteLua = Attribute(
            "mute lua",
            "boolean"
        )

        self.strictLua = Attribute(
            "strict lua",
            "boolean"
        )

        self.index = Attribute(
            "index",
            "boolean",
            "Whether to allow the draft to be indexed by Lua methods."
        )

        self.notImplemented = Attribute(
            "not implemented",
            "boolean",
            """
            Whether the draft has to be inherited to be considered implemented. Will cause an error otherwise.
            """
        )

        self.ordinal = Attribute(
            "ordinal",
            "integer",
            """
            Position of the draft in a category.
            Lower ordinal value will list the draft higher. Negative values are allowed.
            """
        )

        self.ordinal_from = Attribute(
            "ordinal from",
            "string",
            "ID of the draft to grab ordinal from. Must be used in combination with the ordinal attribute."
        )

        self.meta = Attribute(
            "meta",
            "Meta"
        )

        self.title_id = Attribute(
            "title id",
            "string"
        )

        self.text_id = Attribute(
            "text id",
            "string"
        )

        self.separator = Attribute(
            "separator",
            "boolean",
            "Whether to separate the draft from others in a category."
        )

        self.preview_frames = Attribute(
            "preview frames",
            "Frame[]",
            "Frames that will be used for preview in the toolbar instead of regular frames."
        )

        self.preview_frames_winter = Attribute(
            "preview frames winter",
            "Frame[]",
            "Frames that will be used for preview in the toolbar instead of regular frames during winter."
        )

        self.icon_frames = Attribute(
            "icon frames",
            "Frame[]"
        )

        self.icon_frames_winter = Attribute(
            "icon frames winter",
            "Frame[]"
        )

        self.show_new_marker = Attribute(
            "show new marker",
            "boolean",
            "Whether the draft will show a new marker in the toolbar."
        )

        self.searchable = Attribute(
            "searchable",
            "boolean",
            "Whether the draft can be searched in the toolbar."
        )

        self.category = Attribute(
            "category",
            "string",
            "ID of the category the draft should be contained in."
        )

        self.category_from = Attribute(
            "category from",
            "string",
            "Draft ID to grab category from and use for the draft."
        )

        self.template_prefix = Attribute(
            "template prefix",
            "string",
            "Has effect only when using templates."
        )

        self.template = Attribute(
            "template",
            "string",
            "ID of the template draft to inherit the implementation from."
        )

        self.templates = Attribute(
            "templates",
            "string[]",
            "Like template, but accepts multiple IDs."
        )

        self.dev = Attribute(
            "dev",
            "boolean"
        )

        self.sound_click = Attribute(
            "sound click",
            "obj",
            """
            This sound will be played when clicked on the draft in default mode.

            #### Example
            ```json
            {
              "sound click": {
                "file": "path to file.mp3",
                // alternatively there's "res" string attr to refer to a game resource
              }
            }
            ```
            """
        )

        self.alias = Attribute(
            "alias",
            "string"
        )

        self.aliases = Attribute(
            "aliases",
            "string[]",
            "Same as [alias](#alias), but for multiple IDs."
        )

        self.premium_requirement = Attribute(
            "premium requirement",
            "NestedDraftRequirement",
            """
            Requirements that need to be fulfilled for the draft on premium platforms.

            If platform is premium, this attribute will be loaded over the regular requirement attribute.
            On non-premium platforms, this attribute will be ignored.
            """
        )

        self.premium_requirements = Attribute(
            "premium requirements",
            "DraftRequirement[]",
            self.premium_requirement.description
        )

        self.requirement = Attribute(
            "requirement",
            "NestedDraftRequirement",
            "Requirements that need to be fulfilled for the draft."
        )

        self.requirements = Attribute(
            "requirements",
            "DraftRequirement[]",
            self.requirement.description
        )

        self.script = Attribute(
            "script",
            "string",
            """
            Used to attach a script to the current draft.

            #### Supported modes of operation

            - Loading the script from file:
            ```json
            {
              "script": "script.lua"
            }
            ```

            - Declaring the script inline:
            ```json
            {
              "script": "function script:lateInit() Debug.toast('Late init called') end"
            }
            ```

            - Using a helper script `#LuaWrapper` for [Real time script editing](../guides/scripting/real-time-script-editing.md):
            ```json
            {
              "script": "#LuaWrapper",
              "meta": {
                "luawrapper": {
                  "script": "script.lua",
                  "dev": true
                }
              }
            }
            ```
            """,
        )

        self.scripts = Attribute(
            "scripts",
            "string[]",
            "Like [script](#script), but for multiple scripts."
        )

    def to_md_page(self):
        attributes: list[Attribute] = []
        for _, value in vars(self).items():
            if isinstance(value, Attribute):
                attributes.append(value)

        print("<!-- AUTOGENERATED, DO NOT EDIT -->")
        print(f"# {self.__class__.__name__}")
        print(textwrap.dedent(self.__doc__ or "").strip())
        print("## Attributes")
        for attr in sorted(attributes, key=lambda x: x.name):
            print(f"### {attr.name}")
            print(f"::: type: {attr.type}")
            if attr.deprecated:
                
                print(f"::: deprecated: {textwrap.dedent(attr.deprecated).strip()}")
            print()
            print(textwrap.dedent(attr.description).strip())
            print()
