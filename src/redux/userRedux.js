import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isUserAuthenticated: false
    },
    reducers:{
        login: (state,action) => {
            // console.log(action.payload);
            // localStorage.setItem("currentUser", JSON.stringify(action.payload))
            state.currentUser = action.payload
            state.isUserAuthenticated = true
        },
        logout:(state) => {
            state.currentUser = null
            state.isUserAuthenticated = false
        }
    }
})

export const { login, logout} = userSlice.actions;
export default userSlice.reducer;