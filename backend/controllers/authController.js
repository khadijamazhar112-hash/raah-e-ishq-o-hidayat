/**
 * Raah-e-Ishq-o-Hidayat (راہِ عشق و ہدایت) — Authentication Controller
 * Secure Registration, Login, Session profile retrieval, and Token generation
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { JWT_SECRET } = require('../middleware/authMiddleware');

const AuthController = {
  /**
   * POST /api/auth/register
   * Create a new user account with secure hashed password
   */
  async register(req, res) {
    try {
      const name = (req.body.name || req.body.fullName || req.body.username || '').trim();
      const email = (req.body.email || '').trim().toLowerCase();
      const password = req.body.password;

      // 1. Validate required fields
      if (!name || name.length < 2) {
        return res.status(400).json({
          success: false,
          error: 'Please enter your full name (minimum 2 characters).'
        });
      }

      // 2. Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Please enter a valid email address.'
        });
      }

      // 3. Validate password strength
      if (!password || typeof password !== 'string' || password.length < 8) {
        return res.status(400).json({
          success: false,
          error: 'Password must be at least 8 characters long.'
        });
      }

      // 4. Check whether email is already registered
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(409).json({
          success: false,
          error: 'An account with this email address already exists. Please log in.'
        });
      }

      // 5. Securely hash password with 10 salt rounds
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      // Generate clean username from name/email
      const cleanUsername = (req.body.username || name.toLowerCase().replace(/[^a-z0-9_]/g, '') || email.split('@')[0])
        .substring(0, 40) + '_' + Math.random().toString(36).substring(2, 6);

      // 6. Save new user in database
      const user = await User.create({
        username: cleanUsername,
        email,
        passwordHash,
        fullName: name
      });

      // 7. Generate secure JWT Token
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.status(201).json({
        success: true,
        message: 'Account created successfully 🌙',
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.full_name || name,
          email: user.email,
          fullName: user.full_name || name
        }
      });
    } catch (err) {
      console.error('[Auth Register Error]', err.message);
      res.status(500).json({
        success: false,
        error: 'Registration failed due to a server error. Please try again.'
      });
    }
  },

  /**
   * POST /api/auth/login
   * Authenticate user credentials and return JWT
   */
  async login(req, res) {
    try {
      const email = (req.body.email || '').trim().toLowerCase();
      const password = req.body.password;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email and password are required.'
        });
      }

      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password combination.'
        });
      }

      const isMatch = await bcrypt.compare(password, user.password_hash);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          error: 'Invalid email or password combination.'
        });
      }

      // Generate Token
      const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
      );

      res.json({
        success: true,
        message: `Welcome back to Raah-e-Ishq-o-Hidayat, ${user.full_name || user.username}! 🌙`,
        token,
        user: {
          id: user.id,
          username: user.username,
          name: user.full_name || user.username,
          email: user.email,
          fullName: user.full_name
        }
      });
    } catch (err) {
      console.error('[Auth Login Error]', err.message);
      res.status(500).json({ success: false, error: 'Sign in failed. Please try again.' });
    }
  },
        user: {
          id: user.id,
          username: user.username,
          name: user.full_name || user.username,
          email: user.email,
          fullName: user.full_name
        }
      });
    } catch (err) {
      console.error('[Auth Login Error]', err);
      res.status(500).json({ success: false, error: 'Login failed. Please try again.' });
    }
  },

  /**
   * GET /api/auth/me
   * Return current authenticated user profile
   */
  async me(req, res) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User profile not found.' });
      }

      res.json({
        success: true,
        user
      });
    } catch (err) {
      res.status(500).json({ success: false, error: 'Failed to retrieve profile.' });
    }
  },

  /**
   * POST /api/auth/logout
   */
  logout(_req, res) {
    res.json({
      success: true,
      message: 'Logged out successfully.'
    });
  }
};

module.exports = AuthController;
