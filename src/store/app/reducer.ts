import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

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

interface IInitialState {
    factions: IFaction[] | undefined;
    solarSystems: ISolarSystem[];
    errorMessage: string | undefined;
    loading: boolean;
}

const initialState: IInitialState = {
    factions: [],
    solarSystems: [],
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
            /* TODO: fix if you click on one fraction several times, 
			then the same elements with solar system will be added to the array*/
            state.solarSystems = [...state.solarSystems, action.payload];
        })
        .addCase(actions.fetchSolarSystemFailure, (state, action) => {
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
