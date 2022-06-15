import { useContext } from 'react';
import { createContext, useReducer } from 'react'
import authReducer, { authInitialState } from '../reducers/authReducer';
import axios from 'axios'
import { useEffect } from 'react';

//Context
const AuthContext = createContext(authInitialState)

//Create provider
export function AuthProvider({ children }) {
    const [auth, dispatch] = useReducer(authReducer, authInitialState)

    //Confirm if is a session
    useEffect(() => {
        if (localStorage.getItem('token') != null) {
            checkSession(localStorage.getItem('token'))
        }
        dispatch({
            type: "LOADING-SESSION",
            payload: {loading: false}
        })
    }, [])

    /**
     * @description Check the current token with the server to allow or not the auto-login
     * @param {*} token record in local storage
     */
    const checkSession = async (token) => {
        await axios({
            method: 'get',
            url: 'http://localhost:3377/api/auth/',
            headers: {
                'x-auth-token': token,
            }
        }).then(res => {
            dispatch({
                type: "AUTH-SUCESS",
                payload: {token: token, user: res.data.user}
            })
        }).catch(_ => {
            dispatch({
                type: "SESSION-ERROR",
                payload: null
            })
        })
    }

    /**
     * @description Allos login in the page with email and password (confirm with the service and create a token)
     * @param {String} email user email
     * @param {String} password user password
     */
    const authUser = async (email, password) => {
        await axios({
            method: 'post',
            url: 'http://localhost:3377/api/auth/',
            data: { email: email, password: password }
        }).then(res => {
            localStorage.setItem("token", res.data.token)
            dispatch({
                type: "AUTH-SUCESS",
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: "AUTH-ERROR",
                payload: err.response.data
            })
        })
    }

    /**
     * @description Method to login the user 
     * @param {*} email 
     * @param {*} password 
     */
    const createUser = async (user) => {
        await axios({
            method: 'post',
            url: 'http://localhost:3377/api/users/',
            data: user
        }).then(res => {
            localStorage.setItem("token", res.data.token)
            dispatch({
                type: "AUTH-SUCESS",
                payload: res.data
            })
        }).catch(err => {
            dispatch({
                type: "AUTH-ERROR",
                payload: err.response.data
            })
        })
    }

    /**
     * @description allow cleans the error information
     */
    const cleanError = () => {
        dispatch({
            type: "ERROR-PRESENTED",
            payload: null
        })
    }

    /**
     * @description deletes the token and reset all auth data
     */
    const logOut = () => {
        localStorage.removeItem("token")
        dispatch({
            type: "LOGOUT",
            payload: null
        })
    }

    const context = {
        auth,
        authUser,
        createUser,
        logOut,
        cleanError
    }

    return (
        <AuthContext.Provider value={context}>
            {children}
        </AuthContext.Provider>
    );
}

//Allow use the context
const useAuth = () => {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("useAuth used Auth Context and this is undefined")
    }
    return context
}

export default useAuth