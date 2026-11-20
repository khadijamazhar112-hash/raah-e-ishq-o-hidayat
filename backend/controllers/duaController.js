/**
 * Noor (نور) — Duas Controller
 */

const Dua = require('../models/Dua');

const DuaController = {
  async getDuas(req, res) {
    try {
      const category = req.query.category || 'all';
      const search = req.query.q;

      let data;
      if (search) {
        data = await Dua.search(search);
      } else {
        data = await Dua.getByCategory(category);
      }

      res.json({
        success: true,
        count: data.length,
        data,
        attribution: 'Hisn al-Muslim (Sa''id al-Qahtani) & Sahih Hadith Collections'
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Failed to load Duas.' });
    }
  }
};

module.exports = DuaController;
