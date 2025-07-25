# Frontend of BlogNest 🎈

---

## 🛠️ Tech Stack - Frontend (`client/`)
- React.js  
- Axios  
- React Router DOM  
- TailwindCSS  
- Motion
- Clerk
- ImageKit(for Image Optimization), browser-image-compression and for Image db.

---

## 🧪 Getting Started

```txt
1. Install dependencies

cd client
npm install 

2. Setup .env 
  client :-
    VITE_IK_URL_ENDPOINT=
    VITE_IK_PUBLIC_KEY=
    VITE_CLERK_PUBLISHABLE_KEY=
    VITE_API_URL=
  backend :-
    MONGO=
    CLERK_WEBHOOK_SECRET=
    CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=

    CLIENT_URL=

    IK_URL_ENDPOINT =
    IK_PUBLIC_KEY =
    IK_PRIVATE_KEY =

Note : don't forget add clerk webhook :D

3. Run development server

npm run dev

Other dependencies and component Used ("For educational purpose")

npm i react-router-dom
npm install @imagekit/react
npm install @clerk/clerk-react
npm i motion clsx tailwind-merge
npm i react-quill-new 
npm i svix
npm i body-parser
npm i @clerk/express
npm i @tanstack/react-query
npm i axios
npm i cors
npm i react-toastify
npm i react-infinite-scroll-component
npm i timeago.js
npm i browser-image-compression
npm install validator
npm list react-markdown
npm install he
npm install react-calendar-heatmap
npm install date-fns
npm install recharts

```

## 📌 Project Status

🧬 Project is completed, and i will be add new fetures later.

<img src="https://i.pinimg.com/originals/67/60/90/6760900d6e002a489f5a9b43cf3c280f.gif" alt="Under Construction" width="600" height="430"/>


---

## 📁 Folder Structure

```txt
client/
├── public/
├── node_modules/
│
├── src/
│   ├── components/
│   │   │   ├── skeltons/
│   │   │   │   ├── SkeletonCircle.jsx
│   │   │   │   ├── SkeletonRect.jsx
│   │   │   │   └── SkeletonText.jsx
│   │   │   └── ui/
│   │   │       ├── background-lines.jsx
│   │   │       ├── FeaturedPosts.jsx
│   │   │       ├── beckground-breams.tsx
│   │   │       ├── flip-words.jsx
│   │   │       ├── meteors.jsx
│   │   │       ├── placeholders-and-vanish-input.jsx
│   │   │       ├── scroll-to-top.jsx
│   │   │       ├── text-hover-effect.jsx
│   │   │       └── typewriter-effect.jsx
│   │   │ 
│   │   │ 
│   │   ├── Comment.jsx
│   │   ├── Comments.jsx
│   │   ├── FeaturedPosts.jsx
│   │   ├── Footer.jsx
│   │   ├── HeatmapCalender.jsx
│   │   ├── Imag.jsx
│   │   ├── MainCategories.jsx
│   │   ├── Navbar.jsx
│   │   ├── PostList.jsx
│   │   ├── PostListItem.jsx
│   │   ├── PostMenuActions.jsx
│   │   ├── Search.jsx
│   │   ├── SharePost.jsx
│   │   ├── SideMenu.jsx
│   │   ├── SideMenuSearch.jsx
│   │   ├── StatCard.jsx
│   │   ├── Upload.jsx
│   │   ├── UserBioEditor.jsx
│   │   ├── WeeklyStatsChart.jsx
│   │   └── YearSelector.jsx
│   │
│   ├── layouts/
│   │   └── MainLayout.jsx
│   │
│   ├── lib/
│   │   ├── shareLinks.js
│   │   ├── utils.ts
│   │   └── validateInput.js
│   │
│   ├── routes/
│   │   ├── About.jsx
│   │   ├── Homepage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── NotFound.jsx
│   │   ├── PostListPage.jsx
│   │   ├── PublicProfilePage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── SinglePostPage.jsx
│   │   ├── UserProfilePage.jsx
│   │   └── Write.jsx
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .env
├── .gitignore
├── index.html
├── eslint.config.js
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
├── package.json
├── package-lock.json
└── README.md
```
---