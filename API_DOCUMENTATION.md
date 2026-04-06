# AxeDz Auth Service API Documentation


## Endpoints

### Authentication

#### POST /auth/signup
Register a new user.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "phone": "string "
}
```
**File:** image (multipart/form-data, optional)

**Response:**
```json
{
  "success": true,
  "message": "User created successfully",
  "data": { user object },
  "accessToken": "string"
}
```

#### POST /auth/login
Login with email or phone.

**Request Body:**
```json
{
  "identifier": "email or phone",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User logged in successfully",
  "data": { user object },
  "accessToken": "string"
}
```

#### POST /auth/google
Initiate Google OAuth login.

#### GET /auth/google/callback
Google OAuth callback.

#### POST /auth/logout
Logout user.

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### POST /auth/refresh-token
Refresh access token.

**Request Body:**
```json
{
  "refreshToken": "string"
}
```

#### POST /auth/send-reset-otp
Send password reset OTP to email.

**Request Body:**
```json
{
  "email": "string"
}
```

#### PUT /auth/reset-password-otp
Reset password using OTP.

**Request Body:**
```json
{
  "email": "string",
  "otp_code": "string",
  "password": "string"
}
```

#### PATCH /auth/reset-password
Change password (authenticated).

**Request Body:**
```json
{
  "password": "string"
}
```

#### POST /auth/send-verify-sms-otp
Send SMS verification OTP.

**Request Body:**
```json
{
  "phone": "string"
}
```

#### PUT /auth/verify-sms
Verify SMS OTP.

**Request Body:**
```json
{
  "phone": "string",
  "otp_code": "string"
}
```

### User Management

#### GET /auth/me
Get current user profile.

**Response:**
```json
{
  "success": true,
  "user": { user object }
}
```

#### PUT /auth/update
Update user profile.

**Request Body:**
```json
{
  "name": "string",
  "email": "string",
  "phone": "string",
  "image": "base64 string (optional)"
}
```

#### GET /auth/
Get all users (admin).

**Query Params:**
- page: number
- limit: number
- search: string (search in name, email, phone)

**Response:**
```json
{
  "success": true,
  "users": [ user objects ],
  "pagination": {
    "total": number,
    "page": number,
    "pages": number
  }
}
```

#### GET /auth/:id
Get user by ID.

#### DELETE /auth/:id
Delete user by ID.

### Contacts

#### GET /contacts
Get all contacts.

**Query Params:**
- page: number
- limit: number
- name: string
- email: string
- phone: string
- status: string

#### GET /contacts/:id
Get contact by ID.

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