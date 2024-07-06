import express from 'express'
import { fetchUserData, updateUserData } from '../controller/api'
import authMiddleware from '../middleware/authMiddleware'

const router = express.Router()

router.get('/:userId', authMiddleware, fetchUserData)
router.put('/:userId', authMiddleware, updateUserData)

export default router
