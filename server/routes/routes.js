//Imports required
import express from 'express'
import { authUser, checkConnection } from '../controllers/authController.js'
import { deleteTasks, getTasks, upsertTasks } from '../controllers/taskController.js'
import { getUsers, postUser } from '../controllers/userController.js'
import { validateAuthInfo, validateUser, validate, validateTasks } from './validators.js'

//Router to handle paths
const router = express.Router()

//Authentication paths
router.get('/auth', checkConnection)
router.post('/auth', /*validateAuthInfo(), validate,*/ authUser)

//User paths
router.get('/users', getUsers)
router.post('/users', validateUser(), validate, postUser)

//Task CRUD paths
router.get('/tasks', getTasks)
router.delete('/tasks', validateTasks(), validate, deleteTasks)
router.post('/tasks', validateTasks(), validate, upsertTasks)

export default router