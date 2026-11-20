/**
 * Noor (نور) — PostgreSQL Database Configuration & Connection Pool
 * Parameterized queries with resilience fallback.
 */

require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

let isConnected = false;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  database: process.env.DB_NAME || 'noor_db',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 3000
});

pool.on('connect', () => {
  isConnected = true;
  console.log('[DB] PostgreSQL pool connected successfully 🟢');
});

pool.on('error', (err) => {
  isConnected = false;
  console.warn('[DB] PostgreSQL pool warning (running resilient fallback):', err.message);
});

/**
 * Execute parameterized query safely
 * @param {string} text - SQL query string with $1, $2 placeholders
 * @param {any[]} params - Parameter values
 */
const query = async (text, params = []) => {
  try {
    const start = Date.now();
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    if (process.env.NODE_ENV === 'development') {
      console.debug('[DB Query]', { text: text.substring(0, 60), duration: `${duration}ms`, rows: res.rowCount });
    }
    return res;
  } catch (error) {
    console.warn('[DB Error]', error.message);
    throw error;
  }
};

const isDbConnected = () => isConnected;

module.exports = {
  pool,
  query,
  isDbConnected
};
