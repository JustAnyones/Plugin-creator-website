# Custom Transportation Systems

!!! danger "Privileged access is required for the features described in the article below."

!!! info "Added in version 1.12.26"

Let's have a look into how a Transportation System can be added to the game.

For now you must be a trusted plugin creator to add transportation systems to the game. This is because they can generate income and we are not sure about other ways to exploit it, yet.

## Example
We're using the bus system as an example here. Note how it follows a strict pattern that guarantees that things work as expected.

We are only defining the system itself here using tags to reference to other (maybe not yet defined) objects. See [Extending Transportation Systems](extending-transportation-systems.md) on how to add buildings and cars to your system.

**bus.json:**
```json
[
  {
    "id":"$ts_native_bus00",
    "type":"script",
    "title": "Buses",

    // Defines useful properties for us to make it work
    "template": "$ts_native_template00",

    // The actual creation of the system will happen in the script below
    "script":"bus.lua",

    // Regular requirement attribute as for buildings
    "requirements": [{"type": "RANK", "lvl": 3}],

    // This frame will be used to symbolize the system; should match the category's icon of your system's buildings
    "preview frame": {"steal": "$cat_bus00"},

    // We can manually order systems
    "ordinal": 0,

    // Since systems can provide income privileges are required
    "require privileges": true
  }
]
```

**bus.lua:**
```lua
-- We must create our system in script:init so all drafts were loaded already
function script:init()
    TransportationSystem.create {
        -- Necessary for technical reasons; must look exactly like that
        script = script,

        -- A list of station buildings, retrieved via tag, optional
        stationBuildings = Draft.getDrafts('bus_platform'),

        -- A list of glue buildings, retrieved via tag, optional
        spawnBuildings = Draft.getDrafts('bus_station'),

        -- A list of depot buildings, retrieved via tag, optional
        depotBuildings = Draft.getDrafts('bus_depot'),

        -- A list of bus stops, retrieved via tag, optional
        busStops = Draft.getDrafts('bus_busstop'),

        -- A list of all cars available to this system, retrieved via tag
        vehicles = Draft.getDrafts('ts_normal_bus'),

        -- Provide a car whose road flags will be used; must be part of vehicles list
        roadFlagSrc = Draft.getDraft('$bus00'),
        
        -- We could add more options here, see below
    }
end
```

## Freight Systems
You can define a freight transport system by adding this:
```lua
config = {
    passengerFactor = 0,
    freightFactor = 1,
}
```
Traffic between non residential buildings is considered freight transport. Other than that, it works exactly as for passenger transport. You can define a system that satisfies both transport types, but it's preferred to instead define two different systems for more control.

## Ticket Price
You can set a ticket price for passengers that use the system:
```lua
baseTicketPrice = 2
```
The default value is 1 and it should be in a range of 1-10 (currently, the max in game is 3). For a higher ticket price to make sense the monthly costs of associated buildings and prices of vehicles should be higher.

## Change behavior
If you have a need to extend the system in some other way than intended (vehicles must be cars, you cannot change that), there are ways to do so.

For example the bus transportation system is only available if the user didn't disable it in the settings of the game. This is achieved by "overriding" aka providing a custom function for the `isSystemAvailable` function of the system:
```lua
function script:init()
    TransportationSystem.create {
        ...
        impl = {
            isSystemAvailable = function(ts)
                return not TheoTown.SETTINGS.legacyBusSystem
            end
        }
    }
end
```

These functions basically act like hooks that will be called by the framework to build up the whole system. They interact tightly with functions implemented natively in the game which cannot be modified. The tricky part is that changing these functions in any way may make them incompatible with future updates of the game. So you should not do that unless you have to.

You may find the whole Lua side implementation of the transport system [here](https://forum.theotown.com/viewtopic.php?p=240457).

<sub>
This page has been adapted from
[a topic](https://forum.theotown.com/viewtopic.php?t=28269)
on the official TheoTown forum.
</sub>
