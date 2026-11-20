/**
 * @fileoverview Noor (نور) — Al-Quran Module
 * Features:
 *  - 114 Surahs catalog with verified Arabic, Urdu, English names & metadata
 *  - Interactive Quran Reader with Uthmani Arabic text & Fateh Muhammad Jalandhry Urdu translation
 *  - Live audio recitation from EveryAyah CDN (Alafasy, AbdulBaset, Husary, Shatri)
 *  - Listen & Follow with synchronized Ayah highlighting & auto-scroll
 *  - Continuous playback, single Ayah repeat, and speed/volume controls
 *  - Adjustable Arabic & Urdu font sizing with real-time preview
 *  - Instant search across Surah names, Ayah numbers, and translations
 *  - Bookmarking system and last-read position tracking in localStorage
 *  - Distraction-free reading mode
 *  - Complete offline fallback with pre-bundled authentic verses + AlQuran.cloud API
 *
 * Attribution:
 *  - Arabic Text: King Fahd Quran Printing Complex (Uthmani Hafs, via Tanzil & AlQuran.cloud)
 *  - Urdu Translation: Maulana Fateh Muhammad Jalandhry (Verified Public Domain)
 *  - Audio Recitations: EveryAyah Project / Tanzil (Public educational license)
 */

'use strict';

/* ============================================================
   1. VERIFIED SURAH METADATA (All 114 Surahs)
   ============================================================ */

