import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    restaurantName: "",
    name: "",
    email: '',
    uniqueId: '',
    _id: '',
    profilePic: ''
};

const userSlice = createSlice({
    name: "csmuser",
    initialState,
    reducers: {
        logIn(state, action) {
            state.restaurantName = action.payload.restaurantName;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.uniqueId = action.payload.uniqueId;
            state._id = action.payload._id;
            state.profilePic = action.payload.profilePic;
        },
        logout(state) {
            state.name = "";
            state.restaurantName = "";
            state.email = "";
            state.uniqueId = "";
            state.profilePic = '';
            state._id = "";
        }
    },
});

export const { logIn, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;