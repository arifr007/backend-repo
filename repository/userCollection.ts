import { ErrorMessages } from '../common/errorMessages'
import { firestoreDb } from '../config/firebaseConfig'
import { ApiError } from '../entities/ApiError'
import { User } from '../types'

// Reference to the USERS collection in Firestore
const usersCollectionRef = firestoreDb.collection('USERS')

// Structure for validation result
interface ValidationResult {
  isValid: boolean
  errors: string[]
}

/**
 * Validates an email address.
 * @param email The email address to validate.
 * @returns An array of error messages, if any.
 */
const validateEmail = (email: string): string[] => {
  // Basic email format check (not foolproof)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return ['Invalid email format']
  } else {
    return []
  }
}

/**
 * Validates the user name.
 * @param name - The user name to validate.
 * @returns An array of error messages, if any.
 */
const validateName = (name: string): string[] => {
  const errors: string[] = []

  if (!name) errors.push('Name is required.')
  else if (name.length < 3 || name.length > 50)
    errors.push('Name must be between 3 and 50 characters long.')

  return errors
}

/**
 * Validates the user address.
 * @param address - The user address to validate.
 * @returns An array of error messages, if any.
 */
const validateAddress = (address: string): string[] => {
  const errors: string[] = []
  if (!address) errors.push('Address is required.')

  return errors
}

/**
 * Validates the user data.
 * @param data - The user data to validate.
 * @returns A ValidationResult indicating if the data is valid and any errors.
 */
const validateUserData = (data: User): ValidationResult => {
  const nameErrors = validateName(data.name)
  const emailErrors = validateEmail(data.email)
  const addressErrors = validateAddress(data.address)

  const errors = [...nameErrors, ...emailErrors, ...addressErrors]

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Updates a user in the database.
 * @param data - The user data to update.
 * @returns The updated user data.
 * @throws ApiError if validation fails or the update operation fails.
 */
export const updateUser = async (data: User): Promise<User> => {
  const validationResult = validateUserData(data)
  if (!validationResult.isValid) {
    throw new ApiError(
      [
        ErrorMessages.invalidUserData.message,
        ...validationResult.errors
      ].join(', '),
      ErrorMessages.invalidUserData.statusCode
    )
  }

  try {
    const userDocRef = usersCollectionRef.doc(data.id)
    const userSnapshot = await userDocRef.get()
    if (!userSnapshot.exists) throw new ApiError(ErrorMessages.userNotFound)

    await userDocRef.set(data, { merge: true })
    const updatedUserSnapshot = await userDocRef.get()
    return updatedUserSnapshot.data() as User
  } catch (error) {
    throw new ApiError(ErrorMessages.failedToUpdateUser)
  }
}


/**
 * Updates a user in the database.
 * @param data - The user data to update.
 * @returns The updated user data.
 * @throws ApiError if validation fails or the update operation fails.
 */
export const createUser = async (data: User): Promise<User> => {
  const validationResult = validateUserData(data)
  if (!validationResult.isValid) {
    throw new ApiError(
      [ErrorMessages.invalidUserData.message, ...validationResult.errors].join(', '),
      ErrorMessages.invalidUserData.statusCode
    )
  }

  try {
    // Create a new document with an auto-generated ID
    const userDocRef = await usersCollectionRef.add(data)
    const userSnapshot = await userDocRef.get()

    // Return the created user data with the ID assigned by Firestore
    return {
      id: userDocRef.id,  // Get the auto-generated ID from the reference
      ...userSnapshot.data()
    } as User

  } catch (error: any) {
    throw new ApiError(error?.message ?? ErrorMessages.failedToCreateUser, 500)
  }
}

/**
 * Fetches all users from the database.
 * @returns An array of user data.
 * @throws ApiError if the fetch operation fails.
 */
export const getUsersOrCreateEmptyCollection = async (): Promise<User[]> => {
  // Reference to the USERS collection
  const usersCollectionRef = firestoreDb.collection('USERS');

  // Try to get documents from the USERS collection
  const usersSnapshot = await usersCollectionRef.get();

  try {
    if (usersSnapshot.empty) {
      await usersCollectionRef.doc().set({ placeholder: true })
      return []
    }
    const users: User[] = []
    usersSnapshot.forEach((doc) => {
      const userData = doc.data() as User
      users.push({
        id: doc.id,
        name: userData.name,
        email: userData.email,
        address: userData.address,
      })
    })

    return users
  } catch (error) {
    throw new ApiError(ErrorMessages.failedToFetchUsers)
  }
}

/**
 * Fetches a user by ID from the database.
 * @param userId - The ID of the user to fetch.
 * @returns The fetched user data or null if not found.
 * @throws ApiError if the fetch operation fails.
 */
export const getUserById = async (userId: string): Promise<User | null> => {
  try {
    const userDocRef = usersCollectionRef.doc(userId)
    const userSnapshot = await userDocRef.get()
    if (!userSnapshot.exists) throw new ApiError('No users found')

    return { id: userSnapshot.id, ...userSnapshot.data() } as User
  } catch (error) {
    throw new ApiError(ErrorMessages.failedToFetchUser)
  }
}
