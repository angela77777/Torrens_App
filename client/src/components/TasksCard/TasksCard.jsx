import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TasksCard.css';

const TasksCard = () => {
  return (
    <div class="abs-center d-flex justify-content-center align-items-center">
      <div className="col-10 col-sm-8 col-md-9 col-lg-11">
        <div className="card">
          <div className="card-body">
            <h3 className="title">TAREAS</h3>
            <p>
              A continuación, se presentan en orden las tareas pendientes por
              realizar y las tareas completadas
            </p>
            <button type="submit" className="btn secondary-button">
              Añadir
            </button>
            <button type="submit" className="btn submit-button">
              Editar
            </button>
            <div className="table-wrapper">
              <table class="table">
                <thead>
                  <tr className="primary-color">
                    <th>Estado</th>
                    <th>Tareas pendientes y completadas</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div class="form-check check-box d-flex">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          value=""
                          id="flexCheckDisabled"
                          disabled
                        />
                      </div>
                    </td>
                    <td className="text-task">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </td>
                    <td>
                      <div className="form-group delete-container d-flex">
                        <div className="btn-group">
                          <button className="btn-delete-task clear-decorations">
                            <span className="input-group-text clear-decorations h-100">
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="primary-color delete"
                              />
                            </span>
                          </button>
                        </div>
                      </div>
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

export default TasksCard;
