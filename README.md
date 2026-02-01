# User Feedback Form API

A simple backend API to manage users, forms, and feedback submissions using MySQL + MongoDB.

Tech Stack

Node.js + TypeScript

Express.js

MySQL (Prisma ORM)

MongoDB (Mongoose)

Postman for API testing

Database Design
MySQL (Prisma)

Stores structured data:

Users

Forms (title, description, createdBy)

MongoDB

Stores dynamic/unstructured data:

Form submissions (answers, timestamps)

API Endpoints
1. Create User

POST /users

{
  "name": "Alice",
  "email": "alice@example.com"
}

2. Create Form

POST /forms

{
  "title": "Product Feedback",
  "description": "Collect feedback",
  "createdBy": 1
}

3. Submit Form

POST /submissions

{
  "userId": 1,
  "formId": 1,
  "answers": {
    "rating": 5,
    "comment": "Nice app"
  }
}

4. Get Submissions

GET /submissions?userId=1&formId=1&date=2026-02-01

Returns:

Submissions from MongoDB

Related user and form data from MySQL

5. Delete Submission

DELETE /submissions/:id

How to Run Locally
npm install
npx prisma migrate dev
bun run dev

Server will run on:

http://localhost:5001

Notes

Prisma is used only for MySQL

MongoDB is used for flexible submission data

Cross-database joins are handled at application level