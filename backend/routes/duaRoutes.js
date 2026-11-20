/**
 * Noor (نور) — Duas Routes
 */

const express = require('express');
const router = express.Router();
const DuaController = require('../controllers/duaController');

router.get('/', DuaController.getDuas);

module.exports = router;
