import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { serverUrl } from '../../serverUrl';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin } from '../../Redux/Authentication/login';

function Login() {
  const [form, setForm] = useState({});
  const [error, setError] = useState();
  const [otpStatus, setOtpStatus] = useState();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const handleSubmit = () => {
    axios
      .post(`${serverUrl}/login`, form, { withCredentials: true })
      .then((res) => {
        console.log(res);
        axios
          .post(`${serverUrl}/sentOtp`,{email:form.email}, { withCredentials: true })
          .then((response) => {
            dispatch(setLogin(form));
            navigate('/login/otp');
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) => {
        setError('Email Or Password is incorrect');
        console.log(err);
      });
  };
  return (
    <div>
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
        <h3>Login</h3>
        {error && <small style={{ color: 'red' }}>{error}</small>}

        <TextField
          //   disabled={verified}
          id='outlined-basic'
          label='Email'
          variant='outlined'
          onChange={(e) => {
            setForm({ ...form, email: e.target.value });
          }}
        />

        <TextField
          type='password'
          id='outlined-basic'
          label='Password'
          variant='outlined'
          onChange={(e) => {
            setForm({ ...form, password: e.target.value });
          }}
        />

        <Button
          onClick={handleSubmit}
          variant='contained'
          disabled={!form.email || !form.password}
        >
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default Login;
