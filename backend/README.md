# Hotel Reservation System - Backend

This is the backend repository for the Hotel Reservation System Capstone project, built with [NestJS](https://nestjs.com/).

The API manages data persistence, reservation logic, user authentication, and data validation. It guarantees strong scalability and resilience under a standardized modular architecture.

## 🚀 Technologies and Tools

The project utilizes a modern and robust stack within the Node.js ecosystem:

- **Framework:** [NestJS 11](https://nestjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [MongoDB](https://www.mongodb.com/) (running via Docker)
- **ORM:** [Prisma v6](https://www.prisma.io/)
- **Authentication & Security:** [Passport](https://www.passportjs.org/), JWT, and [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **API Documentation:** Swagger

## ⚙️ Prerequisites

Ensure you have [Node.js](https://nodejs.org/) and [Docker](https://www.docker.com/) installed on your machine.

## 💻 Local Installation and Execution

1. Navigate to the backend directory:
   ```bash
   cd hotel-reservation-system/backend
   ```

2. Start the MongoDB database using Docker (this will execute `init-mongo.sh` automatically):
   ```bash
   docker-compose up -d
   ```

3. Configure your environment variables. Copy `.env.example` to `.env` and fill out the necessary details.
   ```bash
   cp .env.example .env
   ```

4. Install the dependencies:
   ```bash
   npm install
   ```

5. Generate the Prisma Client:
   ```bash
   npx prisma generate
   ```

6. Start the development server:
   ```bash
   npm run start:dev
   ```

7. The API should now be running. You can access the Swagger documentation usually at `http://localhost:3001/api`.

## 🗂 Key Scripts

- `npm run start`: Starts the server.
- `npm run start:dev`: Starts the server in watch mode for development.
- `npm run build`: Compiles the application into the `dist` folder.
- `npm run format`: Formats code using Prettier.