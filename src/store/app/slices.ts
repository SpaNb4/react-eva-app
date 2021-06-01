import { RootState } from '../store';
import { SLICE_NAME } from './action-types';

const getSlice = (store: RootState) => store[SLICE_NAME];
export const getFactions = (store: RootState) => getSlice(store).factions;
