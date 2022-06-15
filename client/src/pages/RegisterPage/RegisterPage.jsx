import React, { useEffect } from 'react';
import NavBar from '../../components/NavBar/NavBar.jsx';
import RegisterForm from '../../components/RegisterForm/RegisterForm.jsx';
import useAuth from '../../context/AuthProvider';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const { auth } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (auth.user && auth.token) {
      navigate('/user/home');
    }
  }, [auth]);

  if (!auth.user && !auth.token) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ToastContainer />
        <NavBar />
        <RegisterForm />
      </div>
    );
  } else {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-grow" role="status" />
      </div>
    );
  }
};

export default RegisterPage;
