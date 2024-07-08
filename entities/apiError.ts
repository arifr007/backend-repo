import { ErrorMessagesInterface } from "../common/errorMessages";

/**
 * Custom error class for API errors.
 * Extends the native JavaScript Error class to include a status code and a unique error code.
 */
export class ApiError extends Error {
  // Unique error code for identifying the type of error
  code: string;
  // HTTP status code appropriate for the error
  statusCode: number;

  /**
   * Constructs an ApiError instance.
   * 
   * @param error - The error message or an object implementing the ErrorMessagesInterface.
   * @param statusCode - The HTTP status code for the error, defaults to 500.
   */
  constructor(error: string | ErrorMessagesInterface, statusCode: number = 500) {
    // Determine the message based on the type of `error`
    const errorMessage = typeof error === 'string' ? error : error.message;
    super(errorMessage);

    // Assign `code` and `statusCode` based on the type of `error`
    if (typeof error === 'string') {
      this.code = 'ERROR'; // Default error code for string-based errors
      this.statusCode = statusCode; // Use the provided `statusCode` for string errors
    } else {
      this.code = error.code; // Use the error code from ErrorMessagesInterface
      this.statusCode = error.statusCode; // Use the `statusCode` from ErrorMessagesInterface
    }
  }
}