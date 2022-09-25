import HomePage from './Pages/HomePage';
import {
  BrowserRouter,
   Route,
  Routes,
} from 'react-router-dom';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import Otp from './Components/Login/Otp';
import EditProfilePage from './Pages/EditProfilePage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/signup" element={<SignUpPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/login/otp" element={<Otp />}/>
          <Route path="/profile/edit" element={<EditProfilePage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
