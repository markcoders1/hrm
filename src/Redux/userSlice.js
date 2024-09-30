import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        image: null,
        name: null,
        accessToken: null,
        refreshToken: null,
        email: null,
        userId: null,
        role: null
    },
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            
            state.user = {
                image: action.payload.image,
                name: action.payload.name,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
                email: action.payload.email,
                userId: action.payload.userId,
        role: action.payload.role,

            };
            state.isAuthenticated = true;
        },
        logout: (state) => {
            
            state.user = {
                image: null,
                name: null,
                accessToken: null,
                refreshToken: null,
                email: null,
                userId: null,
                role : null,
            };
            state.isAuthenticated = false;
        }
    }
})


export const { login, logout } = userSlice.actions;


export default userSlice.reducer;
