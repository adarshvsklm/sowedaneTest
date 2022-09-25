import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { serverUrl } from '../../serverUrl';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router';
// import {  useDispatch,useSelector } from 'react-redux';
// import { setUserDetails } from '../../Redux/UserSlice/UserSlice';


export default function EditProfile() {

    // const dispatch = useDispatch()
    const  [name,setName]=useState()
    const [email,setEmail] = useState()
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(`${serverUrl}/profile`,{withCredentials: true})
    .then((res)=>{
        console.log(res);
        setName(res.data.name)
        setEmail(res.data.email)
      }) 
    },[])


    const handlSubmit=()=>{
        axios.patch(`${serverUrl}/profile/update`,{name},{withCredentials: true})
        .then((res)=>{
            navigate('/')
        })
        .catch((err)=>{
            console.log(err);
        })
    }


  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
        display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
      }}
      noValidate
      autoComplete="off"
    ><h3>Edit Profile</h3>
      <TextField id="outlined-basic" label="Name" value={name} focused={true} variant="outlined" onChange={(e)=>{setName(e.target.value)}} />
      <TextField id="outlined-basic" disabled={true} label="Email" value={email}   variant="outlined"  />
       <Button variant='contained' onClick={handlSubmit}>Update</Button>
    </Box>
  );
}
