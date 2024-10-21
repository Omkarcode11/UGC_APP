# UGC App - Frontend

This is the frontend for the UGC App, a platform where **brands** can create campaigns and **creators** can apply for these campaigns, upload their content, and manage their participation. The app is built with **React**, using **Vite** for the development and build process, and **TypeScript** for static typing.

## Live Demo

You can access the live app here: [UGC App Live](https://ugc-app-lilac.vercel.app/)

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Dependencies](#dependencies)

---

## Tech Stack

- **React** - UI framework
- **Vite** - Build tool for fast development
- **TypeScript** - Adds static types to JavaScript
- **Axios** - HTTP client for API requests
- **Mongoose** - MongoDB ORM (Backend integration)
- **React Router DOM** - Client-side routing
- **React Hot Toast** - Toast notifications for user feedback

---

## Features

### Brand Features:

- **Campaign Management**:
  - Create campaigns
  - View applications from creators
  - Approve or reject applications
  - Manage campaign submissions

- **Account Management**:
  - Register and log in to manage campaigns

### Creator Features:

- **Campaign Participation**:
  - View all available campaigns
  - Apply to campaigns
  - Upload content once approved
  - Track the status of your applications

- **Account Management**:
  - Register and log in to apply for campaigns

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Omkarcode11/UGC_APP.git
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Building the app for production:**
   ```bash
   npm run build
   ```
---

## Scripts

- `npm run dev`: Starts the development server using **Vite**.
- `npm run build`: Builds the app for production using **Vite** and **TypeScript**.
- `npm run lint`: Runs **ESLint** to check the code for quality issues.
- `npm run preview`: Previews the production build locally.

---

## Project Structure

```bash
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Pages corresponding to routes
│   └── App.tsx            # Main App component
├── .eslintrc.js           # ESLint configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

---

## Environment Variables

To use the **Cloudinary API** for media uploads, make sure to add the following environment variables to a `.env` file in the root of your project:

```bash
VITE_API_URL=<backend_endPoint>
```

---

## Dependencies

### Core Dependencies

- **react**: ^18.3.1
- **react-dom**: ^18.3.1
- **react-router-dom**: ^6.27.0
- **axios**: ^1.7.7
- **mongoose**: ^8.7.2
- **react-hot-toast**: ^2.4.1

### Dev Dependencies

- **vite**: ^5.4.8
- **typescript**: ^5.5.3
- **eslint**: ^9.11.1
- **eslint-plugin-react-hooks**: ^5.1.0-rc.0
- **@vitejs/plugin-react**: ^4.3.2
- **typescript-eslint**: ^8.7.0

---

## License

This project is licensed under the MIT License.
