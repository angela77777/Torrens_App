import React, {useEffect, useState} from 'react';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UsersCard.css';
import useUsers from '../../customHooks/useUsers';

const UsersCard = () => {
  const { users, loadUsers } = useUsers();
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadUsers(1);
  }, []);

  const onClickMore = () => {
    loadUsers(page + 1);
    setPage(page + 1);
  };

  const listItems = users.rows?.map((user) => <UserRow user={user}></UserRow>);
  return (
    <div class="abs-center d-flex justify-content-center align-items-center">
      {users.rows ? (
        <div className="col-10 col-sm-8 col-md-9 col-lg-11">
          <div className="card">
            <div className="card-body">
              <h3 className="title">USUARIOS</h3>
              <p>
                A continuación, se presenta la información de los usuarios de la
                empresa Torrens University Australia
              </p>
              <div className="table-wrapper">
                <table class="table">
                  <thead>
                    <tr className="table-titles">
                      <th>Nombre completo</th>
                      <th>Teléfono</th>
                      <th>Correo electrónico</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listItems}
                    {users.count > users.rows.length ? (
                      <tr>
                        <td colSpan="4">
                          <button
                            className="btn secondary-button"
                            onClick={onClickMore}
                          >
                            Ver más
                          </button>
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-grow" role="status" />
        </div>
      )}
    </div>
  );
};

export const UserRow = ({ user }) => {
  return (
    <tr>
      <td>{`${user.names} ${user.lastNames}`}</td>
      <td>{user.phone}</td>
      <td>{user.email}</td>
      <td>
        <span className="input-group-text clear-decorations h-100">
          <FontAwesomeIcon
            icon={faCircle}
            className={user.state ? 'state-connected' : 'state-disconnected'}
          />
        </span>
      </td>
    </tr>
  );
};

export default UsersCard;
