# social-post-app

# Mini Social Post Application

This is a full-stack Mini Social Post Application built for the 3W Full Stack Internship Assignment.

The project allows users to create an account, login, create posts with text or images, view posts from all users, like posts, and comment on posts. It also includes a "Continue as Guest" option where users can view the feed without logging in.

## Features

- User signup and login
- JWT authentication
- Continue as Guest option
- Create text posts
- Create image posts
- Create posts with both text and image
- Public feed for all users
- Like and unlike posts
- Comment on posts
- Display total likes and comments
- Display usernames of users who liked or commented
- Responsive and clean UI

## Tech Stack

### Frontend

- React.js
- Vite
- Axios
- React Router DOM
- CSS

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt.js
- Multer
- CORS
- Dotenv

## Project Structure

```text
social-post-app/
│
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    └── package.json

MongoDB Collections

Only two collections are used:

Users Collection

Stores user account details.

{
  username,
  email,
  password
}
Posts Collection

Stores all post data.

{
  userId,
  username,
  text,
  image,
  likes,
  comments
}
Installation and Setup
1. Clone the Repository
git clone https://github.com/sarveshpandit6769/social-post-app.git
cd social-post-app
2. Backend Setup
cd backend
npm install

Create a .env file inside the backend folder and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

npm run dev

Backend will run on:

http://localhost:5000
3. Frontend Setup

Open a new terminal:

cd frontend
npm install
npm run dev

Frontend will run on:

http://localhost:5173
API Routes
Auth Routes
POST /api/auth/signup
POST /api/auth/login
Post Routes
GET /api/posts
POST /api/posts
PUT /api/posts/:id/like
POST /api/posts/:id/comment
How the App Works
User can signup with username, email, and password.
User can login using email and password.
Logged-in user can create a post with text, image, or both.
All posts are visible in the public feed.
Logged-in users can like and comment on posts.
Guest users can only view posts.
Likes and comments update instantly in the UI.
Deployment
Frontend

The frontend can be deployed on:

Vercel / Netlify
Backend

The backend can be deployed on:

Render
Database

MongoDB Atlas is used for the cloud database.

Assignment Requirements Completed
Signup and login with email and password
MongoDB database integration
User details stored in database
Post text or image
Public feed
Like and comment functionality
Username displayed with posts
Likes and comments count displayed
Usernames saved for likes and comments
React frontend
Node.js and Express backend
MongoDB database
Only users and posts collections used
Clean and responsive UI
Separate frontend and backend folders



Author
Sarvesh Pandit