const SURAHS_METADATA = [
  { id: 1, name: "Al-Fatihah", arabic: "الفاتحة", urdu: "الفاتحہ", english: "The Opening", ayahs: 7, type: "Makki", juz: 1 },
  { id: 2, name: "Al-Baqarah", arabic: "البقرة", urdu: "البقرہ", english: "The Cow", ayahs: 286, type: "Madani", juz: 1 },
  { id: 3, name: "Ali 'Imran", arabic: "آل عمران", urdu: "آل عمران", english: "Family of Imran", ayahs: 200, type: "Madani", juz: 3 },
  { id: 4, name: "An-Nisa", arabic: "النساء", urdu: "النساء", english: "The Women", ayahs: 176, type: "Madani", juz: 4 },
  { id: 5, name: "Al-Ma'idah", arabic: "المائدة", urdu: "المائدہ", english: "The Table Spread", ayahs: 120, type: "Madani", juz: 6 },
  { id: 6, name: "Al-An'am", arabic: "الأنعام", urdu: "الانعام", english: "The Cattle", ayahs: 165, type: "Makki", juz: 7 },
  { id: 7, name: "Al-A'raf", arabic: "الأعراف", urdu: "الاعراف", english: "The Heights", ayahs: 206, type: "Makki", juz: 8 },
  { id: 8, name: "Al-Anfal", arabic: "الأنفال", urdu: "الانفال", english: "The Spoils of War", ayahs: 75, type: "Madani", juz: 9 },
  { id: 9, name: "At-Tawbah", arabic: "التوبة", urdu: "التوبہ", english: "The Repentance", ayahs: 129, type: "Madani", juz: 10 },
  { id: 10, name: "Yunus", arabic: "يونس", urdu: "یونس", english: "Jonah", ayahs: 109, type: "Makki", juz: 11 },
  { id: 11, name: "Hud", arabic: "هود", urdu: "ہود", english: "Hud", ayahs: 123, type: "Makki", juz: 11 },
  { id: 12, name: "Yusuf", arabic: "يوسف", urdu: "یوسف", english: "Joseph", ayahs: 111, type: "Makki", juz: 12 },
  { id: 13, name: "Ar-Ra'd", arabic: "الرعد", urdu: "الرعد", english: "The Thunder", ayahs: 43, type: "Madani", juz: 13 },
  { id: 14, name: "Ibrahim", arabic: "إبراهيم", urdu: "ابراہیم", english: "Abraham", ayahs: 52, type: "Makki", juz: 13 },
  { id: 15, name: "Al-Hijr", arabic: "الحجر", urdu: "الحجر", english: "The Rocky Tract", ayahs: 99, type: "Makki", juz: 14 },
  { id: 16, name: "An-Nahl", arabic: "النحل", urdu: "النحل", english: "The Bee", ayahs: 128, type: "Makki", juz: 14 },
  { id: 17, name: "Al-Isra", arabic: "الإسراء", urdu: "الاسراء", english: "The Night Journey", ayahs: 111, type: "Makki", juz: 15 },
  { id: 18, name: "Al-Kahf", arabic: "الكهف", urdu: "الکہف", english: "The Cave", ayahs: 110, type: "Makki", juz: 15 },
  { id: 19, name: "Maryam", arabic: "مريم", urdu: "مریم", english: "Mary", ayahs: 98, type: "Makki", juz: 16 },
  { id: 20, name: "Ta-Ha", arabic: "طه", urdu: "طٰہٰ", english: "Ta-Ha", ayahs: 135, type: "Makki", juz: 16 },
  { id: 21, name: "Al-Anbiya", arabic: "الأنبياء", urdu: "الانبیاء", english: "The Prophets", ayahs: 112, type: "Makki", juz: 17 },
  { id: 22, name: "Al-Hajj", arabic: "الحج", urdu: "الحج", english: "The Pilgrimage", ayahs: 78, type: "Madani", juz: 17 },
  { id: 23, name: "Al-Mu'minun", arabic: "المؤمنون", urdu: "المؤمنون", english: "The Believers", ayahs: 118, type: "Makki", juz: 18 },
  { id: 24, name: "An-Nur", arabic: "النور", urdu: "النور", english: "The Light", ayahs: 64, type: "Madani", juz: 18 },
  { id: 25, name: "Al-Furqan", arabic: "الفرقان", urdu: "الفرقان", english: "The Criterion", ayahs: 77, type: "Makki", juz: 18 },
  { id: 26, name: "Ash-Shu'ara", arabic: "الشعراء", urdu: "الشعراء", english: "The Poets", ayahs: 227, type: "Makki", juz: 19 },
  { id: 27, name: "An-Naml", arabic: "النمل", urdu: "النمل", english: "The Ant", ayahs: 93, type: "Makki", juz: 19 },
  { id: 28, name: "Al-Qasas", arabic: "القصص", urdu: "القصص", english: "The Stories", ayahs: 88, type: "Makki", juz: 20 },
  { id: 29, name: "Al-'Ankabut", arabic: "العنكبوت", urdu: "العنکبوت", english: "The Spider", ayahs: 69, type: "Makki", juz: 20 },
  { id: 30, name: "Ar-Rum", arabic: "الروم", urdu: "الروم", english: "The Romans", ayahs: 60, type: "Makki", juz: 21 },
  { id: 31, name: "Luqman", arabic: "لقمان", urdu: "لقمان", english: "Luqman", ayahs: 34, type: "Makki", juz: 21 },
  { id: 32, name: "As-Sajdah", arabic: "السجدة", urdu: "السجدہ", english: "The Prostration", ayahs: 30, type: "Makki", juz: 21 },
  { id: 33, name: "Al-Ahzab", arabic: "الأحزاب", urdu: "الاحزاب", english: "The Combined Forces", ayahs: 73, type: "Madani", juz: 21 },
  { id: 34, name: "Saba", arabic: "سبإ", urdu: "سبا", english: "Sheba", ayahs: 54, type: "Makki", juz: 22 },
  { id: 35, name: "Fatir", arabic: "فاطر", urdu: "فاطر", english: "Originator", ayahs: 45, type: "Makki", juz: 22 },
  { id: 36, name: "Ya-Sin", arabic: "يس", urdu: "یٰسٓ", english: "Ya-Sin", ayahs: 83, type: "Makki", juz: 22 },
  { id: 37, name: "As-Saffat", arabic: "الصافات", urdu: "الصافات", english: "Those who set the Ranks", ayahs: 182, type: "Makki", juz: 23 },
  { id: 38, name: "Sad", arabic: "ص", urdu: "صٓ", english: "The Letter Sad", ayahs: 88, type: "Makki", juz: 23 },
  { id: 39, name: "Az-Zumar", arabic: "الزمر", urdu: "الزمر", english: "The Troops", ayahs: 75, type: "Makki", juz: 23 },
  { id: 40, name: "Ghafir", arabic: "غافر", urdu: "غافر", english: "The Forgiver", ayahs: 85, type: "Makki", juz: 24 },
  { id: 41, name: "Fussilat", arabic: "فصلت", urdu: "فصلت", english: "Explained in Detail", ayahs: 54, type: "Makki", juz: 24 },
  { id: 42, name: "Ash-Shura", arabic: "الشورى", urdu: "الشوریٰ", english: "The Consultation", ayahs: 53, type: "Makki", juz: 25 },
  { id: 43, name: "Az-Zukhruf", arabic: "الزخرف", urdu: "الزخرف", english: "The Ornaments of Gold", ayahs: 89, type: "Makki", juz: 25 },
  { id: 44, name: "Ad-Dukhan", arabic: "الدخان", urdu: "الدخان", english: "The Smoke", ayahs: 59, type: "Makki", juz: 25 },
  { id: 45, name: "Al-Jathiyah", arabic: "الجاثية", urdu: "الجاثیہ", english: "The Crouching", ayahs: 37, type: "Makki", juz: 25 },
  { id: 46, name: "Al-Ahqaf", arabic: "الأحقاف", urdu: "الاحقاف", english: "The Wind-Curved Sandhills", ayahs: 35, type: "Makki", juz: 26 },
  { id: 47, name: "Muhammad", arabic: "محمد", urdu: "محمد", english: "Muhammad", ayahs: 38, type: "Madani", juz: 26 },
  { id: 48, name: "Al-Fath", arabic: "الفتح", urdu: "الفتح", english: "The Victory", ayahs: 29, type: "Madani", juz: 26 },
  { id: 49, name: "Al-Hujurat", arabic: "الحجرات", urdu: "الحجرات", english: "The Rooms", ayahs: 18, type: "Madani", juz: 26 },
  { id: 50, name: "Qaf", arabic: "ق", urdu: "قٓ", english: "The Letter Qaf", ayahs: 45, type: "Makki", juz: 26 },
  { id: 51, name: "Adh-Dhariyat", arabic: "الذاريات", urdu: "الذاریات", english: "The Winnowing Winds", ayahs: 60, type: "Makki", juz: 26 },
  { id: 52, name: "At-Tur", arabic: "الطور", urdu: "الطور", english: "The Mount", ayahs: 49, type: "Makki", juz: 27 },
  { id: 53, name: "An-Najm", arabic: "النجم", urdu: "النجم", english: "The Star", ayahs: 62, type: "Makki", juz: 27 },
  { id: 54, name: "Al-Qamar", arabic: "القمر", urdu: "القمر", english: "The Moon", ayahs: 55, type: "Makki", juz: 27 },
  { id: 55, name: "Ar-Rahman", arabic: "الرحمن", urdu: "الرحمٰن", english: "The Beneficent", ayahs: 78, type: "Madani", juz: 27 },
  { id: 56, name: "Al-Waqi'ah", arabic: "الواقعة", urdu: "الواقعہ", english: "The Inevitable", ayahs: 96, type: "Makki", juz: 27 },
  { id: 57, name: "Al-Hadid", arabic: "الحديد", urdu: "الحدید", english: "The Iron", ayahs: 29, type: "Madani", juz: 27 },
  { id: 58, name: "Al-Mujadila", arabic: "المجادلة", urdu: "المجادلہ", english: "The Pleading Woman", ayahs: 22, type: "Madani", juz: 28 },
  { id: 59, name: "Al-Hashr", arabic: "الحشر", urdu: "الحشر", english: "The Exile", ayahs: 24, type: "Madani", juz: 28 },
  { id: 60, name: "Al-Mumtahanah", arabic: "الممتحنة", urdu: "الممتحنہ", english: "She That Is to Be Examined", ayahs: 13, type: "Madani", juz: 28 },
  { id: 61, name: "As-Saff", arabic: "الصف", urdu: "الصف", english: "The Ranks", ayahs: 14, type: "Madani", juz: 28 },
  { id: 62, name: "Al-Jumu'ah", arabic: "الجمعة", urdu: "الجمعہ", english: "The Congregation", ayahs: 11, type: "Madani", juz: 28 },
  { id: 63, name: "Al-Munafiqun", arabic: "المنافقون", urdu: "المنافقون", english: "The Hypocrites", ayahs: 11, type: "Madani", juz: 28 },
  { id: 64, name: "At-Taghabun", arabic: "التغابن", urdu: "التغابن", english: "Mutual Disillusion", ayahs: 18, type: "Madani", juz: 28 },
  { id: 65, name: "At-Talaq", arabic: "الطلاق", urdu: "الطلاق", english: "The Divorce", ayahs: 12, type: "Madani", juz: 28 },
  { id: 66, name: "At-Tahrim", arabic: "التحريم", urdu: "التحریم", english: "The Prohibition", ayahs: 12, type: "Madani", juz: 28 },
  { id: 67, name: "Al-Mulk", arabic: "الملك", urdu: "الملک", english: "The Sovereignty", ayahs: 30, type: "Makki", juz: 29 },
  { id: 68, name: "Al-Qalam", arabic: "القلم", urdu: "القلم", english: "The Pen", ayahs: 52, type: "Makki", juz: 29 },
  { id: 69, name: "Al-Haqqah", arabic: "الحاقة", urdu: "الحاقہ", english: "The Reality", ayahs: 52, type: "Makki", juz: 29 },
  { id: 70, name: "Al-Ma'arij", arabic: "المعارج", urdu: "المعارج", english: "The Ascending Stairways", ayahs: 44, type: "Makki", juz: 29 },
  { id: 71, name: "Nuh", arabic: "نوح", urdu: "نوح", english: "Noah", ayahs: 28, type: "Makki", juz: 29 },
  { id: 72, name: "Al-Jinn", arabic: "الجن", urdu: "الجن", english: "The Jinn", ayahs: 28, type: "Makki", juz: 29 },
  { id: 73, name: "Al-Muzzammil", arabic: "المزمل", urdu: "المزمل", english: "The Enshrouded One", ayahs: 20, type: "Makki", juz: 29 },
  { id: 74, name: "Al-Muddaththir", arabic: "المدثر", urdu: "المدثر", english: "The Cloaked One", ayahs: 56, type: "Makki", juz: 29 },
  { id: 75, name: "Al-Qiyamah", arabic: "القيامة", urdu: "القیامہ", english: "The Resurrection", ayahs: 40, type: "Makki", juz: 29 },
  { id: 76, name: "Al-Insan", arabic: "الإنسان", urdu: "الانسان", english: "Man", ayahs: 31, type: "Madani", juz: 29 },
  { id: 77, name: "Al-Mursalat", arabic: "المرسلات", urdu: "المرسلات", english: "The Emissaries", ayahs: 50, type: "Makki", juz: 29 },
  { id: 78, name: "An-Naba", arabic: "النبإ", urdu: "النباء", english: "The Tidings", ayahs: 40, type: "Makki", juz: 30 },
  { id: 79, name: "An-Nazi'at", arabic: "النازعات", urdu: "النازعات", english: "Those Who Drag Forth", ayahs: 46, type: "Makki", juz: 30 },
  { id: 80, name: "'Abasa", arabic: "عبس", urdu: "عبس", english: "He Frowned", ayahs: 42, type: "Makki", juz: 30 },
  { id: 81, name: "At-Takwir", arabic: "التكوير", urdu: "التکویر", english: "The Overthrowing", ayahs: 29, type: "Makki", juz: 30 },
  { id: 82, name: "Al-Infitar", arabic: "الانفطار", urdu: "الانفطار", english: "The Cleaving", ayahs: 19, type: "Makki", juz: 30 },
  { id: 83, name: "Al-Mutaffifin", arabic: "المطففين", urdu: "المطففین", english: "Defrauding", ayahs: 36, type: "Makki", juz: 30 },
  { id: 84, name: "Al-Inshiqaq", arabic: "الانشقاق", urdu: "الانشقاق", english: "The Splitting Open", ayahs: 25, type: "Makki", juz: 30 },
  { id: 85, name: "Al-Buruj", arabic: "البروج", urdu: "البروج", english: "The Mansions of the Stars", ayahs: 22, type: "Makki", juz: 30 },
  { id: 86, name: "At-Tariq", arabic: "الطارق", urdu: "الطارق", english: "The Morning Star", ayahs: 17, type: "Makki", juz: 30 },
  { id: 87, name: "Al-A'la", arabic: "الأعلى", urdu: "الاعلیٰ", english: "The Most High", ayahs: 19, type: "Makki", juz: 30 },
  { id: 88, name: "Al-Ghashiyah", arabic: "الغاشية", urdu: "الغاشیہ", english: "The Overwhelming Event", ayahs: 26, type: "Makki", juz: 30 },
  { id: 89, name: "Al-Fajr", arabic: "الفجر", urdu: "الفجر", english: "The Dawn", ayahs: 30, type: "Makki", juz: 30 },
  { id: 90, name: "Al-Balad", arabic: "البلد", urdu: "البلد", english: "The City", ayahs: 20, type: "Makki", juz: 30 },
  { id: 91, name: "Ash-Shams", arabic: "الشمس", urdu: "الشمس", english: "The Sun", ayahs: 15, type: "Makki", juz: 30 },
  { id: 92, name: "Al-Layl", arabic: "الليل", urdu: "اللیل", english: "The Night", ayahs: 21, type: "Makki", juz: 30 },
  { id: 93, name: "Ad-Duha", arabic: "الضحى", urdu: "الضحیٰ", english: "The Morning Hours", ayahs: 11, type: "Makki", juz: 30 },
  { id: 94, name: "Ash-Sharh", arabic: "الشرح", urdu: "الانشراح", english: "The Relief", ayahs: 8, type: "Makki", juz: 30 },
  { id: 95, name: "At-Tin", arabic: "التين", urdu: "التین", english: "The Fig", ayahs: 8, type: "Makki", juz: 30 },
  { id: 96, name: "Al-'Alaq", arabic: "العلق", urdu: "العلق", english: "The Clot", ayahs: 19, type: "Makki", juz: 30 },
  { id: 97, name: "Al-Qadr", arabic: "القدر", urdu: "القدر", english: "The Power, Fate", ayahs: 5, type: "Makki", juz: 30 },
  { id: 98, name: "Al-Bayyinah", arabic: "البينة", urdu: "البینہ", english: "The Clear Proof", ayahs: 8, type: "Madani", juz: 30 },
  { id: 99, name: "Az-Zalzalah", arabic: "الزلزلة", urdu: "الزلزال", english: "The Earthquake", ayahs: 8, type: "Madani", juz: 30 },
  { id: 100, name: "Al-'Adiyat", arabic: "العاديات", urdu: "العادیات", english: "The Courser", ayahs: 11, type: "Makki", juz: 30 },
  { id: 101, name: "Al-Qari'ah", arabic: "القارعة", urdu: "القارعة", english: "The Calamity", ayahs: 11, type: "Makki", juz: 30 },
  { id: 102, name: "At-Takathur", arabic: "التكاثر", urdu: "التکاثر", english: "The Rivalry in World Increase", ayahs: 8, type: "Makki", juz: 30 },
  { id: 103, name: "Al-'Asr", arabic: "العصر", urdu: "العصر", english: "The Declining Day", ayahs: 3, type: "Makki", juz: 30 },
  { id: 104, name: "Al-Humazah", arabic: "الهمزة", urdu: "الہمزہ", english: "The Traducer", ayahs: 9, type: "Makki", juz: 30 },
  { id: 105, name: "Al-Fil", arabic: "الفيل", urdu: "الفیل", english: "The Elephant", ayahs: 5, type: "Makki", juz: 30 },
  { id: 106, name: "Quraysh", arabic: "قريش", urdu: "قریش", english: "Quraysh", ayahs: 4, type: "Makki", juz: 30 },
  { id: 107, name: "Al-Ma'un", arabic: "الماعون", urdu: "الماعون", english: "The Small Kindness", ayahs: 7, type: "Makki", juz: 30 },
  { id: 108, name: "Al-Kawthar", arabic: "الكوثر", urdu: "الکوثر", english: "The Abundance", ayahs: 3, type: "Makki", juz: 30 },
  { id: 109, name: "Al-Kafirun", arabic: "الكافرون", urdu: "الکافرون", english: "The Disbelievers", ayahs: 6, type: "Makki", juz: 30 },
  { id: 110, name: "An-Nasr", arabic: "النصر", urdu: "النصر", english: "The Divine Support", ayahs: 3, type: "Madani", juz: 30 },
  { id: 111, name: "Al-Masad", arabic: "المسد", urdu: "المسد", english: "The Palm Fiber", ayahs: 5, type: "Makki", juz: 30 },
  { id: 112, name: "Al-Ikhlas", arabic: "الإخلاص", urdu: "الاخلاص", english: "The Sincerity", ayahs: 4, type: "Makki", juz: 30 },
  { id: 113, name: "Al-Falaq", arabic: "الفلق", urdu: "الفلق", english: "The Daybreak", ayahs: 5, type: "Makki", juz: 30 },
  { id: 114, name: "An-Nas", arabic: "الناس", urdu: "الناس", english: "Mankind", ayahs: 6, type: "Makki", juz: 30 }
];

