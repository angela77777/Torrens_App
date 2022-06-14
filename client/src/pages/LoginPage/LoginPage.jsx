import React, { useEffect } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import NavBar from '../../components/NavBar/NavBar.jsx';
import useAuth from '../../context/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { useNavigate  } from 'react-router-dom';

const LoginPage = () => {
  const { auth } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (auth.user && auth.token) {
      navigate("/user/home")
    }
  }, [auth])

  if (!auth.user && !auth.token) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ToastContainer />
        <NavBar />
        <LoginForm />
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-grow" role="status"/>
      </div>
    );
  }
};

export default LoginPage;
