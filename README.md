# DailySpend

DailySpend is a full-stack application designed to help users manage their daily expenses efficiently. It features a React-based frontend and a Node.js/Express backend with MongoDB for data storage.

## Features
- User authentication (login/register)
- Expense tracking and management
- Responsive design with Material-UI
- RESTful API for backend services

## Tech Stack
### Frontend
- React
- Material-UI
- Vite

### Backend
- Node.js
- Express
- MongoDB

## Installation

### Prerequisites
- Node.js
- pnpm
- MongoDB

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   pnpm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env` and configure the variables.
4. Start the backend server:
   ```bash
   pnpm dev
   ```
5. Navigate to the frontend directory and install dependencies:
   ```bash
   cd ../frontend
   pnpm install
   ```
6. Start the frontend development server:
   ```bash
   pnpm dev
   ```