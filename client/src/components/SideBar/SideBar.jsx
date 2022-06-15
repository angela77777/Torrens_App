import { faHome, faUsers, faTasks } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './index.css';
import React from 'react';
import useAuth from '../../context/AuthProvider';

//The side bar view with information according to auth and role
const SideBar = () => {
  const { auth } = useAuth();
  return (
    <div className="main-container d-flex">
      <div className="menu-toggle">
        <div className="hamburger">
          <span></span>
        </div>
      </div>
      <aside className="sidebar">
        <ul className="list-unstyled px-2">
          <li>
            <Link
              to={'/user/home'}
              className="text-decoration-none px-3 py-2 d-block"
            >
              <span className="input-group-text clear-decorations h-100">
                <FontAwesomeIcon icon={faHome} className="sidebar-icon" />
                Inicio
              </span>
            </Link>
          </li>
          {auth.user?.role === 'administrator' ? (
            <li>
              <Link
                to={'/user/list'}
                className="text-decoration-none px-3 py-2 d-block"
              >
                <span className="input-group-text clear-decorations h-100">
                  <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                  Usuarios
                </span>
              </Link>
            </li>
          ) : null}
          <li>
            <Link
              to={'/user/tasks'}
              className="text-decoration-none px-3 py-2 d-block"
            >
              <span className="input-group-text clear-decorations h-100">
                <FontAwesomeIcon icon={faTasks} className="sidebar-icon" />
                Tareas
              </span>
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default SideBar;
