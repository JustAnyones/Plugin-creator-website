# Base

This contains attributes that are available to any draft regardless of the type:

## Attributes

### id
::: type: string
::: required: true
Unique identifier of the draft.

### type
::: type: string
::: required: true

A special attribute that determines what kind of attributes and abilities a draft has.

### active
::: type: boolean

Whether the draft is active and should be loaded by the game.

### premium
::: type: boolean

Whether the draft is premium. A draft that is considered premium will not be active in non premium versions of the game.

### once
::: type: boolean

Whether the draft should be loaded once.

What this means is that if another draft is encountered with the same ID, game will ignore loading it
rather than failing with an error message.

### mute
::: type: boolean

Whether to suppress any errors that have occurred while loading the draft.

### privileged
::: type: string
::: deprecated: Due to a change in how the privilege system works, you are now recommended to use [require privileges](#require_privileges) \
or [require super privileges](#require_super_privileges).

Privileged key for your draft. Allows to use special features, which are restricted to trusted plugin creators only.

### require privileges
::: type: boolean
::: version-added: 1.11.71

Whether the draft requires features such as monthly income, frame placement, etc.

### require super privileges
::: type: boolean
::: version-added: 1.11.71

Whether the draft requires features that are restricted to DSA.

### inherit
::: type: boolean

Whether to modify a draft of the same ID by inheriting values.

### override
::: type: boolean

Whether to modify a draft of the same ID by replacing values.

Rather than replacing the values, you may want to add or only change specific values of the draft.
For that refer to the [inherit](#inherit) attribute.

### min version
::: type: integer

The minimum game version required to run the draft.

### max version
::: type: integer

The maximum game version that will run the draft.

### title
::: type: string

### text
::: type: string

### hidden
::: type: boolean
::: default: false

Whether the draft shows up in the toolbar.

### author
::: type: string

The name of the author behind the draft.

### final
::: type: boolean

If set to true, the draft can no longer be overriden.

### hide id
::: type: boolean

Whether to hide the draft ID even when the debug mode is enabled.

### mute lua
::: type: boolean

### strict lua
::: type: boolean

### index
::: type: boolean

Whether to allow the draft to be indexed by Lua methods.

### not implemented
::: type: boolean

Whether the draft has to be inherited to be considered implemented. Will cause an error otherwise.

### ordinal
::: type: integer

Position of the draft in a category. Lower ordinal value will list the draft higher. Negative values are allowed.

### ordinal from
::: type: string

ID of the draft to grab ordinal from. Must be used in combination with the [ordinal](#ordinal) attribute.

### meta
::: type: object

### title id
::: type: string

### text id
::: type: string

### separator
::: type: boolean

Whether to separate draft from others in a category.

### preview frames
::: type: Frame[]

### icon frames
::: type: Frame[]

### show new marker
::: type: boolean

Whether the draft will show a new marker in the toolbar.

### searchable
::: type: boolean

Whether the draft can be searched in the toolbar.

### category
::: type: string

ID of the category the draft should be contained in.

### category from
::: type: string

Draft ID to grab category from and use for the draft.