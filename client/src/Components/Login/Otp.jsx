import { Box, Button, TextField } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { serverUrl } from '../../serverUrl';
import {useNavigate} from 'react-router-dom'

function Otp() {
  const [otp, setOtp] = useState();
  const [error, setError] = useState();
  const navigate= useNavigate()


    axios.get(`${serverUrl}/login/check`,{withCredentials:true})
  .then((res)=>{
    navigate('/')
  })
  .catch((err)=>{
    console.log(err);
  })

  const handleSubmit = () => {
    axios
      .post(`${serverUrl}/login/verify`, { otp }, { withCredentials: true })
      .then((res) => {
         navigate('/')
        setError('')
      })
      .catch((err)=>{
        setError("Invalid OTP");
      })
  }
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
        <h3>Enter Otp</h3>
        {error && <small style={{ color: 'red' }}>{error}</small>}

        <TextField
          //   disabled={verified}
          id='outlined-basic'
          label='OTP'
          variant='outlined'
          onChange={(e) => {
            setOtp(e.target.value);
          }}
        />

        <Button onClick={handleSubmit} variant='contained' disabled={!otp}>
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default Otp;
