# User Feedback Form API

A backend API for managing users, forms, and feedback submissions.  
This project demonstrates CRUD operations, multi-database handling, Prisma ORM usage, and production deployment.

---

## 🔗 Project Links

- **GitHub Repository**  
  https://github.com/Nehasontakke123/user-feedback-backend

- **Live API (Railway Deployment)**  
  https://user-feedback-backend-production.up.railway.app

---

## 🎯 Tech Stack

- Node.js + TypeScript
- Express.js
- MySQL (Prisma ORM – structured data)
- MongoDB (Mongoose – dynamic data)
- Postman (API testing)
- Railway (Deployment)

---

## 🗄️ Database Design

### MySQL (via Prisma)
Stores **structured data**:
- Users
- Forms (title, description, createdBy)

### MongoDB
Stores **dynamic / unstructured data**:
- Form submissions
- Answers
- Timestamps / metadata

**Design Principle:**  
Structured data → MySQL  
Dynamic data → MongoDB

---

## 🌍 Base URLs

### Local
http://localhost:5001


### Production
https://user-feedback-backend-production.up.railway.app


---

## 🔧 API Endpoints (CRUD)

### 1️⃣ Create User
**POST /users**

```http
POST http://localhost:5001/users
{
  "name": "Monika",
  "email": "monika@test.com"
}
2️⃣ Create Form
POST /forms

POST http://localhost:5001/forms
{
  "title": "Product Feedback",
  "description": "Collect feedback about product quality and usability",
  "createdBy": 1
}
3️⃣ Submit Form
POST /submissions

POST http://localhost:5001/submissions
{
  "userId": 1,
  "formId": 1,
  "answers": {
    "rating": 5,
    "comment": "Nice app"
  }
}
Data is saved in MongoDB with references to userId and formId.

4️⃣ Get Submissions (with filters)
GET /submissions

GET http://localhost:5001/submissions
GET http://localhost:5001/submissions?userId=1
GET http://localhost:5001/submissions?formId=1
GET http://localhost:5001/submissions?userId=1&formId=1
GET http://localhost:5001/submissions?date=2026-02-01
GET http://localhost:5001/submissions?userId=1&formId=1&date=2026-02-01
Response includes:

Submission data from MongoDB

Related User & Form data from MySQL

Cross-database join handled at application level

5️⃣ Delete Submission
DELETE /submissions/:id

DELETE http://localhost:5001/submissions/65c9f8e2a1b23a9d9f0e1234
▶️ How to Run Locally
npm install
npx prisma migrate dev
bun run dev
Server runs at:

http://localhost:5001
📝 Notes
Prisma ORM is used only for MySQL

MongoDB is used for flexible submission storage

Cross-database joins are handled in the service layer

Environment variables are used for database connections

Production uses compiled JavaScript (dist/)

📦 Submission Includes
GitHub Repository

Live API URL (Railway)

Postman Collection

README documentation