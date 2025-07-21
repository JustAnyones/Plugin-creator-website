import os

from theotown_plugin_documentation.generation.drafts.base import BaseDraft
from theotown_plugin_documentation.generation.drafts.building import (
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
from theotown_plugin_documentation.generation.paths import GENERATED_DRAFTS_DIR
from theotown_plugin_documentation.generation.drafts.category import CategoryDraft
from theotown_plugin_documentation.generation.drafts.data import DataDraft
from theotown_plugin_documentation.generation.drafts.template import TemplateDraft

def generate():
    drafts: list[BaseDraft] = [
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
        print(f"Generating {draft.__name__} draft documentation...")
        with open(os.path.join(GENERATED_DRAFTS_DIR, draft.__file__), "w+") as f:
            draft.to_md_page(f)
