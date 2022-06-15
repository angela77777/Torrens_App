import React from 'react';
import useAuth from '../../context/AuthProvider';
import NavBar from '../../components/NavBar/NavBar.jsx';
import SideBar from '../../components/SideBar/SideBar.jsx';
import useStartPage from '../../customHooks/useStartPage';
import HomeComponent from '../../components/HomeComponent/HomeComponent.jsx';
import useTasks from '../../context/TasksProvider.jsx';

//Principal view when user is login
const HomePage = () => {
  const { auth } = useAuth()
  useStartPage(true, false)

  //Load the page
  if (auth.user && auth.token) {
    return (
      <div>
        <HomeComponent />
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

export default HomePage;
