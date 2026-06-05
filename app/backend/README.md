# PayPill Backend API

A comprehensive backend API for the PayPill Healthcare AI application.

## Features

- **Authentication**: JWT-based authentication with secure password hashing
- **User Management**: User registration, login, profile management
- **Health Profile**: Complete health profile management (conditions, medications, allergies, etc.)
- **Healthcare Providers**: Provider search, filtering, availability checking
- **Appointments**: Appointment booking, rescheduling, cancellation
- **Pharmacies**: Pharmacy search, medication orders, refill requests
- **Messaging**: In-app messaging between patients and providers
- **Notifications**: Real-time notifications for appointments, medications, etc.
- **AI Recommendations**: Personalized health recommendations and insights

## Tech Stack

- **Runtime**: Node.js with Express
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: express-validator
- **Security**: helmet, cors

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/paypill
JWT_SECRET=your-super-secret-key
FRONTEND_URL=http://localhost:5173
```

4. Start the development server:
```bash
npm run dev
```

### Seeding the Database

To populate the database with sample data:

```bash
npm run seed
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/password` - Change password
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users/dashboard` - Get dashboard data
- `GET /api/users/stats` - Get user statistics
- `GET /api/users/health-profile` - Get health profile
- `PUT /api/users/health-profile` - Update health profile

### Healthcare Providers
- `GET /api/providers` - Get all providers
- `GET /api/providers/:id` - Get provider details
- `GET /api/providers/:id/availability` - Get provider availability
- `GET /api/providers/specialties` - Get all specialties

### Appointments
- `GET /api/appointments` - Get user appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/:id/cancel` - Cancel appointment
- `PUT /api/appointments/:id/reschedule` - Reschedule appointment

### Pharmacies
- `GET /api/pharmacies` - Get all pharmacies
- `GET /api/pharmacies/nearby` - Get nearby pharmacies
- `GET /api/pharmacies/:id` - Get pharmacy details
- `POST /api/pharmacies/:id/order` - Place medication order
- `POST /api/pharmacies/:id/refill` - Request refill

### Messages
- `GET /api/messages` - Get user messages
- `POST /api/messages` - Send message
- `PUT /api/messages/:id/read` - Mark message as read

### Notifications
- `GET /api/notifications` - Get user notifications
- `PUT /api/notifications/:id/read` - Mark notification as read
- `PUT /api/notifications/read-all` - Mark all as read

### Medications
- `GET /api/medications/current` - Get current medications
- `GET /api/medications/orders` - Get medication orders
- `POST /api/medications/refills` - Request refill

### AI
- `GET /api/ai/recommendations` - Get AI recommendations
- `GET /api/ai/insights` - Get health insights
- `GET /api/ai/health-summary` - Get health summary
- `GET /api/ai/risk-assessment` - Get risk assessment
- `GET /api/ai/savings` - Get savings opportunities

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run seed` - Seed database with sample data

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Express middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── types/           # TypeScript types
│   ├── utils/           # Utility functions
│   └── server.ts        # Entry point
├── .env.example         # Environment variables template
├── package.json
├── tsconfig.json
└── README.md
```

## License

MIT
