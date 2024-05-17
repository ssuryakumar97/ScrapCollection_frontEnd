import {createSlice} from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        adminNotification: null,
    },
    reducers:{
        insertNotification : (state,action) => {
            state.adminNotification = [...state.adminNotification,action.payload]
        },
        updateNotification :(state, action) => {
            state.adminNotification = action.payload
        }
    }
})

export const { insertNotification, updateNotification} = notificationSlice.actions;
export default notificationSlice.reducer;