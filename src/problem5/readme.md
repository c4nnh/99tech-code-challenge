# Problem 5 - CRUD API Server

A simple CRUD API server built with Express.js and TypeScript.

## Technologies Used

- SQLite
- Prisma
- JWT (JSON Web Tokens)
- Zod

## Prerequisites

- Node.js (v18 or higher)
- pnpm
- nodemon (for dev mode)

## Setup

### 1. Clone the repository

### 2. Install dependencies

```bash
pnpm install
```

### 3. Environment variables

```bash
cp .env.example .env
```

### 4. Database setup

#### prisma migration

```bash
pnpm prisma:migrate
```

#### prisma setup

```bash
pnpm prisma:setup
```

#### generate prisma client

```bash
pnpm prisma:generate
```

#### seed database

```bash
pnpm prisma:seed
```

This script will create 5 users and 20 posts for each user.
You can use this account to login:

- **username**: user1
- **password**: passworduser1

### 5. Run the server

You can run the server in dev mode or production mode

#### dev mode

```bash
pnpm dev
```

#### production mode

```bash
pnpm build
```

```bash
pnpm start
```

### 6. Swagger UI

Basic knowledge of Swagger UI is required to use this API.
After running the server, you can access the Swagger UI at `http://localhost:[port]/swagger`.
replace `[port]` with the port number you are running the server on in the `.env` file.

For example, if you are running the server on port 3000, you can access the Swagger UI at [`http://localhost:3000/swagger`](http://localhost:3000/swagger).

### 7. Postman

Basic knowledge of Postman is required to use this API.
You can use Postman to test the API.
Please refer to the `postman/collection.json` and `postman/environment.json` files for the API documentation.
