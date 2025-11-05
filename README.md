# Dr. Vilakazi Surgery Website

A professional, modern medical website for Dr. Vilakazi's general surgery practice built with Vite + React.

## 🏥 Overview

This website showcases Dr. Vilakazi's general surgery practice with comprehensive information about services, doctors, and patient care. The site features a clean, professional medical design with emergency information prominently displayed.

## ✨ Features

### Frontend
- **Landing Page**: Hero section, emergency information, services overview, location, and contact form
- **Navigation**: Responsive navigation with mobile hamburger menu
- **Pages**: Home, About, Services, Doctors, Blog, Book Appointment, Contact
- **Contact Form**: Validated contact form with real-time validation
- **Emergency Information**: Prominent 24/7 emergency contact details
- **Interactive Map**: Embedded Google Maps for practice location
- **Blog System**: Medical insights and patient education articles
- **Responsive Design**: Mobile-first approach with breakpoints at 768px and 1024px
- **Professional Medical Aesthetic**: Blue/white color scheme with clean design

### Appointment Booking System
- **Online Booking**: Step-by-step appointment booking interface
- **Real-time Availability**: Live time slot availability management
- **Doctor Selection**: Choose from available surgeons and their schedules
- **Patient Management**: Secure patient information storage and management
- **Email Notifications**: Automated appointment confirmations and reminders
- **Appointment Types**: Consultation, follow-up, and procedure scheduling
- **Calendar Integration**: Doctor schedule management with availability tracking
- **Booking Management**: Cancel and reschedule appointment functionality

## 🛠️ Technology Stack

### Frontend
- **Framework**: Vite + React
- **Routing**: React Router DOM
- **Styling**: CSS Modules with CSS variables for consistent theming
- **Build Tool**: Vite
- **Package Manager**: npm

### Backend
- **Server**: Node.js + Express
- **Database**: SQLite with scalable schema design
- **API**: RESTful API with comprehensive endpoints
- **Authentication**: JWT-based security
- **Email**: Nodemailer for appointment notifications
- **Rate Limiting**: Express rate limiter for API protection
- **Validation**: Express-validator for input validation

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd DrVilakazi_Surgery
```

2. Install dependencies:
```bash
npm install
```

3. Set up the backend (for appointment booking):
```bash
cd backend
npm install
cp .env.example .env  # Configure your environment variables
```

### Development

Start both development servers:

**Frontend:**
```bash
npm run dev
```
The frontend will be available at `http://localhost:5173/`

**Backend (in separate terminal):**
```bash
cd backend
npm run dev
```
The backend API will be available at `http://localhost:3001/`

### Production Build

Create an optimized production build:
```bash
npm run build
```

The build files will be generated in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
npm run preview
```

## 📁 Project Structure

```
DrVilakazi_Surgery/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navigation/      # Main navigation component
│   │   ├── Footer/          # Footer component
│   │   ├── Hero/            # Landing page hero
│   │   ├── EmergencyAlert/  # Emergency information display
│   │   ├── Services/        # Services overview component
│   │   ├── Location/        # Location and map component
│   │   ├── ContactForm/     # Contact form with validation
│   │   └── UI/              # Basic UI components (Button, Card)
│   ├── pages/               # Individual page components
│   │   ├── Home/            # Landing page
│   │   ├── About/           # About page
│   │   ├── Services/        # Services page
│   │   ├── Doctors/         # Doctors page
│   │   ├── Blog/            # Blog page with posts
│   │   ├── Contact/         # Contact page
│   │   └── NotFound/        # 404 page
│   ├── App.jsx              # Main app with routing
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles and CSS variables
├── index.html               # HTML entry file
├── package.json             # Project dependencies and scripts
├── vite.config.js           # Vite configuration
└── README.md                # This file
```

## 🎨 Design System

### Color Palette

- **Primary Blue**: #1976d2
- **Light Blue**: #e3f2fd
- **White**: #ffffff
- **Text Dark**: #333333
- **Text Light**: #666666
- **Alert Red**: #d32f2f
- **Success Green**: #4caf50

### Typography

- System fonts for optimal readability
- Responsive font sizes (16px base, larger on desktop)
- Clean, professional medical aesthetic

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 📱 Pages

### Home (/)
Hero section with emergency information, services overview, location details, and contact form.

### About (/about)
Practice history, mission, team information, and journey timeline.

### Services (/services)
Comprehensive surgical services information with preparation guidelines, FAQ, and insurance details.

### Doctors (/doctors)
Surgeon profiles, credentials, and patient testimonials.

### Blog (/blog)
Medical articles and patient education with category filtering and search.

### Contact (/contact)
Extended contact information, appointment types, interactive map, and comprehensive contact form.

## 🚀 Deployment

This application is optimized for static hosting and can be deployed to:

- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

The `dist/` folder contains all necessary files for deployment.

## 📞 Contact Information

- **Practice**: Dr. Vilakazi Surgery Center
- **Address**: 123 Medical Plaza, Suite 100, Johannesburg, SA 2000
- **Phone**: (555) 123-4567
- **Emergency**: (555) 123-4568
- **Email**: info@drvilakazisurgery.co.za

## 📄 License

This project is proprietary and belongs to Dr. Vilakazi Surgery.