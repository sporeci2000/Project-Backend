TaskMaster API   
The TaskMaster API is a secure RESTful backend built with Node.js, Express, MongoDB, and Mongoose to support a productivity tool for managing users, projects, and tasks. It implements JWT-based authentication with password hashing using bcrypt, enforcing strict ownership-based authorization so that users can only access and manage their own data. The API allows users to register and log in, create and manage projects, and add tasks within those projects, with full CRUD functionality at each level. The codebase follows a modular structure with separate folders for configuration, models, routes, and utilities, and environment variables are managed securely through dotenv. The project emphasizes clean code, security best practices, and the DRY principle, serving as a capstone project that demonstrates the integration of authentication, authorization, database modeling, and RESTful API design.   

Setup / Installation
Follow these steps to set up the TaskMaster backend locally:

1. Clone the repository
git clone <your-repo-url>
cd backend-project

2. Install dependencies
npm install

3. Create a .env file in the root directory with the following variables:
PORT=3000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secure-jwt-secret>

4. Start the server
npm run dev

The API provides the following endpoints: Users can register at /api/users/register and log in at /api/users/login, receiving a JWT token upon successful authentication. Authenticated users can manage their projects through /api/projects with full CRUD functionality and ownership checks, ensuring only the project owner can modify or delete a project. Tasks are nested under projects; users can create and view tasks at /api/projects/:projectId/tasks and update or delete them at /api/tasks/:taskId, with authorization enforced based on the parent project ownership.

This project follows a modular folder structure, with separate folders for models, controllers, routes, middleware, and configuration, adhering to best practices for maintainable and scalable backend development. TaskMaster demonstrates full-stack backend development skills, including user authentication, authorization, relational data modeling with Mongoose, and secure RESTful API design.

Technologies used include Node.js, Express, MongoDB, Mongoose, bcrypt for password hashing, and JSON Web Tokens for authentication and authorization.