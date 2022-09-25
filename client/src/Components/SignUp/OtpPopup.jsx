import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { setOtp } from '../../Redux/Authentication/auth';

import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import axios from 'axios';
import { serverUrl } from '../../serverUrl';
import { useState } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function OtpPopup({isVerified}) {
  const dispatch = useDispatch();
  const { otp, open } = useSelector((state) => state.otp);
  const [otpValue, setOtpValue] = useState();
  const [error, setError] = useState();

  const handleVerify = () => {
    axios
      .post(`${serverUrl}/otp/verify`, { otp: otpValue },{withCredentials:true})

      .then( (res) => {
        console.log(res);
         setError('');
          dispatch(setOtp({ open: false ,verified:true}));
        isVerified(res.data.otpKey)
      })
      .catch((err) => {
        setError('Incorrect OTP');
      });
    // setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle>{'Verify Email'}</DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            <small style={{ margin: '10px' }}>
              {' '}
              Enter the otp that has sent to your email
            </small>
            <TextField
              type='Number'
              id='outlined-basic'
              label='OTP'
              variant='outlined'
              onChange={(e) => {
                setOtpValue(e.target.value);
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
        <Button  onClick={()=>{dispatch(setOtp({ open: false }));}}>
            Close
          </Button>
          <Button disabled={!otpValue} onClick={handleVerify}>
            Verify
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
