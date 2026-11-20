/**
 * Noor (نور) — Journey Routes
 */

const express = require('express');
const router = express.Router();
const JourneyController = require('../controllers/journeyController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.use(optionalAuth);

router.get('/progress', JourneyController.getReadingProgress);
router.post('/progress', JourneyController.updateReadingProgress);
router.get('/azkar', JourneyController.getAzkarProgress);
router.post('/azkar', JourneyController.updateAzkarProgress);

module.exports = router;
