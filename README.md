# Hotel Reservation System

Welcome to the main repository for the **Hotel Reservation System**, developed as a Capstone Project at Jala University.

This system is a complete solution for making and managing hotel reservations, consisting of a modern frontend focused on immersion and user experience, and a robust and well-structured backend to manage business logic, reservation data, and authentication.

## System Architecture

The project adopts a two-layer architecture separated by directories:
- **[Frontend](./frontend/)**: Web Interface built with Next.js.
- **[Backend](./backend/)**: API built with NestJS.

### Frontend (Web Application)

The frontend focuses on delivering a high-level visual experience, providing responsive and modern environments.

**Tech Stack (Frontend):**
- **Framework:** Next.js 16 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4
- **Forms and Validation:** React Hook Form + Zod
- **Icons and Feedback:** Lucide React, React Hot Toast
- **Language:** TypeScript

 **For more details, see the [Frontend README](./frontend/README.md).**

###  Backend (API)

The backend is responsible for data persistence, reservation logic, validation, and security. Developed under the standardized NestJS architecture, the API guarantees strong scalability and resilience.

**Tech Stack (Backend):**
- **Framework:** NestJS 11
- **Language:** TypeScript
- **Database:** MongoDB (running locally via Docker)
- **ORM:** Prisma v6
- **Authentication and Security:** Passport, JWT, and Bcrypt
- **API Documentation:** Swagger

#### Initializing the Database

The database is managed via Docker. To run it, navigate to the `backend/` folder and use `docker-compose.yml` (which runs the `init-mongo.sh` script on the first execution):

```bash
cd backend
docker-compose up -d
```

#### Running the Application (Backend)

1. Install dependencies:
   ```bash
   npm install
   ```

2. Generate Prisma typings:
   ```bash
   npx prisma generate
   ```

3. Start the server:
   ```bash
   npm run start:dev
   ```

##  How to Start the Entire Project Locally

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd hotel-reservation-system
   ```

2. **Start the Database (Docker):**
   ```bash
   cd backend
   docker-compose up -d
   ```

3. **Start the Backend API:**
   Check/copy the `.env` in the backend configuration if necessary (e.g., `cp .env.example .env`).
   ```bash
   npm install
   npx prisma generate
   npm run start:dev
   ```

4. **Start the Frontend:**
   Open a new terminal and navigate to the Frontend.
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

5. Access the frontend at `http://localhost:3000` and the API Swagger on its corresponding route (usually `http://localhost:3001/api`).

## 👥 Team 

**Akyssa Silva**

[![GitLab](https://img.shields.io/badge/GitLab-FC6D26?logo=gitlab&logoColor=white)](https://gitlab.com/akyssa.silva)

**Erick Monteiro**
  
 [![GitLab](https://img.shields.io/badge/GitLab-FC6D26?logo=gitlab&logoColor=white)](https://gitlab.com/Erickpxd)
[![GitHub](https://img.shields.io/badge/GitHub-000?logo=github&logoColor=white)](https://github.com/erickpxd)

**Eugenio Santana** 

[![GitLab](https://img.shields.io/badge/GitLab-FC6D26?logo=gitlab&logoColor=white)](https://gitlab.com/eugenio-jefferson)

