import { useContext } from 'react';
import { createContext, useReducer } from 'react';
import tasksReducer, { tasksInitialState } from '../reducers/tasksReducer';
import axios from 'axios';
import useAuth from './AuthProvider';

//Context
const TasksContext = createContext(tasksInitialState);

//Create provider
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, tasksInitialState);
  const { auth } = useAuth()

  /**
   * @description Method to load tasks according to page (this allow get info by offset)
   * @param {*} page the current count of calls to the load route
   */
  const loadTasks = async (page) => {
    await axios({
      method: 'get',
      url: 'http://localhost:3377/api/tasks/',
      headers: {
        'x-auth-token': auth.token,
      },
      params: {
        page: page,
        limit: 10,
      },
    })
      .then((res) => {
        const tasks = res.data.tasks;
        const pending = tasks.rows.filter((task) => !task.completed);
        if (page == 1) {
          //If is the first time load full info
          dispatch({
            type: 'LOAD-SUCESS',
            payload: {
              count: tasks.count,
              rows: tasks.rows,
              pending: pending,
            },
          });
        } else {
          //Second > time, only add the info
          dispatch({
            type: 'ADD-TASKS',
            payload: { rows: res.data.tasks.rows},
          });
          dispatch({
            type: 'UPDATE-PAGE',
            payload: { page: page },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * @description Method that allows to create ONE task according to name and state
   * @param {*} task the task to create
   */
  const createTask = async (task) => {
    await axios({
      method: 'post',
      url: 'http://localhost:3377/api/tasks/',
      headers: {
        'x-auth-token': auth.token,
      },
      data: { tasks: [task] },
    })
      .then((res) => {
        dispatch({
          type: 'ADD-TASKS',
          payload: { rows: res.data.tasks },
        });
        if (task.completed == "false") {
          dispatch({
            type: 'ADD-PENDINGS',
            payload: { pending: res.data.tasks },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /**
   * @description Method that allows delete an existing tasks
   * @param {*} task record to delete
   */
  const deleteTask = async (task) => {
    await axios({
      method: 'delete',
      url: 'http://localhost:3377/api/tasks/',
      headers: {
        'x-auth-token': auth.token,
      },
      data: { tasks: [task] },
    })
      .then((res) => {
        dispatch({
          type: 'DELETE-TASK',
          payload: {task}
        })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * @description save all to send all the changed data to the server
   */
  const saveTasks = async () => {
    await axios({
      method: 'put',
      url: 'http://localhost:3377/api/tasks/',
      headers: {
        'x-auth-token': auth.token,
      },
      data: { tasks: tasks.rows },
    })
      .then((res) => {
        dispatch({
          type: 'SYNC-SUCCESS',
          payload: null,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * @description Method to reset the context information
   */
  const clearTasks = () => {
    dispatch({
      type: 'RESET',
      payload: null,
    });
  };

  /**
   * @description Allow edit row information in the context
   * @param {*} task 
   */
  const updateTask = (task) => {
    dispatch({
      type: 'UPDATE-ROW',
      payload: { task: task },
    });
  };

  const context = {
    tasks,
    loadTasks,
    clearTasks,
    updateTask,
    createTask,
    deleteTask,
    saveTasks
  };

  return (
    <TasksContext.Provider value={context}>{children}</TasksContext.Provider>
  );
}

//Allow use the context
const useTasks = () => {
  const context = useContext(TasksContext);

  if (context === undefined) {
    throw new Error('useTasks used Tasks Context and this is undefined');
  }
  return context;
};

export default useTasks;
