# Car Rental Reservation System (Backend)

The Car Rental System is a web application designed to manage the renting of cars for a fictional car rental business. It provides functionalities for both administrators and users to handle car listings, bookings, and user accounts securely.

## Table of Contents
- [Features](#features)
- [Technology](#Technology)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Register/Login** User can Register and login.
- **Role Base Access** There are two roles user and admin with their specific permissions.
- **Booking** User can book the car of his choice
- **Auto Calculating Cost** The total price is automatically shown to the user by multiplying the price of the car with the time when the user returns the car.
- **Add New Car/Update** Admin can add new car and update information of previous card
- **Delete Car** Admin can delete car form database




## Technology
- **TypeScript** for static typing and enhanced development experience.
- **Express** as a fast and minimalist web framework.
- **Mongoose** for elegant MongoDB object modeling.
- **Zod** for schema validation and type inference.
- **JWT** for Validating Authentication and authoraizioson.
- **Modular pattern** to keep the codebase organized and scalable.

## Prerequisites
- Node.js (>= 14.x)
- npm or yarn
- MongoDB

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/sheikhmohdnazmulhasan/car-rental-reservation-system-backend.git
   cd car-rental-reservation-system-backend


2. Install dependencies:
   ```bash
    npm install
    # or
    yarn install

3. Create a .env file in the root directory and add your MongoDB connection string:

   ```bash
   PORT: 500
   MONGODB_URI=your_mongodb_connection_string
   BCRYPT_SALT_ROUND=<= 10 
   JWT_ACCESS_TOKEN=your_jwt_access_token
   JWT_REFRESH_TOKEN=your_jwt_refresh_token

## Usage
1. Start the server:
   ```bash
   npm run start:dev
   # or
   yarn start:dev

2. The server will start on `http://localhost:5000`.

## Project Structure
    ```
    ├── src
    │   ├── config
    │   │   └── database.ts          # Database connection setup
    │   ├── controllers
    │   │   └── Controller.ts    # Controller for user-related operations
    │   ├── models
    │   │   └── Model.ts         # Mongoose schema and model for User
    │   ├── routes
    │   │   └── Routes.ts        # Express routes for user endpoints
    │   ├── schemas
    │   │   └── Schema.ts        # Zod schemas for user validation
    │   ├── services
    │   │   └── Service.ts       # Business logic for user operations
    │   ├── utils
    │   │   └── handleError.ts       # Utility for error handling
    │   ├── app.ts                   # Express app setup
    │   └── server.ts                # Server entry point
    ├── .env                         # Environment variables
    ├── .gitignore                   # Git ignore rules
    ├── package.json                 # NPM scripts and dependencies
    ├── tsconfig.json                # TypeScript configuration
    └── README.md                    # Project documentation



##Contributing
###Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature-branch).
5. Open a pull request.
