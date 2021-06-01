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

interface IInitialState {
    factions: IFaction[] | undefined;
    errorMessage: string | undefined;
    loading: boolean;
}

const initialState: IInitialState = {
    factions: [],
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
        .addCase(actions.showLoader, (state) => {
            state.loading = true;
        })
        .addCase(actions.hideLoader, (state) => {
            state.loading = false;
        })
        .addDefaultCase((state) => state);
});

export default reducer;
