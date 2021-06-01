import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { ExternalUrls } from '../../common/constants';
import { AppDispatch } from '../store';
import { IFaction } from './reducer';

export const fetchFactionsSuccess = createAction<IFaction[]>(types.FETCH_FACTIONS_SUCCESS);
export const fetchFactionsFailure = createAction<string>(types.FETCH_FACTIONS_FAILURE);
export const showLoader = createAction(types.SHOW_LOADER);
export const hideLoader = createAction(types.HIDE_LOADER);

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
