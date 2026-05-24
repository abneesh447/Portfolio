# Abneesh's Full-Stack Portfolio

A highly professional, full-stack portfolio website built with the MERN stack (MongoDB, Express, React, Node.js). This portfolio features a dynamic Admin CMS, real-time Competitive Programming (CP) stats integration, secure authentication, and a modern, glassmorphic UI.

## 🚀 Features

- **Dynamic Public Portfolio**: Beautifully displays your Hero section, Tech Stack, Projects, Education, and Contact form.
- **Admin Dashboard CMS**: A fully protected route (`/admin/dashboard`) requiring JWT authentication.
  - **Manage Projects**: Add, edit, or delete projects dynamically.
  - **Manage Tech Stack**: Add new technologies with an integrated Icon Renderer (supports react-icons).
  - **Manage Education**: Add or delete education history.
  - **Manage Resume**: Upload a PDF resume that is automatically converted to Base64 and stored safely in MongoDB.
  - **View Messages**: Read and delete contact form submissions.
  - **CP Settings**: Dynamically update your LeetCode and Codeforces handles without touching the code.
- **Real-Time CP Stats**: Automatically fetches and visualizes your LeetCode and Codeforces data using external APIs.
- **Email Notifications**: Integrated with Nodemailer to instantly email you when someone submits the contact form.
- **Premium UX/UI**: Framer Motion animations, Skeleton loading shimmers, and React Hot Toast notifications.
- **SEO & Analytics**: Fully configured with Open Graph meta tags and `@vercel/analytics`.

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Framer Motion (Animations)
- Lucide React & React Icons (Icons)
- React Router DOM (Routing)
- React Hot Toast (Notifications)
- Vercel Analytics
- Recharts (for CP graphs)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database)
- JSON Web Tokens (JWT) & bcryptjs (Auth)
- Nodemailer (Email integration)
- Axios (API requests)

## ⚙️ Installation & Setup

### 1. Clone the repository
Ensure you have cloned this repository to your local machine.

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory with the following:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/
JWT_SECRET=your_super_secret_jwt_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
```
Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal window:
```bash
cd frontend
npm install
```
Start the frontend development server:
```bash
npm run dev
```

## 🔒 Admin Access
To access the admin dashboard, navigate to `http://localhost:5174/admin/login` (or your live domain).
Your credentials are set securely in your MongoDB database.

## 🌐 Deployment
- **Frontend**: Recommended to deploy on [Vercel](https://vercel.com). Vercel Analytics will automatically activate.
- **Backend**: Recommended to deploy on [Render](https://render.com) or Heroku. Ensure you add all `.env` variables in the deployment dashboard.
