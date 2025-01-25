# MERN Stack Contact Manager

This is a MERN stack application that functions as a contact manager. The project includes essential features like user authentication, profile management, and CRUD (Create, Read, Update, Delete) operations for contacts. Below is an overview of the application and its functionality.

## Features

### General Features:
- **User Authentication**: Login and registration functionality with secure password handling.
- **Protected Routes**: Pages like the profile page can only be accessed when logged in.
- **Local Storage**: User authentication token is stored in local storage for session persistence.

### Contact Management Features:
- **View Contacts**: View saved contacts.
- **Add Contacts**: Add new contacts.
- **Edit Contacts**: Update contact details.
- **Delete Contacts**: Remove existing contacts.

## Pages

1. **Login Page**:
   - Allows users to log in using their credentials.
   - Validates input fields for security and user experience.

2. **Register Page**:
   - Enables new users to create an account.
   - Performs field validation and password encryption.

3. **Home Page**:
   - Provides a brief introduction about the application.
   - Explains its purpose and key features.

4. **Profile Page**:
   - Displays the logged-in user's profile information.
   - Accessible only when logged in.
   - Provides options to log out or update user information.

## Tech Stack

- **Frontend**:
  - React
  - Axios (for API calls)
  - React Router (for navigation)
  - CSS (custom styling)

- **Backend**:
  - Node.js
  - Express
  - MongoDB (with Mongoose for database management)

- **Authentication**:
  - JWT (JSON Web Tokens) for securing API endpoints.
  - Bcrypt.js for password hashing.

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/meharchanna12/Contact-Manager.git
   ```

2. Install dependencies for both backend and frontend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Configure Environment Variables:
   - Create a `.env` file in the `backend` folder.
   - Add the following environment variables:
     ```env
     PORT=8002
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. Run the development server:
   - Start the backend:
     ```bash
     cd backend
     node index.js
     ```
   - Start the frontend:
     ```bash
     cd frontend
     npm run dev
     ```

5. Open the application in your browser at http://localhost:5173

