import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    token: null, 
    isAuthenticated: false,
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        saveToken(state, { payload }: PayloadAction<string>) {
            if (payload) {
                state.token = payload;
            }
        },
        clearToken(state) {
            state.token = null;
        },
        setAuthSlice(state, { payload }: PayloadAction<boolean>) {
            state.isAuthenticated = payload;
        }
    }
});

export const { saveToken, clearToken, setAuthSlice } = auth.actions;

export default auth.reducer;