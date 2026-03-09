# Hotel Reservation System - Frontend

This is the frontend repository for the Hotel Reservation System Capstone project, built with Next.js.

The application aims to provide a premium and intuitive hotel booking experience. The visual identity focuses on dynamic, modern, and high-quality design.

## Technologies and Tools

The project utilizes a modern stack within the React ecosystem:

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Forms and Validation:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

##  Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

## Local Installation and Execution

1. Navigate to the frontend directory:
   ```bash
   cd hotel-reservation-system/frontend
   ```

2. Install the dependencies by running the following command:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Access the application in your browser at [http://localhost:3000](http://localhost:3000). The page will auto-update as you edit the files.

## Directory and Component Structure (Highlights)

The project architecture is divided by features, favoring organization and maintainability:

- **`src/features/home/`**: Components related to the home screen, including sections like `BestHotels` and the special `HausHirtSpotlight`.
- **`src/features/hotels/`**: Logic and components for listing and detailing accommodations, such as `RoomList`, `RoomCard`, and `Promotions`.
- **`app/`**: Route entry point using the new Next.js app directory structure.

## Other Commands

- `npm run build`: Creates the optimized production build of the application.
- `npm run start`: Starts the server using the generated build artifacts.
