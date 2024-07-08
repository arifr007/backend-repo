[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.2-blue.svg)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-10.12.2-orange.svg)](https://firebase.google.com/)

# eBuddy Coding Test - Backend Service 🚀

This repository contains the robust backend service designed for the eBuddy coding test. It provides a RESTful API for managing user data, leverages Firebase for authentication and data storage, and adheres to clean code principles.

## Table of Contents
- [eBuddy Coding Test - Backend Service 🚀](#ebuddy-coding-test---backend-service-)
  - [Table of Contents](#table-of-contents)
  - [Features ✨](#features-)
  - [Getting Started 🏁](#getting-started-)
    - [Prerequisites 🛠️](#prerequisites-️)
    - [Installation 💻](#installation-)
  - [Running Locally 🏠](#running-locally-)
  - [Deployment (Firebase Cloud Functions) 🚀](#deployment-firebase-cloud-functions-)
  - [API Documentation 📖](#api-documentation-)
    - [Error Handling ⚠️](#error-handling-️)
  - [Contributing 🤝](#contributing-)
  - [License 📄](#license-)
  - [Contact](#contact)

## Features ✨

- **RESTful API:** Well-defined endpoints for user management (CRUD operations).
- **Firebase Authentication:** Secure user registration, login, and token-based authorization.
- **Firebase Firestore:** Scalable NoSQL database for efficient user data storage.
- **Error Handling:** Centralized error management with informative responses.
- **TypeScript:**  Static typing for improved code reliability and maintainability.
- **Clean Code:** Well-structured codebase following industry best practices.

## Getting Started 🏁

### Prerequisites 🛠️

- Node.js v18+
- A Firebase project (get your credentials from the Firebase console)

### Installation 💻

- #### Clone the repository:

   ```bash
   git clone git@github.com:arifr007/backend-repo.git
   cd backend-repo
   ```

- #### Install dependencies:

   ```bash
   npm i --save
   ```

- #### Configuration:

  - Rename the `.env.example` file to `.env`.
  - Fill in your Firebase project credentials in the `.env` file.

## Running Locally 🏠
- #### Start Firebase emulators:
   ```bash
   npm run start
   ```

- #### Access the API:

  - The API will typically be running at http://localhost:5001/{your-project-id}/us-central1/api
  - Check the emulator output for the exact URL.

## Deployment (Firebase Cloud Functions) 🚀
```bash
npm run deploy
```

## API Documentation 📖
You can explore the API using the [Postman documentation](https://documenter.getpostman.com/view/6243598/2sA3e1DBDP).

| Method | Endpoint       | Description              | Authentication |
| ------ | -------------- | ------------------------ | -------------- |
| GET    | /api/users     | Retrieve a list of users | No             |
| GET    | /api/users/:id | Retrieve a user by ID    | No             |
| POST   | /api/users     | Create a new user        | Yes            |
| PUT    | /api/users/:id | Update user data         | Yes            |

**Note:** Authentication is required for certain endpoints and should be provided via a Bearer token in the request header (Authorization: Bearer `your_token`).

### Error Handling ⚠️
The API provides comprehensive error handling, returning clear error messages and appropriate HTTP status codes for various scenarios (e.g., validation errors, authentication failures, etc.).

## Contributing 🤝
Contributions are welcome! Please follow our contribution guidelines to get started.

## License 📄
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
Provide contact information for anyone who wants to reach out with questions or feedback.

- Author: Arif R
- Email: [r07.arif@gmail.com](mailto:r07.arif@gmail.com)