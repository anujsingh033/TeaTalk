import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: null,
        otherUserData: [],
        selectedUser: null,
        socket: null,
        onlineUser: [],
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setOtherUserData: (state, action) => {
            state.otherUserData = action.payload;
        },
        setSelectedUser: (state, action) => {
            state.selectedUser = action.payload;
        },
        setSocket: (state, action) => {
            state.socket = action.payload;
        }, setOnlineUser: (state, action) => {
            state.onlineUser = action.payload;
        },
    }
})

export const { setUserData, setOtherUserData, setSelectedUser, setOnlineUser, setSocket } = userSlice.actions;
export default userSlice.reducer