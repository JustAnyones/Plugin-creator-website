export class Category {
    private id: string
    constructor(id: string) {
        this.id = id
    }
}

export class Categories {
    static readonly RESIDENTIAL = new Category("$cat_residential00")
    static readonly COMMERCIAL = new Category("$cat_commercial00")
    static readonly INDUSTRIAL = new Category("$cat_industrial00")

    static readonly PARK = new Category("$cat_park00")
    static readonly SPORT = new Category("$cat_sport00")
    static readonly MANAGEMENT = new Category("$cat_management00")
    static readonly RELIGION = new Category("$cat_religion00")
    static readonly AWARD = new Category("$cat_award00")
    static readonly ENERGY = new Category("$cat_energy00")
    static readonly WATER = new Category("$cat_water00")
    static readonly MEDIC = new Category("$cat_medic00")
    static readonly POLICE = new Category("$cat_police00")
    static readonly FIRE_BRIGADE = new Category("$cat_firebrigade00")
    static readonly EDUCATION = new Category("$cat_education00")
    static readonly ROAD = new Category("$cat_road00")
    static readonly DECORATION = new Category("$cat_decoration00")
    static readonly TRANSPORT = new Category("$cat_transport00")
    static readonly WASTE_DISPOSAL = new Category("$cat_wastedisposal00")
    static readonly BODY_DISPOSAL = new Category("$cat_bodydisposal00")
    static readonly MILITARY = new Category("$cat_military00")
    static readonly AIRPORT = new Category("$cat_airport00")
    static readonly TERRAIN = new Category("$cat_terrain00")
    static readonly LANDMARK = new Category("$cat_landmark00")

    static readonly TREE = new Category("$cat_tree00")

    static readonly ROOT = new Category("$cat_root00")


    private constructor(private key: string, public value: any) {}
    toString() {
        return this.key;
    }
}