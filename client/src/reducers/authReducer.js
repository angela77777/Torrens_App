
//Auth initial state
export const authInitialState = {
    token: localStorage.getItem('token'),
    user: null,
    error: null,
    loading: false
}

/**
 * @description Reducer to control Authentication behaviour
 * @param {*} _ the state of the ath
 * @param {String} action type of dispatch
 * @returns state with changes
 */
const authReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case "AUTH-SUCESS":
            return {
                ...state,
                error: null,
                user: payload.user,
                token: payload.token
            }
        case "AUTH-ERROR":
            return {
                ...state,
                user: null,
                token: null,
                error: payload
            }
        case "LOADING-SESSION":
            return {
                ...state,
                error: payload.loading
            }
        case "SESSION-ERROR":
            return {
                authInitialState
            }
        case "ERROR-PRESENTED":
            return {
                ...state,
                error: null
            }
        case "LOGOUT":
            return {
                ...authInitialState,
                token: null
            }
        default:
            throw new Error('Not correct type to execute reducer')
    }
}

export default authReducer