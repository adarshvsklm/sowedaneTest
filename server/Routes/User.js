import express from 'express';
import { checkLogin } from '../Controllers/checkLogin.js';
import { login, logout, sentOtp, signUp, updateProfile, UserData, verifyOtp } from '../Controllers/User.js';
const router = express.Router();


router.get('/login/check',checkLogin)
router.post('/signup',signUp)
router.post('/sentOtp',sentOtp)
router.post('/otp/verify',verifyOtp)
router.post('/login/verify',verifyOtp)
router.post('/login',login)
router.get('/profile',UserData)
router.patch('/profile/update',updateProfile)
router.get('/logout',logout)

export default router

