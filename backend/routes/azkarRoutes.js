/**
 * Noor (نور) — Azkar Routes
 */

const express = require('express');
const router = express.Router();
const AzkarController = require('../controllers/azkarController');

router.get('/categories', AzkarController.getCategories);
router.get('/', AzkarController.getAzkar);
router.get('/:id', AzkarController.getAzkarById);

module.exports = router;
