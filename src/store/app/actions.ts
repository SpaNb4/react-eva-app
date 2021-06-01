import * as types from './action-types';
import { createAction } from '@reduxjs/toolkit';

export const registerSuccess = createAction(types.REGISTER_SUCCESS);
