/**
 * Noor (نور) — User Model
 * Parameterized PostgreSQL queries with in-memory resilient fallback
 */

const { query } = require('../config/database');

// In-memory fallback map for development or offline mode
const memoryUsers = new Map();

const User = {
  async findByEmail(email) {
    try {
      const res = await query('SELECT * FROM users WHERE email = $1 LIMIT 1', [email]);
      if (res && res.rows && res.rows.length > 0) {
        return res.rows[0];
      }
    } catch {
      // Fallback to memory
    }
    for (const u of memoryUsers.values()) {
      if (u.email.toLowerCase() === email.toLowerCase()) return u;
    }
    return null;
  },

  async findById(id) {
    try {
      const res = await query('SELECT id, username, email, full_name, preferred_language, created_at FROM users WHERE id = $1 LIMIT 1', [id]);
      if (res && res.rows && res.rows.length > 0) {
        return res.rows[0];
      }
    } catch {
      // Fallback to memory
    }
    const memUser = memoryUsers.get(id);
    if (memUser) {
      const { password_hash, ...safeUser } = memUser;
      return safeUser;
    }
    return null;
  },

  async create({ username, email, passwordHash, fullName = null }) {
    const fallbackId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const now = new Date();

    try {
      // Allow PostgreSQL uuid_generate_v4() default to generate UUID
      const res = await query(
        `INSERT INTO users (username, email, password_hash, full_name, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id, username, email, full_name, created_at`,
        [username, email, passwordHash, fullName, now, now]
      );
      if (res && res.rows && res.rows.length > 0) {
        return res.rows[0];
      }
    } catch (dbErr) {
      console.warn('[DB User Create Fallback]', dbErr.message);
    }

    const newUser = {
      id: fallbackId,
      username,
      email,
      password_hash: passwordHash,
      full_name: fullName,
      created_at: now
    };
    memoryUsers.set(fallbackId, newUser);

    const { password_hash, ...safeUser } = newUser;
    return safeUser;
  }
};

module.exports = User;
