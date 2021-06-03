import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';
import { isEqualObjectInArr } from './../../common/utils';

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
                state.solarSystems.push(action.payload);
            }
        })
        .addCase(actions.fetchSolarSystemFailure, (state, action) => {
            state.errorMessage = action.payload;
        })
        .addCase(actions.fetchCorporationSuccess, (state, action) => {
            if (!isEqualObjectInArr(state.corporations, action.payload, 'corporationId')) {
                state.corporations.push(action.payload);
            }
        })
        .addCase(actions.fetchCorporationFailure, (state, action) => {
            state.errorMessage = action.payload;
        })
        .addCase(actions.fetchCeoSuccess, (state, action) => {
            if (!isEqualObjectInArr(state.ceo, action.payload, 'ceoId')) {
                state.ceo.push(action.payload);
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
