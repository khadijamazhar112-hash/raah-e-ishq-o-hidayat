/**
 * Noor (نور) — Quran Topics Controller
 */

const Topic = require('../models/Topic');

const TopicController = {
  getTopics(_req, res) {
    const topics = Topic.getAll();
    res.json({
      success: true,
      count: topics.length,
      data: topics
    });
  },

  getTopicById(req, res) {
    const topic = Topic.getById(req.params.id);
    if (!topic) {
      return res.status(404).json({ success: false, error: 'Topic not found.' });
    }
    res.json({
      success: true,
      data: topic
    });
  }
};

module.exports = TopicController;
