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

## ⚠️ Error Handling & Validation

- Client-side validation is implemented for all forms (login, registration, add/edit medicine)
- Server-side validation ensures secure and consistent data handling
- Invalid inputs (e.g., incorrect time formats, missing fields) are rejected with meaningful error messages
- Authentication errors are handled gracefully with proper HTTP status codes

## API DOCUMENTATION

### All protected routes require the following header:
```text
Authorization: Bearer <JWT_TOKEN>
```
#### Authentication
##### Register

POST /api/auth/register
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
##### Login

POST /api/auth/login
```json
{
  "token": "<JWT_TOKEN>"
}
```
##### Get User Profile
GET /api/auth/me

#### Medicines(Protected)

##### Get All Medicines
GET /api/medicines

##### Add Medicine
POST /api/medicines
```json
{
  "name": "Paracetamol",
  "dosage": "500mg",
  "times": ["08:00", "20:00"]
}
```

##### Update Medicine
PUT /api/medicines/:id

##### Toggle Active / Inactive
PATCH /api/medicines/:id/toggle

##### Delete Medicine
DELETE /api/medicines/:id

## API Testing

All APIs were tested using Thunder Client in Visual Studio Code.

Steps:

Login via /api/auth/login

Copy the JWT token from the response

Use the token in the Authorization header for protected routes

## ⚙️ Run Locally

### 🔐 Environment Variables

To run the project locally, create a `.env` file in the backend directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL=your_email_address
EMAIL_PASS=your_email_app_password
```
These variables are required for database connectivity, authentication, and email reminder functionality.
### Backend
cd backend
npm install
npm start

### Frontend
cd frontend
npm install
npm start

## 📈 Scaling for Production
### Frontend

- Move JWT storage to HttpOnly cookies for improved security

- Implement pagination for large datasets

- Introduce lazy loading and code splitting

- Add global error handling

### Backend

- Add rate limiting and request throttling

- Use Redis for caching

- Implement centralized logging

- Separate services for auth, medicines, and notifications

### Infrastructure

- CI/CD pipelines

- Separate staging and production environments

- Horizontal scaling with load balancers