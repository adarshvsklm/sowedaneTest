import {configureStore} from '@reduxjs/toolkit'
import authSlice from './Authentication/auth'
import loginSlice from './Authentication/login'
import UserSlice from './UserSlice/UserSlice'

export const store = configureStore({
    reducer:{
        otp:authSlice,
        login :loginSlice,
        UserDetails:UserSlice
    }
})