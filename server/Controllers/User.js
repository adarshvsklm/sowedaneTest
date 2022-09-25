import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import User from '../Models/User.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import { createError } from '../createError.js';

dotenv.config();

let otp;

function generateOTP(limit) {
  var digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < limit; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

export const signUp = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  if (req.body.otpKey == req.session.otpKey) {
    const user = await User.findOne({
      email: req.body.email,
    });
    if (user) {
      return next(createError(409, 'User already exists'));
    }
    const newpassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phoneNumber,
      password: newpassword,
    }).then((response) => {
      res.status(200).json(response);
    });
  } else {
    res.status(400);
  }
});

export const sentOtp = (req, res) => {
  try {
    otp = generateOTP(4);

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    var mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: 'OTP for Verification',
      text: `OTP : ${otp}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(200).json({ message: 'Otp send' });
  } catch (e) {
    res.status(500).json({ message: 'Error' });
  }
};

export const verifyLogin = (req, res) => {
  if (otp == req.body.otp) {
    console.log(req.body);
    let otpKey = generateOTP(4);
    req.session.otpKey = otpKey;
    res.status(200).json({ message: 'Verified', otpKey });
  } else {
    res.status(404).json(err);
  }
};

export const verifyOtp = (req, res) => {
  if (otp == req.body.otp) {
    console.log(req.body);
    let otpKey = generateOTP(4);
    req.session.otpKey = otpKey;
    res.status(200).json({ message: 'Verified', otpKey });
  } else {
    req.session.user = null;
    res.status(404).json(err);
  }
};

export const LoginverifyOtp = (req, res) => {
  if (otp == req.body.otp) {
    console.log(req.body);
    req.session.user = req.session.temp
    req.session.temp=null
    let otpKey = generateOTP(4);
    req.session.otpKey = otpKey;
    res.status(200).json({ message: 'Verified', otpKey });
  } else {
    req.session.user = null;
    res.status(404).json(err);
  }
};

export const login = asyncHandler(async (req, res, next) => {
 try{
  const user = await User.findOne({
    email: req.body.email,
  });
  console.log(user);
  if (!user) {
    return next(createError(401, 'invalid credentials'));
  }
  console.log(user);
  const isUserValid = await bcrypt.compare(req.body.password, user.password);
  console.log(isUserValid);
  if (isUserValid) {
    req.session.temp = user;
    res.status(200).json({ message: 'Success' });
  } else {
    req.session.user = null;
    res.status(401).json({ message: 'Login Failed' });
  }
 }catch(err){
  console.log(err);
 }
});

export const UserData = (req, res) => {
  try {
    User.find({ _id: req.session.user._id })
      .then((response) => {
        console.log(response);
        res
          .status(200)
          .json({ name: response[0].name, email: response[0].email });
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  } catch (error) {
    res.json(error);
  }
};

export const updateProfile = (req, res) => {
  try {
    User.updateOne(
      { _id: req.session.user._id },
      { $set: { name: req.body.name } }
    ).then((response) => {
      res.status(200).json({ message: 'Success' });
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export const logout = (req, res) => {
  try {
    req.session.user = null;
    res.status(200).json({ message: 'success' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
