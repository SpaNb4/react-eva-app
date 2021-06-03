import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ExternalUrls } from '../../common/constants';
import { AppDispatch } from '../store';
import { SLICE_NAME } from './slices';

export const fetchFactionsSuccess = createAction<IFaction[]>(`${SLICE_NAME}/FETCH_FACTIONS_SUCCESS`);
export const fetchFactionsFailure = createAction<string>(`${SLICE_NAME}/FETCH_FACTIONS_FAILURE`);
export const fetchSolarSystemSuccess = createAction<ISolarSystem>(`${SLICE_NAME}/FETCH_SOLAR_SYSTEM_SUCCESS`);
export const fetchSolarSystemFailure = createAction<string>(`${SLICE_NAME}/FETCH_SOLAR_SYSTEM_FAILURE`);
export const fetchCorporationSuccess = createAction<ICorporation>(`${SLICE_NAME}/FETCH_CORPORATION_SUCCESS`);
export const fetchCorporationFailure = createAction<string>(`${SLICE_NAME}/FETCH_CORPORATION_FAILURE`);
export const fetchCeoSuccess = createAction<ICeo>(`${SLICE_NAME}/FETCH_CEO_SUCCESS`);
export const fetchCeoFailure = createAction<string>(`${SLICE_NAME}/FETCH_CEO_FAILURE`);
export const fetchRacesSuccess = createAction<IRace[]>(`${SLICE_NAME}/FETCH_RACES_SUCCESS`);
export const fetchRacesFailure = createAction<string>(`${SLICE_NAME}/FETCH_RACES_FAILURE`);
export const fetchSearchSuccess = createAction<ISearch[]>(`${SLICE_NAME}/FETCH_SEARCH_SUCCESS`);
export const fetchSearchFailure = createAction<string>(`${SLICE_NAME}/FETCH_SEARCH_FAILURE`);
export const showLoader = createAction(`${SLICE_NAME}/SHOW_LOADER`);
export const hideLoader = createAction(`${SLICE_NAME}/HIDE_LOADER`);

export const fetchFactions = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(showLoader());
        const response = await axios(ExternalUrls.Factions);
        const factions = response.data;
        dispatch(fetchFactionsSuccess(factions));
        dispatch(hideLoader());
    } catch (error) {
        dispatch(fetchFactionsFailure(error));
    }
};

export const fetchSolarSystem = (solarSystemId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(showLoader());
        const response = await axios(`${ExternalUrls.SolarSystem}/${solarSystemId}`);
        const solarSystem = response.data;
        dispatch(fetchSolarSystemSuccess(solarSystem));
        dispatch(hideLoader());
    } catch (error) {
        dispatch(fetchSolarSystemFailure(error));
    }
};

export const fetchCorporation = (corporationId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(showLoader());
        const response = await axios(`${ExternalUrls.Corporation}/${corporationId}`);
        const corporation = response.data;
        dispatch(fetchCorporationSuccess({ ...corporation, corporationId }));
        dispatch(hideLoader());
    } catch (error) {
        dispatch(fetchCorporationFailure(error));
    }
};

export const fetchCeo = (ceoId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(showLoader());
        const response = await axios(`${ExternalUrls.Ceo}/${ceoId}`);
        const ceo = response.data;
        dispatch(fetchCeoSuccess({ ...ceo, ceoId }));
        dispatch(hideLoader());
    } catch (error) {
        dispatch(fetchCorporationFailure(error));
    }
};

export const fetchRaces = () => async (dispatch: AppDispatch) => {
    try {
        dispatch(showLoader());
        const response = await axios(ExternalUrls.Races);
        const races = response.data;
        dispatch(fetchRacesSuccess(races));
        dispatch(hideLoader());
    } catch (error) {
        dispatch(fetchRacesFailure(error));
    }
};

export const fetchSearch = (searchType: string, searchInput: string) => async (dispatch: AppDispatch) => {
    try {
        dispatch(showLoader());
        const response = await axios(ExternalUrls.Search, { params: { categories: searchType, search: searchInput } });
        const searchResult = response.data;

        if (Object.keys(searchResult).length === 0) {
            dispatch(fetchSearchSuccess([]));
            dispatch(hideLoader());
        } else {
            const namesWithId = await axios({
                method: 'post',
                url: ExternalUrls.Names,
                data: searchResult[`${searchType}`],
            });
            dispatch(fetchSearchSuccess(namesWithId.data));
            dispatch(hideLoader());
        }
    } catch (error) {
        dispatch(fetchSearchFailure(error));
    }
};
