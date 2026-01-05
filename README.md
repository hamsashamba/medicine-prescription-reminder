# Medicine Prescription Reminder App

A full-stack web application that helps users manage their daily medication schedules through a secure dashboard. Users can register, log in, add medicines with reminder times, manage active/inactive medicines, and view their profile information fetched from a protected backend API.

---

## 🚀 Live Demo

- **Frontend (Netlify):**  
  https://graceful-profiterole-6ec67c.netlify.app/

- **Backend (Render):**  
  https://medicine-backend-xxn3.onrender.com

---

## 📌 Features

### 🔐 Authentication & Security
- User registration and login with **JWT-based authentication**
- Passwords securely hashed using **bcrypt**
- Protected routes for authenticated users
- Secure token validation via middleware
- Logout functionality

### 📊 Dashboard
- CRUD operations on a sample entity (**Medicines**)
- Add, edit, delete medicines
- Mark medicines as **active / inactive**
- Search medicines by name
- Filter medicines based on active status
- Clean, responsive UI

### 👤 User Profile
- Profile data fetched from protected backend endpoint (`/api/auth/me`)
- Profile displayed on the dashboard via a slide-in drawer
- Shows user email, ID, and account creation date

### 🎨 UI / UX
- Built using **Material UI**
- Glassmorphism-inspired cards and dialogs
- Fully responsive layout
- Client-side validation with helpful error messages

---

## 🧑‍💻 Tech Stack

### Frontend
- React.js
- Material UI (MUI)
- Axios
- React Router
- Context API

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcrypt

### Deployment
- Frontend: Netlify
- Backend: Render
- Database: MongoDB Atlas

---

## 🗂️ Project Structure

```text
medicine-prescription-reminder/
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── theme/
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   ├── jobs/
│   │   └── server.js
│   └── package.json
```
This modular structure supports easy scaling and maintenance.

## API DOCUMENTATION


