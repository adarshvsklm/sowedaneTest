import HomePage from './Pages/HomePage';
import {
  BrowserRouter,
   Route,
  Routes,
} from 'react-router-dom';
import SignUpPage from './Pages/SignUpPage';
import LoginPage from './Pages/LoginPage';
import Otp from './Components/Login/Otp';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/signup" element={<SignUpPage />}/>
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/login/otp" element={<Otp />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
