import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../context/AuthProvider';
import NavBar from '../../components/NavBar/NavBar.jsx';
import SideBar from '../../components/SideBar/SideBar.jsx';
import useTasks from '../../context/TasksProvider.jsx';

const HomePage = () => {
  const { auth } = useAuth()
  const { tasks, loadTasks } = useTasks()
  let navigate = useNavigate()

  useEffect(() => {
    if (!auth.token) {
      navigate('/');
    } else if(tasks.rows.length == 0){
      loadTasks(auth.token)
    }
  }, [auth]);

  if (auth.user && auth.token) {
    return (
      <div>
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
