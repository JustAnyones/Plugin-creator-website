# pyright: reportImplicitRelativeImport=false
from category import CategoryDraft
from building import (
    AirportDraft,
    AwardDraft,
    BodyDisposalDraft,
    BuildingDraft,
    DecorationDraft,
    EnergyDraft,
    FarmDraft,
)

def main():
    drafts = [
        CategoryDraft(),

        # building-based drafts
        AirportDraft(),
        AwardDraft(),
        BodyDisposalDraft(),
        BuildingDraft(),
        DecorationDraft(),
        EnergyDraft(),
        FarmDraft(),
    ]

    for draft in drafts:
        with open(f"../docs/draft-types/0{draft.__file__}", "w+") as f:
            draft.to_md_page(f)

if __name__ == "__main__":
    main()