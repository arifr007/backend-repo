import { Request, Response, NextFunction } from 'express'
import { updateUser, getUsersOrCreateEmptyCollection, getUserById, createUser } from '../repository/userCollection'
import { ApiError } from '../entities/ApiError'

/**
 * Updates user data based on the provided user ID and request body.
 * @param req - Express request object containing user data and parameters.
 * @param res - Express response object for sending back the updated user data.
 * @param next - Next function for error handling.
 */
export const updateUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId
    if (!userId) {
      next(new ApiError('User ID Not Found', 404))
      return; // Ensure function execution stops after calling next()
    }

    const updateData = { ...req.body, id: userId }
    const updatedUser = await updateUser(updateData)

    res.status(200).json(updatedUser)
  } catch (error: any) {
    next(new ApiError(error.message, 500)); // Use 500 for server errors
  }
}

/**
 * Create user data based on the provided user ID and request body.
 * @param req - Express request object containing user data and parameters.
 * @param res - Express response object for sending back the updated user data.
 * @param next - Next function for error handling.
 */
export const createUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = { ...req.body }
    const updatedUser = await createUser(userData)

    res.status(200).json(updatedUser)
  } catch (error: any) {
    next(new ApiError(error.message, 500)); // Use 500 for server errors
  }
}

/**
 * Fetches all users from the database.
 * @param req - Express request object.
 * @param res - Express response object for sending back the users.
 * @param next - Next function for error handling.
 */
export const getUserData = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await getUsersOrCreateEmptyCollection()
    res.status(200).json(users)
  } catch (error: any) {
    next(new ApiError(error.message, 500)); // Use 500 for server errors
  }
}

/**
 * Fetches a single user by their ID.
 * @param req - Express request object containing the user ID in parameters.
 * @param res - Express response object for sending back the user data.
 * @param next - Next function for error handling.
 */
export const getUserDataById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId
    if (!userId) {
      next(new ApiError('User ID Not Found', 404))
      return; // Ensure function execution stops after calling next()
    }

    const user = await getUserById(userId)
    res.status(200).json(user)
  } catch (error: any) {
    next(new ApiError(error.message, 500)); // Use 500 for server errors
  }
};