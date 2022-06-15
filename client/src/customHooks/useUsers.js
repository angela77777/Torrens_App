import { useReducer } from 'react'
import useAuth from '../context/AuthProvider'
import axios from 'axios';
import usersReducer, { usersInitialState } from '../reducers/usersReducer';

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
                    console.log(res.data.users)
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