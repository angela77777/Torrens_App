import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import NavBar from '../../components/NavBar/NavBar.jsx';
import useAuth from '../../context/AuthProvider';
import { ToastContainer } from 'react-toastify';
import useStartPage from '../../customHooks/useStartPage';

//Page to authenticate an user
const LoginPage = () => {
  const { auth } = useAuth();
  useStartPage(false, false)

  //Load the page
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
