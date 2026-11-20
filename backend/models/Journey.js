/**
 * Noor (نور) — Journey Model (Reading Progress & Daily Azkar Progress)
 */

const { query } = require('../config/database');

const memoryProgress = new Map(); // key: userId, val: reading progress object
const memoryAzkarProgress = new Map(); // key: userId, val: azkar progress map

const Journey = {
  async getReadingProgress(userId) {
    try {
      const res = await query(
        `SELECT * FROM reading_progress WHERE user_id = $1 LIMIT 1`,
        [userId]
      );
      if (res && res.rows && res.rows.length > 0) return res.rows[0];
    } catch {}

    return memoryProgress.get(userId) || {
      surahNameEn: 'Surah Al-Kahf',
      surahNameAr: 'سورة الكهف',
      surahNumber: 18,
      ayahNumber: 19,
      juzNumber: 15,
      percentJuz: 17,
      lastReadDate: 'Recently'
    };
  },

  async updateReadingProgress(userId, data) {
    const { surahNameEn, surahNameAr, surahNumber, ayahNumber, juzNumber = 1, percentJuz = 0 } = data;
    const now = new Date();

    try {
      const res = await query(
        `INSERT INTO reading_progress (user_id, surah_name_en, surah_name_ar, surah_number, ayah_number, juz_number, percent_juz, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (user_id) DO UPDATE SET
           surah_name_en = EXCLUDED.surah_name_en,
           surah_name_ar = EXCLUDED.surah_name_ar,
           surah_number = EXCLUDED.surah_number,
           ayah_number = EXCLUDED.ayah_number,
           juz_number = EXCLUDED.juz_number,
           percent_juz = EXCLUDED.percent_juz,
           updated_at = EXCLUDED.updated_at
         RETURNING *`,
        [userId, surahNameEn, surahNameAr, surahNumber, ayahNumber, juzNumber, percentJuz, now]
      );
      if (res && res.rows && res.rows.length > 0) return res.rows[0];
    } catch {}

    const updated = {
      surahNameEn,
      surahNameAr,
      surahNumber,
      ayahNumber,
      juzNumber,
      percentJuz,
      lastReadDate: 'Just now'
    };
    memoryProgress.set(userId, updated);
    return updated;
  },

  async getAzkarProgress(userId) {
    return memoryAzkarProgress.get(userId) || {};
  },

  async updateAzkarProgress(userId, progressMap) {
    memoryAzkarProgress.set(userId, progressMap);
    return progressMap;
  }
};

module.exports = Journey;
