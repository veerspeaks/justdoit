# Node.js Notes App

A simple Node.js application for user-specific notes with authentication, using MongoDB Atlas and deployed on Render.

## Features

- User authentication with Passport.js
- User-specific notes
- Flash messages for user feedback
- MongoDB Atlas for database storage
- Deployment on Render

## Getting Started

### Prerequisites

- Node.js and npm
- MongoDB Atlas account
- Render account

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
   SECRET=your_secret_key
   ```

4. **Run the application:**
   ```sh
   npm start
   ```
   The app will be running on `http://localhost:3000`.

## Deployment

1. **Set up MongoDB Atlas:**
   - Create a cluster and a database user.
   - Whitelist Render's IP addresses.
   - Update the `.env` file with the connection string.

2. **Deploy on Render:**
   - Create a new Web Service on Render.
   - Connect your GitHub repository.
   - Add environment variables in the Render dashboard.
   - Deploy the application.

## Usage

- **Sign Up:** Go to `/signup` to create an account.
- **Sign In:** Go to `/signin` to log in.
- **Create Note:** Use the interface to create and save notes.

## License

This project is licensed under the MIT License.
