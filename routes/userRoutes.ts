import {
    createUserData,
    getUserData,
    getUserDataById,
    updateUserData,
} from '../controller/api'
import { Router } from 'express'
import { authenticateRequest } from '../middleware/authMiddleware'

// Create a new router instance
const userRouter = Router()

// Route to fetch all users' data
userRouter.get('/', getUserData)

// Route to update user data. Requires authentication.
userRouter.put('/:userId', authenticateRequest, updateUserData)

// Route to update user data. Requires authentication.
userRouter.post('/', authenticateRequest, createUserData)

// Route to fetch a single user's data by their ID
userRouter.get('/:userId', getUserDataById)


// Export the configured router
export default userRouter;