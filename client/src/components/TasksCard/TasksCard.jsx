import React, { useState } from 'react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import '../generalStyles/form.css';
import '../generalStyles/card.css';
import InputField from '../InputField/InputField.jsx';
import useTasks from '../../context/TasksProvider';
import useAuth from '../../context/AuthProvider';

// Principal component to present the Tasks CRUD
const TasksCard = () => {
  const { auth } = useAuth();
  const [editState, setEditState] = useState(false);
  const { tasks, updateTask, createTask, loadTasks, deleteTask, saveTasks } =
    useTasks();

  const handleCreateSubmit = (event) => {
    event.preventDefault();
    const { taskName, state } = event.target.elements;
    createTask({
      name: taskName.value,
      completed: state.value,
      userId: auth.user.id,
    });
    event.target.reset();
  };

  const handleSaveSubmit = () => {
    saveTasks();
    setEditState(false);
  };

  const onClickMore = () => {
    loadTasks(tasks.page + 1);
  };

  const listItems = tasks.rows?.map((task, index) => (
    <TaskRow
      editState={editState || !tasks.sync}
      task={task}
      updateTask={updateTask}
      deleteTask={deleteTask}
      key={index}
    />
  ));
  return (
    <div className="abs-center d-flex justify-content-center align-items-center">
      <div className="col-10 col-sm-8 col-md-9 col-lg-11">
        <div className="card">
          <div className="card-body">
            <h3 className="title">TAREAS</h3>
            <p>
              A continuación, se presentan en orden las tareas pendientes por
              realizar y las tareas completadas
            </p>
            <form
              className="form-container d-flex flex-row justify-content-between align-items-start flex-wrap w-100"
              onSubmit={handleCreateSubmit}
            >
              <div className="d-flex flex-row justify-content-between flex-wrap col-12 col-md-7 col-lg-9">
                <InputField
                  type="text"
                  placeholder="Nueva tarea"
                  ariaLabel="Nueva tarea"
                  name="taskName"
                  inputClass="col-12 col-md-7 col-lg-8"
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
                      <option value="true">Completada</option>
                    </select>
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="btn secondary-button col-12 col-md-4 col-lg-2"
              >
                Añadir
              </button>
            </form>
            <div className="col-6 col-md-4 col-lg-3">
              {!editState && tasks.sync ? (
                <button
                  type="submit"
                  className="btn submit-button mb-4"
                  onClick={() => {
                    setEditState(true);
                  }}
                >
                  Editar
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn submit-button mb-4"
                  onClick={handleSaveSubmit}
                >
                  Guardar
                </button>
              )}
            </div>

            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr className="primary-color">
                    <th>Estado</th>
                    <th>Tareas pendientes y completadas</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  {listItems}
                  {tasks.count > tasks.rows.length ? (
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
    </div>
  );
};

/**
 * @description the component row to present information dynamically
 * @param {Boolean} editState indicates if the view is in edit mode
 * @param {*} task the record to be shown
 * @param {Function} updateTask context function to allow edit the information
 * @param {Function} deleteTask context function to allow delete the information
 * @returns row with user information
 */
export const TaskRow = ({ editState, task, updateTask, deleteTask }) => {
  const [checkState, setCheckState] = useState(task.completed);

  const onHandleChange = (event) => {
    let temp = {
      id: task.id,
      userId: task.userId,
      completed: task.completed,
      name: task.name,
      ...task,
    };

    const name = event.target.name;
    let value = event.target.value;
    if (name === 'completed') {
      value = !checkState;
      setCheckState(!checkState);
    }
    temp[name] = value;
    updateTask(temp);
  };

  const onDelete = () => {
    deleteTask(task);
  };

  return (
    <tr>
      <td>
        <div className="form-check check-box d-flex">
          <input
            type="checkbox"
            name="completed"
            className="form-check-input"
            checked={checkState}
            id="flexCheckDisabled"
            disabled={!editState}
            onChange={onHandleChange}
          />
        </div>
      </td>
      <td className="text-task">
        <input
          disabled={!editState}
          name="name"
          type="text"
          className="form-control"
          value={task.name}
          aria-label="Tarea"
          onChange={onHandleChange}
        ></input>
      </td>
      <td>
        <div className="form-group d-flex justify-content-center">
          <button
            className="btn-delete-task clear-decorations"
            onClick={onDelete}
          >
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
  );
};

export default TasksCard;
