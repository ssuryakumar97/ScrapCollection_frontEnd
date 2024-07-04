import {createSlice} from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        adminNotification: [],
        userNotification: [],
        quotationNotification: []
    },
    reducers:{
        // for admin orders
        insertAdminNotification : (state, action) => {
            state.adminNotification = [...state.adminNotification, action.payload]
            // state.adminNotification = action.payload
        },
        updateAdminNotification :(state, action) => {
            state.adminNotification = action.payload
        },
        // for user notification
        insertUserNotification : (state, action) => {
            state.userNotification = [...state.userNotification, action.payload]
            // state.adminNotification = action.payload
        },
        updateUserNotification :(state, action) => {
            state.userNotification = action.payload
        },
        // for admin quotation notification
        insertQuotationNotification : (state, action) => {
            state.quotationNotification = [...state.quotationNotification, action.payload]
            // state.adminNotification = action.payload
        },
        updateQuotationNotification :(state, action) => {
            state.quotationNotification = action.payload
        }
    }
})

export const { insertAdminNotification, updateAdminNotification, insertUserNotification, updateUserNotification, insertQuotationNotification, updateQuotationNotification} = notificationSlice.actions;
export default notificationSlice.reducer;