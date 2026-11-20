/**
 * Noor (نور) — Quran Topics Routes
 */

const express = require('express');
const router = express.Router();
const TopicController = require('../controllers/topicController');

router.get('/', TopicController.getTopics);
router.get('/:id', TopicController.getTopicById);

module.exports = router;
