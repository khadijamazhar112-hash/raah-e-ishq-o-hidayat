-- ============================================================
-- Noor (نور) — Complete PostgreSQL Database Schema
-- All 18 Authentic Islamic Platform Tables with Verification
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Authentication & User Account)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    preferred_language VARCHAR(10) DEFAULT 'en',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Content Sources (Attribution & Licensing Tracker)
CREATE TABLE IF NOT EXISTS content_sources (
    id SERIAL PRIMARY KEY,
    source_name VARCHAR(150) NOT NULL,
    publisher VARCHAR(150),
    edition VARCHAR(100),
    license_type VARCHAR(100) DEFAULT 'Open Educational License',
    website VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Content Reviews (Audit & Verification Log)
CREATE TABLE IF NOT EXISTS content_reviews (
    id SERIAL PRIMARY KEY,
    content_type VARCHAR(50) NOT NULL, -- 'ayah', 'translation', 'azkar', 'dua', 'topic'
    content_id VARCHAR(50) NOT NULL,
    reviewer_name VARCHAR(100) NOT NULL,
    review_status VARCHAR(20) DEFAULT 'verified', -- 'verified', 'pending', 'flagged'
    review_notes TEXT,
    reviewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Surahs Table (All 114 Surahs Metadata)
CREATE TABLE IF NOT EXISTS surahs (
    id INT PRIMARY KEY, -- 1 to 114
    number INT NOT NULL UNIQUE,
    name_en VARCHAR(100) NOT NULL,
    name_ar VARCHAR(100) NOT NULL,
    name_ur VARCHAR(100) NOT NULL,
    english_meaning VARCHAR(150) NOT NULL,
    total_ayahs INT NOT NULL,
    revelation_type VARCHAR(10) NOT NULL CHECK (revelation_type IN ('Makki', 'Madani')),
    juz_start INT NOT NULL
);

-- 5. Ayahs Table (Authentic Uthmani Text)
CREATE TABLE IF NOT EXISTS ayahs (
    id SERIAL PRIMARY KEY,
    surah_id INT REFERENCES surahs(id) ON DELETE CASCADE,
    ayah_number INT NOT NULL,
    arabic_text TEXT NOT NULL,
    juz_number INT NOT NULL,
    page_number INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (surah_id, ayah_number)
);

-- 6. Translations Table (Verified Urdu & English Translations)
CREATE TABLE IF NOT EXISTS translations (
    id SERIAL PRIMARY KEY,
    ayah_id INT REFERENCES ayahs(id) ON DELETE CASCADE,
    language VARCHAR(10) NOT NULL, -- 'ur', 'en'
    translator_name VARCHAR(150) NOT NULL,
    translation_text TEXT NOT NULL,
    source_id INT REFERENCES content_sources(id) ON DELETE SET NULL,
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Reciters Table (Authorized Qaris)
CREATE TABLE IF NOT EXISTS reciters (
    id SERIAL PRIMARY KEY,
    name_en VARCHAR(100) NOT NULL,
    name_ar VARCHAR(100) NOT NULL,
    subfolder VARCHAR(100) NOT NULL UNIQUE,
    style VARCHAR(50) DEFAULT 'Murattal',
    verified BOOLEAN DEFAULT TRUE
);

-- 8. Audio Files Table (Recitation URLs & Metadata)
CREATE TABLE IF NOT EXISTS audio_files (
    id SERIAL PRIMARY KEY,
    reciter_id INT REFERENCES reciters(id) ON DELETE CASCADE,
    surah_number INT NOT NULL,
    ayah_number INT NOT NULL,
    audio_url VARCHAR(255) NOT NULL,
    duration_sec INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (reciter_id, surah_number, ayah_number)
);

-- 9. Azkar Categories Table
CREATE TABLE IF NOT EXISTS azkar_categories (
    id SERIAL PRIMARY KEY,
    slug VARCHAR(50) UNIQUE NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_ar VARCHAR(100) NOT NULL,
    name_ur VARCHAR(100) NOT NULL,
    icon VARCHAR(10) NOT NULL
);

-- 10. Azkar Table (Daily Remembrance Database)
CREATE TABLE IF NOT EXISTS azkar (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'm-1', 'e-1', 'p-1'
    category_id INT REFERENCES azkar_categories(id) ON DELETE CASCADE,
    arabic_text TEXT NOT NULL,
    urdu_translation TEXT NOT NULL,
    english_translation TEXT,
    target_count INT NOT NULL DEFAULT 1,
    benefit TEXT,
    source_ref VARCHAR(150),
    source_id INT REFERENCES content_sources(id) ON DELETE SET NULL,
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. Azkar References Table (Authentic Hadith Attribution)
CREATE TABLE IF NOT EXISTS azkar_references (
    id SERIAL PRIMARY KEY,
    azkar_id VARCHAR(50) REFERENCES azkar(id) ON DELETE CASCADE,
    book VARCHAR(100) NOT NULL, -- 'Sahih al-Bukhari', 'Sahih Muslim', 'Hisn al-Muslim'
    hadith_number VARCHAR(50),
    grade VARCHAR(50) DEFAULT 'Sahih'
);

-- 12. Duas Table (Masnoon & Quranic Supplications)
CREATE TABLE IF NOT EXISTS duas (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'dua-wake-up', 'dua-eating-before'
    category_slug VARCHAR(50) NOT NULL,
    title_en VARCHAR(150) NOT NULL,
    title_ur VARCHAR(150) NOT NULL,
    arabic_text TEXT NOT NULL,
    urdu_translation TEXT NOT NULL,
    transliteration TEXT,
    authentic_source VARCHAR(150) NOT NULL,
    verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Topics Table (15 Curated Life Themes)
CREATE TABLE IF NOT EXISTS topics (
    id VARCHAR(50) PRIMARY KEY, -- e.g. 'sabr', 'tawakkul', 'shukar'
    category VARCHAR(50) NOT NULL, -- 'spiritual', 'character', 'life'
    title_en VARCHAR(150) NOT NULL,
    title_ar VARCHAR(150) NOT NULL,
    title_ur VARCHAR(150) NOT NULL,
    icon VARCHAR(10) NOT NULL,
    summary TEXT NOT NULL,
    reflection_prompt TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 14. Topic Ayahs Table (Curated Mappings)
CREATE TABLE IF NOT EXISTS topic_ayahs (
    id SERIAL PRIMARY KEY,
    topic_id VARCHAR(50) REFERENCES topics(id) ON DELETE CASCADE,
    surah_number INT NOT NULL,
    ayah_number INT NOT NULL,
    display_order INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (topic_id, surah_number, ayah_number)
);

-- 15. Reflections Table (Private User Tadabbur Journal)
CREATE TABLE IF NOT EXISTS reflections (
    id VARCHAR(60) PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    surah_number INT NOT NULL,
    surah_name_en VARCHAR(100) NOT NULL,
    surah_name_ar VARCHAR(100) NOT NULL,
    ayah_number INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    body TEXT NOT NULL,
    tag VARCHAR(50) DEFAULT 'Patience',
    is_private BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 16. Bookmarks Table (User Saved Verses)
CREATE TABLE IF NOT EXISTS bookmarks (
    id VARCHAR(60) PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    surah_number INT NOT NULL,
    ayah_number INT NOT NULL,
    ref_label VARCHAR(150) NOT NULL,
    arabic_text TEXT,
    translation_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 17. Reading Progress Table (Last Read Position & Statistics)
CREATE TABLE IF NOT EXISTS reading_progress (
    id SERIAL PRIMARY KEY,
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    surah_name_en VARCHAR(100) NOT NULL,
    surah_name_ar VARCHAR(100) NOT NULL,
    surah_number INT NOT NULL,
    ayah_number INT NOT NULL,
    juz_number INT NOT NULL DEFAULT 1,
    percent_juz INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 18. Azkar Progress Table (User Daily Counters)
CREATE TABLE IF NOT EXISTS azkar_progress (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    azkar_id VARCHAR(50) REFERENCES azkar(id) ON DELETE CASCADE,
    count INT NOT NULL DEFAULT 0,
    completed BOOLEAN DEFAULT FALSE,
    date DATE DEFAULT CURRENT_DATE,
    UNIQUE (user_id, azkar_id, date)
);

-- Indexes for Fast Query Performance
CREATE INDEX IF NOT EXISTS idx_ayahs_surah ON ayahs(surah_id);
CREATE INDEX IF NOT EXISTS idx_translations_ayah ON translations(ayah_id);
CREATE INDEX IF NOT EXISTS idx_reflections_user ON reflections(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_reading_progress_user ON reading_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_azkar_progress_user_date ON azkar_progress(user_id, date);
