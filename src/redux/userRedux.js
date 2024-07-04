import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isUserAuthenticated: false,
        expiry: null
    },
    reducers:{
        login: (state,action) => {
            // console.log(action.payload);
            // localStorage.setItem("currentUser", JSON.stringify(action.payload))
            state.currentUser = action.payload
            state.isUserAuthenticated = true
            state.expiry = Date.now() + (1000 * 60 * 60)
        },
        logout:(state) => {
            state.currentUser = null
            state.isUserAuthenticated = false
            state.expiry = null
        }
    }
})

export const { login, logout} = userSlice.actions;
export default userSlice.reducer;