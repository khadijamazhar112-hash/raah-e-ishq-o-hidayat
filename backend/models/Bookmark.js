/**
 * Noor (نور) — Bookmark Model
 */

const { query } = require('../config/database');

const memoryBookmarks = new Map(); // key: userId, val: Array of bookmarks

const Bookmark = {
  async getByUserId(userId) {
    try {
      const res = await query(
        `SELECT * FROM bookmarks WHERE user_id = $1 ORDER BY created_at DESC`,
        [userId]
      );
      if (res && res.rows) return res.rows;
    } catch {}
    return memoryBookmarks.get(userId) || [];
  },

  async toggle(userId, bookmarkData) {
    const { id, surahNumber = 1, ayahNumber = 1, refLabel = '', arabicText = '', translationText = '' } = bookmarkData;
    let list = memoryBookmarks.get(userId) || [];
    const exists = list.some(b => b.id === id);

    if (exists) {
      // Remove
      try {
        await query(`DELETE FROM bookmarks WHERE id = $1 AND user_id = $2`, [id, userId]);
      } catch {}
      list = list.filter(b => b.id !== id);
      memoryBookmarks.set(userId, list);
      return { saved: false, id };
    } else {
      // Add
      const newBm = {
        id,
        user_id: userId,
        surahNumber,
        ayahNumber,
        ref: refLabel,
        arabic: arabicText,
        translation: translationText,
        createdAt: new Date().toISOString()
      };
      try {
        await query(
          `INSERT INTO bookmarks (id, user_id, surah_number, ayah_number, ref_label, arabic_text, translation_text)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [id, userId, surahNumber, ayahNumber, refLabel, arabicText, translationText]
        );
      } catch {}
      list.unshift(newBm);
      memoryBookmarks.set(userId, list);
      return { saved: true, data: newBm };
    }
  },

  async delete(id, userId) {
    try {
      await query(`DELETE FROM bookmarks WHERE id = $1 AND user_id = $2`, [id, userId]);
    } catch {}
    let list = memoryBookmarks.get(userId) || [];
    list = list.filter(b => b.id !== id);
    memoryBookmarks.set(userId, list);
    return true;
  }
};

module.exports = Bookmark;
