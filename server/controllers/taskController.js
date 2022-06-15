//Imports required
import User from "../models/user.js";
import Task from "../models/task.js";

/**
 * @description Method to get task according to the user id and role
 * @param {Integer} req.limit indicates the number of items to search
 * @param {Integer} req.page indicates the current page to calculate offset (default should be 1)
 * @param {Task[]} res.tasks list of task for the user (if is administrator can get all tasks)
 */
export const getTasks = async (req, res) => {
    try {
        const { page, limit } = req.query
        let offset = (page - 1) * limit
        let user = await User.findOne({ where: { id: req.auth.user.id }, attributes: ['role'] })
        let whereClause = { userId: req.auth.user.id }
        if (user.role === 'administrator') {
            whereClause = {}
        }
        let tasks = await Task.findAndCountAll({ where: whereClause, include: [{ model: User, attributes: ['names', 'lastNames'] }], offset: offset, limit: Number(limit), subQuery: false, order: [
            ['completed', 'ASC']
        ] })
        return res.status(200).json({ tasks: tasks })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

/**
 * @description Method to delete a list of tasks
 * @param {Task[]} req.task list with task to be deleted
 * @param {String} res.message text that describes the result
 */
export const deleteTasks = async (req, res) => {
    try {
        const { tasks } = req.body
        if (tasks == null || tasks.length == 0) {
            return res.status(400).json({ message: "No tasks to delete" })
        }
        //Get ids
        const idsToDelete = tasks.map(task => {
            return task.id
        })
        await Task.destroy({ where: { id: idsToDelete } })
        return res.status(200).json({ message: "Tasks were deleted successfully" })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

/**
 * @description Method to create a list of tasks (thinking to multiple values for future versions)
 * @param {Task[]} req.tasks list with task to be created
 * @param {Task[]} res.tasks task upserted with their respective id
 */
 export const createTasks = async (req, res) => {
    try {
        const { tasks } = req.body
        if (tasks == null || tasks.length == 0) {
            return res.status(400).json({ message: "No tasks to create" })
        }

        const resultTasks = await Task.bulkCreate(tasks, {individualHooks: true })
        return res.status(200).json({ tasks: resultTasks })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

/**
 * @description Method to update a list of tasks
 * @param {Task[]} req.tasks list with task to be updated
 * @param {Task[]} res.tasks task upserted with their respective id
 */
export const updateTasks = async (req, res) => {
    try {
        const { tasks } = req.body
        if (tasks == null || tasks.length == 0) {
            return res.status(400).json({ message: "No tasks to update" })
        }
        for (const task of tasks) {
            await Task.update({...task},{where: {id: task.id}})
        }
        return res.status(200).json({ tasks: tasks })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}