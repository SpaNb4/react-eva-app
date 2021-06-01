import { createReducer } from '@reduxjs/toolkit';
import * as actions from './actions';

const initialState = {
    auth: false,
};

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(actions.registerSuccess, (state, action) => {
            state.auth = !state.auth;
        })
        .addDefaultCase((state) => state);
});

export default reducer;
