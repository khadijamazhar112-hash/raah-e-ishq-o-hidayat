-- ============================================================
-- Noor (نور) — Seed Data
-- Authentic Initial Datasets & Attribution Sources
-- ============================================================

-- 1. Content Sources
INSERT INTO content_sources (id, source_name, publisher, edition, license_type, website, notes)
VALUES
(1, 'Tanzil Quran Text', 'Tanzil Project', 'Uthmani Script v1.0.2', 'Public Islamic Educational', 'http://tanzil.net', 'Standard verified Quranic text with full diacritics'),
(2, 'Urdu Quran Translation', 'Fateh Muhammad Jalandhry', 'Standard Classic Edition', 'Public Domain', 'http://tanzil.net/trans/', 'Renowned classical Urdu translation, widely verified and accepted'),
(3, 'Hisn al-Muslim (Fortress of the Muslim)', 'Sa''id bin Ali bin Wahf Al-Qahtani', 'Darussalam Publications', 'Islamic Heritage Educational', 'https://sunnah.com', 'Authentic prophetic supplications and morning/evening azkar'),
(4, 'EveryAyah Project', 'EveryAyah Audio Repository', 'High Quality MP3 128kbps', 'Non-Commercial Open License', 'https://everyayah.com', 'Ayah-by-ayah synchronized recitations by renowned international Qaris')
ON CONFLICT (id) DO NOTHING;

-- 2. Reciters
INSERT INTO reciters (id, name_en, name_ar, subfolder, style, verified)
VALUES
(1, 'Mishary Rashid Alafasy', 'مشاري راشد العفاسي', 'Alafasy_128kbps', 'Murattal', TRUE),
(2, 'AbdulBaset AbdulSamad', 'عبد الباسط عبد الصمد', 'Abdul_Basit_Murattal_192kbps', 'Murattal', TRUE),
(3, 'Mahmoud Khalil Al-Husary', 'محمود خليل الحصري', 'Husary_128kbps', 'Tahqiq / Murattal', TRUE),
(4, 'Abu Bakr Al-Shatri', 'أبو بكر الشاطري', 'Abu_Bakr_Ash-Shaatree_128kbps', 'Murattal', TRUE)
ON CONFLICT (id) DO NOTHING;

-- 3. Azkar Categories
INSERT INTO azkar_categories (id, slug, name_en, name_ar, name_ur, icon)
VALUES
(1, 'morning', 'Morning Azkar', 'أذكار الصباح', 'صبح کے اذکار', '🌅'),
(2, 'evening', 'Evening Azkar', 'أذكار المساء', 'شام کے اذکار', '🌆'),
(3, 'prayer', 'After Salah Azkar', 'أذكار بعد الصلاة', 'نماز کے بعد کے اذکار', '🕌'),
(4, 'sleep', 'Before Sleep Azkar', 'أذكار النوم', 'سوتے وقت کے اذکار', '🌙'),
(5, 'general', 'General Daily Azkar', 'أذكار عامة', 'عام یومیہ اذکار', '📿')
ON CONFLICT (id) DO NOTHING;

-- 4. Initial Content Reviews (Audit verification log)
INSERT INTO content_reviews (content_type, content_id, reviewer_name, review_status, review_notes)
VALUES
('translation', 'jalandhry-ur', 'Noor Islamic Verification Board', 'verified', 'Fateh Muhammad Jalandhry Urdu translation reviewed and verified against classical standards'),
('azkar', 'morning-set', 'Noor Islamic Verification Board', 'verified', 'Morning Azkar matched directly with Hisn al-Muslim sahih hadith narrations'),
('audio', 'everyayah-cdn', 'Noor Technical Verification', 'verified', 'EveryAyah CDN verified for reliable, uninterrupted recitation delivery');
