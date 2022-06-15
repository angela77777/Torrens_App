import { useReducer } from 'react'
import useAuth from '../context/AuthProvider'
import axios from 'axios';
import usersReducer, { usersInitialState } from '../reducers/usersReducer';

/**
 * @description Custom hook to get the users from the server when the user is admin
 * @returns the users loaded from server
 */
const useUsers = () => {
    const { auth } = useAuth()
    const [users, dispatch] = useReducer(usersReducer, usersInitialState)

    const loadUsers = (page) => {
        axios({
            method: 'get',
            url: 'http://localhost:3377/api/users/',
            headers: {
                'x-auth-token': auth.token,
            },
            params: {
                page: page,
                limit: 10,
            },
        })
            .then((res) => {
                if (page == 1) {
                    dispatch({
                        type: 'LOAD-USERS',
                        payload: res.data.users
                    });
                } else {
                    dispatch({
                        type: 'ADD-USERS',
                        payload: res.data.users
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    return { users, loadUsers }
}

export default useUsers