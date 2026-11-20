/**
 * Noor (نور) — Journey Controller (Reading Progress & Daily Azkar Activity)
 */

const Journey = require('../models/Journey');

const JourneyController = {
  async getReadingProgress(req, res) {
    try {
      const userId = req.user ? req.user.id : 'guest_user';
      const progress = await Journey.getReadingProgress(userId);
      res.json({
        success: true,
        data: progress
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Could not load reading progress.' });
    }
  },

  async updateReadingProgress(req, res) {
    try {
      const userId = req.user ? req.user.id : 'guest_user';
      const updated = await Journey.updateReadingProgress(userId, req.body);
      res.json({
        success: true,
        message: 'Checkpoint updated',
        data: updated
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Could not update reading progress.' });
    }
  },

  async getAzkarProgress(req, res) {
    try {
      const userId = req.user ? req.user.id : 'guest_user';
      const progress = await Journey.getAzkarProgress(userId);
      res.json({
        success: true,
        data: progress
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Could not load Azkar progress.' });
    }
  },

  async updateAzkarProgress(req, res) {
    try {
      const userId = req.user ? req.user.id : 'guest_user';
      const updated = await Journey.updateAzkarProgress(userId, req.body);
      res.json({
        success: true,
        message: 'Azkar progress updated',
        data: updated
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Could not update Azkar progress.' });
    }
  }
};

module.exports = JourneyController;
