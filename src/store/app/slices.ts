import { RootState } from '../store';
import { SLICE_NAME } from './action-types';

const getSlice = (store: RootState) => store[SLICE_NAME];
export const getFactions = (store: RootState) => getSlice(store).factions;
export const getSolarSystems = (store: RootState) => getSlice(store).solarSystems;
export const getCorporations = (store: RootState) => getSlice(store).corporations;
export const getCeo = (store: RootState) => getSlice(store).ceo;
export const getRaces = (store: RootState) => getSlice(store).races;
export const getSearch = (store: RootState) => getSlice(store).search;
export const getLoading = (store: RootState) => getSlice(store).loading;
