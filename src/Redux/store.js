import mainReducer from './Reducers/mainReducer';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const reducers = combineReducers({
    main: mainReducer
})

export const store = configureStore({
    reducer: {
        root: reducers
    }
})