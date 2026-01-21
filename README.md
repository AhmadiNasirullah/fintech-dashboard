# Moheli Gaming License Dashboard

This is a web application built using Node.js, Express.js, MongoDB, EJS, and JWT Authentication. The app allows administrators to manage gaming licenses for the Moheli Gaming License website, with features for registration, login, create, read, update status, and delete operations. The application requires users to be logged in to access certain routes.

## Features
- **User Authentication with JWT (JSON Web Tokens)**
    - Seed User
    - Login and Logout
- **Manage Gaming Licenses (CRUD operations)**
    - Create, Read, Update, and Delete
    - Edit License Status (Pending, Approved, Rejected, Archived)
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
3. [Deployment](#deployment)
4. [Usage](#usage)
5. [Testing with Postman](#testing-with-postman)
6. [Folder Structure](#folder-structure)
7. [Routes](#routes)
8. [Error Handling](#error-handling)
9. [Conclusion](#conclusion)

## Folder Structure

```
moheligaminglicense-dashboard/
├── api/
│   ├── index.js
│   └── middleware/
│       ├── admin.js
│       └── auth.js
├── models/
│   ├── licenseRegisterSchema.js
│   └── User.js
├── public/
│   ├── css/
│       └── styles.css
│   └── images/
├── routes/
│   ├── auth.js
│   ├── dashboard.js
│   └── licenseRegisterRoute.js
├── views/
│   ├── dashboard.ejs
│   ├── login.ejs
│   └── license-register/
│       ├── edit.ejs
│       ├── index.ejs
│       └── new.ejs
├── package.json
├── README.md
├── seed.js
└── vercel.json
```

## Install dependencies:
npm install


## Create a .env file at the root of the project with the following environment variables:
- PORT=9090
- MONGO_URI=mongodb://localhost:27017/moheli_gaming_licenses
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
- `<dbname>`: Your database name (e.g., `moheli_gaming_licenses`)

---

## ⚙️ Environment Setup

Create a `.env` file at the root of your project and add the following:

```env
- PORT=9090
- MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/moheli_gaming_licenses?retryWrites=true&w=majority
- JWT_EXPIRES_IN=2h
```

## � Deployment

This application can be deployed to any cloud platform that supports Node.js applications. The app is configured to work with serverless functions but can also run on traditional servers.

### Prerequisites
- Node.js hosting platform (Vercel, Heroku, AWS, DigitalOcean, etc.)
- MongoDB Atlas database (see MongoDB Setup section above)

### General Deployment Steps

1. **Prepare the Application**:
   - Ensure all dependencies are in `package.json`
   - The main entry point is `api/index.js`
   - Environment variables are properly configured

2. **Set Environment Variables**:
   Configure the following environment variables in your hosting platform:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_EXPIRES_IN`: Token expiration time (e.g., `2h`)
   - `PORT`: Port for the application (optional, defaults to 9090)

3. **Deploy the Code**:
   - Push to your Git repository
   - Connect your repository to your chosen hosting platform
   - Deploy from the main branch

4. **Seed Initial User** (after deployment):
   - Access your deployed app
   - Run the seed script via API or contact the development team

### Configuration Files
- `vercel.json`: Configured for serverless deployment (can be adapted for other platforms)
- `package.json`: Contains all dependencies and scripts

### Post-Deployment
- Test the login functionality
- Verify database connection
- Check the API endpoint: `YOUR_DEPLOYED_URL/license-register/api`

## �👤 Seed Initial User
- Before running the app, you must create an initial user:

```
node seed.js

```
## Usage

### Running Locally
1. Ensure MongoDB is running (local or Atlas)
2. Run the seed script: `node seed.js`
3. Start the development server: `npm run dev`
4. Open your browser to `http://localhost:9090`
5. Login with the seeded user credentials

### Production
- Deploy to your chosen hosting platform
- Access the deployed URL provided by your platform
- API endpoint: `YOUR_DEPLOYED_URL/license-register/api`
## 🌐 API Endpoint
## // GET  ENDPOINT AS JSON:
- AFTER_DEPLOYING_DOMAIN_NAME/license-register/api

## Routes

The application includes the following main routes:

- `/` - Dashboard (protected)
- `/login` - User login
- `/logout` - User logout
- `/license-register` - License management (CRUD operations)
- `/license-register/api` - API endpoint for license data

## Error Handling

The application includes middleware for error handling:
- Authentication middleware (`middleware/auth.js`)
- Admin authorization middleware (`middleware/admin.js`)
- Global error handling in the main server file

## Conclusion

This Moheli Gaming License Dashboard provides a secure and efficient way to manage gaming licenses. For any issues or contributions, please refer to the project repository.

## Note: 
This dashboard is for https://moheligaminglicense.com/ website.


