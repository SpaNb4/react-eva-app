interface IFaction {
    corporation_id: number;
    description: string;
    faction_id: number;
    is_unique: boolean;
    militia_corporation_id: number;
    name: string;
    size_factor: number;
    solar_system_id: number;
    station_count: number;
    station_system_count: number;
}

interface IPlanet {
    planet_id: number;
    asteroid_belts?: number[];
    moons?: number[];
}

interface ISolarSystem {
    [key: string]: string;
    constellation_id: number;
    name: string;
    planets: IPlanet[];
    position: {
        x: number;
        y: number;
        z: number;
    };
    security_class: string;
    security_status: number;
    star_id: number;
    stargates: number[];
    stations: number[];
    system_id: number;
}

interface ICorporation {
    [key: string]: string;
    corporationId: number;
    ceo_id: number;
    creator_id: number;
    description: string;
    home_station_id: number;
    member_count: number;
    name: string;
    shares: number;
    tax_rate: number;
    ticker: string;
}

interface ICeo {
    [key: string]: string;
    ceoId: number;
    birthday: string;
    bloodline_id: number;
    corporation_id: number;
    description: string;
    gender: string;
    name: string;
    race_id: number;
    security_status: number;
}

interface IRace {
    alliance_id: number;
    description: string;
    name: string;
    race_id: number;
}

interface ISearch {
    category: string;
    id: number;
    name: string;
}

interface IInitialState {
    factions: IFaction[] | undefined;
    solarSystems: ISolarSystem[];
    corporations: ICorporation[];
    ceo: ICeo[];
    races: IRace[];
    search: ISearch[];
    errorMessage: string | undefined;
    loading: boolean;
}
