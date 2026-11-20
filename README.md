# Raah-e-Ishq-o-Hidayat (راہِ عشق و ہدایت) — Islamic Learning & Reflection Platform (PWA)

> *"Where Every Heart Finds Guidance"*

Raah-e-Ishq-o-Hidayat is an elegant, modern, installable Progressive Web App (PWA) and Quranic reflection platform designed with an emerald green, ivory, and subtle gold design system.

---

## 📱 Progressive Web App (PWA) Features

- **Installable on All Platforms:** One-click installation on Android (Chrome), Desktop (Chrome / Edge), and iOS (Safari "Add to Home Screen").
- **Standalone App Experience:** Launches full-screen without browser address bars or navigation controls.
- **Offline Resilience:** Service Worker precaches the application shell and critical static resources; displays an elegant, branded offline page (`offline.html`) when network connectivity is lost.
- **Cache Security & Privacy:** Strictly excludes private user tokens, authentication requests, and personal reflection journals (`/api/auth`, `/api/journal`) from persistent caches.
- **Auto-Update Cycle:** Stale-while-revalidate strategy updates cached assets automatically when new versions are deployed.

---

## 🏗️ Architecture & Technology Stack

- **Frontend:** HTML5, CSS3 (Custom Design Tokens, Responsive Grids), Vanilla JavaScript (Modular ES6+)
- **PWA:** Web App Manifest (`manifest.json`), Service Worker (`service-worker.js`), Maskable Icons
- **Backend:** Node.js, Express.js REST API
- **Database:** PostgreSQL with Parameterized SQL Queries & Resilient In-Memory Fallback
- **Security:** bcryptjs (Salted Password Hashing), jsonwebtoken (JWT Auth), Safe CORS, Input Validation
- **Typography:** Amiri (Arabic Uthmani Script), Noto Nastaliq Urdu, Plus Jakarta Sans

---

## 📁 Project Structure

```
NOOR/
├── manifest.json           # PWA Web App Manifest (standalone, theme-color #2D7A4F)
├── service-worker.js       # PWA Service Worker (caching, offline fallback, security rules)
├── offline.html            # Branded Offline Fallback Page
├── assets/
│   └── icons/
│       ├── icon-192.png            # Standard PWA Icon (192x192)
│       ├── icon-512.png            # High-Resolution PWA Icon (512x512)
│       └── icon-512-maskable.png   # Android Maskable PWA Icon (512x512 safe zone)
├── index.html              # Premium Homepage (9 Interactive Sections)
├── quran.html              # Al-Quran Module (114 Surahs, Synchronized Recitation, Urdu Translation)
├── azkar.html              # Daily Azkar Module (Morning, Evening, After Salah, Sleep, General)
├── duas.html               # Daily Duas Library (12 Masnoon Categories, Copy, Audio, Share)
├── topics.html             # Quran Topic Explorer (15 Curated Life Themes & Tadabbur Prompts)
├── journal.html            # Quran Reflection Journal (Private Personal Tadabbur, Drafts, Export)
├── journey.html            # My Quran Journey Dashboard (Reading Progress, Bookmarks, 30 Juz Tracker)
├── settings.html           # Settings & Preferences
├── css/
│   ├── style.css           # Core Design System (Tokens, Themes, Sections 1–32)
│   └── responsive.css      # Responsive Rules for Desktop, Tablet, and Mobile
├── js/
│   ├── main.js             # Site-wide Component Injection, PWA Manager, Search Modal, Toast
│   ├── quran.js            # Quran Engine, Audio Recitation Player, Listen & Follow
│   ├── azkar.js            # Interactive Azkar Counter, Filters, Daily Progress
│   ├── duas.js             # Duas Library, Copy Arabic/Urdu, Category Filter
│   ├── topics.js           # 15 Curated Quranic Topics & Verse Explorers
│   ├── journal.js          # Reflection Journal CRUD Engine & Word Counter
│   ├── journey.js          # Journey Dashboard, Reading Tracker & Timeline
│   └── settings.js         # Settings & Personalization Controller
├── backend/
│   ├── server.js           # Express Server & Route Mounting
│   ├── package.json        # Dependencies & Scripts
│   ├── config/
│   │   └── database.js     # PostgreSQL Pool & Parameterized Query Adapter
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT Verification & Optional Auth
│   │   ├── validateRequest.js  # Input Validation & Sanitization
│   │   └── errorHandler.js     # Centralized Error Handlers
│   ├── models/
│   │   ├── User.js             # User Accounts
│   │   ├── Quran.js            # 114 Surahs & Reciters
│   │   ├── Azkar.js            # Azkar Categories & Items
│   │   ├── Dua.js              # Masnoon Duas
│   │   ├── Topic.js            # Curated Themes
│   │   ├── Journal.js          # Private Reflections
│   │   ├── Bookmark.js         # Saved Ayat
│   │   ├── Journey.js          # Reading & Azkar Progress
│   │   └── ContentReview.js    # Source Attribution & Verification
│   ├── controllers/            # Request Handlers for each resource
│   ├── routes/                 # REST API Endpoints
│   └── db/
│       ├── schema.sql          # 18 PostgreSQL Tables & Indexes
│       └── seed.sql            # Verified Initial Seed Data & Sources
├── .env.example            # Environment Configuration Template
└── README.md
```
│   │   └── ContentReview.js    # Source Attribution & Verification
│   ├── controllers/            # Request Handlers for each resource
│   ├── routes/                 # REST API Endpoints
│   └── db/
│       ├── schema.sql          # 18 PostgreSQL Tables & Indexes
│       └── seed.sql            # Verified Initial Seed Data & Sources
├── .env.example            # Environment Configuration Template
└── README.md
```

---

## 🚀 Quick Setup & Installation

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18.0 or higher)
- [PostgreSQL](https://www.postgresql.org/) (v14 or higher)

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Update your database credentials and a strong random `JWT_SECRET`.

### 3. Initialize PostgreSQL Database
Create the database and execute the migrations:
```bash
# Create database in PostgreSQL
createdb -U postgres noor_db