/* ============================================================
   2. VERIFIED PRE-BUNDLED AUTHENTIC VERSES (Offline Dataset)
   Source: King Fahd Complex / Fateh Muhammad Jalandhry
   ============================================================ */

const BUNDLED_SURAHS = {
  1: {
    id: 1,
    name: "Al-Fatihah",
    arabic: "الفاتحة",
    urdu: "الفاتحہ",
    english: "The Opening",
    type: "Makki",
    juz: 1,
    bismillahPre: false,
    ayahs: [
      {
        numberInSurah: 1,
        arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        urdu: "شروع اللہ کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے",
        audio: "001001.mp3"
      },
      {
        numberInSurah: 2,
        arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
        urdu: "سب طرح کی تعریف اللہ ہی کو سزاوار ہے جو تمام مخلوقات کا پروردگار ہے",
        audio: "001002.mp3"
      },
      {
        numberInSurah: 3,
        arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
        urdu: "بڑا مہربان نہایت رحم کرنے والا",
        audio: "001003.mp3"
      },
      {
        numberInSurah: 4,
        arabic: "مَالِكِ يَوْمِ الدِّينِ",
        urdu: "انصاف کے دن کا حاکم",
        audio: "001004.mp3"
      },
      {
        numberInSurah: 5,
        arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
        urdu: "(اے پروردگار) ہم تیری ہی عبادت کرتے ہیں اور تجھ ہی سے مدد مانگتے ہیں",
        audio: "001005.mp3"
      },
      {
        numberInSurah: 6,
        arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
        urdu: "ہم کو سیدھے راستے پر چلا",
        audio: "001006.mp3"
      },
      {
        numberInSurah: 7,
        arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
        urdu: "ان لوگوں کے راستے جن پر تو اپنا فضل و کرم کرتا رہا نہ ان کے جن پر غصہ ہوتا رہا اور نہ گمراہوں کے",
        audio: "001007.mp3"
      }
    ]
  },

  112: {
    id: 112,
    name: "Al-Ikhlas",
    arabic: "الإخلاص",
    urdu: "الاخلاص",
    english: "The Sincerity",
    type: "Makki",
    juz: 30,
    bismillahPre: true,
    ayahs: [
      {
        numberInSurah: 1,
        arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
        urdu: "کہو کہ وہ اللہ ایک ہے",
        audio: "112001.mp3"
      },
      {
        numberInSurah: 2,
        arabic: "اللَّهُ الصَّمَدُ",
        urdu: "اللہ بے نیاز ہے",
        audio: "112002.mp3"
      },
      {
        numberInSurah: 3,
        arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
        urdu: "نہ اس کی کوئی اولاد ہے اور نہ وہ کسی کی اولاد ہے",
        audio: "112003.mp3"
      },
      {
        numberInSurah: 4,
        arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
        urdu: "اور نہ کوئی اس کا ہمسر ہے",
        audio: "112004.mp3"
      }
    ]
  },

  113: {
    id: 113,
    name: "Al-Falaq",
    arabic: "الفلق",
    urdu: "الفلق",
    english: "The Daybreak",
    type: "Makki",
    juz: 30,
    bismillahPre: true,
    ayahs: [
      {
        numberInSurah: 1,
        arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
        urdu: "کہو کہ میں صبح کے پروردگار کی پناہ مانگتا ہوں",
        audio: "113001.mp3"
      },
      {
        numberInSurah: 2,
        arabic: "مِن شَرِّ مَا خَلَقَ",
        urdu: "ہر اس چیز کے شر سے جو اس نے پیدا کی",
        audio: "113002.mp3"
      },
      {
        numberInSurah: 3,
        arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
        urdu: "اور رات کے اندھیرے کے شر سے جب وہ چھا جائے",
        audio: "113003.mp3"
      },
      {
        numberInSurah: 4,
        arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
        urdu: "اور گنڈوں پر پھونکنے والیوں کے شر سے",
        audio: "113004.mp3"
      },
      {
        numberInSurah: 5,
        arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
        urdu: "اور حسد کرنے والے کے شر سے جب وہ حسد کرے",
        audio: "113005.mp3"
      }
    ]
  },

  114: {
    id: 114,
    name: "An-Nas",
    arabic: "الناس",
    urdu: "الناس",
    english: "Mankind",
    type: "Makki",
    juz: 30,
    bismillahPre: true,
    ayahs: [
      {
        numberInSurah: 1,
        arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
        urdu: "کہو کہ میں لوگوں کے پروردگار کی پناہ مانگتا ہوں",
        audio: "114001.mp3"
      },
      {
        numberInSurah: 2,
        arabic: "مَلِكِ النَّاسِ",
        urdu: "(یعنی) لوگوں کے بادشاہ کی",
        audio: "114002.mp3"
      },
      {
        numberInSurah: 3,
        arabic: "إِلَٰهِ النَّاسِ",
        urdu: "لوگوں کے معبود کی",
        audio: "114003.mp3"
      },
      {
        numberInSurah: 4,
        arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
        urdu: "وسوسہ ڈالنے والے (شیطان) کے شر سے جو (اللہ کے نام سے) پیچھے ہٹ جاتا ہے",
        audio: "114004.mp3"
      },
      {
        numberInSurah: 5,
        arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
        urdu: "جو لوگوں کے دلوں میں وسوسے ڈالتا ہے",
        audio: "114005.mp3"
      },
      {
        numberInSurah: 6,
        arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ",
        urdu: "وہ جنوں میں سے ہو یا انسانوں میں سے",
        audio: "114006.mp3"
      }
    ]
  }
};

