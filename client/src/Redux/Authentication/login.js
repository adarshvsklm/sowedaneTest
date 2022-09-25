import { createSlice } from "@reduxjs/toolkit";

const initialState={
    otp :'',
    verified: false,
    email:'',
    password:'',
}

export const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            state.otp=action.payload.otp || state.otp
            state.verified = action.payload.verified || state.verified
            state.email = action.payload.email || state.email
            state.password = action.payload.password || state.password
        }
    }
})

export default loginSlice.reducer
export const {setLogin} = loginSlice.actions