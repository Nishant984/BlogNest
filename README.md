# 🌐 BlogNest – A MERN Blogging Platform 📝

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Clerk Auth](https://img.shields.io/badge/Auth-Clerk-orange)
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-38B2AC)

**BlogNest** is a full-featured blogging platform powered by the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and enhanced with **Clerk** authentication. Users can easily write, edit, and share blog posts with an engaging and seamless experience.

---

## 🚀 Key Features

- ✍️ Create, edit, and delete blog posts  
- 👤 Secure user authentication (Register/Login via Clerk)  
- 🔐 Role-based authorization implemented across the stack  
- 🗂️ Categorize posts and apply filters  
- 💬 Commenting system  
- 📈 Post view count tracking  
- 🔄 Infinite scroll with filters  
- 📱 Fully responsive design  
- 🔎 Smart search (React 19) with URL param syncing  
- 🧑🏻 User profile section  
- 📊 Analytics: posts, comments, saved items, and stats  
- 🔃 Skeleton loading animations for profile and post sections

---

## 🛠️ Tech Stack

### 🖥️ Frontend (`client/`)
- **React.js**  
- **React Router DOM**  
- **TailwindCSS**  
- **Framer Motion**  
- **Clerk (Auth)**  
- **Axios**  
- **ImageKit** *(Image Optimization)*  

### 🔧 Backend (`backend/`)
- **Node.js + Express.js**  
- **MongoDB with Mongoose**  
- **JWT** *(Authentication)*  
- **Bcrypt** *(Password Hashing)*  

---

## 📁 Folder Structure

```bash
MERN-BLOGGING-PLATFORM/
├── backend/
│   ├── controllers/
│   ├── lib/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── index.js
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── skeltons/
│   │   │   ├── ui/
│   │   │   └── *.jsx (Post, Comment, Profile components)
│   │   ├── layouts/
│   │   ├── lib/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── .env
│
└── README.md


## 📁 Folder Structure

```txt
MERN-BLOGGING-PLATFORM/
│
├── backend/
│   ├── controllers/
│   │   ├── comment.controller.js
│   │   ├── post.controller.js
│   │   ├── user.controller.js
│   │   ├── analytics.controller.js
│   │   └── webhook.controller.js
│   │
│   ├── lib/
│   │   └── connectDB.js
│   │
│   ├── middlewares/
│   │   └── increaseVisit.js
│   │
│   ├── models/
│   │   ├── comment.model.js
│   │   ├── post.model.js
│   │   └── user.model.js
│   │
│   ├── routes/
│   │   ├── analytics.route.js
│   │   ├── comment.route.js
│   │   ├── post.route.js
│   │   ├── user.route.js
│   │   └── webhook.route.js
│   │
│   ├── .env
│   ├── .gitignore
│   ├── index.js
│   ├── package.json
│   └── package-lock.json
│
├── client/
│   ├── public/
│   ├── node_modules/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   │   ├── skeltons/
│   │   │   │   │   ├── SkeletonCircle.jsx
│   │   │   │   │   ├── SkeletonRect.jsx
│   │   │   │   │   └── SkeletonText.jsx
│   │   │   │   └── ui/
│   │   │   │       ├── background-lines.jsx
│   │   │   │       ├── FeaturedPosts.jsx
│   │   │   │       ├── beckground-breams.tsx
│   │   │   │       ├── flip-words.jsx
│   │   │   │       ├── meteors.jsx
│   │   │   │       ├── placeholders-and-vanish-input.jsx
│   │   │   │       ├── scroll-to-top.jsx
│   │   │   │       ├── text-hover-effect.jsx
│   │   │   │       └── typewriter-effect.jsx
│   │   │   │ 
│   │   │   │ 
│   │   │   ├── Comment.jsx
│   │   │   ├── Comments.jsx
│   │   │   ├── FeaturedPosts.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HeatmapCalender.jsx
│   │   │   ├── Imag.jsx
│   │   │   ├── MainCategories.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PostList.jsx
│   │   │   ├── PostListItem.jsx
│   │   │   ├── PostMenuActions.jsx
│   │   │   ├── Search.jsx
│   │   │   ├── SharePost.jsx
│   │   │   ├── SideMenu.jsx
│   │   │   ├── SideMenuSearch.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── Upload.jsx
│   │   │   ├── UserBioEditor.jsx
│   │   │   ├── WeeklyStatsChart.jsx
│   │   │   └── YearSelector.jsx
│   │   │
│   │   ├── layouts/
│   │   │   └── MainLayout.jsx
│   │   │
│   │   ├── lib/
│   │   │   ├── shareLinks.js
│   │   │   ├── utils.ts
│   │   │   └── validateInput.js
│   │   │
│   │   ├── routes/
│   │   │   ├── About.jsx
│   │   │   ├── Homepage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── NotFound.jsx
│   │   │   ├── PostListPage.jsx
│   │   │   ├── PublicProfilePage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── SinglePostPage.jsx
│   │   │   ├── UserProfilePage.jsx
│   │   │   └── Write.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .env
│   ├── .gitignore
│   ├── index.html
│   ├── eslint.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   ├── package.json
│   ├── package-lock.json
│   └── README.md
│
└── README.md
```