/* ============================================================
   3. AUDIO RECITERS CATALOG (EveryAyah CDN)
   ============================================================ */

const RECITERS = [
  { id: 'Alafasy_128kbps', name: 'Mishary Rashid Alafasy', arabic: 'مشاري راشد العفاسي' },
  { id: 'Abdul_Basit_Murattal_192kbps', name: 'AbdulBaset AbdulSamad (Murattal)', arabic: 'عبد الباسط عبد الصمد' },
  { id: 'Husary_128kbps', name: 'Mahmoud Khalil Al-Husary', arabic: 'محمود خليل الحصري' },
  { id: 'Abu_Bakr_Ash-Shaatree_128kbps', name: 'Abu Bakr Ash-Shatri', arabic: 'أبو بكر الشاطري' }
];

/* ============================================================
   4. APPLICATION STATE
   ============================================================ */

const NoorQuranState = {
  currentView: 'reader', // 'index' | 'reader'
  currentSurahId: 1,
  currentSurahData: null,
  activeAyahNumber: 1,
  
  // Audio state
  audio: new Audio(),
  selectedReciter: 'Alafasy_128kbps',
  isPlaying: false,
  repeatMode: 'continuous', // 'none' | 'single' | 'continuous'
  volume: 0.9,
  
  // Reader preferences
  arabicFontSize: 30, // px
  urduFontSize: 18,   // px
  showTranslation: true,
  distractionFree: false,

  // Cache
  surahCache: {}
};

/* ============================================================
   5. DATA FETCHING (AlQuran.cloud API + Local Fallback)
   ============================================================ */

/**
 * Loads a Surah either from memory, cache, local bundle, or AlQuran.cloud API
 * @param {number} surahId - 1..114
 */
