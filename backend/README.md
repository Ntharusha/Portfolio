# Portfolio Backend

This is the Node.js backend for the portfolio application.

## Features
- Contact form submission with MongoDB storage.
- Email notification for new messages using Nodemailer.
- Express.js API with TypeScript.

## Prerequisites
- Node.js installed
- MongoDB installed and running (locally or MongoDB Atlas)

## Getting Started

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your MongoDB URI and Email credentials.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## API Endpoints

### POST /api/contact
Submit a visitor's contact message.
- Body: `{ name, email, subject, message }`
- Returns: `{ message: "Message sent successfully!" }`
