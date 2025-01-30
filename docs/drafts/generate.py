# pyright: reportImplicitRelativeImport=false
from building import (
    AirportDraft,
    AwardDraft,
    BodyDisposalDraft,
    BuildingDraft,
    BuoyDraft,
    BusDepotDraft,
    CommercialDraft,
    DecorationDraft,
    DestroyedDraft,
    EducationDraft,
    EnergyDraft,
    FarmDraft,
    FireBrigadeDraft,
    HarborIndDraft,
    HarborPierDraft,
    IndustrialDraft,
    LandmarkDraft,
    MedicDraft,
    MilitaryDraft,
    ParkDraft,
    PoliceDraft,
    PublicDraft,
    RailwayStationDraft,
    ReligionDraft,
    ResidentialDraft,
    SportDraft,
    SwatDraft,
    TerrainDraft,
    WasteDisposalDraft,
    WaterDraft,
)
from category import CategoryDraft
from data import DataDraft
from template import TemplateDraft

def main():
    drafts = [
        # Building-based drafts
        AirportDraft(),
        AwardDraft(),
        BodyDisposalDraft(),
        BuildingDraft(),
        BuoyDraft(),
        BusDepotDraft(),
        CommercialDraft(),
        DecorationDraft(),
        DestroyedDraft(),
        EducationDraft(),
        EnergyDraft(),
        FarmDraft(),
        FireBrigadeDraft(),
        HarborIndDraft(),
        HarborPierDraft(),
        IndustrialDraft(),
        LandmarkDraft(),
        MedicDraft(),
        MilitaryDraft(),
        ParkDraft(),
        PoliceDraft(),
        PublicDraft(),
        RailwayStationDraft(),
        ReligionDraft(),
        ResidentialDraft(),
        SportDraft(),
        SwatDraft(),
        TerrainDraft(),
        WasteDisposalDraft(),
        WaterDraft(),


        CategoryDraft(),
        DataDraft(),
        TemplateDraft(),
    ]

    for draft in drafts:
        with open(f"../docs/draft-types/{draft.__file__}", "w+") as f:
            draft.to_md_page(f)

if __name__ == "__main__":
    main()