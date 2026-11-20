/**
 * Noor (نور) — Bookmark Controller
 */

const Bookmark = require('../models/Bookmark');

const BookmarkController = {
  async getBookmarks(req, res) {
    try {
      const userId = req.user ? req.user.id : 'guest_user';
      const bookmarks = await Bookmark.getByUserId(userId);
      res.json({
        success: true,
        count: bookmarks.length,
        data: bookmarks
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Could not load bookmarks.' });
    }
  },

  async toggleBookmark(req, res) {
    try {
      const userId = req.user ? req.user.id : 'guest_user';
      const result = await Bookmark.toggle(userId, req.body);
      res.json({
        success: true,
        ...result
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Could not toggle bookmark.' });
    }
  },

  async deleteBookmark(req, res) {
    try {
      const userId = req.user ? req.user.id : 'guest_user';
      await Bookmark.delete(req.params.id, userId);
      res.json({
        success: true,
        message: 'Bookmark removed.'
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Could not remove bookmark.' });
    }
  }
};

module.exports = BookmarkController;
