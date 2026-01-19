# 📚 Library Management System - Frontend

A modern React frontend for the Middle-earth Library Management System with role-based access control and Lord of the Rings theming! 🧙‍♂️

![React](https://img.shields.io/badge/React-18.x-blue) ![License](https://img.shields.io/badge/License-MIT-green)

**Backend Repository:** [library-management-api](https://github.com/BregornOriginal/library-management-api)

---

## 🎯 Overview

React application providing distinct interfaces for two user roles:

- **Librarians (🧙‍♂️)**: Full control over books (CRUD), analytics dashboard, overdue tracking
- **Members (🏹)**: Browse books, borrow/return functionality, personal dashboard

**Key Features:**
- JWT authentication with role-based access
- Real-time book availability tracking
- Advanced search (title, author, genre)
- Responsive design (mobile, tablet, desktop)
- Beautiful UI with animations and gradients
- Comprehensive error handling

---

## 🛠️ Tech Stack

React 18 • React Router v6 • Axios • Context API • CSS3

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create environment file (optional)
cp env.example .env.local
# Edit if backend runs on different port

# Start development server
npm start  # Opens at http://localhost:3001
```

**Prerequisites:**
- Node.js v14+
- Backend API running on `http://localhost:3000`

### Backend Repository
👉 **[Library Management API](https://github.com/BregornOriginal/library-management-api)**

```bash
# Clone and start the backend
git clone https://github.com/BregornOriginal/library-management-api.git
cd library-management-api
bundle install
rails db:create db:migrate db:seed
rails server
```

---

## ✨ Features

### Authentication & Authorization
- JWT-based login/signup/logout
- Role-based access (Librarian vs Member)
- Protected routes
- Persistent sessions with localStorage
- Demo login buttons for testing

### Books Management
- Browse with responsive grid layout
- Search by title, author, or genre
- Real-time availability badges
- **Members**: Borrow books (can't borrow twice)
- **Librarians**: Full CRUD operations

### Dashboards

**Librarian Dashboard:**
- Stats cards (total books, borrowed, due today, overdue)
- Overdue books table with member contact info
- Quick actions and refresh

**Member Dashboard:**
- Personal stats (borrowed, overdue counts)
- Borrowed books cards with due dates
- Color-coded status (good/warning/overdue)
- One-click return functionality
- Helpful tips section

### UI/UX
- Fully responsive design
- Smooth animations and hover effects
- Loading states and error messages
- Empty states with helpful guidance
- Color-coded indicators (🟢 🟡 🔴)

---

## 📡 API Integration

### Authentication
```
POST   /signup   - Register user
POST   /login    - Get JWT token
DELETE /logout   - Invalidate token
```

## 🧪 Testing Guide

### Test as Librarian (Gandalf 🧙‍♂️)
```
Email: gandalf@middleearth.com
Password: youshallnotpass
```

1. Login → See librarian dashboard
2. Check stats and overdue books table
3. Go to Books → Add/Edit/Delete books
4. Search for books by title/author/genre

### Test as Member (Frodo 🏹)
```
Email: frodo@shire.com
Password: thering123
```

1. Login → See member dashboard
2. Go to Books → Borrow a book
3. Return to Dashboard → View borrowed book
4. Click "Return Book" button
5. Try searching for books

### Test Overdue Status (Aragorn)
```
Email: aragorn@ranger.com
Password: gondor123
```

1. Login → Dashboard shows overdue warning
2. See overdue book highlighted in red
3. Check "X days overdue" status

---

## 🧙‍♂️ Demo Credentials

### Librarians (Full Access)

| Name | Email | Password |
|------|-------|----------|
| Gandalf | gandalf@middleearth.com | youshallnotpass |
| Elrond | elrond@rivendell.com | rivendell123 |
| Galadriel | galadriel@lothlorien.com | lothlorien123 |

### Members (Standard Access)

| Name | Email | Password | Status |
|------|-------|----------|--------|
| Frodo | frodo@shire.com | thering123 | Good standing |
| Samwise | samwise@shire.com | po-tay-toes | Good standing |
| Aragorn | aragorn@ranger.com | gondor123 | Has overdue book |
| Legolas | legolas@mirkwood.com | arrows123 | Good standing |

---

## 🐛 Common Issues

**Dashboard link not showing?**
- Make sure you're logged in
- Check browser console for errors

**401/403 errors?**
- Logout and login again for fresh token
- Verify backend is running on port 3000

**Can't connect to backend?**
```bash
# Check backend is running
cd ../library-management-api
rails server

# Update frontend .env.local if needed
echo "REACT_APP_API_URL=http://localhost:3000" > .env.local
npm start
```

---

## 📄 License

MIT License

---

## 🙏 Acknowledgments

- Lord of the Rings theme by J.R.R. Tolkien
- Built with React and modern web technologies

---

**Built with ❤️ and a love for Middle-earth** 🧙‍♂️📚🏹

*"All we have to decide is what to do with the time that is given us." - Gandalf*
