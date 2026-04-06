# AxeDz Auth Service

A production-ready authentication and user management service built with Node.js, Express, and PostgreSQL.

## Features

- User registration and login (email/phone + password)
- Google OAuth authentication
- JWT-based authentication with refresh tokens
- Password reset via email OTP
- SMS verification for phone numbers
- Profile management with image upload to S3
- User and contact CRUD operations
- Rate limiting and security middleware
- Logging with Winston
- Docker support

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT, Passport.js (Google OAuth)
- **Storage**: AWS S3 or compatible (Backblaze B2, etc.)
- **Email**: Nodemailer
- **SMS**: ooredoo api provider
- **Logging**: Winston
- **Security**: Helmet, CORS, XSS protection, rate limiting



## API Documentation

See `API_DOCUMENTATION.md` for detailed API endpoints and usage.


```

## Project Structure

```
├── app/
│   ├── Controllers/     # Route handlers
│   ├── Middlewares/     # Express middlewares
│   ├── Services/        # Business logic
│   ├── Validators/      # Input validation
│   ├── Resource/        # Response transformers
│   ├── Error/           # Custom error classes
│   └── s3/              # S3 utilities
├── config/              # Configuration files
├── db/                  # Database migrations and models
├── public/              # Static files and email templates
├── Routes/              # API routes
├── logs/                # Application logs
├── Dockerfile           # Docker configuration
├── .env.example         # Environment variables template
└── API_DOCUMENTATION.md # API docs
```
