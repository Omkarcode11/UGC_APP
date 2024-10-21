Here’s a `README.md` file for your project:

```markdown
# Client Application

This is the frontend application for a platform where **brands** can create campaigns, and **creators** can apply to those campaigns, upload content, and manage their applications.

## Tech Stack

- **React**: UI framework
- **Vite**: Build tool
- **TypeScript**: Static typing for JavaScript
- **Axios**: HTTP client for API calls
- **Mongoose**: MongoDB ORM for managing application data
- **React Router DOM**: Routing solution for React
- **React Hot Toast**: Toast notifications
- **Cloudinary API**: Used by creators to upload content

## Features

### Brand Features
1. **Campaign Management**:
   - Brands can create campaigns.
   - View applications from creators.
   - Approve or reject applications.
   - Once a campaign is approved, the creator can upload their content using the Cloudinary API.

2. **Account Management**:
   - Brands can register and log in to the application.

### Creator Features
1. **Campaign Participation**:
   - View all running campaigns.
   - Apply to campaigns.
   - Check the status of applications (applied, approved, or rejected).
   - Once approved, upload content directly to the campaign using the Cloudinary API.

2. **Account Management**:
   - Creators can register and log in to the application.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/client-app.git
   cd client-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. To build the project for production:
   ```bash
   npm run build
   ```

5. To preview the production build:
   ```bash
   npm run preview
   ```

6. To run the linter:
   ```bash
   npm run lint
   ```

## Project Structure

```
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Pages corresponding to routes
│   ├── api/               # Axios-based API requests
│   ├── hooks/             # Custom React hooks
│   ├── context/           # Context API for managing global state
│   ├── styles/            # Global styles
│   └── App.tsx            # Main App component
├── .eslintrc.js           # ESLint configuration
├── tsconfig.json          # TypeScript configuration
└── vite.config.ts         # Vite configuration
```

## Environment Variables

To use the Cloudinary API, ensure that the following environment variables are set in your `.env` file:

```env
REACT_APP_CLOUDINARY_CLOUD_NAME=<your_cloud_name>
REACT_APP_CLOUDINARY_UPLOAD_PRESET=<your_upload_preset>
```

## Scripts

- `npm run dev`: Starts the development server using Vite.
- `npm run build`: Builds the app for production using Vite and TypeScript.
- `npm run lint`: Runs ESLint to check code quality.
- `npm run preview`: Previews the production build locally.

## Dependencies

- **Axios**: ^1.7.7
- **Mongoose**: ^8.7.2
- **React**: ^18.3.1
- **React DOM**: ^18.3.1
- **React Hot Toast**: ^2.4.1
- **React Router DOM**: ^6.27.0

### Dev Dependencies

- **@eslint/js**: ^9.11.1
- **@types/react**: ^18.3.10
- **@types/react-dom**: ^18.3.0
- **@vitejs/plugin-react**: ^4.3.2
- **ESLint**: ^9.11.1
- **eslint-plugin-react-hooks**: ^5.1.0-rc.0
- **eslint-plugin-react-refresh**: ^0.4.12
- **Globals**: ^15.9.0
- **TypeScript**: ^5.5.3
- **typescript-eslint**: ^8.7.0
- **Vite**: ^5.4.8

## How It Works

1. **Brand Workflow**:
   - The brand registers or logs into the app.
   - Brands can create new campaigns.
   - Once a campaign is created, creators can apply to participate.
   - The brand can view all applications and either approve or reject them.
   - Once approved, creators can upload their content to the campaign.

2. **Creator Workflow**:
   - The creator registers or logs into the app.
   - Creators can browse all active campaigns and apply for the ones they are interested in.
   - Upon approval by the brand, creators can upload their content via Cloudinary.

