import * as admin from "firebase-admin"
import * as dotenv from "dotenv"
// Load environment variables from .env file
dotenv.config()

// Extract Firebase configuration from environment variables
const firebaseProjectId = process.env.FBASE_PROJECT_ID
const firebasePrivateKey = process.env.FBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'); // Ensure new lines are correctly formatted
const firebaseClientEmail = process.env.FBASE_CLIENT_EMAIL
// Validate that all required Firebase configuration variables are present
if (!firebaseProjectId || !firebasePrivateKey || !firebaseClientEmail)
  throw new Error("Missing Firebase configuration variables")

// Initialize Firebase Admin SDK with credentials and database URL
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: firebaseProjectId,
    clientEmail: firebaseClientEmail,
    privateKey: firebasePrivateKey,
  }),
  databaseURL: `https://${firebaseProjectId}.firebaseio.com`,
})

// Export Firestore database instance for use in application
export const firestoreDb = admin.firestore();