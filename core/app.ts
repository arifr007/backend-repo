import express from 'express'
import cors from 'cors'
import userRoutes from '../routes/userRoutes'
import { handleErrorMiddleware } from '../middleware/errorMiddleware'
import * as functions from 'firebase-functions'

// Initialize the Express application
export const app = express()

// Middleware to parse JSON bodies
app.use(express.json())

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use(cors())

// Mount the user routes at the '/api' path
app.use('/api/users', userRoutes)

// Global error handling middleware
app.use(handleErrorMiddleware)

/**
 * Initializes and exports the Firebase HTTP Cloud Function.
 * 
 * This function is triggered by HTTP requests sent to the Firebase-provided URL.
 * It uses the Express application defined in './core/app' to handle these requests.
 */
exports.app = functions.https.onRequest(app);