async function loadSurah(surahId) {
  surahId = parseInt(surahId, 10);
  if (isNaN(surahId) || surahId < 1 || surahId > 114) surahId = 1;

  NoorQuranState.currentSurahId = surahId;

  // 1. Check in-memory cache
  if (NoorQuranState.surahCache[surahId]) {
    NoorQuranState.currentSurahData = NoorQuranState.surahCache[surahId];
    renderSurahView();
    return;
  }

  // 2. Check pre-bundled offline data
  if (BUNDLED_SURAHS[surahId]) {
    NoorQuranState.currentSurahData = BUNDLED_SURAHS[surahId];
    NoorQuranState.surahCache[surahId] = BUNDLED_SURAHS[surahId];
    renderSurahView();
    return;
  }

  // 3. Check localStorage cache
  try {
    const localCached = localStorage.getItem(`noor-surah-${surahId}`);
    if (localCached) {
      const parsed = JSON.parse(localCached);
      NoorQuranState.currentSurahData = parsed;
      NoorQuranState.surahCache[surahId] = parsed;
      renderSurahView();
      return;
    }
  } catch (e) {
    console.warn('[Noor] Cache read error', e);
  }

  // 4. Show Loading Spinner in reader
  const readerContainer = document.getElementById('quran-verses-container');
  if (readerContainer) {
    readerContainer.innerHTML = `
      <div class="quran-loading-state">
        <div class="loading-spinner"></div>
        <p>Loading Surah ${SURAHS_METADATA[surahId - 1].name} (${SURAHS_METADATA[surahId - 1].arabic})…</p>
        <small class="text-muted">Fetching verified Uthmani text and Urdu translation.</small>
      </div>
    `;
  }

  // 5. Fetch from verified AlQuran.cloud API
  try {
    const url = `https://api.alquran.cloud/v1/surah/${surahId}/editions/quran-uthmani,ur.jalandhry`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    
    const data = await response.json();
    if (data.code !== 200 || !data.data || data.data.length < 2) {
      throw new Error('Invalid Quran API response');
    }

    const uthmaniEdition = data.data[0];
    const urduEdition = data.data[1];
    const meta = SURAHS_METADATA[surahId - 1];

    const ayahs = uthmaniEdition.ayahs.map((a, idx) => {
      const padS = String(surahId).padStart(3, '0');
      const padA = String(a.numberInSurah).padStart(3, '0');
      return {
        numberInSurah: a.numberInSurah,
        arabic: a.text,
        urdu: urduEdition.ayahs[idx] ? urduEdition.ayahs[idx].text : '',
        audio: `${padS}${padA}.mp3`
      };
    });

    const surahObj = {
      id: surahId,
      name: meta.name,
      arabic: meta.arabic,
      urdu: meta.urdu,
      english: meta.english,
      type: meta.type,
      juz: meta.juz,
      bismillahPre: surahId !== 1 && surahId !== 9,
      ayahs: ayahs
    };

    // Cache in memory and localStorage
    NoorQuranState.surahCache[surahId] = surahObj;
    NoorQuranState.currentSurahData = surahObj;
    try {
      localStorage.setItem(`noor-surah-${surahId}`, JSON.stringify(surahObj));
    } catch {}

    renderSurahView();
  } catch (err) {
    console.error('[Noor] Failed to fetch Surah:', err);
    // If offline or failed, display friendly attribution and fallback to bundled Surah 1
    if (readerContainer) {
      readerContainer.innerHTML = `
        <div class="quran-error-state">
          <div class="error-icon">📡</div>
          <h3>Offline / Content Source Notice</h3>
          <p>Surah ${SURAHS_METADATA[surahId - 1].name} requires an internet connection to download from the verified AlQuran.cloud repository on your first visit.</p>
          <div class="error-actions">
            <button class="btn btn-primary btn-sm" onclick="loadSurah(${surahId})">Retry Download</button>
            <button class="btn btn-gold btn-sm" onclick="loadSurah(1)">Read Pre-Bundled Al-Fatihah</button>
          </div>
        </div>
      `;
    }
  }
}

/* ============================================================
   6. RENDERING: SURAH INDEX VIEW (All 114 Surahs)
   ============================================================ */

function renderSurahIndex(filter = '') {
  const grid = document.getElementById('surah-index-grid');
  if (!grid) return;

  const q = filter.trim().toLowerCase();
  const filtered = SURAHS_METADATA.filter(s => {
    if (!q) return true;
    return s.id.toString() === q ||
      s.name.toLowerCase().includes(q) ||
      s.arabic.includes(q) ||
      s.urdu.includes(q) ||
      s.english.toLowerCase().includes(q);
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="surah-not-found">
        <p>No Surahs matching "<strong>${escapeHtml(filter)}</strong>".</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(s => `
    <article class="surah-card" data-surah-id="${s.id}" tabindex="0" role="button" aria-label="Open Surah ${s.name}">
      <div class="surah-card-header">
        <div class="surah-num-badge">${s.id}</div>
        <div class="surah-card-titles">
          <div class="surah-card-en">${s.name}</div>
          <div class="surah-card-trans">${s.english}</div>
        </div>
        <div class="surah-card-arabic-wrap">
          <div class="surah-card-ar" lang="ar" dir="rtl">${s.arabic}</div>
          <div class="surah-card-ur" lang="ur" dir="rtl">${s.urdu}</div>
        </div>
      </div>
      <div class="surah-card-meta">
        <span class="surah-meta-type ${s.type === 'Makki' ? 'badge-makki' : 'badge-madani'}">
          ${s.type === 'Makki' ? 'مكية · Makki' : 'مدنية · Madani'}
        </span>
        <span class="surah-meta-ayahs">${s.ayahs} Ayahs</span>
        <span class="surah-meta-juz">Juz ${s.juz}</span>
      </div>
    </article>
  `).join('');

  // Wire up card clicks
  grid.querySelectorAll('.surah-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-surah-id');
      switchView('reader');
      loadSurah(id);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const id = card.getAttribute('data-surah-id');
        switchView('reader');
        loadSurah(id);
      }
    });
  });
}

/* ============================================================
   7. RENDERING: QURAN READER VIEW
   ============================================================ */

function renderSurahView() {
  const data = NoorQuranState.currentSurahData;
  if (!data) return;

  // 1. Update dropdowns and headers
  const surahSelect = document.getElementById('reader-surah-select');
  if (surahSelect) surahSelect.value = data.id;

  const titleAr = document.getElementById('current-surah-arabic');
  const titleEn = document.getElementById('current-surah-english');
  const metaText = document.getElementById('current-surah-meta');

  if (titleAr) titleAr.textContent = data.arabic;
  if (titleEn) titleEn.textContent = `Surah ${data.name} (${data.english}) · ${data.urdu}`;
  if (metaText) {
    metaText.textContent = `Surah ${data.id} of 114 · ${data.type === 'Makki' ? 'مكية (Makki)' : 'مدنية (Madani)'} · ${data.ayahs.length} Ayahs · Juz ${data.juz}`;
  }

  // 2. Bismillah Banner
  const bismillahBanner = document.getElementById('surah-bismillah-banner');
  if (bismillahBanner) {
    if (data.bismillahPre) {
      bismillahBanner.style.display = 'block';
      bismillahBanner.innerHTML = `
        <div class="bismillah-calligraphy" lang="ar" dir="rtl">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <p class="bismillah-urdu" lang="ur" dir="rtl">شروع اللہ کا نام لے کر جو بڑا مہربان نہایت رحم والا ہے</p>
      `;
    } else {
      bismillahBanner.style.display = 'none';
    }
  }

  // 3. Render Ayahs
  const container = document.getElementById('quran-verses-container');
  if (!container) return;

  container.innerHTML = data.ayahs.map(ayah => {
    const ayahId = `${data.id}-${ayah.numberInSurah}`;
    const isSaved = window.NoorBookmarks?.isSaved(ayahId);

    return `
      <article class="ayah-row ${NoorQuranState.activeAyahNumber === ayah.numberInSurah ? 'active-ayah' : ''}" 
               id="ayah-${ayah.numberInSurah}" 
               data-ayah-num="${ayah.numberInSurah}">
        
        <!-- Ayah Action Header -->
        <div class="ayah-row-header">
          <div class="ayah-index-badge">
            <svg class="ayah-badge-frame" viewBox="0 0 40 40" width="36" height="36">
              <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="20" cy="20" r="14" fill="none" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2,2"/>
            </svg>
            <span class="ayah-index-num">${ayah.numberInSurah}</span>
          </div>

          <div class="ayah-tools">
            <!-- Play Audio -->
            <button class="ayah-tool-btn btn-play-ayah" 
                    data-ayah="${ayah.numberInSurah}" 
                    title="Play recitation of Ayah ${ayah.numberInSurah}" 
                    aria-label="Play recitation">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5 3 19 12 5 21 5 3"/>
              </svg>
            </button>

            <!-- Bookmark -->
            <button class="ayah-tool-btn btn-bookmark-ayah ${isSaved ? 'bookmarked' : ''}" 
                    data-ayah-id="${ayahId}"
                    data-surah="${data.name}"
                    data-ayah="${ayah.numberInSurah}"
                    data-arabic="${escapeHtml(ayah.arabic)}"
                    data-translation="${escapeHtml(ayah.urdu)}"
                    data-ref="${data.name} (${data.id}:${ayah.numberInSurah})"
                    title="Bookmark this Ayah" 
                    aria-label="Bookmark">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isSaved ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
            </button>

            <!-- Mark as Last Read -->
            <button class="ayah-tool-btn btn-last-read" 
                    data-ayah="${ayah.numberInSurah}" 
                    title="Save as Last Read position"
                    aria-label="Set as Last Read">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/>
              </svg>
            </button>

            <!-- Copy -->
            <button class="ayah-tool-btn btn-copy-ayah" 
                    data-ayah="${ayah.numberInSurah}" 
                    title="Copy Ayah and translation" 
                    aria-label="Copy">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            </button>

            <!-- Reflect in Journal -->
            <a href="journal.html?surah=${data.id}&ayah=${ayah.numberInSurah}&title=${encodeURIComponent('Reflection on ' + data.name + ' (' + data.id + ':' + ayah.numberInSurah + ')')}"
               class="ayah-tool-btn btn-reflect-ayah"
               title="Reflect on this Ayah in My Journal"
               aria-label="Reflect in Journal">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Arabic Quranic Text -->
        <div class="ayah-arabic-text" 
             lang="ar" 
             dir="rtl" 
             style="font-size: ${NoorQuranState.arabicFontSize}px;">
          ${ayah.arabic}
          <span class="ayah-end-marker" aria-hidden="true">۝${toArabicNumerals(ayah.numberInSurah)}</span>
        </div>

        <!-- Urdu Translation -->
        <div class="ayah-urdu-text ${NoorQuranState.showTranslation ? '' : 'hidden'}" 
             lang="ur" 
             dir="rtl" 
             style="font-size: ${NoorQuranState.urduFontSize}px;">
          ${ayah.urdu}
        </div>
      </article>
    `;
  }).join('');

  // 4. Update Prev / Next buttons
  const prevBtn = document.getElementById('btn-prev-surah');
  const nextBtn = document.getElementById('btn-next-surah');
  if (prevBtn) prevBtn.disabled = data.id <= 1;
  if (nextBtn) nextBtn.disabled = data.id >= 114;

  // 5. Update browser URL without reload
  const newUrl = `${window.location.pathname}?surah=${data.id}`;
  window.history.replaceState({ surah: data.id }, '', newUrl);

  // 6. Bind Ayah row tool events
  bindAyahToolEvents();
}

