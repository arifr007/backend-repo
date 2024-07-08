interface ErrorMessagesInterface {
  code: string
  message: string
  statusCode: number
}

class ErrorMessages {
  public static readonly invalidUserData: ErrorMessagesInterface = {
    code: 'ERRUSR001',
    message: "Invalid user data",
    statusCode: 400,
  }
  public static readonly userNotFound: ErrorMessagesInterface = {
    code: 'ERRUSR002',
    message: "User not found",
    statusCode: 404,
  }
  public static readonly failedToUpdateUser: ErrorMessagesInterface = {
    code: "ERRUSR003",
    message: "Failed to update user",
    statusCode: 500,
  }
  public static readonly failedToCreateUser: ErrorMessagesInterface = {
    code: "ERRUSR003",
    message: "Failed to create user",
    statusCode: 500,
  }
  public static readonly failedToFetchUser: ErrorMessagesInterface = {
    code: "ERRUSR004",
    message: "Failed to fetch user",
    statusCode: 500,
  }
  public static readonly failedToFetchUsers: ErrorMessagesInterface = {
    code: "ERRUSR005",
    message: "Failed to fetch users",
    statusCode: 500,
  }
}
export { ErrorMessages, ErrorMessagesInterface }