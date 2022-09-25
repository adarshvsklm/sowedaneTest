import {configureStore} from '@reduxjs/toolkit'
import authSlice from './Authentication/auth'
import loginSlice from './Authentication/login'

export const store = configureStore({
    reducer:{
        otp:authSlice,
        login :loginSlice
    }
})