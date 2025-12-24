# MicroSocial – Full Stack React Native App

MicroSocial is a minimal social media mobile application built as part of the **Full-Stack React Native Major Assignment**.

The goal of this project is to demonstrate real-world full-stack development using **React Native + Node.js + MongoDB**, focusing on clean architecture, authentication, and frontend–backend integration.

---

## 🚀 Features

### Authentication
- User registration
- User login using JWT
- Secure token storage using AsyncStorage
- Auto-login on app restart

### Posts
- Create text posts
- View live feed
- Like / unlike posts
- Delete own posts
- Real-time UI updates

### Profile
- View user name and email
- View own posts
- Delete posts from profile
- Logout functionality

---

## 🛠 Tech Stack

### Frontend
- React Native (Expo)
- Expo Router
- Context API
- Axios
- AsyncStorage

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

---

## 📂 Project Structure

```
microSMProject/
│
├── microsocial-backend/
│   ├── src/
│   ├── package.json
│   └── .env.example
│
├── microsocial-frontend/
│   ├── app/
│   ├── src/
│   └── package.json
│
└── README.md
```

---

## 🔐 Environment Setup

Create a `.env` file inside `microsocial-backend` using this format:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/microsocial
JWT_SECRET=your_secret_key
```

---

## 🔌 API Documentation

### Authentication APIs
- POST /api/auth/register
- POST /api/auth/login

### Post APIs
- GET /api/posts
- POST /api/posts
- POST /api/posts/:id/like
- DELETE /api/posts/:id

All post APIs require JWT authentication.

---

## ▶️ How to Run the Project

### Backend
```
cd microsocial-backend
npm install
npm run dev
```

### Frontend
```
cd microsocial-frontend
npm install
npx expo start
```

---


---

## 📸 Screenshots

| Login | Register |
|------|----------|
| <img src="https://github.com/user-attachments/assets/8b634168-9f81-40d7-b896-b5d5995f8980" width="220" /> | <img src="https://github.com/user-attachments/assets/8b634168-9f81-40d7-b896-b5d5995f8980" width="220" /> |

| Feed | Create |
|------|--------|
| <img src="https://github.com/user-attachments/assets/efe88a1e-05cd-426b-b898-7d07f002e442" width="220" /> | <img src="https://github.com/user-attachments/assets/07e7970c-8046-460a-a04a-5f6976054a87" width="220" /> |

| Profile |
|---------|
| <img src="https://github.com/user-attachments/assets/1a112691-720b-4f22-9a6f-baa459d1835f" width="220" /> |

---

## 🎥 Demo Video

▶️ Full app walkthrough video:  
<video src="https://github.com/user-attachments/assets/03793eaa-8932-437f-80e8-4ef02bb478fd" controls="controls" style="max-width: 100%;">
</video>

---

## 🧠 Design Decisions

- Backend acts as the single source of truth
- JWT-based secure authentication
- Clear separation of frontend and backend
- Simple and clean UI focused on usability

---

## ✅ Status

This project is fully functional and ready for evaluation.

