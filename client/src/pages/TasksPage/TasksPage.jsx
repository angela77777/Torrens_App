import React from 'react';
import useAuth from '../../context/AuthProvider';
import NavBar from '../../components/NavBar/NavBar.jsx';
import SideBar from '../../components/SideBar/SideBar.jsx';
import TasksCard from '../../components/TasksCard/TasksCard.jsx';
import useStartPage from '../../customHooks/useStartPage';

//CRUD page to create/update/delete and see all the tasks
const TasksPage = () => {
  const { auth } = useAuth();
  useStartPage(true, false)

  //Load the page
  if (auth.user && auth.token) {
    return (
      <div>
        <TasksCard />
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

export default TasksPage;
