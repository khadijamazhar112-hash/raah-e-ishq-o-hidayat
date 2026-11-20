/**
 * Noor (نور) — Quran Controller
 */

const Quran = require('../models/Quran');
const ContentReview = require('../models/ContentReview');

const QuranController = {
  async getSurahs(_req, res) {
    try {
      const surahs = await Quran.getAllSurahs();
      res.json({
        success: true,
        count: surahs.length,
        data: surahs
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Could not load Surah catalog.' });
    }
  },

  async getSurahById(req, res) {
    try {
      const surah = await Quran.getSurahById(req.params.id);
      if (!surah) {
        return res.status(404).json({ success: false, error: 'Surah not found.' });
      }

      res.json({
        success: true,
        data: surah,
        attribution: {
          translation: 'Fateh Muhammad Jalandhry (Verified Classical Urdu)',
          source: 'Tanzil Project (http://tanzil.net)',
          license: 'Public Educational License'
        }
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Could not retrieve Surah details.' });
    }
  },

  getReciters(_req, res) {
    const reciters = Quran.getReciters();
    res.json({
      success: true,
      count: reciters.length,
      data: reciters,
      cdn: 'EveryAyah Project (https://everyayah.com)'
    });
  },

  getAudioUrl(req, res) {
    const { reciter, surah, ayah } = req.query;
    if (!reciter || !surah || !ayah) {
      return res.status(400).json({
        success: false,
        error: 'Parameters reciter, surah, and ayah are required.'
      });
    }

    const audioUrl = Quran.getAudioUrl(reciter, surah, ayah);
    res.json({
      success: true,
      audioUrl
    });
  },

  getContentSources(_req, res) {
    res.json({
      success: true,
      sources: ContentReview.getSources(),
      reviews: ContentReview.getReviews()
    });
  }
};

module.exports = QuranController;
