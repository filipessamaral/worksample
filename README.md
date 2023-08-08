# Project Overview

This project is a basic Node.js application that includes two endpoints for managing users, along with unit tests for these endpoints using Jest. The project focuses on creating a simple API for user management with features such as retrieving users with sorting and creating new users with validation using the Joi library.

## Endpoints

1. **Get Users:** The `GET /users` endpoint allows you to retrieve a list of users. It accepts a query parameter `created` to specify the order of users based on their creation date.

2. **Create User:** The `POST /users` endpoint enables you to create a new user. It uses the Joi library for request payload validation, ensuring that the required fields (firstName, lastName, email, password) are provided and valid.

## Useful Commands

Here are some useful commands to interact with the project:

- `npm start`: Run the server to start the application.
- `npm run dev`: Run the server using Nodemon for development, providing automatic restarts upon code changes.
- `npm test`: Run Jest to execute unit tests for the endpoints.

## Configuration

1. Duplicate the `env.sample` file and rename it to `.env`.
2. Create an account on [MongoDB Atlas](https://www.mongodb.com/atlas/database) and obtain a connection URI.
3. Add the obtained connection URI to the `.env` file under the `MONGODB_URI` key.

## Example API Calls

### Retrieve Users

To retrieve users with sorting by creation date in descending order:

```bash
curl --location 'http://localhost:4111/users?created=desc'
```

To retrieve users without sorting:

```bash
curl --location 'http://localhost:4111/users'
```

### Create User

To create a new user using the POST endpoint:
```bash
curl --location 'http://localhost:4111/users' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "Fizz",
    "lastName": "buzz",
    "email": "foo@buzz.com",
    "password": "123222abc"
}'
```

