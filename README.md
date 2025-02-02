# Full Stack Blog App
### A Full Stack Blog Application built with React.js, Node.js, Express.js, and MongoDB. The app allows users to register, log in, view blogs, and comment on them. Admins have the ability to manage blogs by creating, updating, and deleting them.

## Features

* User Authentication
Secure user registration and login using JWT-based authentication. Passwords are hashed with bcrypt for enhanced security.

* Blog Management
Admins can create, update, and delete blog posts. Regular users can view blogs and comment on them.

* Role-based Access Control
Implements different access levels for admins (manage blogs) and users (view and comment).

* RESTful API
Designed to handle user authentication and blog management through Node.js and Express.js.

* Database
Blogs and user data are stored in MongoDB using Mongoose for data modeling.

## Tech Stack

### Frontend:

* React.js
* React Router
* Redux
* Tailwind CSS
* Axios for API calls

### Backend:

* Node.js
* Express.js

### Database:

* MongoDB
* Mongoose

### Authentication:

* JWT
* bcrypt for password hashing

# Email Service:

* Nodemailer for email notifications

## Example Output
### User View
Users can view blogs, read posts, and comment on them.


### Admin Dashboard
Admins can create, update, and delete blog posts from the admin dashboard.

```bash
git clone https://github.com/your-username/full-stack-blog-app.git
```
```bash
# Installation Instructions
## Backend Setup

Clone the repository:

bash
Copy
Edit
git clone https://github.com/your-username/full-stack-blog-app.git
Navigate to the backend folder:

bash
Copy
Edit
cd full-stack-blog-app/backend
Install the backend dependencies:

bash
Copy
Edit
npm install
Create a .env file and add the following environment variables:

plaintext
Copy
Edit
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
Start the backend server:

bash
Copy
Edit
npm run dev
Frontend Setup
Navigate to the frontend folder:

bash
Copy
Edit
cd full-stack-blog-app/frontend
Install the frontend dependencies:

bash
Copy
Edit
npm install
Start the frontend server:

bash
Copy
Edit
npm run dev




bash
Copy
Edit
npm run dev

```
