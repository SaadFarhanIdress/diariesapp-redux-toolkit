import {combineReducers} from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userReducer from './auth/userSlice';
import diariesReducer from './diary/diariesSlice';
import entriesReducer from './entry/entriesSlice';
import editorReducer from './entry/editorSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    diaries: diariesReducer,
    entries: entriesReducer,
    user: userReducer,
    editor: editorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;