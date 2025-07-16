# EJS CRUD App with Authentication and Authorization

This is a simple CRUD application built using Node.js, Express.js, MongoDB, EJS, and JWT Authentication. The app allows you to manage Documents, Invoices, and Reports with features for registration, login, create, read, update status, and delete operations. The application requires users to be logged in to access certain routes.

## Features
- **User Authentication with JWT (JSON Web Tokens)**
    - Seed User
    - Login and Logout
- **Manage (CRUD operations)**
    - Create, Read, Update, and Delete
    - Edit Document Status (Pending, Approved, Rejected, Archived)
- **Protected Routes** accessible only by logged-in users

## Tech Stack
- **Frontend**: EJS (Embedded JavaScript Templates)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Authentication**: JWT (JSON Web Token) + Cookie-based session
- **Password Encryption**: bcrypt

## Table of Contents
1. [Installation](#installation)
2. [Setup](#setup)
3. [Usage](#usage)
4. [Testing with Postman](#testing-with-postman)
5. [Folder Structure](#folder-structure)
6. [Routes](#routes)
7. [Error Handling](#error-handling)
8. [Conclusion](#conclusion)

## Install dependencies:
npm install


## Create a .env file at the root of the project with the following environment variables:
- PORT=9090
- MONGO_URI=mongodb://localhost:27017/auth_ejs_example
- JWT_EXPIRES_IN=2h


## ☁️ MongoDB Setup (Cloud)

You can use **MongoDB Atlas** (recommended) or a **local MongoDB server**.

---

### 🌐 MongoDB Atlas Setup (Recommended for Production)

Follow these steps to set up MongoDB Atlas:

#### ✅ Step 1: Create a Free MongoDB Atlas Cluster
- Visit: [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Sign up (or log in) and **create a new project**
- Choose **Shared Cluster (free tier)**
- Select any **cloud provider** and **region**
- Click **Create Cluster**

#### 🔐 Step 2: Create a Database User
- Go to **Database Access** in the left menu
- Click **Add New Database User**
- Enter a **username** and **password**
- Set the role to **Read and Write to any database**
- Save the user

#### 🌍 Step 3: Whitelist Your IP Address
- Go to **Network Access**
- Click **Add IP Address**
- To allow all IPs (for development only), enter:


#### 🔗 Step 4: Get Your Connection String
- Go to **Database → Connect → Connect Your Application**
- Copy the URI that looks like this:


- Replace:
- `<username>`: Your MongoDB user
- `<password>`: Your MongoDB password
- `<dbname>`: Your database name (e.g., `auth_ejs_example`)

---

## ⚙️ Environment Setup

Create a `.env` file at the root of your project and add the following:

```env
- PORT=9090
- MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/auth_ejs_example?retryWrites=true&w=majority
- JWT_EXPIRES_IN=2h
```

## 👤 Seed Initial User
- Before running the app, you must create an initial user:

```
node seed.js

```

## 🌐 API Endpoint
## // GET  ENDPOINT AS JSON:
- AFTER_DEPLOYING_DOMAIN_NAME/license-register/api

## Note: 
This dashboard is for https://moheligaminglicense.com/ website.


