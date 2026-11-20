/**
 * Raah-e-Ishq-o-Hidayat (راہِ عشق و ہدایت) — Backend Express Server
 * REST API & Static Frontend Server
 */

require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const path = require('path');

const { errorHandler, notFoundHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Security & Middleware ───────────────────────────────────────────────────
app.use(cors({
  origin: process.env.APP_URL || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Static Frontend Files ───────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, '..')));

// ── REST API Routes ─────────────────────────────────────────────────────────
app.use('/api/auth',      require('./routes/authRoutes'));
app.use('/api/quran',     require('./routes/quranRoutes'));
app.use('/api/azkar',     require('./routes/azkarRoutes'));
app.use('/api/duas',      require('./routes/duaRoutes'));
app.use('/api/topics',    require('./routes/topicRoutes'));
app.use('/api/journal',   require('./routes/journalRoutes'));
app.use('/api/journey',   require('./routes/journeyRoutes'));
app.use('/api/bookmarks', require('./routes/bookmarkRoutes'));

// ── Health Check Endpoint ───────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'Raah-e-Ishq-o-Hidayat (راہِ عشق و ہدایت)',
    tagline: 'Where Every Heart Finds Guidance',
    version: '1.0.0',
    pwa: true,
    timestamp: new Date().toISOString()
  });
});

// ── Error Handling ──────────────────────────────────────────────────────────
app.use('/api/*', notFoundHandler);
app.use(errorHandler);

// ── Start Server ────────────────────────────────────────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Raah-e-Ishq-o-Hidayat] Server running on http://localhost:${PORT} (${process.env.NODE_ENV || 'development'}) 🌙`);
  });
}

module.exports = app;
