import express from 'express';
import { login, sentOtp, signUp, verifyOtp } from '../Controllers/User.js';
const router = express.Router();

router.post('/signup',signUp)
router.post('/sentOtp',sentOtp)
router.post('/otp/verify',verifyOtp)
router.post('/login/verify',verifyOtp)
router.post('/login',login)

export default router