# User and Course Management System (Backend)

## Overview
This project is a comprehensive backend system designed to manage users and courses. It is built using Node.js and Express.js, providing a robust API for frontend applications. This system includes features for user management, course management, and role-based access control.

## Technologies Used
- **Node.js**: A JavaScript runtime for server-side development.
- **Express.js**: A web framework for Node.js, designed for building web applications and APIs.
- **MongoDB**: A NoSQL database for storing user and course data in a flexible, JSON-like format.
- **JWT (JSON Web Token)**: A compact, URL-safe means of representing claims to be transferred between two parties for user authentication.
- **Multer**: A middleware for handling multipart/form-data, which is primarily used for uploading files.
- **bcrypt.js**: A library to help hash passwords, providing a secure way to store user credentials.

## Features
- **CRUD Operations**: Perform create, read, update, and delete operations on users and courses.
- **Role-Based Access Control**: Manage user permissions with roles such as Admin, User, and Manager.
- **Image Upload Functionality**: Allow users to upload avatars or images related to their profiles.
- **Error Handling and Validation**: Implemented using Express middleware to ensure robust API responses.

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (latest version recommended)
- **MongoDB** (either locally or through a cloud service like MongoDB Atlas)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/abdallateef-sa/User-and-Course-Management-System.git
   cd User-and-Course-Management-System


2. Install the dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory of the project and add the following variables:
   ```env
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET_KEY=your_jwt_secret_key
   PORT=3000
   ```

   - Replace `your_mongodb_connection_string` with your actual MongoDB connection string.
   - Replace `your_jwt_secret_key` with a secure secret key for JWT authentication.

4. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000`.

## API Endpoints
Below are the main API endpoints available in this application:

### Courses
- **GET /api/courses**: Retrieve all courses.
- **POST /api/courses**: Create a new course.
- **GET /api/courses/:courseId**: Retrieve a specific course by ID.
- **PATCH /api/courses/:courseId**: Update a specific course by ID.
- **DELETE /api/courses/:courseId**: Delete a specific course by ID.

### Users
- **GET /api/users**: Retrieve all users.
- **POST /api/users/register**: Register a new user.
- **POST /api/users/login**: Log in an existing user.
- **GET /api/users/:userId**: Retrieve a specific user by ID.
- **PATCH /api/users/:userId**: Update a specific user by ID.
- **DELETE /api/users/:userId**: Delete a specific user by ID.

## Live Demo
You can view the live version of the project at the following link: [User and Course Management System](https://user-and-course-management-system.onrender.com)


## Usage
- Use Postman or any API client to interact with the API endpoints.
- For protected routes (like creating or updating courses), include a JWT token in the Authorization header formatted as follows:
  ```
  Authorization: Bearer your_jwt_token
  ```

## Contact
If you have any questions or feedback, feel free to reach out to me:
- **LinkedIn**: [linkedin.com/in/abdallateef-shohdy-351295279](https://linkedin.com/in/abdallateef-shohdy-351295279)
- **Email**: abdallateefshohdy0180@gmail.com
