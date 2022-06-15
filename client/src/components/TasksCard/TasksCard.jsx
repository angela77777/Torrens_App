import React from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './TasksCard.css';
import InputField from '../InputField/InputField.jsx';
import { useState } from 'react';

const TasksCard = () => {
  const [editState, setEditState] = useState(false)

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
            <form className="form-container">
              <div className="d-flex flex-row justify-content-between flex-wrap w-100">
                <InputField
                  type="text"
                  placeholder="Nueva tarea"
                  ariaLabel="correo"
                  name="taskName"
                  inputClass="col-12 col-md-5 col-lg-6"
                  required={true}
                />
                <div className="form-group col-12 col-md-2 col-lg-3">
                  <div className="input-group textfield-group mb-4">
                    <select
                      className="form-select clear-outline shadow-none"
                      aria-label="Selecciona el rol"
                      name="state"
                      required
                    >
                      <option value="false">Pendiente</option>
                      <option value="true">Administrador</option>
                    </select>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn secondary-button col-12 col-md-4 col-lg-2"
                >
                  Añadir
                </button>
              </div>
            </form>
            <div className='col-6 col-md-4 col-lg-3'>
            <button type="submit" className="btn submit-button">
              Editar
            </button>
            </div>
            <button type="submit" hidden className="btn submit-button">
              Guardar
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
                      <input
                        disabled
                        type="text"
                        class="form-control"
                        placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                        aria-label="Tarea"
                      ></input>
                    </td>
                    <td>
                      <div className="form-group d-flex justify-content-center">
                        <button className="btn-delete-task clear-decorations">
                          <span className="input-group-text clear-decorations h-100">
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="primary-color delete"
                            />
                          </span>
                        </button>
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
