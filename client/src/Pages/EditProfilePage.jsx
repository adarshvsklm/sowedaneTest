import axios from 'axios';
import React from 'react';
import EditProfile from '../Components/EditProfile/EditProfile';
import Sidebar from '../Components/Sidebar/Sidebar';
import { serverUrl } from '../serverUrl';
import { useNavigate } from 'react-router-dom';

function EditProfilePage() {
  const navigate = useNavigate();
  axios
    .get(`${serverUrl}/login/check`, { withCredentials: true })
    .catch((err) => {
      navigate('/login');
    });
  return (
    <div>
      <Sidebar>
        <EditProfile />
      </Sidebar>
    </div>
  );
}

export default EditProfilePage;
