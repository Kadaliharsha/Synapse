# MindCare - Digital Healthcare Platform

**Transforming Mental Health Support with Modern Technology**

MindCare is a full-featured mental health management platform enabling individuals and professionals to connect, track well-being, and access support resources. Designed with security, accessibility, and scalability in mind, MindCare offers validated surveys, SOS alerts, community features, and rich analytics—all in one place.

---

## 🚀 Quick Overview

- **Spring Boot Backend** & **React Frontend**
- Modern, responsive UI built with Tailwind CSS
- Secure authentication, therapist & appointment management, emergency support, and much more

---

## 📦 Project Structure

```
Mindcare/
├── backend/          # Spring Boot Backend
│   ├── src/
│   ├── pom.xml
│   └── ...
└── frontend/         # React Frontend
    ├── src/
    ├── package.json
    └── ...
```

---

## 📋 Features

### Backend

- User authentication and authorization (JWT)
- Therapist profile & availability management
- Appointment scheduling and reminders
- Blog/content/resource management
- Emergency contact system
- SOS functionality (Twilio SMS integration)
- Feedback and progress tracking
- Crisis hotline management
- Analytics & admin dashboards

### Frontend

- Modern, responsive UI with Tailwind CSS
- User dashboard: surveys, appointments, progress charts
- Therapist dashboard: manage sessions, profiles, and client lists
- Blog creation and viewing, categorized resources
- Community groups: join, post, comment, report
- Emergency support (SOS button, contact management)
- Assessment tools with instant feedback

---

## 🧑‍💻 Technology Stack

### Backend

- Spring Boot 3.x
- Spring Security
- Spring Data JPA
- MySQL Database
- Twilio (for SMS notifications)
- Maven

### Frontend

- React 18
- Vite
- Tailwind CSS
- React Router
- Axios
- npm or yarn

---

## 🏗 Architecture

- **Frontend:** React (Vite) SPA, communicates with backend via REST APIs
- **Backend:** Spring Boot REST API, MySQL database
- **Authentication:** JWT-based
- **Notifications:** Twilio SMS, email via SendGrid or SMTP
- **Deployment:** Docker-ready, CI/CD via GitHub Actions

**Access Points:**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8080/api/v1/`
- Backend Health: `http://localhost:8080/actuator/health`

---

## ⚡ Setup Instructions

### Prerequisites

#### Backend
- Java 17+
- Maven 3.6+
- MySQL database

#### Frontend
- Node.js 16+
- npm or yarn

### Backend Setup

```bash
cd Mindcare/backend
```
- Configure database in `src/main/resources/application.properties`
- Run the application:
  ```bash
  mvn spring-boot:run
  ```

### Frontend Setup

```bash
cd Mindcare/frontend
```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the development server:
  ```bash
  npm run dev
  ```

---

## 📚 User & Admin

<details>
<summary>Expand for full details</summary>

### Users
1. **Registration & Login:** Email/password signup, confirmation, password reset.
2. **Profile:** Name, age, photo, location, emergency contacts.
3. **Survey:** Assess mental health, get instant, personalized recommendations.
4. **Emergency Contacts:** Add/edit/delete contacts, confirmation messages.
5. **Appointments:** View/book/cancel/reschedule, reminders via email/SMS.
6. **Community:** Join, post, comment, get notifications, report violations.
7. **Progress Tracking:** Charts, monthly trends, PDF export.
8. **SOS:** Send location-based alerts to contacts.

### Admins
9. **Therapist Management:** Add/update/remove, set availability, booking notifications.
10. **Hotline Management:** Add/update, location-based dashboards, inactivity alerts.
11. **Resource Content:** Upload/edit/remove articles, categorize for easy access.
12. **Analytics:** User engagement, trends, exportable data.
13. **Community Oversight:** Create/edit groups, appoint moderators, handle reports.

</details>

---

## 🗄 Database & API

- All API endpoints prefixed with `/api/v1/`
- Backend health check: `/actuator/health`
- See [`docs/api.md`](docs/api.md) for endpoint details

<details>
<summary>Sample Database Entities</summary>

- **User:** id, name, email, password, age, profile picture, location, emergency contacts
- **Therapist:** id, name, specialty, availability, profile, appointments
- **Appointment:** id, user_id, therapist_id, scheduled_time, status
- **Survey:** id, user_id, answers, result, timestamp
- **EmergencyContact:** id, user_id, name, phone
- **Group:** id, name, description, members, posts
- **Post:** id, group_id, user_id, content, timestamp
- **Resource/Blog:** id, title, content, category, author
</details>

---

## 🛠 Development Notes

- Project reorganized from nested structure for maintainability
- Functionality remains the same; organization improved

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome!

- Fork the repository
- Create your feature branch (`git checkout -b feature/AmazingFeature`)
- Commit your changes (`git commit -m 'Add some AmazingFeature'`)
- Push to the branch (`git push origin feature/AmazingFeature`)
- Open a Pull Request

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for guidelines.

---

## ❓ FAQ & Troubleshooting

- **How do I reset my password?**  
  Use the "Forgot Password" link on the login page.

- **How do I get help?**  
  Contact the team or open an issue.

- **What platforms are supported?**  
  Web app, responsive design for mobile.

---

## 📬 Contact

*Kadali Harshavardhan*  
- [LinkedIn](https://linkedin.com/in/Kadaliharsha)
- [Email](mailto:kadali.hrv@email.com)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

> *Mindcare: Because your mental well-being matters.*
