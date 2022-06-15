import { useContext } from 'react';
import { createContext, useReducer } from 'react';
import tasksReducer, { tasksInitialState } from '../reducers/tasksReducer';
import axios from 'axios';

//Context
const TasksContext = createContext(tasksInitialState);

//Create provider
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, tasksInitialState);

  const loadTasks = async (page, token) => {
    await axios({
      method: 'get',
      url: 'http://localhost:3377/api/tasks/',
      headers: {
        'x-auth-token': token,
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
          dispatch({
            type: 'LOAD-SUCESS',
            payload: {
              count: tasks.count,
              rows: tasks.rows,
              pending: pending,
            },
          });
        } else {
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

  const createTask = async (token, task) => {
    await axios({
      method: 'post',
      url: 'http://localhost:3377/api/tasks/',
      headers: {
        'x-auth-token': token,
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

  const deleteTask = async (token, task) => {
    await axios({
      method: 'delete',
      url: 'http://localhost:3377/api/tasks/',
      headers: {
        'x-auth-token': token,
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

  const saveTasks = async (token) => {
    await axios({
      method: 'put',
      url: 'http://localhost:3377/api/tasks/',
      headers: {
        'x-auth-token': token,
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

  const clearTasks = () => {
    dispatch({
      type: 'RESET',
      payload: null,
    });
  };

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