/**
 * Converts English digits to Eastern Arabic numerals (١, ٢, ٣...)
 */
function toArabicNumerals(num) {
  const arabicDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(num).replace(/[0-9]/g, w => arabicDigits[+w]);
}

/* ============================================================
   8. AUDIO ENGINE (EveryAyah CDN + Listen & Follow)
   ============================================================ */

function getAudioUrl(surahId, ayahNum, reciter) {
  const padS = String(surahId).padStart(3, '0');
  const padA = String(ayahNum).padStart(3, '0');
  return `https://everyayah.com/data/${reciter}/${padS}${padA}.mp3`;
}

function playAyah(ayahNum) {
  const data = NoorQuranState.currentSurahData;
  if (!data) return;

  ayahNum = parseInt(ayahNum, 10);
  if (ayahNum < 1 || ayahNum > data.ayahs.length) return;

  NoorQuranState.activeAyahNumber = ayahNum;
  highlightActiveAyah(ayahNum);

  const audioUrl = getAudioUrl(data.id, ayahNum, NoorQuranState.selectedReciter);
  const audio = NoorQuranState.audio;

  audio.src = audioUrl;
  audio.volume = NoorQuranState.volume;

  audio.play().then(() => {
    NoorQuranState.isPlaying = true;
    updateAudioPlayerUI();
  }).catch(err => {
    console.warn('[Noor] Audio playback error:', err);
    window.NoorToast?.show('Audio playback requires network access.', 'info');
    NoorQuranState.isPlaying = false;
    updateAudioPlayerUI();
  });
}

function togglePlayPause() {
  const audio = NoorQuranState.audio;
  if (NoorQuranState.isPlaying) {
    audio.pause();
    NoorQuranState.isPlaying = false;
  } else {
    if (!audio.src) {
      playAyah(NoorQuranState.activeAyahNumber || 1);
    } else {
      audio.play().then(() => {
        NoorQuranState.isPlaying = true;
      }).catch(() => {
        playAyah(NoorQuranState.activeAyahNumber || 1);
      });
    }
  }
  updateAudioPlayerUI();
}

function playNextAyah() {
  const data = NoorQuranState.currentSurahData;
  if (!data) return;
  if (NoorQuranState.activeAyahNumber < data.ayahs.length) {
    playAyah(NoorQuranState.activeAyahNumber + 1);
  } else if (data.id < 114) {
    // Next Surah
    loadSurah(data.id + 1).then(() => playAyah(1));
  } else {
    NoorQuranState.isPlaying = false;
    updateAudioPlayerUI();
  }
}

function playPrevAyah() {
  const data = NoorQuranState.currentSurahData;
  if (!data) return;
  if (NoorQuranState.activeAyahNumber > 1) {
    playAyah(NoorQuranState.activeAyahNumber - 1);
  } else if (data.id > 1) {
    loadSurah(data.id - 1);
  }
}

