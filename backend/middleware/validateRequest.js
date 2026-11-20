/**
 * Noor (نور) — Request Validation & Sanitization Middleware
 */

/**
 * Validate email address format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return typeof email === 'string' && emailRegex.test(email.trim());
}

/**
 * Middleware: Validate Signup / Registration Payload
 */
function validateRegistration(req, res, next) {
  const { username, name, email, password } = req.body;
  const resolvedUsername = username || name;

  if (!resolvedUsername || typeof resolvedUsername !== 'string' || resolvedUsername.trim().length < 2) {
    return res.status(400).json({
      success: false,
      error: 'Name or username is required (at least 2 characters).'
    });
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      success: false,
      error: 'A valid email address is required.'
    });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({
      success: false,
      error: 'Password is required and must be at least 6 characters long.'
    });
  }

  // Sanitized trimmed fields
  req.body.username = resolvedUsername.trim();
  req.body.name = resolvedUsername.trim();
  req.body.email = email.trim().toLowerCase();
  next();
}

/**
 * Middleware: Validate Login Payload
 */
function validateLogin(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password are required.'
    });
  }

  req.body.email = email.trim().toLowerCase();
  next();
}

/**
 * Middleware: Validate Journal Reflection Payload
 */
function validateReflection(req, res, next) {
  const { surahNumber, ayahNumber, title, body } = req.body;

  if (!surahNumber || isNaN(surahNumber) || surahNumber < 1 || surahNumber > 114) {
    return res.status(400).json({
      success: false,
      error: 'Valid Surah number between 1 and 114 is required.'
    });
  }

  if (!ayahNumber || isNaN(ayahNumber) || ayahNumber < 1) {
    return res.status(400).json({
      success: false,
      error: 'Valid Ayah number is required.'
    });
  }

  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Reflection title is required.'
    });
  }

  if (!body || typeof body !== 'string' || !body.trim()) {
    return res.status(400).json({
      success: false,
      error: 'Reflection text body is required.'
    });
  }

  req.body.title = title.trim();
  req.body.body = body.trim();
  next();
}

module.exports = {
  isValidEmail,
  validateRegistration,
  validateLogin,
  validateReflection
};
