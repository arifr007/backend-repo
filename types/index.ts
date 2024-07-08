/**
 * Represents a user entity within the system.
 * 
 * @interface
 * @property {string} id - The unique identifier for the user.
 * @property {string} name - The name of the user.
 * @property {string} address - The address of the user.
 */
export interface User {
  id: string
  name: string
  email: string
  address: string
}