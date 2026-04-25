# AxeDz Auth Service - API Documentation

## Key Endpoints

### Authentication
- `POST /auth/signup` — create account
- `POST /auth/login` — login
- `POST /auth/send-reset-otp` — request reset OTP
- `PUT /auth/reset-password-otp` — reset password
- `PATCH /auth/reset-password` — update password
- `POST /auth/refresh-token` — refresh token
- `POST /auth/logout` — logout
- `POST /auth/send-verify-sms-otp` — send SMS OTP
- `PUT /auth/verify-sms` — verify SMS OTP

### User Management
- `GET /auth/me` — current user
- `PUT /auth/update` — update profile
- `GET /auth` — list users
- `GET /auth/:id` — get user
- `DELETE /auth/:id` — delete user

### Contact Management
- `POST /contacts` — create contact
- `GET /contacts` — list contacts
- `GET /contacts/:id` — contact details
- `PUT /contacts/:id` — update contact status
- `DELETE /contacts/:id` — delete contact

### API Key Management
- `POST /api-keys` — create API key (generates key, secret, defaults status to active)
- `POST /api-keys/validate` — validate active key
- `GET /api-keys` — list keys with `search`, `status`, `project_name`, `key`, `page`, `limit`
- `GET /api-keys/:id` — get key by id
- `PUT /api-keys/:id` — update key
- `DELETE /api-keys/:id` — delete key

---

## Example payloads

### Create API Key
```json
{
  "project_name": "My Project"
}
```
*Note: `key`, `secret`, and `status` are auto-generated if not provided. Status defaults to "active".*

### Validate API Key
```json
{
  "key": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

## Response format

### Success
```json
{
  "success": true,
  "message": "...",
  "data": {}
}
```

### Error
```json
{
  "success": false,
  "message": "Error message"
}
```

---

## Setup
1. `npm install`
2. copy `.env.example` to `.env`
3. `npx sequelize-cli db:migrate`
4. `npm start`
