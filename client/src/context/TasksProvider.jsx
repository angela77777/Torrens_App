import { useContext } from 'react';
import { createContext, useReducer } from 'react';
import tasksReducer, { tasksInitialState } from '../reducers/tasksReducer';
import axios from 'axios';

//Context
const TasksContext = createContext(tasksInitialState);

//Create provider
export function TasksProvider({ children }) {
  const [tasks, dispatch] = useReducer(tasksReducer, tasksInitialState);

  const loadTasks = async (token) => {
    await axios({
      method: 'get',
      url: 'http://localhost:3377/api/tasks/',
      headers: {
        'x-auth-token': token,
      },
      params: {
        page: 1,
        limit: 10,
      },
    })
      .then((res) => {
        const tasks = res.data.tasks;

        const pending = tasks.rows.filter((task) => !task.completed);
        const completed = tasks.rows.filter((task) => !task.completed);

        dispatch({
          type: 'LOAD-SUCESS',
          payload: {
            count: tasks.count,
            rows: tasks.rows,
            pending: pending,
            completed: completed,
          },
        });
        console.log(tasks);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clearTasks = () => {
    dispatch({
      type: 'RESET',
      payload: null
    });
  };

  const context = {
    tasks,
    loadTasks,
    clearTasks,
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
