
//Auth initial state
export const tasksInitialState = {
    count: 0,
    rows: [],
    sync: true,
    pending: [],
    page: 1
}

/**
 * Reducer to control Tasks behaviour
 * @param {*} state the state of the tasks instance
 * @param {*} action type of dispatch (this executed especific funtionality)
 * @returns state with changes
 */
const tasksReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case "LOAD-SUCESS":
            return {
                ...state,
                count: payload.count,
                rows: payload.rows,
                pending: payload.pending
            }
        case "RESET":
            return { ...tasksInitialState }
        case "ADD-TASKS":
            return { ...state, rows: [...payload.rows, ...state.rows] }
        case "ADD-PENDINGS":
            return { ...state, pending: [...state.pending, ...payload.pending]}
        case "UPDATE-ROW":
            return {
                ...state, rows: state.rows.map((task) => task.id === payload.task.id ? payload.task : task), sync: false
            }
        case "UPDATE-PAGE":
            return {
                ...state, page: payload.page
            }
        case "DELETE-TASK":
            return {
                ...state, rows: state.rows.filter((task) => task.id !== payload.task.id), pending: state.pending.filter((task) => task.id !== payload.task.id), count: state.count - 1
            }
        case "SYNC-SUCCESS":
            return {
                ...state, sync: true
            }
        default:
            throw new Error('Not correct type to execute reducer')
    }
}

export default tasksReducer