import {createSlice} from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        adminNotification: [],
        userNotification: []
    },
    reducers:{
        insertAdminNotification : (state, action) => {
            state.adminNotification = [...state.adminNotification, action.payload]
            // state.adminNotification = action.payload
        },
        updateAdminNotification :(state, action) => {
            state.adminNotification = action.payload
        },
        insertUserNotification : (state, action) => {
            state.userNotification = [...state.adminNotification, action.payload]
            // state.adminNotification = action.payload
        },
        updateUserNotification :(state, action) => {
            state.userNotificationNotification = action.payload
        }
    }
})

export const { insertAdminNotification, updateAdminNotification} = notificationSlice.actions;
export default notificationSlice.reducer;