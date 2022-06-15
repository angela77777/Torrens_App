import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/AuthProvider";
import useTasks from "../context/TasksProvider";

/**
 * @description Custom hook that allows confirm the correct path according to the user and authentication
 * @param {*} isLogged indicates where type of page call the hook
 * @param {*} adminOnly indicates if the page is only for admin member
 */
const useStartPage = (isLogged, adminOnly) => {
    const { auth } = useAuth()
    const { tasks, loadTasks } = useTasks()
    let navigate = useNavigate()

    //Redirect according to the auth information
    useEffect(() => {
        if (isLogged) {
            if (!auth.token) {
                navigate('/');
            } else if (adminOnly && auth.user?.role !== 'administrator') { 
                navigate('/user/home');
            } else if (tasks.rows.length == 0) {
                loadTasks(1, auth.token)
            }
        } else {
            if (auth.user && auth.token) {
                navigate("/user/home")
            }
        }
    }, [auth]);
}

export default useStartPage