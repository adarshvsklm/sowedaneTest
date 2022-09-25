import { Button } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { serverUrl } from '../../serverUrl';

let valid = {};
let form = {};

export const handleSubmit = (form) => {
  // console.log(form);
 
  // axios
  // .post(`${serverUrl}/signup`, form,{withCredentials: true})
  // .then((res) => {
  //   console.log(res);
  //   //redirect to login
  //   return(true);
  // })
  // .catch((err) => {
  //   console.log(err);
  //   return(false) 
  // });
 
};

export const handleValidation = (arg) => {
  //password validation
  form = { ...arg };

  valid.sixChar = form.password ? form.password.length >= 6 : false;
  valid.lowerChar = form.password ? /(.*[a-z].*)/.test(form.password) : false;
  valid.upperChar = form.password ? /(.*[A-Z].*)/.test(form.password) : false;
  valid.number = form.password ? /(.*[0-9].*)/.test(form.password) : false;
  valid.specialChar = form.password
    ? /(.*[^a-zA-Z0-9].*)/.test(form.password)
    : false;

  //email validation
  valid.email =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      form.email
    ) || false;

  return valid;
};
export const emailValid = () => {
  return valid.email;
};

export const EmailError = () => {
  if (!valid.email) {
    return <small style={{ color: 'red' }}>Enter a Valid Email</small>;
  } else {
    return null;
  }
};

export const PasswordValidation = () => {
  if (!valid.lowerChar) {
    return (
      <small style={{ color: 'red' }}>One lowercase letter required</small>
    );
  } else if (!valid.upperChar) {
    return (
      <small style={{ color: 'red' }}> One uppercase letter required</small>
    );
  } else if (!valid.specialChar) {
    return (
      <small style={{ color: 'red' }}> One Special character required</small>
    );
  } else if (!valid.number) {
    return <small style={{ color: 'red' }}> One Number required</small>;
  } else if (!valid.sixChar) {
    return (
      <small style={{ color: 'red' }}> Atleast six characters required</small>
    );
  }
};

export const SubmitButton = () => {
  const navigate = useNavigate();
  const submitForm=()=>{
    console.log(form);
    axios
    .post(`${serverUrl}/signup`, form,{withCredentials: true})
    .then((res) => {
      console.log(res);
      //redirect to login
       navigate('/login')
    })
    .catch((err) => {
      console.log(err);
      
    });
  }
  if (
    valid.lowerChar &&
    valid.upperChar &&
    valid.specialChar &&
    valid.number &&
    valid.sixChar &&
    form.password == form.cPassword &&
    form.name
  ) {
    return (
      <Button 
        variant='contained'
        onClick={submitForm}
      >
        Submit
      </Button>
    );
  } else {
    return (
      <Button variant='contained' disabled={true}>
        Submit
      </Button>
    );
  }
};
