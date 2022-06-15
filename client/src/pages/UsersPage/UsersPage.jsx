import React from 'react';
import useAuth from '../../context/AuthProvider';
import NavBar from '../../components/NavBar/NavBar.jsx';
import SideBar from '../../components/SideBar/SideBar.jsx';
import UsersCard from '../../components/UsersCard/UsersCard.jsx';
import useStartPage from '../../customHooks/useStartPage';

//View where admins can see al the users in the app
const UsersPage = () => {
  const { auth } = useAuth();
  useStartPage(true, true)

  //Load the page
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
