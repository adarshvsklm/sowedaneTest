import { createSlice } from "@reduxjs/toolkit";

const initialState={
    otp :'',
    open: false,
    verified: false,
}

export const authSlice = createSlice({
    name:'otp',
    initialState,
    reducers:{
        setOtp:(state,action)=>{
            console.log(action);
            state.otp=action.payload.otp || state.otp
            state.open=!(state.open ) 
            state.verified = action.payload.verified || state.verified
        }
    }
})

export default authSlice.reducer
export const {setOtp} = authSlice.actions