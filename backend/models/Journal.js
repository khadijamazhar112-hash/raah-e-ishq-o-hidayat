/**
 * Noor (نور) — Journal Reflection Model (Private)
 */

const { query } = require('../config/database');

const memoryReflections = new Map(); // key: userId, val: Array of reflections

const Journal = {
  async getByUserId(userId) {
    try {
      const res = await query(
        `SELECT * FROM reflections WHERE user_id = $1 ORDER BY updated_at DESC`,
        [userId]
      );
      if (res && res.rows) return res.rows;
    } catch {}
    return memoryReflections.get(userId) || [];
  },

  async create(userId, { surahNumber, surahNameEn, surahNameAr, ayahNumber, title, body, tag = 'Patience', isPrivate = true }) {
    const id = 'ref_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const now = new Date();

    try {
      const res = await query(
        `INSERT INTO reflections (id, user_id, surah_number, surah_name_en, surah_name_ar, ayah_number, title, body, tag, is_private, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
         RETURNING *`,
        [id, userId, surahNumber, surahNameEn, surahNameAr, ayahNumber, title, body, tag, isPrivate, now, now]
      );
      if (res && res.rows && res.rows.length > 0) return res.rows[0];
    } catch {}

    const newRef = {
      id,
      user_id: userId,
      surahNumber,
      surahNameEn,
      surahNameAr,
      ayahNumber,
      title,
      body,
      tag,
      isPrivate,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    const userList = memoryReflections.get(userId) || [];
    userList.unshift(newRef);
    memoryReflections.set(userId, userList);
    return newRef;
  },

  async update(id, userId, { title, body, tag }) {
    const now = new Date();
    try {
      const res = await query(
        `UPDATE reflections SET title = $1, body = $2, tag = $3, updated_at = $4
         WHERE id = $5 AND user_id = $6
         RETURNING *`,
        [title, body, tag, now, id, userId]
      );
      if (res && res.rows && res.rows.length > 0) return res.rows[0];
    } catch {}

    const userList = memoryReflections.get(userId) || [];
    const index = userList.findIndex(r => r.id === id);
    if (index !== -1) {
      userList[index] = {
        ...userList[index],
        title,
        body,
        tag,
        updatedAt: now.toISOString()
      };
      memoryReflections.set(userId, userList);
      return userList[index];
    }
    return null;
  },

  async delete(id, userId) {
    try {
      await query(`DELETE FROM reflections WHERE id = $1 AND user_id = $2`, [id, userId]);
    } catch {}

    let userList = memoryReflections.get(userId) || [];
    userList = userList.filter(r => r.id !== id);
    memoryReflections.set(userId, userList);
    return true;
  }
};

module.exports = Journal;
