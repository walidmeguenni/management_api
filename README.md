# Investement API

This project is a RESTful API built with NestJS and MongoDB to help Create project for investor.

## Technologies Used

- NestJS
- MongoDB
- npm (Package manager)
- Docker (for MongoDB)

## Prerequisites

- Node.js (v16 or later)
- npm
- Docker

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/walidmeguenni/test_dev.git
   cd test_dev
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up your environment variables:
   Create a `.env.dev` file in the root directory and add the following variables:

   ```
   # Server Setup 
   PORT=8000

   # JWT Auth 
   ACCESS_TOKEN_SECRET=your_jwt_secret_here

   # DataBase URL
   MONGO_DB_URI=mongodb://username:your_password_here@localhost:27017/db_name
## Running the Application

To run the application locally:

1. Start the MongoDB service using Docker:
   ```
   docker-compose up mongo_db -d
   ```

   This uses the following Docker Compose configuration for MongoDB:

   ```yaml
   services:
     mongo_db:
       container_name: mongo_db
       restart: unless-stopped
       image: mongo
       volumes:
         - mongo-data:/data/db
         - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
       environment:
         MONGO_INITDB_ROOT_USERNAME: username
         MONGO_INITDB_ROOT_PASSWORD: password
         MONGO_INITDB_DATABASE: db_name
       ports:
         - "27017:27017"

   volumes:
     mongo-data:
   ```

2. Seed the database with initial data:
   ```
   npm run db:seed
   ```

3. In a new terminal, start the NestJS application:
   ```
   npm run start:dev
   ```

4. The API will be available at `http://localhost:8000`

Note: This method uses Docker for the MongoDB service but runs the NestJS application directly on your host machine, which is useful for development.

## API Endpoints

- `/api/v1/private/project` - CRUD operations for employees

For detailed API documentation, please refer to the `/api-docs` endpoint after starting the server.

## Swagger Documentation
To access the Swagger panel use the following path:
```yaml 
  http://localhost:8000/api-docs
```
## Credentials
To access the API, use the following default credentials for authentication:
### for admin
```yaml
Email: john.doe@example.com
Password: password123
```

### for investor
```yaml
Email: perer.gr@example.com
Password: password123
```
## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
