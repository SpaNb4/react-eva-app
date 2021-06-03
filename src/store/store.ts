import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import appReducer from './app/reducer';
import { SLICE_NAME as app } from './app/slices';

const store = configureStore({
    reducer: {
        [app]: appReducer,
    },
    middleware: [thunkMiddleware],
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
