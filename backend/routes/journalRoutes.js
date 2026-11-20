/**
 * Noor (نور) — Journal Routes
 */

const express = require('express');
const router = express.Router();
const JournalController = require('../controllers/journalController');
const { optionalAuth } = require('../middleware/authMiddleware');
const { validateReflection } = require('../middleware/validateRequest');

router.use(optionalAuth);

router.get('/', JournalController.getReflections);
router.post('/', validateReflection, JournalController.createReflection);
router.put('/:id', validateReflection, JournalController.updateReflection);
router.delete('/:id', JournalController.deleteReflection);

module.exports = router;