# Run schema and seed scripts
psql -U postgres -d noor_db -f backend/db/schema.sql
psql -U postgres -d noor_db -f backend/db/seed.sql
```

### 4. Install Dependencies & Start the Backend
```bash
cd backend
npm install
npm start
```
The server will run on `http://localhost:3000` and automatically serve both the REST API and the frontend.

---

## 📡 REST API Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Description | Auth |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Create a new user account (optional signup) | None |
| `POST` | `/api/auth/login` | Sign in with email and password, receives JWT | None |
| `GET` | `/api/auth/me` | Retrieve authenticated user profile | Required |
| `POST` | `/api/auth/logout` | Session logout | Optional |

### 📖 Al-Quran (`/api/quran`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/quran/surahs` | List all 114 Surahs with metadata |
| `GET` | `/api/quran/surahs/:id` | Get single Surah with verified Fateh Muhammad Jalandhry translation |
| `GET` | `/api/quran/reciters` | List verified reciters (Alafasy, AbdulBaset, Husary, Shatri) |
| `GET` | `/api/quran/audio?reciter=X&surah=Y&ayah=Z` | Get streaming audio URL from EveryAyah CDN |
| `GET` | `/api/quran/sources` | Content sources and verification review logs |

### 🤲 Daily Azkar (`/api/azkar`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/azkar/categories` | List 5 Azkar categories (Morning, Evening, Prayer, Sleep, General) |
| `GET` | `/api/azkar?category=morning` | List authentic Azkar with counts, Arabic, and Urdu |
| `GET` | `/api/azkar/:id` | Get specific Azkar item by ID |

### 🌙 Daily Duas (`/api/duas`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/duas` | List authentic Masnoon supplications |
| `GET` | `/api/duas?category=home&q=bismillah` | Search and filter Duas |

### 📚 Quran Topics (`/api/topics`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/topics` | List 15 curated life themes |
| `GET` | `/api/topics/:id` | Get specific topic with curated Ayat and reflection prompt |

### 📓 Personal Journal (`/api/journal`)
*Reflections are private to each user and protected by authentication / local session.*
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/journal` | Retrieve user's private reflections |
| `POST` | `/api/journal` | Create and save a new reflection linked to Surah & Ayah |
| `PUT` | `/api/journal/:id` | Update an existing reflection |
| `DELETE` | `/api/journal/:id` | Delete a reflection |

### 🛤️ My Journey (`/api/journey`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/journey/progress` | Get current reading checkpoint (Surah, Ayah, Juz) |
| `POST` | `/api/journey/progress` | Update reading checkpoint |
| `GET` | `/api/journey/azkar` | Get daily Azkar progress counters |
| `POST` | `/api/journey/azkar` | Update Azkar progress counters |

### ⭐ Bookmarks (`/api/bookmarks`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/bookmarks` | Retrieve user's bookmarked Ayat |
| `POST` | `/api/bookmarks/toggle` | Save or remove an Ayah bookmark |
| `DELETE` | `/api/bookmarks/:id` | Remove a bookmark |

---

## 🛡️ Content Accuracy & Scholarly Review

1. **Quranic Text:** Sourced from **Tanzil Project** verified standard Uthmani script.
2. **Urdu Translation:** Authentic classical translation by **Maulana Fateh Muhammad Jalandhry** (فتح محمد جالندھری).
3. **Azkar & Duas:** Cross-referenced directly with **Hisn al-Muslim** (*Fortress of the Muslim* by Sheikh Sa'id bin Ali bin Wahf Al-Qahtani) and verified Sahih Hadith collections (*Sahih al-Bukhari*, *Sahih Muslim*, *Sunan at-Tirmidhi*, *Sunan Abi Dawud*).
4. **Recitation Audio:** High-fidelity Ayah-by-Ayah MP3s delivered via the **EveryAyah Project**.
5. **Ethical Guidelines:** Zero machine-generated Quranic texts or unverified Tafseer interpretations. Private user journal entries are never made public.
