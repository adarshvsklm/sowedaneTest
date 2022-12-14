import React from 'react';
import Home from '../Components/Home/Home';
import Sidebar from '../Components/Sidebar/Sidebar';
import Login from '../Components/Login/Login';
import { serverUrl } from '../serverUrl';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function HomePage() {
  const navigate = useNavigate();
  axios
    .get(`${serverUrl}/login/check`, { withCredentials: true })
    .catch((err) => {
      navigate('/login');
     });
  return (
    <div>
      <Sidebar>
        <Home />
      </Sidebar>
    </div>
  );
}

export default HomePage;
