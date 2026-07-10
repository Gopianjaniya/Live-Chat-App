# Live-Chat-App

#  Real-Time Chat Application (MERN + Socket.io)

A full-stack real-time chat application that allows users to send and receive messages instantly. Built using the MERN stack with Socket.io for real-time communication.

---

##  Live Demo
-  Frontend:https://live-chat-app-pi-seven.vercel.app
-  Backend: https://live-chat-app-28nf.onrender.com

---

##  Tech Stack
- Frontend: React.js, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Real-time: Socket.io
- State Management: Redux
- Authentication: JWT

---

##  Features

###  User Features
- User authentication (Signup / Login)
- Real-time messaging
- Online / Offline user status
- Instant message delivery
- Responsive UI

---

##  How It Works (Real-Time Flow)

1. User logs in and connects to the server via Socket.io  
2. Server assigns a unique socket ID to each user  
3. User sends message → event emitted to server  
4. Server processes and stores message in MongoDB  
5. Server sends message to receiver using socket ID  
6. Receiver gets message instantly without refresh  

---

##  Architecture

- Frontend sends API + socket requests  
- Backend handles logic and real-time events  
- MongoDB stores users and messages  
- Socket.io manages real-time communication  

---

 
