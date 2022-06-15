import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthProvider';
import NavBar from '../../components/NavBar/NavBar.jsx';
import SideBar from '../../components/SideBar/SideBar.jsx';
import UsersCard from '../../components/UsersCard/UsersCard.jsx';

const UsersPage = () => {
  const { auth } = useAuth();
  let navigate = useNavigate();

  useEffect(() => {
    if (!auth.token) {
      navigate('/');
    } else if (auth.user?.role !== 'administrator') {
      navigate('/user/home');
    }
  }, [auth]);

  if (auth.user && auth.token && auth.user?.role === 'administrator') {
    return (
      <div>
        <UsersCard />
        <SideBar />
        <NavBar />
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

export default UsersPage;
