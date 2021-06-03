import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';
import { isEqualObjectInArr } from './../../common/utils';

export interface IFaction {
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
export interface ISolarSystem {
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

export interface ICorporation {
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

export interface ICeo {
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

export interface IRace {
    alliance_id: number;
    description: string;
    name: string;
    race_id: number;
}

export interface ISearch {
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

const initialState: IInitialState = {
    factions: [],
    solarSystems: [],
    corporations: [],
    ceo: [],
    races: [],
    search: [],
    errorMessage: '',
    loading: false,
};

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.fetchFactionsSuccess, (state, action) => {
            state.factions = action.payload;
        })
        .addCase(actions.fetchFactionsFailure, (state, action) => {
            state.errorMessage = action.payload;
        })
        .addCase(actions.fetchSolarSystemSuccess, (state, action) => {
            if (!isEqualObjectInArr(state.solarSystems, action.payload, 'system_id')) {
                state.solarSystems = [...state.solarSystems, action.payload];
            }
        })
        .addCase(actions.fetchSolarSystemFailure, (state, action) => {
            state.errorMessage = action.payload;
        })
        .addCase(actions.fetchCorporationSuccess, (state, action) => {
            if (!isEqualObjectInArr(state.corporations, action.payload, 'corporationId')) {
                state.corporations = [...state.corporations, action.payload];
            }
        })
        .addCase(actions.fetchCorporationFailure, (state, action) => {
            state.errorMessage = action.payload;
        })
        .addCase(actions.fetchCeoSuccess, (state, action) => {
            if (!isEqualObjectInArr(state.ceo, action.payload, 'ceoId')) {
                state.ceo = [...state.ceo, action.payload];
            }
        })
        .addCase(actions.fetchCeoFailure, (state, action) => {
            state.errorMessage = action.payload;
        })
        .addCase(actions.fetchRacesSuccess, (state, action) => {
            state.races = action.payload;
        })
        .addCase(actions.fetchRacesFailure, (state, action) => {
            state.errorMessage = action.payload;
        })
        .addCase(actions.fetchSearchSuccess, (state, action) => {
            state.search = action.payload;
        })
        .addCase(actions.fetchSearchFailure, (state, action) => {
            state.errorMessage = action.payload;
        })
        .addCase(actions.showLoader, (state) => {
            state.loading = true;
        })
        .addCase(actions.hideLoader, (state) => {
            state.loading = false;
        })
        .addDefaultCase((state) => state);
});

export default reducer;
