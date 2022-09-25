import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';
import {
  EmailError,
  emailValid,
  handleValidation,
  PasswordValidation,
  SubmitButton,
} from './signUpHelpers';
import './style.css';
import OtpPopup from './OtpPopup';
import { useDispatch, useSelector } from 'react-redux';
import { setOtp } from '../../Redux/Authentication/auth';
import axios from 'axios';
import { serverUrl } from '../../serverUrl';

export default function SignUp() {
  const [form, setForm] = useState({});
  const dispatch = useDispatch();
  const { otp, open, verified } = useSelector((state) => state.otp);
  const [validEmail, setValidEmail] = useState();

  handleValidation(form);

  const handleSentOtp = () => {
    axios.post(`${serverUrl}/sentOtp`, { email: form.email }).then((res) => {
      console.log(res.data.otpKey);
      setForm({...form,otpKey:res.data.otpKey})
      dispatch(setOtp({ open: true }));
    });
    // setOpen(true);
  };

  const isVerified = (key) => {
    console.log("isVerified",key);
    setForm({ ...form, isVerified: true ,otpKey:key});
  };
  return (
    <Box
      component='form'
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
      noValidate
      autoComplete='off'
    >
      <OtpPopup isVerified={isVerified} />
      <h3>Signup</h3>
      <TextField
        id='outlined-basic'
        label='Name'
        variant='outlined'
        onChange={(e) => {
          setForm({ ...form, name: e.target.value });
        }}
      />
      <TextField
        disabled={verified}
        id='outlined-basic'
        label='Email'
        variant='outlined'
        onChange={(e) => {
          setForm({ ...form, email: e.target.value });
          setValidEmail(emailValid());
        }}
      />
      <div style={{ float: 'right' }}>
        {validEmail ? (
          !verified ? (
            <small className='verify' onClick={handleSentOtp}>
              Verify Email
            </small>
          ) : (
            <small className='verified'>Verified</small>
          )
        ) : (
          ''
        )}
      </div>
      {form.email && <EmailError />}
      <TextField
        type='password'
        id='outlined-basic'
        label='Password'
        variant='outlined'
        onChange={(e) => {
          setForm({ ...form, password: e.target.value });
        }}
      />
      {form.password && <PasswordValidation />}
      <TextField
        id='outlined-basic'
        label='Confirm Password'
        variant='outlined'
        onChange={(e) => {
          setForm({ ...form, cPassword: e.target.value });
        }}
      />

      {form.isVerified ? (
        <SubmitButton />
      ) : (
        <Button variant='contained' disabled={true}>
          Submit
        </Button>
      )}
    </Box>
  );
}
