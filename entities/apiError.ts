class ApiError extends Error {
  constructor(public statusCode: number, public message: string) {
    super(message)
  }

  static badRequest(message: string) {
    return new ApiError(400, message)
  }
}

export default ApiError;