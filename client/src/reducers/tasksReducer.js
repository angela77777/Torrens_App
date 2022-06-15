
//Auth initial state
export const tasksInitialState = {
    count: 0,
    rows: [],
    pending: [],
    completed: []
}

const tasksReducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
        case "LOAD-SUCESS":
            return {
                count: payload.count,
                rows: payload.rows,
                pending: payload.pending,
                completed: payload.completed
            }
        case "RESET":
            return {...tasksInitialState }
        default:
            throw new Error('Not correct type to execute reducer')
    }
}

export default tasksReducer