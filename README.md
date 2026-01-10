# Synapse 🧠 
> **Enterprise-Grade Mental Health Management Platform**

![Java](https://img.shields.io/badge/Java-17%2B-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.4.0-6DB33F?style=for-the-badge&logo=spring&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-Secure_Auth-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

---

## 💡 Overview

**Synapse** is a modern, scalable digital healthcare platform designed to bridge the gap between mental health professionals and individuals seeking support. Built with a robust **Spring Boot** backend and a responsive **React** frontend, it delivers a secure, seamless experience for appointment booking, crisis management, and progress tracking.

> *"The greatest weapon against stress is our ability to choose one thought over another."*

---

## 🚀 Key Features

### 🛡️ For Users
- **Secure Authentication:** JWT-based login with role-based access control.
- **Therapist Discovery:** Browse licensed professionals and book appointments instantly.
- **Crisis Support (SOS):** One-tap emergency alerts via **Twilio SMS integration**.
- **Self-Assessment:** Validated mental health surveys with instant, visualized feedback.
- **Progress Tracking:** Beautiful analytics charts to monitor well-being over time.

### 👩‍⚕️ For Therapists & Admins
- **Practice Management:** Set availability, manage client sessions, and view history.
- **Content Management:** Publish blogs and educational resources.
- **Analytics Dashboard:** Insights into user engagement and platform usage.

---

## 🛠️ Technology Stack

| Component | Technology | Description |
|-----------|------------|-------------|
| **Backend** | Spring Boot 3 | RESTful API, Security, Business Logic |
| **Database** | MySQL | Relational Data Persistence |
| **Security** | Spring Security + JWT | Stateless Authentication & Authorization |
| **Frontend** | React + Vite | Fast, Component-Based UI |
| **Styling** | Tailwind CSS | Utility-First, Responsive Design |
| **Icons** | React Icons | Modern Iconography |
| **Communication** | Twilio API | SMS & Emergency Alerts |

---

## 📦 Project Architecture

The project follows a clean, layered architecture separating concerns for maintainability and scalability:

```
Synapse/
├── backend/                  # Spring Boot Service
│   ├── src/main/java/com/synapse/backend/
│   │   ├── config/           # Security & App Config
│   │   ├── controller/       # REST API Endpoints
│   │   ├── dto/              # Data Transfer Objects
│   │   ├── model/            # JPA Entities
│   │   ├── repository/       # Data Access Layer
│   │   └── service/          # Business Logic
│   └── ...
└── frontend/                 # React SPA
    ├── src/
    │   ├── components/       # Reusable UI Components
    │   ├── pages/            # View/Route Controllers
    │   ├── api/              # Axios Interceptors
    │   └── assets/           # Static Media
    └── ...
```

---

## ⚡ Getting Started

### Prerequisites
- **Java JDK 17+**
- **Node.js 16+** & **npm**
- **MySQL Server**

### 1. Backend Setup
```bash
cd backend
# Update src/main/resources/application.properties with your MySQL creds
mvn spring-boot:run
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to view the application.

---

## 👥 Contributing

We welcome contributions! Please follow these steps:
1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
  <b>Synapse</b> &bull; Built with ❤️ by Kadali Harshavardhan
</p>
