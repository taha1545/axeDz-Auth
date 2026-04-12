# AxeDz Auth Service - API Documentation

**Base URL:** `http://localhost:3000`

---

## 🔐 Authentication Endpoints

### 1. User Sign Up
**POST** `/auth/signup`
- **Auth:** None
- **Content-Type:** multipart/form-data
- **Body:**
  - `name` (string, required)
  - `email` (string, required)
  - `password` (string, required)
  - `phone` (string, optional)
  - `image` (file, optional)
- **Response:** (201)
  ```json
  {
    "success": true,
    "message": "User created successfully. Please verify your phone if provided.",
    "data": { "id": 1, "name": "John", "email": "john@example.com", "phone": null, "is_verified": false },
    "accessToken": "eyJhbGc..."
  }
  ```

### 2. User Login
**POST** `/auth/login`
- **Auth:** None
- **Body:**
  - `identifier` (string, email or phone, required)
  - `password` (string, required)
- **Response:** (200)
  ```json
  {
    "success": true,
    "message": "User logged in successfully",
    "data": { "id": 1, "name": "John", "email": "john@example.com" },
    "accessToken": "eyJhbGc..."
  }
  ```

### 3. Send Password Reset OTP
**POST** `/auth/send-reset-otp`
- **Auth:** None
- **Body:**
  - `email` (string, required)
- **Response:** (200)
  ```json
  {
    "success": true,
    "message": "Reset OTP has been sent to your email"
  }
  ```

### 4. Reset Password with OTP
**PUT** `/auth/reset-password-otp`
- **Auth:** None
- **Body:**
  - `email` (string, required)
  - `otp_code` (string, required)
  - `password` (string, required)
- **Response:** (200)
  ```json
  {
    "success": true,
    "message": "Password has been reset successfully"
  }
  ```

### 5. Reset Password (Authenticated)
**PATCH** `/auth/reset-password`
- **Auth:** Bearer Token (required)
- **Body:**
  - `oldPassword` (string, required)
  - `newPassword` (string, required)
- **Response:** (200)
  ```json
  {
    "success": true,
    "message": "Password updated successfully"
  }
  ```

### 6. Refresh Access Token
**POST** `/auth/refresh-token`
- **Auth:** None
- **Body:**
  - `refreshToken` (string, required)
- **Response:** (200)

### 7. Logout
**POST** `/auth/logout`
- **Auth:** None
- **Response:** (200)
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

### 8. Send SMS Verification OTP
**POST** `/auth/send-verify-sms-otp`
- **Auth:** None
- **Body:**
  - `phone` (string, required)
- **Response:** (200)
  ```json
  {
    "success": true,
    "message": "Verification OTP sent by SMS"
  }
  ```

### 9. Verify SMS OTP
**PUT** `/auth/verify-sms`
- **Auth:** None
- **Body:**
  - `phone` (string, required)
  - `otp_code` (string, required)
- **Response:** (200)
  ```json
  {
    "success": true,
    "message": "User verified successfully with SMS OTP"
  }
  ```

---

## 👤 User Management Endpoints

### 1. Get Current User Profile
**GET** `/auth/me`
- **Auth:** Bearer Token (required)
- **Response:** (200)
  ```json
  {
    "success": true,
    "user": { "id": 1, "name": "John", "email": "john@example.com", "is_verified": true }
  }
  ```

### 2. Update User Profile
**PUT** `/auth/update`
- **Auth:** Bearer Token (required)
- **Body:**
  - `name` (string, optional)
  - `email` (string, optional)
  - `phone` (string, optional)
  - `image` (base64 string, optional)
- **Response:** (200)
  ```json
  {
    "success": true,
    "message": "User updated",
    "user": { "id": 1, "name": "John Updated", "email": "john@example.com" }
  }
  ```

### 3. Get All Users
**GET** `/auth/`
- **Auth:** Bearer Token (required)
- **Query Params:**
  - `page` (number, default: 1)
  - `limit` (number, default: 15)
  - `search` (string, searches name, email, phone)
