# 🍕 Pizza Delivery App – MERN Stack

A **full-stack Pizza Delivery Web Application** built using the **MERN Stack** (MongoDB, Express.js, React, Node.js) with user-friendly features, secure payments, and an admin dashboard for complete order management.

---

## 📌 Project Overview

This application provides a **seamless pizza ordering experience** for customers and a **powerful dashboard** for admins to manage pizzas, ingredients, and orders in real-time.  
It supports **pizza customization**, **dynamic pricing**, **secure payment processing**, and **real-time order tracking**.

---
# Features:

### 👤 For Users
- 🔐 **User Authentication** – JWT-based login, registration, and logout
- ✉️ **OTP Verification** – Email-based OTP verification during signup
- 📩 **Login with OTP** – Quick access without a password
- 🔄 **Forgot Password via Email Reset Link** – Secure password reset flow
- 🍕 **Make Your Own Pizza** – Choose base, sauce, cheese, veggies, and quantity
- 💰 **Dynamic Price Calculation** – Real-time price update based on size & ingredients
- 🛒 **Cart Management** – Add, remove, and update items before checkout
- 💳 **Secure Payment Integration** – Razorpay (test mode) for seamless checkout
- 📜 **My Orders** – View past orders with a detailed price breakdown
- ⏳ **Real-Time Order Tracking** – Live status updates from order placed to delivered

### 🛠 For Admins
- 🖥 **Admin Dashboard** – Role-based access control  
- 🛠 **Pizza & Ingredient Management** – Add, edit, delete pizzas & ingredients
- 👥 **User Management** – View and manage registered users
- 📦 **Order Management** – Update order statuses in real-time
- ☁️ **Image Upload via Cloudinary** – Store and manage pizza & ingredient images
- 📑 **Detailed Order Insights** – Item-wise breakdown & customer details

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- React Hot Toast (notifications)
- React Icons

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Cloudinary (image uploads)
- Nodemailer (email alerts)

**Payments**
- Razorpay API (Test Mode)

**Deployment**
- Frontend: Vercel
- Backend: Render / Railway

---


---

## ⚙ Installation & Setup

### **1️⃣ Clone the Repository**

git clone https://github.com/YourUsernameSyncWithRaj/OIBSIP_Web-Development-and-Designing_Task-Level-3-Pizza-Delivery-Application.git
cd OIBSIP_Web-Development-and-Designing_Task-Level-3-Pizza-Delivery-Application  
### **2️⃣ Install Dependencies**
Backend
```
cd server
npm install
```
Frontend
```
cd ../client
npm install
```
**3️⃣ Setup Environment Variables**
Create a .env file in the server folder and add:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_email_password
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```
**4️⃣ Run the Application**
Backend
```
cd server
npm run dev
```
Frontend
```
cd client
npm run dev
```
**📽 Demo Video**
🎥 Watch on YouTube: https://youtu.be/kVBiREJ6fEM?si=8E3j1CSoGESaYheB


**💡 Learnings**
Building a full-stack MERN app from scratch

Implementing secure authentication

Working with payment gateways

Real-time data updates & role-based access control

Deploying production-ready applications

**🌟 Acknowledgements**
Special thanks to Oasis Infobyte for the opportunity to work on this project as part of my internship.

📬 Contact
For queries, feedback, or collaboration:

Name: Raj Ribadiya

Email: rajr127655@gmail.com

LinkedIn:[Raj Ribadiya](https://www.linkedin.com/in/raj-ribadiya/)

#OasisInfobyte #MERNStack #PizzaDeliveryApp #WebDevelopment #FullStackDevelopment
