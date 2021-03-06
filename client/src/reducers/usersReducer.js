
//Auth initial state
export const usersInitialState = {
    rows: [],
    count: 0,
}

/**
 * Reducer to control Users behaviour
 * @param {*} state the state of the users instance
 * @param {*} action type of dispatch (this executed especific funtionality)
 * @returns state with changes
 */
const usersReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case "LOAD-USERS":
            return {
                rows: payload.rows,
                count: payload.count
            }
        case "ADD-USERS":
            return {
                ...state, rows: [...state.rows, ...payload.rows]
            }
        default:
            throw new Error('Not correct type to execute reducer')
    }
}

export default usersReducer