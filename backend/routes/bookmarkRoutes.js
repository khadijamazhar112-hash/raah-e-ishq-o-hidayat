/**
 * Noor (نور) — Bookmark Routes
 */

const express = require('express');
const router = express.Router();
const BookmarkController = require('../controllers/bookmarkController');
const { optionalAuth } = require('../middleware/authMiddleware');

router.use(optionalAuth);

router.get('/', BookmarkController.getBookmarks);
router.post('/toggle', BookmarkController.toggleBookmark);
router.delete('/:id', BookmarkController.deleteBookmark);

module.exports = router;