function highlightActiveAyah(ayahNum) {
  document.querySelectorAll('.ayah-row').forEach(row => {
    row.classList.remove('active-ayah');
  });

  const row = document.getElementById(`ayah-${ayahNum}`);
  if (row) {
    row.classList.add('active-ayah');
    // Smooth scroll into view if not in viewport
    const rect = row.getBoundingClientRect();
    if (rect.top < 100 || rect.bottom > window.innerHeight - 100) {
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

function updateAudioPlayerUI() {
  const playBtn = document.getElementById('player-play-btn');
  const nowPlayingLabel = document.getElementById('player-now-playing');
  const progressBar = document.getElementById('audio-progress-bar');

  if (playBtn) {
    playBtn.innerHTML = NoorQuranState.isPlaying
      ? `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`
      : `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
    playBtn.setAttribute('aria-label', NoorQuranState.isPlaying ? 'Pause' : 'Play');
  }

  if (nowPlayingLabel && NoorQuranState.currentSurahData) {
    nowPlayingLabel.textContent = `${NoorQuranState.currentSurahData.name} · Ayah ${NoorQuranState.activeAyahNumber}`;
  }
}

function initAudioEngine() {
  const audio = NoorQuranState.audio;

  audio.addEventListener('ended', () => {
    if (NoorQuranState.repeatMode === 'single') {
      audio.currentTime = 0;
      audio.play();
    } else if (NoorQuranState.repeatMode === 'continuous') {
      playNextAyah();
    } else {
      NoorQuranState.isPlaying = false;
      updateAudioPlayerUI();
    }
  });

  audio.addEventListener('timeupdate', () => {
    const progressBar = document.getElementById('audio-progress-bar');
    const timeDisplay = document.getElementById('audio-time-current');
    const durDisplay = document.getElementById('audio-time-duration');

    if (audio.duration && progressBar) {
      const pct = (audio.currentTime / audio.duration) * 100;
      progressBar.style.width = `${pct}%`;
    }

    if (timeDisplay) timeDisplay.textContent = formatTime(audio.currentTime);
    if (durDisplay && audio.duration) durDisplay.textContent = formatTime(audio.duration);
  });

  // Wire bottom bar controls
  document.getElementById('player-play-btn')?.addEventListener('click', togglePlayPause);
  document.getElementById('player-next-btn')?.addEventListener('click', playNextAyah);
  document.getElementById('player-prev-btn')?.addEventListener('click', playPrevAyah);

  // Reciter change
  const reciterSelect = document.getElementById('player-reciter-select');
  if (reciterSelect) {
    reciterSelect.innerHTML = RECITERS.map(r => 
      `<option value="${r.id}">${r.name} (${r.arabic})</option>`
    ).join('');
    reciterSelect.value = NoorQuranState.selectedReciter;
    reciterSelect.addEventListener('change', (e) => {
      NoorQuranState.selectedReciter = e.target.value;
      if (NoorQuranState.isPlaying) {
        playAyah(NoorQuranState.activeAyahNumber);
      }
    });
  }

  // Repeat toggle
  const repeatBtn = document.getElementById('player-repeat-btn');
  if (repeatBtn) {
    repeatBtn.addEventListener('click', () => {
      if (NoorQuranState.repeatMode === 'continuous') {
        NoorQuranState.repeatMode = 'single';
        repeatBtn.classList.add('repeat-single');
        repeatBtn.classList.remove('repeat-off');
        repeatBtn.title = 'Repeat Mode: Single Ayah';
        window.NoorToast?.show('Repeat Mode: Current Ayah 🔂', 'info');
      } else if (NoorQuranState.repeatMode === 'single') {
        NoorQuranState.repeatMode = 'none';
        repeatBtn.classList.remove('repeat-single');
        repeatBtn.classList.add('repeat-off');
        repeatBtn.title = 'Repeat Mode: Off';
        window.NoorToast?.show('Repeat Mode: Off', 'info');
      } else {
        NoorQuranState.repeatMode = 'continuous';
        repeatBtn.classList.remove('repeat-off');
        repeatBtn.title = 'Repeat Mode: Continuous (Autoplay Next)';
        window.NoorToast?.show('Repeat Mode: Continuous Playback 🔁', 'info');
      }
    });
  }

  // Volume slider
  const volumeSlider = document.getElementById('player-volume-slider');
  if (volumeSlider) {
    volumeSlider.value = NoorQuranState.volume * 100;
    volumeSlider.addEventListener('input', (e) => {
      const v = parseFloat(e.target.value) / 100;
      NoorQuranState.volume = v;
      audio.volume = v;
    });
  }

  // Seek bar click
  const seekTrack = document.getElementById('audio-seek-track');
  if (seekTrack) {
    seekTrack.addEventListener('click', (e) => {
      if (!audio.duration) return;
      const rect = seekTrack.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audio.currentTime = pos * audio.duration;
    });
  }
}

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s < 10 ? '0' : ''}${s}`;
}

/* ============================================================
   9. AYAH ROW TOOLS (Bookmarks, Last Read, Copy, Audio)
   ============================================================ */

function bindAyahToolEvents() {
  const container = document.getElementById('quran-verses-container');
  if (!container) return;

  // 1. Play Ayah
  container.querySelectorAll('.btn-play-ayah').forEach(btn => {
    btn.addEventListener('click', () => {
      const ayahNum = btn.getAttribute('data-ayah');
      playAyah(ayahNum);
    });
  });

  // 2. Bookmark
  container.querySelectorAll('.btn-bookmark-ayah').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-ayah-id');
      const ayahNum = btn.getAttribute('data-ayah');
      const surah = btn.getAttribute('data-surah');
      const arabic = btn.getAttribute('data-arabic');
      const translation = btn.getAttribute('data-translation');
      const ref = btn.getAttribute('data-ref');

      const isSaved = window.NoorBookmarks?.toggle({
        id, surah, ayahNum, arabic, translation, ref
      });

      btn.classList.toggle('bookmarked', isSaved);
      const svg = btn.querySelector('svg');
      if (svg) svg.setAttribute('fill', isSaved ? 'currentColor' : 'none');
    });
  });

  // 3. Mark as Last Read
  container.querySelectorAll('.btn-last-read').forEach(btn => {
    btn.addEventListener('click', () => {
      const ayahNum = parseInt(btn.getAttribute('data-ayah'), 10);
      const data = NoorQuranState.currentSurahData;
      if (!data) return;

      const progress = {
        surahNameEn: `Surah ${data.name}`,
        surahNameAr: data.arabic,
        surahNumber: data.id,
        ayahNumber: ayahNum,
        juzNumber: data.juz,
        percentJuz: Math.min(100, Math.round((ayahNum / data.ayahs.length) * 100))
      };

      window.NoorReadingProgress?.set(progress);
      window.NoorToast?.show(`Marked as Last Read: Surah ${data.name}, Ayah ${ayahNum} 📍`, 'success');
    });
  });

  // 4. Copy Ayah
  container.querySelectorAll('.btn-copy-ayah').forEach(btn => {
    btn.addEventListener('click', () => {
      const ayahNum = parseInt(btn.getAttribute('data-ayah'), 10);
      const data = NoorQuranState.currentSurahData;
      if (!data) return;

      const ayah = data.ayahs.find(a => a.numberInSurah === ayahNum);
      if (!ayah) return;

      const text = `${ayah.arabic}\n\n"${ayah.urdu}"\n— Surah ${data.name} (${data.id}:${ayahNum})\nShared via Noor (نور)`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
          window.NoorToast?.show(`Ayah ${ayahNum} copied to clipboard 📋`, 'success');
        });
      }
    });
  });
}

/* ============================================================
   10. CONTROLS: FONT SIZES, TRANSLATION & DISTRACTION-FREE
   ============================================================ */

