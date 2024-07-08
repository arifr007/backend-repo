import { Request, Response, NextFunction } from 'express'
import * as admin from 'firebase-admin'

/**
 * Middleware to authenticate requests using Firebase Auth.
 * 
 * Extracts the JWT token from the Authorization header, verifies it using Firebase Admin SDK,
 * and attaches the decoded token to the response locals for use in subsequent middleware or handlers.
 * 
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 */
export const authenticateRequest = async (req: Request, res: Response, next: NextFunction) => {
  // Extract the token from the Authorization header
  const authToken = req.headers.authorization?.replace('Bearer ', '')

  // If no token is provided, return a 401 Unauthorized response
  if (!authToken)  return res.status(401).send({ message: 'Unauthorized: No token provided.' })

  try {
    // Verify the token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(authToken)

    // Attach the decoded token to the response locals for use in subsequent middleware/handlers
    res.locals.user = decodedToken

    // Proceed to the next middleware
    next()
  } catch (error) {
    // If token verification fails, return a 401 Unauthorized response
    res.status(401).send({ message: 'Unauthorized: Invalid token.' })
  }
};