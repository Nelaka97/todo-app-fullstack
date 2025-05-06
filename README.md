# 📝 Todo App Fullstack

A powerful full-stack Todo application built with **Nuxt 3 (Vue.js 3)** and **Laravel**. This app demonstrates clean design, smooth transitions, dark mode support, toast notifications, and efficient frontend-backend communication through a RESTful API.

---

## 🚀 Features

- ✅ Add, update, toggle, and delete tasks
- 📑 Task filtering by **All / Active / Completed**
- 🌗 Dark mode with localStorage persistence
- 🔄 Smooth Vue transitions and animations
- 🔔 Toast alerts for user actions (success/error)
- ⏳ Full-screen loading overlay on app launch
- 🕒 Date & time formatting
- 📄 Pagination (5 tasks per page)
- 📦 Monorepo: Frontend and Backend in one project

---

## 🛠️ Technologies Used

### Frontend (Nuxt 3)
- Nuxt.js 3
- Tailwind CSS
- Vue Toastification
- Font Awesome
- Axios

### Backend (Laravel)
- Laravel 10.x
- MySQL
- RESTful API design

---

## 📁 Project Structure

todo-app-fullstack/
├── backend/ # Laravel API backend
└── frontend/ # Nuxt 3 frontend app

# 🧾 Backend - Laravel API for Todo App

This is the backend API service for the Todo App built with Laravel.

## 🔧 Requirements

- PHP ≥ 8.1
- Composer
- MySQL or MariaDB

## 🚀 Setup Instructions

**Clone the repository and navigate to the backend folder:**

- Install PHP dependencies - composer install
- Create a .env file - cp .env.example .env

<pre lang="md"> ### Update your `.env` file Replace the database credentials section with your local setup: ```env DB_CONNECTION=mysql DB_HOST=127.0.0.1 DB_PORT=3306 DB_DATABASE=todo_app DB_USERNAME=root DB_PASSWORD=your_password ``` </pre>

- Generate application key - php artisan key:generate

- Run migrations - php artisan migrate

- Serve the app - php artisan serve

- Your backend should now be running at http://127.0.0.1:8000

# 🧾 Frontend - Nuxt 3 frontend for Todo App

This is the frontend for the Todo App built with Laravel.

## 🔧 Requirements

- Node.js ≥ 18
- npm

## 🚀 Setup Instructions

**Clone the repository and navigate to the frontend folder:**

- cd frontend

- npm install (Install dependencies)

- cp .env.example .env (Create a .env file)

- NUXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000 (Add this to your .env file)

- npm run dev (Run the development server)

- Your frontend will be available at http://localhost:3000


MIT © Nelaka