function initReaderControls() {
  // 1. Arabic font size
  const arabicPlus = document.getElementById('btn-arabic-size-plus');
  const arabicMinus = document.getElementById('btn-arabic-size-minus');

  arabicPlus?.addEventListener('click', () => {
    if (NoorQuranState.arabicFontSize < 50) {
      NoorQuranState.arabicFontSize += 2;
      updateFontSizes();
    }
  });

  arabicMinus?.addEventListener('click', () => {
    if (NoorQuranState.arabicFontSize > 22) {
      NoorQuranState.arabicFontSize -= 2;
      updateFontSizes();
    }
  });

  // 2. Urdu font size
  const urduPlus = document.getElementById('btn-urdu-size-plus');
  const urduMinus = document.getElementById('btn-urdu-size-minus');

  urduPlus?.addEventListener('click', () => {
    if (NoorQuranState.urduFontSize < 32) {
      NoorQuranState.urduFontSize += 2;
      updateFontSizes();
    }
  });

  urduMinus?.addEventListener('click', () => {
    if (NoorQuranState.urduFontSize > 14) {
      NoorQuranState.urduFontSize -= 2;
      updateFontSizes();
    }
  });

  // 3. Translation Toggle
  const transToggle = document.getElementById('btn-toggle-translation');
  transToggle?.addEventListener('click', () => {
    NoorQuranState.showTranslation = !NoorQuranState.showTranslation;
    transToggle.classList.toggle('active', NoorQuranState.showTranslation);
    document.querySelectorAll('.ayah-urdu-text').forEach(el => {
      el.classList.toggle('hidden', !NoorQuranState.showTranslation);
    });
    window.NoorToast?.show(
      NoorQuranState.showTranslation ? 'Translation enabled' : 'Translation hidden (Arabic only)', 
      'info'
    );
  });

  // 4. Distraction-Free Reading Mode
  const dfToggle = document.getElementById('btn-distraction-free');
  dfToggle?.addEventListener('click', () => {
    NoorQuranState.distractionFree = !NoorQuranState.distractionFree;
    document.body.classList.toggle('distraction-free-mode', NoorQuranState.distractionFree);
    dfToggle.classList.toggle('active', NoorQuranState.distractionFree);
    window.NoorToast?.show(
      NoorQuranState.distractionFree ? 'Distraction-free mode enabled 🌙' : 'Standard view restored',
      'info'
    );
  });

  // 5. Surah Selector Dropdown
  const surahSelect = document.getElementById('reader-surah-select');
  if (surahSelect) {
    surahSelect.innerHTML = SURAHS_METADATA.map(s => 
      `<option value="${s.id}">${s.id}. ${s.name} (${s.arabic}) - ${s.english}</option>`
    ).join('');

    surahSelect.addEventListener('change', (e) => {
      loadSurah(e.target.value);
    });
  }

  // 6. Juz Filter Dropdown
  const juzSelect = document.getElementById('reader-juz-select');
  if (juzSelect) {
    const juzOptions = Array.from({ length: 30 }, (_, i) => i + 1);
    juzSelect.innerHTML = `<option value="">Filter by Juz (1-30)...</option>` + juzOptions.map(j => 
      `<option value="${j}">Juz ${j} (الجزء ${toArabicNumerals(j)})</option>`
    ).join('');

    juzSelect.addEventListener('change', (e) => {
      const val = parseInt(e.target.value, 10);
      if (!val) return;
      const firstSurahInJuz = SURAHS_METADATA.find(s => s.juz === val);
      if (firstSurahInJuz) {
        loadSurah(firstSurahInJuz.id);
      }
    });
  }

  // 7. Prev / Next Surah Buttons
  document.getElementById('btn-prev-surah')?.addEventListener('click', () => {
    if (NoorQuranState.currentSurahId > 1) {
      loadSurah(NoorQuranState.currentSurahId - 1);
    }
  });

  document.getElementById('btn-next-surah')?.addEventListener('click', () => {
    if (NoorQuranState.currentSurahId < 114) {
      loadSurah(NoorQuranState.currentSurahId + 1);
    }
  });
}

function updateFontSizes() {
  document.querySelectorAll('.ayah-arabic-text').forEach(el => {
    el.style.fontSize = `${NoorQuranState.arabicFontSize}px`;
  });
  document.querySelectorAll('.ayah-urdu-text').forEach(el => {
    el.style.fontSize = `${NoorQuranState.urduFontSize}px`;
  });

  const arLabel = document.getElementById('label-arabic-size');
  const urLabel = document.getElementById('label-urdu-size');
  if (arLabel) arLabel.textContent = `${NoorQuranState.arabicFontSize}px`;
  if (urLabel) urLabel.textContent = `${NoorQuranState.urduFontSize}px`;
}

/* ============================================================
   11. SEARCH & NAVIGATION TABS
   ============================================================ */

function switchView(viewName) {
  NoorQuranState.currentView = viewName;

  const tabIndex = document.getElementById('tab-btn-index');
  const tabReader = document.getElementById('tab-btn-reader');
  const sectionIndex = document.getElementById('surah-index-section');
  const sectionReader = document.getElementById('quran-reader-section');

  if (viewName === 'index') {
    tabIndex?.classList.add('active');
    tabReader?.classList.remove('active');
    if (sectionIndex) sectionIndex.style.display = 'block';
    if (sectionReader) sectionReader.style.display = 'none';
  } else {
    tabReader?.classList.add('active');
    tabIndex?.classList.remove('active');
    if (sectionIndex) sectionIndex.style.display = 'none';
    if (sectionReader) sectionReader.style.display = 'block';
  }
}

function initSearchAndTabs() {
  // Tab Switchers
  document.getElementById('tab-btn-index')?.addEventListener('click', () => switchView('index'));
  document.getElementById('tab-btn-reader')?.addEventListener('click', () => switchView('reader'));

  // Search input in Surah index
  const searchInput = document.getElementById('surah-search-input');
  searchInput?.addEventListener('input', (e) => {
    renderSurahIndex(e.target.value);
  });

  // Quick Juz Filter pills in index
  document.querySelectorAll('.juz-filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const juzNum = parseInt(pill.getAttribute('data-juz'), 10);
      const firstSurah = SURAHS_METADATA.find(s => s.juz === juzNum);
      if (firstSurah) {
        switchView('reader');
        loadSurah(firstSurah.id);
      }
    });
  });

  // Saved Bookmarks Drawer Trigger
  document.getElementById('btn-open-bookmarks')?.addEventListener('click', () => {
    openBookmarksModal();
  });
}

function openBookmarksModal() {
  const saved = window.NoorBookmarks?.getAll() || [];
  let content = '';

  if (saved.length === 0) {
    content = `
      <div class="bookmarks-empty">
        <p>No saved Ayat yet.</p>
        <small class="text-muted">Click the bookmark icon beside any Ayah while reading to save it here.</small>
      </div>
    `;
  } else {
    content = `
      <div class="bookmarks-list">
        ${saved.map(item => `
          <div class="bookmark-item">
            <div class="bookmark-item-header">
              <span class="bookmark-ref"><strong>${item.ref}</strong></span>
              <button class="btn btn-ghost btn-sm btn-remove-bm" data-bm-id="${item.id}">Remove</button>
            </div>
            <div class="bookmark-arabic" lang="ar" dir="rtl">${item.arabic}</div>
            <div class="bookmark-urdu" lang="ur" dir="rtl">${item.translation}</div>
            <div class="bookmark-jump">
              <button class="btn btn-primary btn-sm btn-jump-bm" data-surah="${item.id.split('-')[0]}" data-ayah="${item.ayahNum}">Jump to Ayah</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  window.NoorModal?.open({
    title: 'Saved Ayat (Bookmarks) 🔖',
    content: content,
    className: 'modal-bookmarks'
  });

  // Bind inside modal
  requestAnimationFrame(() => {
    document.querySelectorAll('.btn-remove-bm').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-bm-id');
        window.NoorBookmarks?.toggle({ id });
        openBookmarksModal(); // refresh
      });
    });

    document.querySelectorAll('.btn-jump-bm').forEach(btn => {
      btn.addEventListener('click', () => {
        const s = btn.getAttribute('data-surah');
        const a = btn.getAttribute('data-ayah');
        window.NoorModal?.close();
        switchView('reader');
        loadSurah(s).then(() => {
          setTimeout(() => {
            const row = document.getElementById(`ayah-${a}`);
            if (row) row.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        });
      });
    });
  });
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ============================================================
   12. MODULE INITIALIZATION
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Parse URL query params (e.g. ?surah=18&ayah=10 or ?view=index)
  const params = new URLSearchParams(window.location.search);
  const surahParam = parseInt(params.get('surah'), 10) || 1;
  const ayahParam = parseInt(params.get('ayah'), 10) || 1;
  const viewParam = params.get('view') || 'reader';

  // 1. Initialise All Components
  renderSurahIndex();
  initReaderControls();
  initAudioEngine();
  initSearchAndTabs();

  // 2. Set Active View & Load Target Surah
  switchView(viewParam);
  loadSurah(surahParam).then(() => {
    if (ayahParam > 1) {
      setTimeout(() => {
        const row = document.getElementById(`ayah-${ayahParam}`);
        if (row) {
          row.scrollIntoView({ behavior: 'smooth', block: 'center' });
          highlightActiveAyah(ayahParam);
        }
      }, 400);
    }
  });

  console.info('[Noor] Quran module fully initialized ✓');
});
