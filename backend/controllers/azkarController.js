/**
 * Noor (نور) — Azkar Controller
 */

const Azkar = require('../models/Azkar');

const AzkarController = {
  async getCategories(_req, res) {
    try {
      const categories = await Azkar.getCategories();
      res.json({
        success: true,
        count: categories.length,
        data: categories
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Failed to load Azkar categories.' });
    }
  },

  async getAzkar(req, res) {
    try {
      const category = req.query.category || 'all';
      const items = await Azkar.getByCategory(category);
      res.json({
        success: true,
        category,
        count: items.length,
        data: items,
        attribution: 'Hisn al-Muslim (Darussalam) & Sahih Hadith Collections'
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Failed to load Azkar items.' });
    }
  },

  async getAzkarById(req, res) {
    try {
      const item = await Azkar.getById(req.params.id);
      if (!item) {
        return res.status(404).json({ success: false, error: 'Azkar item not found.' });
      }
      res.json({
        success: true,
        data: item
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Failed to retrieve Azkar.' });
    }
  }
};

module.exports = AzkarController;
