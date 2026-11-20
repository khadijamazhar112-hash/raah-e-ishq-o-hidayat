/**
 * Noor (نور) — Quran Routes
 */

const express = require('express');
const router = express.Router();
const QuranController = require('../controllers/quranController');

router.get('/surahs', QuranController.getSurahs);
router.get('/surahs/:id', QuranController.getSurahById);
router.get('/reciters', QuranController.getReciters);
router.get('/audio', QuranController.getAudioUrl);
router.get('/sources', QuranController.getContentSources);

module.exports = router;
