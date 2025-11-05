# Dr. Vilakazi Surgery Backend API

Backend API for the Dr. Vilakazi Surgery appointment booking system.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
npm install
```

### Environment Variables

Copy `.env` file and configure the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database
DB_PATH=./src/database/appointments.db

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=info@drvilakazisurgery.co.za
FROM_NAME=Dr. Vilakazi Surgery

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
FRONTEND_URL=http://localhost:5173
```

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

## 📊 Database

The application uses SQLite with the following tables:

- **doctors** - Doctor information and schedules
- **doctor_schedules** - Weekly doctor availability
- **patients** - Patient information
- **appointments** - Appointment bookings
- **appointment_exceptions** - Special date exceptions

## 🔗 API Endpoints

### Health Check
- `GET /health` - Server health status

### Doctors
- `GET /api/doctors` - Get all active doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/doctors/:id/availability?date=YYYY-MM-DD` - Get doctor availability

### Patients
- `POST /api/patients` - Create new patient
- `GET /api/patients/email/:email` - Get patient by email
- `PUT /api/patients/:id` - Update patient information

### Appointments
- `POST /api/appointments` - Create new appointment
- `GET /api/appointments/:id` - Get appointment by ID
- `GET /api/appointments/patient/:email` - Get patient appointments
- `PATCH /api/appointments/:id/cancel` - Cancel appointment
- `PATCH /api/appointments/:id/reschedule` - Reschedule appointment

### Availability
- `GET /api/availability` - Get availability for date range
- `GET /api/availability/today` - Get today's availability

## 📧 Email Notifications

The system automatically sends:
- Appointment confirmation emails
- Appointment reminders
- Cancellation confirmations

## 🛡️ Security Features

- Rate limiting (100 requests per 15 minutes)
- CORS protection
- Input validation
- SQL injection prevention
- XSS protection

## 📱 Testing

```bash
# Health check
curl http://localhost:3001/health

# Get doctors
curl http://localhost:3001/api/doctors

# Create appointment
curl -X POST http://localhost:3001/api/appointments \
  -H "Content-Type: application/json" \
  -d '{"patient":{"firstName":"John","lastName":"Doe","email":"john@test.com","phone":"5551234567"},"doctorId":1,"appointmentDate":"2025-11-10","appointmentTime":"09:00","appointmentType":"consultation","reasonForVisit":"Initial consultation","isNewPatient":true}'
```

## 📝 Database Schema

```sql
-- Doctors table
CREATE TABLE doctors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  specialty TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Appointments table
CREATE TABLE appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER NOT NULL,
  doctor_id INTEGER NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TEXT NOT NULL,
  duration_minutes INTEGER DEFAULT 30,
  appointment_type TEXT NOT NULL DEFAULT 'consultation',
  status TEXT DEFAULT 'scheduled',
  notes TEXT,
  reason_for_visit TEXT,
  is_new_patient BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients (id) ON DELETE CASCADE,
  FOREIGN KEY (doctor_id) REFERENCES doctors (id) ON DELETE CASCADE
);
```

## 🚨 Error Handling

The API returns appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `409` - Conflict (duplicate resource)
- `500` - Internal Server Error

## 📈 Monitoring

- Health check endpoint for monitoring
- Structured logging
- Error tracking
- Performance metrics (response times, request counts)

## 🔧 Development

### Database Migrations

```bash
npm run db:migrate
```

### Seeding Data

```bash
npm run db:seed
```

### Testing

```bash
npm test
```

## 📄 License

Proprietary - Dr. Vilakazi Surgery