import React from 'react';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './UsersCard.css';

const UsersCard = () => {
  return (
    <div class="abs-center d-flex justify-content-center align-items-center">
      <div className="col-10 col-sm-8 col-md-9 col-lg-11">
        <div className="card">
          <div className="card-body">
            <h3 className="title">USUARIOS</h3>
            <p>
              A continuación, se presenta la imformación de los usuarios de la
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
                  <tr>
                    <td>Margarita Marcela Fernández Guerrero</td>
                    <td>3116003006</td>
                    <td>angelammejia1998@gmail.com</td>
                    <td>
                      <span className="input-group-text clear-decorations h-100">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="state-connected"
                        />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Alejandro Sebastián Gutiérrez Rodríguez</td>
                    <td>3116003006</td>
                    <td>angelammejia1998@gmail.com</td>
                    <td>
                      <span className="input-group-text clear-decorations h-100">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="state-disconnected"
                        />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ángela María Marín Mejía</td>
                    <td>3116003006</td>
                    <td>angelammejia1998@gmail.com</td>
                    <td>
                      <span className="input-group-text clear-decorations h-100">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="state-connected"
                        />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ángela María Marín Mejía</td>
                    <td>3116003006</td>
                    <td>angelammejia1998@gmail.com</td>
                    <td>
                      <span className="input-group-text clear-decorations h-100">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="state-connected"
                        />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ángela María Marín Mejía</td>
                    <td>3116003006</td>
                    <td>angelammejia1998@gmail.com</td>
                    <td>
                      <span className="input-group-text clear-decorations h-100">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="state-connected"
                        />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ángela María Marín Mejía</td>
                    <td>3116003006</td>
                    <td>angelammejia1998@gmail.com</td>
                    <td>
                      <span className="input-group-text clear-decorations h-100">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="state-connected"
                        />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ángela María Marín Mejía</td>
                    <td>3116003006</td>
                    <td>angelammejia1998@gmail.com</td>
                    <td>
                      <span className="input-group-text clear-decorations h-100">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="state-connected"
                        />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ángela María Marín Mejía</td>
                    <td>3116003006</td>
                    <td>angelammejia1998@gmail.com</td>
                    <td>
                      <span className="input-group-text clear-decorations h-100">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="state-connected"
                        />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ángela María Marín Mejía</td>
                    <td>3116003006</td>
                    <td>angelammejia1998@gmail.com</td>
                    <td>
                      <span className="input-group-text clear-decorations h-100">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="state-connected"
                        />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>Ángela María Marín Mejía</td>
                    <td>3116003006</td>
                    <td>angelammejia1998@gmail.com</td>
                    <td>
                      <span className="input-group-text clear-decorations h-100">
                        <FontAwesomeIcon
                          icon={faCircle}
                          className="state-connected"
                        />
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="4">
                      <button className="btn secondary-button">Ver más</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersCard;
