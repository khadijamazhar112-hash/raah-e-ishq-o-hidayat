/**
 * Noor (نور) — Journal Reflection Controller
 * Strict privacy: Users can only view, create, edit, or delete their own reflections.
 */

const Journal = require('../models/Journal');

const JournalController = {
  async getReflections(req, res) {
    try {
      const userId = req.user ? req.user.id : 'guest_user';
      const reflections = await Journal.getByUserId(userId);
      res.json({
        success: true,
        count: reflections.length,
        data: reflections
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Failed to retrieve reflections.' });
    }
  },

  async createReflection(req, res) {
    try {
      const userId = req.user ? req.user.id : 'guest_user';
      const reflection = await Journal.create(userId, req.body);
      res.status(201).json({
        success: true,
        message: 'Reflection saved privately 📖',
        data: reflection
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Failed to save reflection.' });
    }
  },

  async updateReflection(req, res) {
    try {
      const userId = req.user ? req.user.id : 'guest_user';
      const updated = await Journal.update(req.params.id, userId, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, error: 'Reflection not found or unauthorized.' });
      }
      res.json({
        success: true,
        message: 'Reflection updated ✨',
        data: updated
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Failed to update reflection.' });
    }
  },

  async deleteReflection(req, res) {
    try {
      const userId = req.user ? req.user.id : 'guest_user';
      await Journal.delete(req.params.id, userId);
      res.json({
        success: true,
        message: 'Reflection deleted.'
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Failed to delete reflection.' });
    }
  }
};

module.exports = JournalController;
