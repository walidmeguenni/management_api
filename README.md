# Temtem One-Backend API

This project is a RESTful API built with NestJS and MongoDB for managing products and user authentication with role-based access control.

## Technologies Used

- NestJS
- PostgreSQL
- npm (Package manager)
- Docker

## Prerequisites

- Node.js (v16 or later)
- npm
- Docker

## Installation

1. Clone the repository:
   ```yaml
   git clone https://github.com/walidmeguenni/management_api.git
   ```

2. Running the application using docker
   ```yaml
     docker compose up -d --build
   ```

## Important Note
Before opening the Swagger documentation, please wait around 30 seconds for the application to fully start and for the database migrations and seeds to complete.

The following script is executed during the Docker build process:

```bash
#!/bin/bash
# Wait for Postgres to be ready
echo "Waiting for Postgres..."
sleep 10

# Run migrations
echo "Running migrations..."
npx prisma migrate dev --name "init"

# Run seeds
echo "Running seeds..."
npm run seed

# Build the application
echo "Building the application..."
npm run build

# Start the application in production mode
echo "Starting the application..."
npm run start:prod
```

## Swagger Documentation
To access the Swagger panel use the following path:
```yaml
  http://localhost:8000/api-docs
```

## Credentials
To access the API, use the following default credentials for authentication:
### Store Owner
```yaml
Email: john_doe@example.com
Password: password123
```

### Guest User
No credentials required for viewing products
## API Endpoints

### Product Management
- `POST /api/v1/private/products` - Add a new product (store owner only)
- `GET /api/v1/private/products` - View a list of all products (available to all users)
- `PUT /api/v1/private/products/:id` - Edit product details (store owner only)
- `DELETE /api/v1/private/products/:id` - Delete a product (store owner only)

### User Authentication
- `POST /api/v1/auth/register` - Register a new user
- `POST /api/v1/auth/login` - Login with email and password

### Product Filtering and Sorting
- `GET /api/v1/private/products?category=category_name` - Filter products by category
- `GET /api/v1/private/products?sort=price_asc` - Sort products by price ascending
- `GET /api/v1/private/products?sort=price_desc` - Sort products by price descending

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