- **Response:** (200)
  ```json
  {
    "success": true,
    "users": [ { "id": 1, "name": "John", "email": "john@example.com" } ],
    "pagination": {
      "total": 100,
      "page": 1,
      "pages": 7
    }
  }
  ```

### 4. Get User by ID
**GET** `/auth/:id`
- **Auth:** Bearer Token (required)
- **Params:** `id` (number)
- **Response:** (200)
  ```json
  {
    "success": true,
    "user": { "id": 1, "name": "John", "email": "john@example.com" }
  }
  ```

### 5. Delete User by ID
**DELETE** `/auth/:id`
- **Auth:** Bearer Token (required)
- **Params:** `id` (number)
- **Response:** (200)
  ```json
  {
    "success": true,
    "message": "User deleted successfully"
  }
  ```

---

## 📧 Contact Management Endpoints

### 1. Create Contact
**POST** `/contacts`
- **Auth:** None
- **Body:**
  - `name` (string, required)
  - `email` (string, required)
  - `phone` (string, optional)
  - `subject` (string, required)
  - `message` (string, required)
  - `status` (string, optional, default: "unread")
- **Response:** (201)
  ```json
  {
    "success": true,
    "message": "Contact created successfully",
    "data": { "id": 1, "name": "John", "email": "john@example.com", "subject": "Help", "message": "I need help", "status": "unread" }
  }
  ```

### 2. Get All Contacts
**GET** `/contacts`
- **Auth:** Bearer Token (required)
- **Query Params:**
  - `page` (number, default: 1)
  - `limit` (number, default: 10)
  - `status` (string, default: "unread")
- **Response:** (200)
  ```json
  {
    "success": true,
    "message": "Contacts retrieved successfully",
    "data": [ { "id": 1, "name": "John", "subject": "Help", "status": "unread" } ],
    "pagination": {
      "total": 50,
      "page": 1,
      "limit": 10,
      "totalPages": 5
    }
  }
  ```

### 3. Get Contact by ID
**GET** `/contacts/:id`
- **Auth:** Bearer Token (required)
- **Params:** `id` (number)
- **Response:** (200)
  ```json
  {
    "success": true,
    "message": "Contact retrieved successfully",
    "data": { "id": 1, "name": "John", "email": "john@example.com", "subject": "Help", "message": "I need help" }
  }
  ```

### 4. Update Contact
**PUT** `/contacts/:id`
- **Auth:** Bearer Token (required)
- **Params:** `id` (number)
- **Body:**
  - `status` (string, required)
- **Response:** (200)
  ```json
  {
    "success": true,
    "message": "Contact updated successfully",
    "data": { "id": 1, "name": "John", "status": "read" }
  }
  ```

### 5. Delete Contact
**DELETE** `/contacts/:id`
- **Auth:** Bearer Token (required)
- **Params:** `id` (number)
- **Response:** (200)
  ```json
  {
    "success": true,
    "message": "Contact deleted successfully"
  }
  ```

---

## 🔑 OAuth Endpoints

### 1. Google Sign In
**GET** `/google`
- **Auth:** None
- **Description:** Initiates Google OAuth flow

### 2. Google Callback
**GET** `/google/callback`
- **Auth:** None
- **Description:** Google OAuth callback (redirects with token to frontend)

#### POST /contacts
Create contact.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "subject": "string",
  "message": "string",
  "status": "unread"
}
```

#### PUT /contacts/:id
Update contact.

#### DELETE /contacts/:id
Delete contact.

## Error Responses
```json
{
  "success": false,
  "message": "Error message"
}
```

## Libraries Used
- express
- sequelize
- bcrypt
- jsonwebtoken
- nodemailer
- multer
- multer-s3
- @aws-sdk/client-s3
- winston
- express-rate-limit
- express-validator
- helmet
- cors
- xss-clean
- hpp
- passport
- passport-google-oauth20
- express-session
- dotenv

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.example` to `.env` and fill in the values
4. Set up PostgreSQL database (docker conpose up -d --build)
5. Run migrations: `npx sequelize-cli db:migrate`
6. Start the server: `npm start`


 For Docker: `docker build -t axedz-auth .` then `docker run -p 3000:3000 axedz-auth`