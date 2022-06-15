import React from 'react';
import {
  faBell,
  faArrowAltCircleRight,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import useAuth from '../../context/AuthProvider.jsx';
import useTasks from '../../context/TasksProvider.jsx';

const NavBar = () => {
  const { auth, logOut } = useAuth();
  const { tasks, clearTasks } = useTasks();

  const handleClick = () => {
    clearTasks();
    logOut();
  };

  return (
    <nav className="navbar bg-light position-fixed top-0">
      <div className="d-flex justify-content-between align-items-center vw-100 px-4">
        <img src="../../logo.svg" alt="logo"></img>
        {auth.user ? (
          <div className="form-group d-flex justify-content">
            <div className="btn-group">
              <button className="btn-notification clear-decorations">
                <span className="input-group-text clear-decorations h-100">
                  <FontAwesomeIcon
                    icon={faBell}
                    className="primary-color bell"
                  />
                </span>
                {tasks.rows.length > 0 ? (
                  <span className="bell-badge">{tasks.pending.length}</span>
                ) : null}
              </button>
              <button
                type="button"
                className="btn btn-link dropdown-toggle"
                id="dropdownMenu2"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {auth.user.names}
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <button
                    className="dropdown-item"
                    type="button"
                    onClick={handleClick}
                  >
                    <span className="input-group-text clear-decorations h-100">
                      <FontAwesomeIcon
                        icon={faArrowAltCircleRight}
                        className="primary-color logout"
                      />
                      Cerrar sesión
                    </span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default NavBar;
