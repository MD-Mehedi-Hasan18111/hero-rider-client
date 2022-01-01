import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import AuthProvider from './context/AuthProvider';
import RegisterRider from './components/RegisterRider/RegisterRider';
import RegisterLearner from './components/RegisterLearner/RegisterLearner';
import SignIn from './components/SignIn/SignIn';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import UserProfile from './components/UserProfile/UserProfile';
import Packages from './components/Packages/Packages';
import Payment from './components/Payment/Payment';
import NotFound from './Shared/NotFound/NotFound';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/registerRider" element={<RegisterRider />} />
          <Route path="/registerLearner" element={<RegisterLearner />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/userProfile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
          <Route path="/packages" element={<PrivateRoute><Packages /></PrivateRoute>} />
          <Route path="/payment/:id" element={<PrivateRoute><Payment /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
