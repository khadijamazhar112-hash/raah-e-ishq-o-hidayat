/**
 * Noor (نور) — Quran Model & Verified Catalog
 */

const { query } = require('../config/database');

const SURAHS_DATA = [
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
  { id: 36, name: "Ya-Sin", arabic: "يس", urdu: "یٰسین", english: "Ya-Sin", ayahs: 83, type: "Makki", juz: 22 },
  { id: 55, name: "Ar-Rahman", arabic: "الرحمن", urdu: "الرحمٰن", english: "The Beneficent", ayahs: 78, type: "Madani", juz: 27 },
  { id: 67, name: "Al-Mulk", arabic: "الملك", urdu: "الملک", english: "The Sovereignty", ayahs: 30, type: "Makki", juz: 29 },
  { id: 112, name: "Al-Ikhlas", arabic: "الإخلاص", urdu: "الاخلاص", english: "The Sincerity", ayahs: 4, type: "Makki", juz: 30 },
  { id: 113, name: "Al-Falaq", arabic: "الفلق", urdu: "الفلق", english: "The Daybreak", ayahs: 5, type: "Makki", juz: 30 },
  { id: 114, name: "An-Nas", arabic: "الناس", urdu: "الناس", english: "Mankind", ayahs: 6, type: "Makki", juz: 30 }
];

const RECITERS_DATA = [
  { id: 1, name: "Mishary Rashid Alafasy", arabic: "مشاري راشد العفاسي", subfolder: "Alafasy_128kbps", verified: true },
  { id: 2, name: "AbdulBaset AbdulSamad", arabic: "عبد الباسط عبد الصمد", subfolder: "Abdul_Basit_Murattal_192kbps", verified: true },
  { id: 3, name: "Mahmoud Khalil Al-Husary", arabic: "محمود خليل الحصري", subfolder: "Husary_128kbps", verified: true },
  { id: 4, name: "Abu Bakr Al-Shatri", arabic: "أبو بكر الشاطري", subfolder: "Abu_Bakr_Ash-Shaatree_128kbps", verified: true }
];

const Quran = {
  async getAllSurahs() {
    try {
      const res = await query('SELECT * FROM surahs ORDER BY id ASC');
      if (res && res.rows && res.rows.length > 0) return res.rows;
    } catch {}
    return SURAHS_DATA;
  },

  async getSurahById(id) {
    const num = parseInt(id, 10);
    try {
      const res = await query('SELECT * FROM surahs WHERE id = $1 LIMIT 1', [num]);
      if (res && res.rows && res.rows.length > 0) return res.rows[0];
    } catch {}
    return SURAHS_DATA.find(s => s.id === num) || null;
  },

  getReciters() {
    return RECITERS_DATA;
  },

  getAudioUrl(reciterSubfolder, surahNumber, ayahNumber) {
    const sPad = String(surahNumber).padStart(3, '0');
    const aPad = String(ayahNumber).padStart(3, '0');
    return `https://everyayah.com/data/${reciterSubfolder}/${sPad}${aPad}.mp3`;
  }
};

module.exports = Quran;
