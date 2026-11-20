/**
 * @fileoverview Noor (نور) Islamic Learning Platform — Main JavaScript
 * Loaded on every page. Handles: header/footer injection, navigation,
 * theme toggle, mobile menu, scroll behavior, toast notifications,
 * modal system, auth modal, Hijri date, and prayer time greeting.
 *
 * @version 1.0.0
 */

'use strict';

/* ============================================================
   CONSTANTS
   ============================================================ */

const THEME_KEY   = 'noor-theme';
const JWT_KEY     = 'noor-jwt';
const USER_KEY    = 'noor-user';
const DARK_THEME  = 'dark';
const LIGHT_THEME = 'light';

/* ============================================================
   HEADER TEMPLATE
   ============================================================ */

const HEADER_HTML = /* html */`
<header id="site-header">
  <div class="header-inner container">
    <a href="index.html" class="logo" aria-label="Raah-e-Ishq-o-Hidayat Home">
      <div class="logo-mark" aria-hidden="true">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="white"/>
        </svg>
      </div>
      <div class="logo-text">
        <span class="logo-name-en">Raah-e-Ishq-o-Hidayat</span>
        <span class="logo-name-ar" lang="ur">راہِ عشق و ہدایت</span>
      </div>
    </a>

    <nav id="main-nav" aria-label="Main navigation">
      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
      <ul class="nav-links" id="nav-links">
        <li><a href="index.html"   class="nav-link" data-page="home">Home</a></li>
        <li><a href="quran.html"   class="nav-link" data-page="quran">Al-Quran</a></li>
        <li><a href="azkar.html"   class="nav-link" data-page="azkar">Daily Azkar</a></li>
        <li><a href="duas.html"    class="nav-link" data-page="duas">Daily Duas</a></li>
        <li><a href="topics.html"  class="nav-link" data-page="topics">Explore Topics</a></li>
        <li><a href="journal.html" class="nav-link" data-page="journal">My Journal</a></li>
        <li><a href="journey.html" class="nav-link" data-page="journey">My Journey</a></li>
        <li class="nav-install-item">
          <button type="button" class="nav-install-btn" id="btn-pwa-install-nav" aria-label="Install App">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span>Install App</span>
          </button>
        </li>
      </ul>
    </nav>

    <div class="header-actions">
      <div class="prayer-greeting" id="prayer-greeting" aria-live="polite"></div>
      <div class="hijri-date-header" id="hijri-date-header" aria-label="Hijri date"></div>

      <button class="btn-icon pwa-install-btn" id="btn-pwa-install" aria-label="Install App" title="Install Raah-e-Ishq-o-Hidayat App">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        <span class="pwa-install-label">Install App</span>
      </button>

      <button class="btn-icon search-toggle" id="search-toggle" aria-label="Search Raah-e-Ishq-o-Hidayat platform" title="Search Quran, Duas, Topics">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      </button>

      <button class="btn-icon theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle theme">
        <svg class="icon-sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1"  x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22"  y1="4.22"  x2="5.64"  y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1"  y1="12" x2="3"  y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
          <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
        </svg>
        <svg class="icon-moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>

      <div class="auth-buttons" id="auth-buttons">
        <button class="btn btn-ghost btn-sm" id="btn-signin">Sign In</button>
        <button class="btn btn-primary btn-sm" id="btn-register">Register</button>
      </div>
      <div class="user-menu hidden" id="user-menu">
        <span class="user-greeting" id="user-greeting"></span>
        <a href="settings.html" class="btn btn-ghost btn-sm" title="Settings">Settings</a>
        <button class="btn btn-ghost btn-sm" id="btn-signout">Sign Out</button>
      </div>
    </div>
  </div>
</header>`;

/* ============================================================
   FOOTER TEMPLATE
   ============================================================ */

const FOOTER_HTML = /* html */`
<footer class="site-footer">
  <div class="footer-pattern" aria-hidden="true"></div>
  <div class="container">
    <div class="footer-grid">
      <div class="footer-brand">
        <div class="footer-logo">
          <div class="logo-mark logo-mark-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" fill="white"/>
            </svg>
          </div>
          <div>
            <span class="logo-name-en">Raah-e-Ishq-o-Hidayat</span>
            <span class="logo-name-ar" lang="ur">راہِ عشق و ہدایت</span>
          </div>
        </div>
        <p class="footer-tagline">Where Every Heart Finds Guidance</p>
        <p class="footer-bismillah" lang="ar">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
        <p class="footer-hijri" id="footer-hijri" aria-label="Today's Hijri date"></p>
      </div>
      <div class="footer-links">
        <h4 class="footer-heading">Navigate</h4>
        <ul>
          <li><a href="index.html">Home</a></li>
          <li><a href="quran.html">Al-Quran</a></li>
          <li><a href="azkar.html">Daily Azkar</a></li>
          <li><a href="duas.html">Daily Duas</a></li>
          <li><a href="topics.html">Explore Topics</a></li>
          <li><a href="journal.html">My Journal</a></li>
          <li><a href="journey.html">My Journey</a></li>
          <li><a href="settings.html">Settings</a></li>
        </ul>
      </div>
      <div class="footer-info">
        <h4 class="footer-heading">About Raah-e-Ishq-o-Hidayat</h4>
        <p>A free Islamic learning platform for Muslims worldwide. Read the Quran, learn duas and azkar, explore Islamic topics, and track your spiritual journey.</p>
        <p class="footer-quote" lang="ar">وَنُنَزِّلُ مِنَ الْقُرْآنِ مَا هُوَ شِفَاءٌ وَرَحْمَةٌ لِّلْمُؤْمِنِينَ</p>
        <p class="footer-quote-ref">— Surah Al-Isra: 82</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Raah-e-Ishq-o-Hidayat (راہِ عشق و ہدایت). Made with <span aria-label="love">❤️</span> for the Ummah.</p>
      <p><a href="settings.html">Settings</a> · <a href="#">Privacy</a> · <a href="#">About</a></p>
    </div>
  </div>
</footer>`;

/* ============================================================
   SECTION 1 — HEADER & FOOTER INJECTION
   ============================================================ */

/**
 * Injects the shared header HTML into #header-placeholder.
 * Falls back gracefully if the placeholder is absent.
 */
function injectHeader() {
  const placeholder = document.getElementById('header-placeholder');
  if (!placeholder) return;
  placeholder.innerHTML = HEADER_HTML;
}

/**
 * Injects the shared footer HTML into #footer-placeholder.
 */
function injectFooter() {
  const placeholder = document.getElementById('footer-placeholder');
  if (!placeholder) return;
  placeholder.innerHTML = FOOTER_HTML;
}

/* ============================================================
   SECTION 2 — NAVIGATION ACTIVE STATE
   ============================================================ */

/**
 * Determines the current page name from the URL pathname,
 * then marks the matching nav-link as "active".
 */
function setActiveNavLink() {
  const pathname = window.location.pathname;

  // Extract filename without extension, e.g. "quran" from "/quran.html"
  const filename = pathname.split('/').pop().replace('.html', '') || 'index';

  // Map filename -> data-page value
  const pageMap = {
    index:   'home',
    '':      'home',
    quran:   'quran',
    azkar:   'azkar',
    duas:    'duas',
    topics:  'topics',
    journal: 'journal',
    journey: 'journey',
    settings: 'settings',
  };

  const activePage = pageMap[filename] ?? filename;

  document.querySelectorAll('.nav-link[data-page]').forEach(link => {
    if (link.dataset.page === activePage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/* ============================================================
   SECTION 3 — MOBILE MENU
   ============================================================ */

/**
 * Wires up the hamburger toggle, outside-click close,
 * and auto-close on nav-link click.
 */
function initMobileMenu() {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');
  const mainNav   = document.getElementById('main-nav');
  if (!navToggle || !mainNav) return;

  /**
   * Opens the mobile navigation menu.
   */
  const openMenu = () => {
    document.body.classList.add('nav-open');
    navToggle.setAttribute('aria-expanded', 'true');
  };

  /**
   * Closes the mobile navigation menu.
   */
  const closeMenu = () => {
    document.body.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = document.body.classList.contains('nav-open');
    isOpen ? closeMenu() : openMenu();
  });

  // Close when any nav link is clicked
  if (navLinks) {
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Close when clicking outside the nav
  document.addEventListener('click', e => {
    if (
      document.body.classList.contains('nav-open') &&
      !mainNav.contains(e.target) &&
      !navToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      closeMenu();
      navToggle.focus();
    }
  });
}

/* ============================================================
   SECTION 4 — SCROLL BEHAVIOR
   ============================================================ */

/**
 * Adds/removes the "scrolled" class on #site-header based on
 * scroll position (threshold: 20px).
 */
function initScrollBehavior() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Run once on init
  handleScroll();
  window.addEventListener('scroll', handleScroll, { passive: true });
}

/* ============================================================
   SECTION 5 — THEME (DARK MODE)
   ============================================================ */

/**
 * Applies a theme by setting [data-theme] on <html>.
 * @param {string} theme - 'dark' or 'light'
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);

  // Toggle icon visibility
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.setAttribute(
      'aria-label',
      theme === DARK_THEME ? 'Switch to light mode' : 'Switch to dark mode'
    );
  }
}

/**
 * Reads saved theme from localStorage (or system preference),
 * applies it, and wires up the toggle button.
 */
function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved ?? (prefersDark ? DARK_THEME : LIGHT_THEME);

  applyTheme(theme);

  // Wire up button — may be called after header injection
  document.addEventListener('click', e => {
    if (e.target.closest('#theme-toggle')) {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === DARK_THEME ? LIGHT_THEME : DARK_THEME);
    }
  });
}

/* ============================================================
   SECTION 6 — TOAST NOTIFICATION SYSTEM
   ============================================================ */

/**
 * Global toast notification system.
 * @namespace NoorToast
 */
window.NoorToast = (() => {
  let container = null;

  /**
   * Lazily creates (or retrieves) the toast container element.
   * @returns {HTMLElement}
   */
  const getContainer = () => {
    if (!container || !document.body.contains(container)) {
      container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      container.setAttribute('aria-atomic', 'false');
      container.setAttribute('role', 'status');
      document.body.appendChild(container);
    }
    return container;
  };

  /**
   * Returns the SVG icon markup for a given toast type.
   * @param {string} type
   * @returns {string}
   */
  const getIcon = type => {
    const icons = {
      success: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`,
      error:   `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
      warning: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
      info:    `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    };
    return icons[type] ?? icons.info;
  };

  return {
    /**
     * Displays a toast notification.
     * @param {string} message   - The text to show.
     * @param {'success'|'error'|'warning'|'info'} [type='info'] - Visual style.
     * @param {number} [duration=3000] - Auto-dismiss delay in ms (0 = no auto-dismiss).
     * @returns {HTMLElement} The created toast element.
     */
    show(message, type = 'info', duration = 3000) {
      const c     = getContainer();
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.setAttribute('role', 'alert');
      toast.innerHTML = `
        <span class="toast-icon">${getIcon(type)}</span>
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Dismiss notification">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>`;

      const dismiss = () => {
        toast.classList.add('toast-dismissing');
        toast.addEventListener('animationend', () => toast.remove(), { once: true });
      };

      toast.querySelector('.toast-close').addEventListener('click', dismiss);
      c.appendChild(toast);

      // Trigger enter animation
      requestAnimationFrame(() => toast.classList.add('toast-visible'));

      if (duration > 0) {
        setTimeout(dismiss, duration);
      }

      return toast;
    },
  };
})();

/* ============================================================
   SECTION 7 — MODAL SYSTEM
   ============================================================ */

/**
 * Global modal system.
 * @namespace NoorModal
 */
window.NoorModal = (() => {
  let overlay      = null;
  let currentClose = null;

  /**
   * Creates the modal DOM scaffold if it doesn't already exist.
   * @returns {{ overlay: HTMLElement, dialog: HTMLElement }}
   */
  const scaffold = () => {
    if (overlay && document.body.contains(overlay)) {
      return { overlay, dialog: overlay.querySelector('.modal-dialog') };
    }

    overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');

    const dialog = document.createElement('div');
    dialog.className = 'modal-dialog';
    overlay.appendChild(dialog);
    document.body.appendChild(overlay);

    return { overlay, dialog };
  };

  /**
   * Closes the currently open modal.
   */
  const close = () => {
    if (!overlay) return;
    overlay.classList.remove('modal-open');
    document.body.classList.remove('modal-active');
    if (typeof currentClose === 'function') currentClose();
    currentClose = null;

    overlay.addEventListener('transitionend', () => {
      if (!overlay.classList.contains('modal-open')) {
        overlay.remove();
        overlay = null;
      }
    }, { once: true });
  };

  return {
    /**
     * Opens a modal dialog.
     * @param {object} config
     * @param {string}   [config.title]   - Modal heading.
     * @param {string}   config.content   - Inner HTML for the body.
     * @param {string}   [config.footer]  - Inner HTML for the footer.
     * @param {Function} [config.onClose] - Callback when modal closes.
     * @param {string}   [config.className] - Extra class on modal-dialog.
     */
    open({ title = '', content = '', footer = '', onClose, className = '' } = {}) {
      const { overlay: ov, dialog } = scaffold();
      currentClose = onClose ?? null;

      dialog.className = `modal-dialog ${className}`;
      dialog.innerHTML = `
        ${title ? `<div class="modal-header">
          <h2 class="modal-title">${title}</h2>
          <button class="modal-close btn-icon" aria-label="Close modal">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>` : ''}
        <div class="modal-body">${content}</div>
        ${footer ? `<div class="modal-footer">${footer}</div>` : ''}`;

      dialog.querySelector('.modal-close')?.addEventListener('click', close);

      ov.addEventListener('click', e => {
        if (e.target === ov) close();
      }, { once: true });

      document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          close();
          document.removeEventListener('keydown', escHandler);
        }
      });

      document.body.classList.add('modal-active');
      requestAnimationFrame(() => ov.classList.add('modal-open'));

      // Focus first focusable element
      setTimeout(() => {
        const focusable = dialog.querySelector(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      }, 100);
    },

    close,

    /**
     * Shows a confirmation modal.
     * @param {string}   message    - Confirmation question text.
     * @param {Function} onConfirm  - Called if user confirms.
     * @param {Function} [onCancel] - Called if user cancels.
     */
    confirm(message, onConfirm, onCancel) {
      this.open({
        title: 'Confirm',
        content: `<p class="confirm-message">${message}</p>`,
        footer: `
          <button class="btn btn-ghost" id="modal-cancel">Cancel</button>
          <button class="btn btn-primary" id="modal-confirm">Confirm</button>`,
        onClose: onCancel,
      });

      document.getElementById('modal-cancel')?.addEventListener('click', () => {
        close();
        if (typeof onCancel === 'function') onCancel();
      });
      document.getElementById('modal-confirm')?.addEventListener('click', () => {
        close();
        if (typeof onConfirm === 'function') onConfirm();
      });
    },
  };
})();

/* ============================================================
   SECTION 8 — AUTH MODAL
   ============================================================ */

/**
 * Builds the tab-based auth modal content (Sign In / Register).
 * @param {'signin'|'register'} [initialTab='signin']
 * @returns {string} HTML string
 */
const buildAuthModalContent = (initialTab = 'signin') => /* html */`
<div class="auth-modal">
  <div class="auth-tabs" role="tablist">
    <button class="auth-tab ${initialTab === 'signin' ? 'active' : ''}"
            role="tab" aria-selected="${initialTab === 'signin'}" data-tab="signin">
      Sign In
    </button>
    <button class="auth-tab ${initialTab === 'register' ? 'active' : ''}"
            role="tab" aria-selected="${initialTab === 'register'}" data-tab="register">
      Register
    </button>
  </div>

  <!-- SIGN IN PANEL -->
  <div class="auth-panel ${initialTab === 'signin' ? 'active' : ''}" id="panel-signin" role="tabpanel">
    <form class="auth-form" id="form-signin" novalidate>
      <div class="form-group">
        <label for="signin-email" class="form-label">Email</label>
        <input type="email" id="signin-email" name="email"
               class="form-input" placeholder="you@example.com" autocomplete="email" required />
        <span class="field-error" id="signin-email-error"></span>
      </div>
      <div class="form-group">
        <label for="signin-password" class="form-label">Password</label>
        <div class="input-with-toggle">
          <input type="password" id="signin-password" name="password"
                 class="form-input" placeholder="Your password" autocomplete="current-password" required />
          <button type="button" class="btn-icon input-eye" aria-label="Show password">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
        <span class="field-error" id="signin-password-error"></span>
      </div>
      <button type="submit" class="btn btn-primary btn-full" id="btn-signin-submit">
        Sign In
      </button>
      <p class="auth-switch-hint">
        Don't have an account?
        <button type="button" class="link-btn" data-switch-tab="register">Register here</button>
      </p>
    </form>
  </div>

  <!-- REGISTER PANEL -->
  <div class="auth-panel ${initialTab === 'register' ? 'active' : ''}" id="panel-register" role="tabpanel">
    <form class="auth-form" id="form-register" novalidate>
      <div class="form-group">
        <label for="register-name" class="form-label">Full Name</label>
        <input type="text" id="register-name" name="name"
               class="form-input" placeholder="Your name" autocomplete="name" required />
        <span class="field-error" id="register-name-error"></span>
      </div>
      <div class="form-group">
        <label for="register-email" class="form-label">Email</label>
        <input type="email" id="register-email" name="email"
               class="form-input" placeholder="you@example.com" autocomplete="email" required />
        <span class="field-error" id="register-email-error"></span>
      </div>
      <div class="form-group">
        <label for="register-password" class="form-label">Password</label>
        <div class="input-with-toggle">
          <input type="password" id="register-password" name="password"
                 class="form-input" placeholder="Min. 8 characters" autocomplete="new-password" required />
          <button type="button" class="btn-icon input-eye" aria-label="Show password">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </button>
        </div>
        <span class="field-error" id="register-password-error"></span>
      </div>
      <div class="form-group">
        <label for="register-confirm" class="form-label">Confirm Password</label>
        <input type="password" id="register-confirm" name="confirm"
               class="form-input" placeholder="Repeat password" autocomplete="new-password" required />
        <span class="field-error" id="register-confirm-error"></span>
      </div>
      <button type="submit" class="btn btn-primary btn-full" id="btn-register-submit">
        Create Account
      </button>
      <p class="auth-switch-hint">
        Already have an account?
        <button type="button" class="link-btn" data-switch-tab="signin">Sign in here</button>
      </p>
    </form>
  </div>
</div>`;

/**
 * Validates an email address format.
 * @param {string} email
 * @returns {boolean}
 */
const isValidEmail = email =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

/**
 * Displays a field-level validation error.
 * @param {string} fieldId - ID of the input element.
 * @param {string} message - Error message.
 */
const setFieldError = (fieldId, message) => {
  const input = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}-error`);
  if (input)  input.classList.add('input-error');
  if (error) error.textContent = message;
};

/**
 * Clears all field errors within a form.
 * @param {HTMLFormElement} form
 */
const clearFormErrors = form => {
  form.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));
  form.querySelectorAll('.field-error').forEach(el => (el.textContent = ''));
};

/**
 * Saves the authenticated user's JWT and display name to localStorage,
 * then updates the header UI to show the user menu.
 * @param {string} token - JWT returned by the API.
 * @param {string} name  - User's display name.
 */
const persistAuth = (token, name) => {
  localStorage.setItem(JWT_KEY, token);
  localStorage.setItem(USER_KEY, name);
  updateAuthUI(name);
};

/**
 * Updates the header auth section to reflect signed-in / signed-out state.
 * @param {string|null} userName - Null = signed out.
 */
const updateAuthUI = userName => {
  const authButtons = document.getElementById('auth-buttons');
  const userMenu    = document.getElementById('user-menu');
  const greeting    = document.getElementById('user-greeting');

  if (!authButtons || !userMenu) return;

  if (userName) {
    authButtons.classList.add('hidden');
    userMenu.classList.remove('hidden');
    if (greeting) greeting.textContent = `Ahlan, ${userName}`;
  } else {
    authButtons.classList.remove('hidden');
    userMenu.classList.add('hidden');
  }
};

/**
 * Signs the user out: clears storage and resets header UI.
 */
const signOut = () => {
  const getApiUrl = (route) => {
    if (window.location.protocol === 'file:' || !window.location.origin || window.location.origin === 'null') {
      return 'http://localhost:8080' + route;
    }
    return route;
  };
  try {
    fetch(getApiUrl('/api/auth/logout'), { method: 'POST' }).catch(() => {});
  } catch {}
  localStorage.removeItem(JWT_KEY);
  localStorage.removeItem(USER_KEY);
  updateAuthUI(null);
  window.NoorToast.show('You have been signed out.', 'info');
};

/**
 * Wires up the auth tabs, password-eye toggles, form submissions,
 * and tab-switcher links within the already-mounted auth modal.
 * @param {string} initialTab
 */
const bindAuthModalEvents = initialTab => {
  const modalBody = document.querySelector('.auth-modal');
  if (!modalBody) return;

  // --- Tab switching ---
  const switchTab = tabName => {
    modalBody.querySelectorAll('.auth-tab').forEach(btn => {
      const active = btn.dataset.tab === tabName;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });
    modalBody.querySelectorAll('.auth-panel').forEach(panel => {
      panel.classList.toggle('active', panel.id === `panel-${tabName}`);
    });
  };

  modalBody.querySelectorAll('.auth-tab').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.tab));
  });

  modalBody.querySelectorAll('[data-switch-tab]').forEach(btn => {
    btn.addEventListener('click', () => switchTab(btn.dataset.switchTab));
  });

  // --- Password eye toggles ---
  modalBody.querySelectorAll('.input-eye').forEach(eyeBtn => {
    eyeBtn.addEventListener('click', () => {
      const inputWrapper = eyeBtn.closest('.input-with-toggle');
      const input = inputWrapper?.querySelector('input');
      if (!input) return;
      input.type = input.type === 'password' ? 'text' : 'password';
      eyeBtn.setAttribute('aria-label', input.type === 'password' ? 'Show password' : 'Hide password');
    });
  });

  // --- Sign In form ---
  let isSigningIn = false;
  const signinForm = document.getElementById('form-signin');
  signinForm?.addEventListener('submit', async e => {
    e.preventDefault();
    if (isSigningIn) return;
    clearFormErrors(signinForm);

    const email    = document.getElementById('signin-email')?.value.trim();
    const password = document.getElementById('signin-password')?.value;
    let valid = true;

    if (!email || !isValidEmail(email)) {
      setFieldError('signin-email', 'Please enter a valid email address.');
      valid = false;
    }
    if (!password || password.length < 1) {
      setFieldError('signin-password', 'Password is required.');
      valid = false;
    }
    if (!valid) return;

    const submitBtn = document.getElementById('btn-signin-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Signing in…';
    isSigningIn = true;

    const getApiUrl = (route) => {
      if (window.location.protocol === 'file:' || !window.location.origin || window.location.origin === 'null') {
        return 'http://localhost:8080' + route;
      }
      return route;
    };

    try {
      const res = await fetch(getApiUrl('/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.error || data.message || 'Invalid email or password combination.';
        throw new Error(errorMsg);
      }

      persistAuth(data.token, data.user?.name ?? email.split('@')[0]);
      window.NoorModal.close();
      window.NoorToast.show(data.message || `Welcome back, ${data.user?.name ?? 'friend'}! 🌙`, 'success');
    } catch (err) {
      window.NoorToast.show(err.message, 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign In';
      isSigningIn = false;
    }
  });

  // --- Register form ---
  let isRegistering = false;
  const registerForm = document.getElementById('form-register');
  registerForm?.addEventListener('submit', async e => {
    e.preventDefault();
    if (isRegistering) return;
    clearFormErrors(registerForm);

    const name     = document.getElementById('register-name')?.value.trim();
    const email    = document.getElementById('register-email')?.value.trim();
    const password = document.getElementById('register-password')?.value;
    const confirm  = document.getElementById('register-confirm')?.value;
    let valid = true;

    if (!name || name.length < 2) {
      setFieldError('register-name', 'Please enter your full name (minimum 2 characters).');
      valid = false;
    }
    if (!email || !isValidEmail(email)) {
      setFieldError('register-email', 'Please enter a valid email address.');
      valid = false;
    }
    if (!password || password.length < 8) {
      setFieldError('register-password', 'Password must be at least 8 characters long.');
      valid = false;
    }
    if (password !== confirm) {
      setFieldError('register-confirm', 'Passwords do not match. Please re-enter.');
      valid = false;
    }
    if (!valid) return;

    const submitBtn = document.getElementById('btn-register-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account…';
    isRegistering = true;

    const getApiUrl = (route) => {
      if (window.location.protocol === 'file:' || !window.location.origin || window.location.origin === 'null') {
        return 'http://localhost:8080' + route;
      }
      return route;
    };

    try {
      const res = await fetch(getApiUrl('/api/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.error || data.message || 'Registration failed. Please try again.';
        throw new Error(errorMsg);
      }

      persistAuth(data.token, data.user?.name ?? name);
      window.NoorModal.close();
      window.NoorToast.show(data.message || `Welcome to Raah-e-Ishq-o-Hidayat, ${data.user?.name ?? name}! 🌙`, 'success');
    } catch (err) {
      window.NoorToast.show(err.message, 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Create Account';
      isRegistering = false;
    }
  });
};

/**
 * Opens the auth modal, optionally starting on a specified tab.
 * @param {'signin'|'register'} [tab='signin']
 */
const openAuthModal = (tab = 'signin') => {
  window.NoorModal.open({
    title: 'Welcome to Raah-e-Ishq-o-Hidayat 🌙',
    content: buildAuthModalContent(tab),
    className: 'modal-auth',
  });
  // Allow the DOM to settle before binding events
  requestAnimationFrame(() => bindAuthModalEvents(tab));
};

/**
 * Wires up the Sign In / Register / Sign Out header buttons.
 */
function initAuth() {
  // Restore session from localStorage on every page load
  const savedUser = localStorage.getItem(USER_KEY);
  if (savedUser) {
    updateAuthUI(savedUser);
  }

  // Event delegation — header may be injected dynamically
  document.addEventListener('click', e => {
    if (e.target.closest('#btn-signin'))   openAuthModal('signin');
    if (e.target.closest('#btn-register')) openAuthModal('register');
    if (e.target.closest('#btn-signout'))  signOut();
  });
}

/* ============================================================
   SECTION 9 — HIJRI DATE
   ============================================================ */

/**
 * Converts a Gregorian date to the Hijri calendar using the
 * Umm al-Qura algorithm approximation.
 *
 * @param {Date} [date=new Date()] - Gregorian date to convert.
 * @returns {{ day: number, month: number, year: number, monthName: string }}
 */
function gregorianToHijri(date = new Date()) {
  const HIJRI_MONTHS = [
    'Muharram', 'Safar', 'Rabi\u02bc al-Awwal', 'Rabi\u02bc al-Thani',
    'Jumada al-Awwal', 'Jumada al-Thani', 'Rajab', 'Sha\u02bcban',
    'Ramadan', 'Shawwal', 'Dhu al-Qi\u02bcdah', 'Dhu al-Hijjah',
  ];

  // Julian Day Number for the given Gregorian date
  const Y = date.getFullYear();
  const M = date.getMonth() + 1;
  const D = date.getDate();

  const jdn =
    Math.floor((1461 * (Y + 4800 + Math.floor((M - 14) / 12))) / 4) +
    Math.floor((367 * (M - 2 - 12 * Math.floor((M - 14) / 12))) / 12) -
    Math.floor((3 * Math.floor((Y + 4900 + Math.floor((M - 14) / 12)) / 100)) / 4) +
    D - 32075;

  // Convert JDN to Hijri
  const l  = jdn - 1948440 + 10632;
  const n  = Math.floor((l - 1) / 10631);
  const l2 = l - 10631 * n + 354;
  const j  =
    Math.floor((10985 - l2) / 5316) * Math.floor((50 * l2) / 17719) +
    Math.floor(l2 / 5670) * Math.floor((43 * l2) / 15238);
  const l3 =
    l2 -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29;

  const hMonth = Math.floor((24 * l3) / 709);
  const hDay   = l3 - Math.floor((709 * hMonth) / 24);
  const hYear  = 30 * n + j - 30;

  return {
    day:       hDay,
    month:     hMonth,
    year:      hYear,
    monthName: HIJRI_MONTHS[hMonth - 1] ?? '',
  };
}

/**
 * Formats a Hijri date object into a readable string.
 * @param {{ day: number, month: number, year: number, monthName: string }} hijri
 * @returns {string} e.g. "19 Jumada al-Awwal 1447 AH"
 */
const formatHijriDate = hijri =>
  `${hijri.day} ${hijri.monthName} ${hijri.year} AH`;

/**
 * Renders the Hijri date into the designated DOM elements.
 */
function initHijriDate() {
  const hijri     = gregorianToHijri();
  const formatted = formatHijriDate(hijri);

  const headerEl = document.getElementById('hijri-date-header');
  if (headerEl) {
    headerEl.textContent = formatted;
    headerEl.title = `Today's Hijri date: ${formatted}`;
  }

  const footerEl = document.getElementById('footer-hijri');
  if (footerEl) {
    footerEl.textContent = `🗓 ${formatted}`;
  }
}

/* ============================================================
   SECTION 10 — PRAYER TIME GREETING
   ============================================================ */

/**
 * Returns an appropriate Arabic/Islamic greeting based on
 * the current hour of the day.
 *
 * Time ranges (approximate prayer schedule):
 *  Fajr:   03:00–05:59
 *  Morning: 06:00–11:59
 *  Zuhr/Asr: 12:00–15:59
 *  Maghrib:  16:00–19:59
 *  Isha/Night: 20:00–02:59
 *
 * @returns {{ greeting: string, sub: string }}
 */
function getPrayerGreeting() {
  const hour = new Date().getHours();

  if (hour >= 3 && hour < 6) {
    return { greeting: 'Time for Fajr 🌅', sub: 'الصَّلَاةُ خَيْرٌ مِنَ النَّوْمِ' };
  } else if (hour >= 6 && hour < 12) {
    return { greeting: 'Good Morning ☀️', sub: 'صباح النور' };
  } else if (hour >= 12 && hour < 16) {
    return { greeting: 'Good Afternoon 🕌', sub: 'وقت الظهر والعصر' };
  } else if (hour >= 16 && hour < 20) {
    return { greeting: 'Good Evening 🌇', sub: 'وقت المغرب' };
  } else {
    return { greeting: 'Good Night 🌙', sub: 'وقت العشاء' };
  }
}

/**
 * Injects the prayer-time greeting into the header element.
 */
function initPrayerGreeting() {
  const el = document.getElementById('prayer-greeting');
  if (!el) return;
  const { greeting, sub } = getPrayerGreeting();
  el.innerHTML = `<span class="greeting-main">${greeting}</span><span class="greeting-sub" lang="ar">${sub}</span>`;
  el.title = `Assalamu Alaikum — ${greeting}`;
}

/* ============================================================
   SECTION 11 — UTILITY HELPERS (exported for other scripts)
   ============================================================ */

/**
 * Returns the stored JWT token, or null if not signed in.
 * @returns {string|null}
 */
window.NoorAuth = {
  /**
   * @returns {string|null} Current JWT or null.
   */
  getToken: () => localStorage.getItem(JWT_KEY),

  /**
   * @returns {string|null} Stored user name or null.
   */
  getUser: () => localStorage.getItem(USER_KEY),

  /**
   * @returns {boolean} True if the user appears to be signed in.
   */
  isSignedIn: () => !!localStorage.getItem(JWT_KEY),

  /**
   * Builds an Authorization header object for fetch calls.
   * @returns {object}
   */
  authHeaders: () => {
    const token = localStorage.getItem(JWT_KEY);
    return token ? { Authorization: `Bearer ${token}` } : {};
  },
};

/**
 * General-purpose debounce helper.
 * @param {Function} fn   - Function to debounce.
 * @param {number}   wait - Delay in ms.
 * @returns {Function}
 */
window.NoorUtils = {
  debounce(fn, wait = 300) {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), wait);
    };
  },

  /**
   * Capitalises the first letter of a string.
   * @param {string} str
   * @returns {string}
   */
  capitalize: str => str.charAt(0).toUpperCase() + str.slice(1),

  /**
   * Formats a Gregorian Date to a locale string.
   * @param {Date|string|number} date
   * @param {Intl.DateTimeFormatOptions} [opts]
   * @returns {string}
   */
  formatDate(date, opts = { dateStyle: 'long' }) {
    return new Intl.DateTimeFormat('en-GB', opts).format(new Date(date));
  },

  /** Hijri date public API */
  gregorianToHijri,
  formatHijriDate,
};

/* ============================================================
   SECTION 12 — TOAST CSS INJECTION
   (Inlines the minimum toast/modal styles so this JS file is
   self-contained even when the CSS file is not yet loaded.)
   ============================================================ */

function injectBaseStyles() {
  if (document.getElementById('noor-base-styles')) return;

  const style = document.createElement('style');
  style.id = 'noor-base-styles';
  style.textContent = /* css */`
    /* ---- Toast ---- */
    .toast-container {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: .5rem;
      max-width: 360px;
      pointer-events: none;
    }
    .toast {
      display: flex;
      align-items: center;
      gap: .625rem;
      padding: .75rem 1rem;
      border-radius: .625rem;
      background: var(--surface-2, #fff);
      color: var(--text-primary, #1a1a2e);
      box-shadow: 0 4px 24px rgba(0,0,0,.14);
      font-size: .9rem;
      pointer-events: all;
      opacity: 0;
      transform: translateY(12px);
      transition: opacity .25s, transform .25s;
    }
    .toast-visible { opacity: 1; transform: translateY(0); }
    .toast-dismissing { opacity: 0; transform: translateY(12px); }
    .toast-success { border-left: 3px solid #4caf50; }
    .toast-error   { border-left: 3px solid #f44336; }
    .toast-warning { border-left: 3px solid #ff9800; }
    .toast-info    { border-left: 3px solid #2196f3; }
    .toast-icon    { flex-shrink: 0; }
    .toast-message { flex: 1; }
    .toast-close   {
      background: none; border: none; cursor: pointer; padding: 0;
      color: inherit; opacity: .6; display: flex; align-items: center;
    }
    .toast-close:hover { opacity: 1; }

    /* ---- Modal ---- */
    .modal-overlay {
      position: fixed; inset: 0; z-index: 8888;
      background: rgba(0,0,0,.55);
      display: flex; align-items: center; justify-content: center;
      padding: 1rem;
      opacity: 0; transition: opacity .25s;
    }
    .modal-overlay.modal-open { opacity: 1; }
    .modal-dialog {
      background: var(--surface-1, #fff);
      color: var(--text-primary, #1a1a2e);
      border-radius: 1rem;
      width: 100%; max-width: 480px;
      max-height: 90vh; overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0,0,0,.25);
      transform: scale(.95) translateY(16px);
      transition: transform .25s;
    }
    .modal-overlay.modal-open .modal-dialog { transform: scale(1) translateY(0); }
    .modal-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 1.25rem 1.5rem .75rem;
      border-bottom: 1px solid var(--border-color, #e5e7eb);
    }
    .modal-title  { font-size: 1.15rem; font-weight: 600; margin: 0; }
    .modal-close  { background: none; border: none; cursor: pointer; color: inherit; padding: .25rem; border-radius: .375rem; }
    .modal-close:hover { background: var(--surface-2, #f3f4f6); }
    .modal-body   { padding: 1.25rem 1.5rem; }
    .modal-footer { padding: .75rem 1.5rem 1.25rem; display: flex; gap: .625rem; justify-content: flex-end;
                    border-top: 1px solid var(--border-color, #e5e7eb); }
    body.modal-active { overflow: hidden; }

    /* ---- Auth Modal ---- */
    .auth-tabs    { display: flex; border-bottom: 1px solid var(--border-color, #e5e7eb); margin-bottom: 1.25rem; }
    .auth-tab     { flex: 1; padding: .625rem; border: none; background: none; cursor: pointer;
                    font-size: .9rem; font-weight: 500; color: var(--text-secondary, #6b7280);
                    border-bottom: 2px solid transparent; transition: color .2s, border-color .2s; }
    .auth-tab.active { color: var(--primary, #2d6a4f); border-bottom-color: var(--primary, #2d6a4f); }
    .auth-panel   { display: none; }
    .auth-panel.active { display: block; }
    .form-group   { margin-bottom: 1rem; }
    .form-label   { display: block; font-size: .85rem; font-weight: 500; margin-bottom: .375rem; }
    .form-input   { width: 100%; padding: .625rem .75rem; border: 1px solid var(--border-color, #d1d5db);
                    border-radius: .5rem; font-size: .95rem; background: var(--surface-2, #f9fafb);
                    color: var(--text-primary, #1a1a2e); transition: border-color .2s, box-shadow .2s; box-sizing: border-box; }
    .form-input:focus { outline: none; border-color: var(--primary, #2d6a4f);
                        box-shadow: 0 0 0 3px rgba(45,106,79,.15); }
    .form-input.input-error { border-color: #f44336; }
    .field-error  { display: block; font-size: .78rem; color: #f44336; margin-top: .25rem; min-height: 1em; }
    .input-with-toggle { position: relative; }
    .input-with-toggle .form-input { padding-right: 2.75rem; }
    .input-eye    { position: absolute; right: .5rem; top: 50%; transform: translateY(-50%);
                    background: none; border: none; cursor: pointer; color: var(--text-secondary, #6b7280); padding: .25rem; }
    .btn-full     { width: 100%; }
    .auth-switch-hint { text-align: center; font-size: .82rem; margin-top: .875rem; color: var(--text-secondary, #6b7280); }
    .link-btn     { background: none; border: none; cursor: pointer; color: var(--primary, #2d6a4f);
                    font-size: inherit; text-decoration: underline; padding: 0; }
    .hidden       { display: none !important; }

    /* ---- Header auth additions ---- */
    .prayer-greeting { display: flex; flex-direction: column; align-items: flex-end; font-size: .72rem;
                       line-height: 1.2; color: var(--text-secondary, #6b7280); }
    .greeting-sub   { font-family: var(--font-arabic, serif); font-size: .85rem; color: var(--primary, #2d6a4f); }
    .hijri-date-header { font-size: .72rem; color: var(--text-secondary, #6b7280); white-space: nowrap; }
    .user-menu      { display: flex; align-items: center; gap: .5rem; }
    .user-greeting  { font-size: .85rem; font-weight: 500; }
    .footer-hijri   { font-size: .8rem; margin-top: .5rem; color: var(--text-secondary, #9ca3af); }
    .confirm-message { margin: 0; font-size: .95rem; }

    /* ---- Scroll-to-top ---- */
    .scroll-to-top {
      position: fixed; bottom: 5rem; right: 1.5rem; z-index: 999;
      background: var(--primary, #2d6a4f); color: #fff;
      border: none; border-radius: 50%; width: 2.5rem; height: 2.5rem;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; opacity: 0; transform: translateY(10px);
      transition: opacity .3s, transform .3s; box-shadow: 0 2px 12px rgba(0,0,0,.2);
    }
    .scroll-to-top.visible { opacity: 1; transform: translateY(0); }
    .scroll-to-top:hover   { background: var(--primary-dark, #1b4332); }
  `;
  document.head.appendChild(style);
}

/* ============================================================
   SECTION 13 — SCROLL-TO-TOP BUTTON
   ============================================================ */

/**
 * Adds a floating "scroll to top" button that appears after
 * the user scrolls down more than 400px.
 */
function initScrollToTop() {
  const btn = document.createElement('button');
  btn.className = 'scroll-to-top';
  btn.setAttribute('aria-label', 'Scroll to top');
  btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
    <polyline points="18 15 12 9 6 15"/>
  </svg>`;
  document.body.appendChild(btn);

  const toggleVisibility = window.NoorUtils.debounce(() => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, 100);

  window.addEventListener('scroll', toggleVisibility, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   SECTION 14 — SEARCH SYSTEM & MODAL
   ============================================================ */

const SEARCH_DATABASE = [
  // Surahs
  { type: 'Surah', title: 'Al-Fatihah (The Opening)', arabic: 'الفاتحة', link: 'quran.html?surah=1', meta: 'Surah 1 · 7 Ayahs · Makki' },
  { type: 'Surah', title: 'Al-Baqarah (The Cow)', arabic: 'البقرة', link: 'quran.html?surah=2', meta: 'Surah 2 · 286 Ayahs · Madani' },
  { type: 'Surah', title: 'Ali \'Imran (Family of Imran)', arabic: 'آل عمران', link: 'quran.html?surah=3', meta: 'Surah 3 · 200 Ayahs · Madani' },
  { type: 'Surah', title: 'An-Nisa (The Women)', arabic: 'النساء', link: 'quran.html?surah=4', meta: 'Surah 4 · 176 Ayahs · Madani' },
  { type: 'Surah', title: 'Al-Kahf (The Cave)', arabic: 'الكهف', link: 'quran.html?surah=18', meta: 'Surah 18 · 110 Ayahs · Makki' },
  { type: 'Surah', title: 'Maryam (Mary)', arabic: 'مريم', link: 'quran.html?surah=19', meta: 'Surah 19 · 98 Ayahs · Makki' },
  { type: 'Surah', title: 'Ya-Sin (Yaseen)', arabic: 'يس', link: 'quran.html?surah=36', meta: 'Surah 36 · 83 Ayahs · Makki' },
  { type: 'Surah', title: 'Ar-Rahman (The Beneficent)', arabic: 'الرحمن', link: 'quran.html?surah=55', meta: 'Surah 55 · 78 Ayahs · Madani' },
  { type: 'Surah', title: 'Al-Waqi\'ah (The Inevitable)', arabic: 'الواقعة', link: 'quran.html?surah=56', meta: 'Surah 56 · 96 Ayahs · Makki' },
  { type: 'Surah', title: 'Al-Mulk (The Sovereignty)', arabic: 'الملك', link: 'quran.html?surah=67', meta: 'Surah 67 · 30 Ayahs · Makki' },
  { type: 'Surah', title: 'Al-Ikhlas (Purity of Faith)', arabic: 'الإخلاص', link: 'quran.html?surah=112', meta: 'Surah 112 · 4 Ayahs · Makki' },
  { type: 'Surah', title: 'Al-Falaq (The Daybreak)', arabic: 'الفلق', link: 'quran.html?surah=113', meta: 'Surah 113 · 5 Ayahs · Makki' },
  { type: 'Surah', title: 'An-Nas (Mankind)', arabic: 'الناس', link: 'quran.html?surah=114', meta: 'Surah 114 · 6 Ayahs · Makki' },

  // Topics
  { type: 'Topic', title: 'Sabr (Patience & Perseverance)', arabic: 'الصبر', link: 'topics.html?topic=sabr', meta: 'Steadfastness in trials & worship' },
  { type: 'Topic', title: 'Tawakkul (Trust in Allah)', arabic: 'التوكل', link: 'topics.html?topic=tawakkul', meta: 'Relying completely upon the Creator' },
  { type: 'Topic', title: 'Shukar (Gratitude)', arabic: 'الشكر', link: 'topics.html?topic=shukar', meta: 'Recognizing divine blessings daily' },
  { type: 'Topic', title: 'Forgiveness (Maghfirah & Afw)', arabic: 'المغفرة', link: 'topics.html?topic=forgiveness', meta: 'Seeking pardon & pardoning others' },
  { type: 'Topic', title: 'Hope (Raja\' in Allah)', arabic: 'الرجاء', link: 'topics.html?topic=hope', meta: 'Never despairing of Allah\'s mercy' },
  { type: 'Topic', title: 'Allah\'s Mercy (Rahmah)', arabic: 'رحمة الله', link: 'topics.html?topic=mercy', meta: 'The all-encompassing divine compass' },

  // Azkar
  { type: 'Azkar', title: 'Morning Azkar (Sabah)', arabic: 'أذكار الصباح', link: 'azkar.html?category=morning', meta: 'Recited after Fajr prayer' },
  { type: 'Azkar', title: 'Evening Azkar (Masaa)', arabic: 'أذكار المساء', link: 'azkar.html?category=evening', meta: 'Recited after Asr/Maghrib' },
  { type: 'Azkar', title: 'After Prayer Azkar', arabic: 'أذكار بعد الصلاة', link: 'azkar.html?category=prayer', meta: 'Prescribed tasbeeh after Salah' },
  { type: 'Azkar', title: 'Before Sleep Azkar', arabic: 'أذكار النوم', link: 'azkar.html?category=sleep', meta: 'Sunnah recitations at bedtime' },

  // Duas
  { type: 'Dua', title: 'Rabbana Atina fid-Dunya', arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا', link: 'duas.html#rabbana-1', meta: 'Comprehensive Quranic Dua (2:201)' },
  { type: 'Dua', title: 'Rabbi Inni Lima Anzalta', arabic: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ', link: 'duas.html#musa-dua', meta: 'Prophet Musa\'s prayer for provision' },
  { type: 'Dua', title: 'Sayyid al-Istighfar', arabic: 'سَيِّدُ الِاسْتِغْفَارِ', link: 'duas.html#sayyid-istighfar', meta: 'The Master Supplication for Forgiveness' },
];

function openSearchModal() {
  const content = `
    <div class="search-modal-wrap">
      <div class="search-input-box">
        <svg class="search-box-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" id="platform-search-input" placeholder="Search Surahs, Topics, Azkar, Duas..." autocomplete="off" autofocus />
      </div>
      <div class="search-suggestions" id="search-suggestions">
        <div class="search-section-label">Quick Suggestions</div>
        <div class="search-tags">
          <button class="search-tag" data-query="Al-Kahf">Surah Al-Kahf</button>
          <button class="search-tag" data-query="Sabr">Topic: Sabr</button>
          <button class="search-tag" data-query="Morning">Morning Azkar</button>
          <button class="search-tag" data-query="Forgiveness">Forgiveness</button>
          <button class="search-tag" data-query="Rabbana">Featured Dua</button>
        </div>
      </div>
      <div class="search-results-list" id="search-results-list"></div>
    </div>
  `;

  window.NoorModal.open({
    title: 'Search Raah-e-Ishq-o-Hidayat (راہِ عشق و ہدایت)',
    content: content,
    className: 'modal-search',
  });

  requestAnimationFrame(() => {
    const input = document.getElementById('platform-search-input');
    const resultsContainer = document.getElementById('search-results-list');
    const suggestions = document.getElementById('search-suggestions');
    if (!input) return;

    input.focus();

    const renderResults = (query) => {
      const q = query.trim().toLowerCase();
      if (!q) {
        resultsContainer.innerHTML = '';
        if (suggestions) suggestions.style.display = 'block';
        return;
      }
      if (suggestions) suggestions.style.display = 'none';

      const matches = SEARCH_DATABASE.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.arabic.includes(q) ||
        item.type.toLowerCase().includes(q) ||
        (item.meta && item.meta.toLowerCase().includes(q))
      );

      if (matches.length === 0) {
        resultsContainer.innerHTML = `
          <div class="search-empty-state">
            <p>No results found for "<strong>${escapeHtml(query)}</strong>"</p>
            <small>Try searching for Surah names (e.g. Al-Kahf), topics (e.g. Sabr), or Azkar.</small>
          </div>
        `;
        return;
      }

      resultsContainer.innerHTML = matches.map(item => `
        <a href="${item.link}" class="search-result-item">
          <div class="search-result-icon">
            ${item.type === 'Surah' ? '📖' : item.type === 'Topic' ? '💡' : item.type === 'Azkar' ? '📿' : '🤲'}
          </div>
          <div class="search-result-info">
            <div class="search-result-title">
              <span>${escapeHtml(item.title)}</span>
              <span class="search-result-arabic" lang="ar" dir="rtl">${item.arabic}</span>
            </div>
            <div class="search-result-meta">
              <span class="badge-type">${item.type}</span> · ${escapeHtml(item.meta)}
            </div>
          </div>
          <svg class="search-result-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </a>
      `).join('');
    };

    input.addEventListener('input', (e) => renderResults(e.target.value));

    document.querySelectorAll('.search-tag').forEach(tag => {
      tag.addEventListener('click', () => {
        const query = tag.getAttribute('data-query');
        input.value = query;
        renderResults(query);
      });
    });
  });
}

function initSearch() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('#search-toggle')) {
      e.preventDefault();
      openSearchModal();
    }
  });

  // Keyboard shortcut Ctrl+K or / to search
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearchModal();
    }
  });
}

/* ============================================================
   SECTION 15 — BOOKMARKS SYSTEM (Guest & Member)
   ============================================================ */

const BOOKMARKS_KEY = 'noor-saved-ayat';

window.NoorBookmarks = {
  getAll() {
    try {
      return JSON.parse(localStorage.getItem(BOOKMARKS_KEY)) || [];
    } catch {
      return [];
    }
  },

  isSaved(ayahId) {
    const list = this.getAll();
    return list.some(item => item.id === ayahId);
  },

  toggle(ayah) {
    let list = this.getAll();
    const index = list.findIndex(item => item.id === ayah.id);
    let saved = false;

    if (index >= 0) {
      list.splice(index, 1);
      saved = false;
    } else {
      list.unshift({
        id: ayah.id,
        surah: ayah.surah,
        ayahNum: ayah.ayahNum,
        arabic: ayah.arabic,
        translation: ayah.translation,
        ref: ayah.ref,
        date: new Date().toISOString()
      });
      saved = true;
    }

    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(list));
    this.updateUI();

    if (saved) {
      window.NoorToast?.show('Ayah saved to your Bookmarks 📖', 'success');
    } else {
      window.NoorToast?.show('Ayah removed from Bookmarks', 'info');
    }

    return saved;
  },

  updateUI() {
    const count = this.getAll().length;
    // Update any bookmark counter elements on the page
    document.querySelectorAll('.saved-ayat-count').forEach(el => {
      el.textContent = count;
    });

    // Update bookmark buttons state
    document.querySelectorAll('[data-bookmark-id]').forEach(btn => {
      const id = btn.getAttribute('data-bookmark-id');
      const isSaved = this.isSaved(id);
      btn.classList.toggle('bookmarked', isSaved);
      btn.setAttribute('aria-pressed', isSaved ? 'true' : 'false');
      
      const label = btn.querySelector('.bookmark-label');
      if (label) {
        label.textContent = isSaved ? 'Saved' : 'Bookmark';
      }
    });
  }
};

function initBookmarks() {
  // Bind bookmark button clicks
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-bookmark-id]');
    if (!btn) return;
    
    e.preventDefault();
    const id = btn.getAttribute('data-bookmark-id');
    const ayahData = {
      id: id,
      surah: btn.getAttribute('data-surah') || 'Surah Ar-Ra\'d',
      ayahNum: btn.getAttribute('data-ayah') || '28',
      arabic: btn.getAttribute('data-arabic') || 'الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
      translation: btn.getAttribute('data-translation') || 'Those who have believed and whose hearts are assured by the remembrance of Allah.',
      ref: btn.getAttribute('data-ref') || 'Surah Ar-Ra\'d (13:28)'
    };

    window.NoorBookmarks.toggle(ayahData);
  });

  // Initial UI state
  window.NoorBookmarks.updateUI();
}

/* ============================================================
   SECTION 16 — READING PROGRESS & GUEST STATE
   ============================================================ */

const READING_PROGRESS_KEY = 'noor-reading-progress';

window.NoorReadingProgress = {
  get() {
    try {
      const saved = localStorage.getItem(READING_PROGRESS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}

    // Default state for guest user
    return {
      surahNameEn: 'Surah Al-Kahf',
      surahNameAr: 'سورة الكهف',
      surahNumber: 18,
      ayahNumber: 19,
      juzNumber: 15,
      percentJuz: 68,
      surahsCompleted: 14,
      totalSurahs: 114,
      lastReadDate: 'Today'
    };
  },

  set(progress) {
    const current = this.get();
    const updated = { ...current, ...progress, lastReadDate: 'Just now' };
    localStorage.setItem(READING_PROGRESS_KEY, JSON.stringify(updated));
    this.updateUI();
  },

  updateUI() {
    const data = this.get();
    
    const surahNameEl = document.getElementById('continue-surah-name');
    const ayahNumEl = document.getElementById('continue-ayah-num');
    const progressBar = document.getElementById('continue-progress-bar');
    const percentEl = document.getElementById('continue-percent');
    const linkEl = document.getElementById('continue-reading-btn');
    const journeySurahsEl = document.getElementById('journey-surahs-count');
    const journeyProgressBar = document.getElementById('journey-reading-progress-bar');

    if (surahNameEl) surahNameEl.textContent = `${data.surahNameEn} (${data.surahNameAr})`;
    if (ayahNumEl) ayahNumEl.textContent = `Ayah ${data.ayahNumber} · Juz ${data.juzNumber}`;
    if (progressBar) progressBar.style.width = `${data.percentJuz}%`;
    if (percentEl) percentEl.textContent = `${data.percentJuz}%`;
    if (linkEl) linkEl.href = `quran.html?surah=${data.surahNumber}&ayah=${data.ayahNumber}`;

    if (journeySurahsEl) journeySurahsEl.textContent = `${data.surahsCompleted} / ${data.totalSurahs}`;
    if (journeyProgressBar) {
      const totalPercent = Math.round((data.surahsCompleted / data.totalSurahs) * 100);
      journeyProgressBar.style.width = `${totalPercent}%`;
    }
  }
};

function initReadingProgress() {
  window.NoorReadingProgress.updateUI();
}

/* ============================================================
   SECTION 17 — AUDIO PLAYER CONTROLLER (Ayah of the Day)
   ============================================================ */

function initAyahAudioPlayer() {
  const playBtn = document.getElementById('play-ayah-audio-btn');
  if (!playBtn) return;

  let audio = null;
  let isPlaying = false;

  // Authentic recitation from EveryAyah (Mishary Rashid Alafasy 128kbps)
  const audioSrc = 'https://everyayah.com/data/Alafasy_128kbps/013028.mp3';

  playBtn.addEventListener('click', () => {
    if (!audio) {
      audio = new Audio(audioSrc);

      audio.addEventListener('play', () => {
        isPlaying = true;
        playBtn.classList.add('playing');
        playBtn.setAttribute('aria-label', 'Pause recitation');
        playBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16"/>
            <rect x="14" y="4" width="4" height="16"/>
          </svg>
          <span>Pause Recitation</span>
        `;
        window.NoorToast?.show('Playing recitation (Mishary Rashid Alafasy) 🎧', 'info', 2500);
      });

      audio.addEventListener('pause', () => {
        isPlaying = false;
        playBtn.classList.remove('playing');
        playBtn.setAttribute('aria-label', 'Play recitation');
        playBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          <span>Listen Recitation</span>
        `;
      });

      audio.addEventListener('ended', () => {
        isPlaying = false;
        playBtn.classList.remove('playing');
        playBtn.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          <span>Listen Recitation</span>
        `;
      });

      audio.addEventListener('error', () => {
        window.NoorToast?.show('Audio playback unavailable in offline preview.', 'warning');
        playBtn.classList.remove('playing');
        isPlaying = false;
      });
    }

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        window.NoorToast?.show('Audio stream requires network access.', 'info');
      });
    }
  });
}

/* ============================================================
   SECTION 19 — PROGRESSIVE WEB APP (PWA)
   ============================================================ */

let deferredInstallPrompt = null;

function initPWA() {
  // 1. Register Service Worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./service-worker.js', { scope: './' })
        .then((reg) => {
          console.info('[PWA] Service Worker registered with scope:', reg.scope);

          reg.addEventListener('updatefound', () => {
            const installingWorker = reg.installing;
            if (installingWorker) {
              installingWorker.addEventListener('statechange', () => {
                if (installingWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  window.NoorToast?.show('A new version of Raah-e-Ishq-o-Hidayat is available. Refresh to update. 🌟', 'info', 5000);
                }
              });
            }
          });
        })
        .catch((err) => {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    });
  }

  // 2. Multi-button install handler
  const isAppInstalled = () => {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone === true ||
           document.referrer.includes('android-app://');
  };

  const updateInstallButtonsUI = () => {
    const installed = isAppInstalled();
    const btnIds = ['btn-pwa-install', 'btn-pwa-install-nav', 'btn-pwa-install-hero', 'btn-pwa-install-settings'];
    
    btnIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        if (installed) {
          el.classList.add('installed');
          const span = el.querySelector('span');
          if (span) span.textContent = '✓ App Installed';
        }
      }
    });

    const settingsStatus = document.getElementById('pwa-settings-status');
    if (settingsStatus && installed) {
      settingsStatus.textContent = 'Raah-e-Ishq-o-Hidayat is currently installed in standalone mode ✨';
    }
  };

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent mini-infobar on mobile Chrome
    e.preventDefault();
    deferredInstallPrompt = e;
    updateInstallButtonsUI();
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    updateInstallButtonsUI();
    window.NoorToast?.show('Raah-e-Ishq-o-Hidayat installed successfully! 🌟 Open it anytime from your home screen.', 'success', 5000);
  });

  document.addEventListener('click', async (e) => {
    const trigger = e.target.closest('#btn-pwa-install, #btn-pwa-install-nav, #btn-pwa-install-hero, #btn-pwa-install-settings');
    if (!trigger) return;

    if (isAppInstalled()) {
      window.NoorToast?.show('Raah-e-Ishq-o-Hidayat is already installed on your device! 🌟', 'info', 4000);
      return;
    }

    if (deferredInstallPrompt) {
      try {
        deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          deferredInstallPrompt = null;
          updateInstallButtonsUI();
          window.NoorToast?.show('Installing Raah-e-Ishq-o-Hidayat... 🌙', 'success', 3000);
        } else {
          window.NoorToast?.show('Installation cancelled. You can install anytime!', 'info', 3000);
        }
      } catch (promptErr) {
        showPwaInstallGuideModal();
      }
    } else {
      showPwaInstallGuideModal();
    }
  });

  updateInstallButtonsUI();
}

function showPwaInstallGuideModal() {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isAndroid = /Android/.test(navigator.userAgent);

  let guideContent = '';

  if (isIOS) {
    guideContent = `
      <div class="pwa-install-guide">
        <div class="pwa-guide-icon">📲</div>
        <h3 style="margin-bottom:0.75rem; color:var(--clr-emerald-900);">Install on iPhone / iPad</h3>
        <ol class="guide-steps" style="line-height:1.7; padding-left:1.25rem;">
          <li>Tap the <strong>Share</strong> button in Safari's bottom toolbar (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>).</li>
          <li>Scroll down and tap <strong>"Add to Home Screen"</strong> (<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>).</li>
          <li>Tap <strong>Add</strong> in the top-right corner.</li>
        </ol>
        <p style="margin-top:1rem; font-size:0.875rem; color:var(--clr-text-muted);">Launch Raah-e-Ishq-o-Hidayat from your home screen for an app-like standalone experience without browser toolbars!</p>
      </div>
    `;
  } else if (isAndroid) {
    guideContent = `
      <div class="pwa-install-guide" style="padding: 0.25rem 0;">
        <div style="background: linear-gradient(135deg, rgba(45,122,79,0.1), rgba(212,175,55,0.15)); border: 1px solid #D4AF37; border-radius: 12px; padding: 1.1rem; margin-bottom: 1.25rem; text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 0.35rem;">📱</div>
          <h3 style="margin-bottom: 0.35rem; color: #1E5C3A; font-weight: 700;">Install on Android Phone</h3>
          <p style="font-size: 0.9rem; color: #475569; margin: 0;">Add to your home screen in 2 taps:</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.25rem; font-size: 0.925rem;">
          <div style="display: flex; gap: 0.75rem; align-items: flex-start; background: rgba(0,0,0,0.02); padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid rgba(0,0,0,0.08);">
            <span style="background: #2D7A4F; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8rem; flex-shrink: 0;">1</span>
            <div>
              Tap the <strong>three vertical dots (⋮)</strong> at the top-right corner of Chrome.
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; align-items: flex-start; background: rgba(0,0,0,0.02); padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid rgba(0,0,0,0.08);">
            <span style="background: #2D7A4F; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8rem; flex-shrink: 0;">2</span>
            <div>
              Select <strong>"Install app"</strong> (or <em>"Add to Home screen"</em>).
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; align-items: flex-start; background: rgba(0,0,0,0.02); padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid rgba(0,0,0,0.08);">
            <span style="background: #2D7A4F; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8rem; flex-shrink: 0;">3</span>
            <div>
              Tap <strong>"Install"</strong> to confirm. The app icon will appear on your phone's home screen!
            </div>
          </div>
        </div>

        <button class="btn btn-primary" onclick="window.NoorModal.close()" style="width: 100%;">Understood</button>
      </div>
    `;
  } else {
    guideContent = `
      <div class="pwa-install-guide" style="padding: 0.25rem 0;">
        <div style="background: linear-gradient(135deg, rgba(45,122,79,0.1), rgba(212,175,55,0.15)); border: 1px solid #D4AF37; border-radius: 12px; padding: 1.1rem; margin-bottom: 1.25rem; text-align: center;">
          <div style="font-size: 2rem; margin-bottom: 0.35rem;">💻 / 📱</div>
          <h3 style="margin-bottom: 0.35rem; color: #1E5C3A; font-weight: 700;">How to Install in 2 Quick Clicks</h3>
          <p style="font-size: 0.9rem; color: #475569; margin: 0;">Chrome & Edge install this directly to your computer or phone!</p>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.25rem; font-size: 0.925rem;">
          <div style="display: flex; gap: 0.75rem; align-items: flex-start; background: rgba(0,0,0,0.02); padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid rgba(0,0,0,0.08);">
            <span style="background: #2D7A4F; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8rem; flex-shrink: 0;">1</span>
            <div>
              <strong>In Chrome / Edge:</strong><br/>
              Click the <strong>3 vertical dots (⋮)</strong> at the very top right of your browser window.
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; align-items: flex-start; background: rgba(0,0,0,0.02); padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid rgba(0,0,0,0.08);">
            <span style="background: #2D7A4F; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8rem; flex-shrink: 0;">2</span>
            <div>
              Click <strong>"Save and share"</strong> &rarr; then click <strong>"Install Raah-e-Ishq-o-Hidayat"</strong> (or <em>"Install page as app"</em>).
            </div>
          </div>

          <div style="display: flex; gap: 0.75rem; align-items: flex-start; background: rgba(0,0,0,0.02); padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid rgba(0,0,0,0.08);">
            <span style="background: #2D7A4F; color: #fff; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8rem; flex-shrink: 0;">3</span>
            <div>
              Click <strong>"Install"</strong> when asked. The app icon is immediately added to your Desktop!
            </div>
          </div>
        </div>

        <div style="text-align: center; border-top: 1px dashed #cbd5e1; padding-top: 1rem;">
          <p style="font-size: 0.85rem; color: #64748b; margin-bottom: 0.75rem;">
            💡 <em>Shortcut:</em> Look inside your address bar (where http://localhost:8080 is written) — on the far right, click the small <strong>Install Icon</strong> (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>).
          </p>
          <button class="btn btn-primary" onclick="window.NoorModal.close()" style="width: 100%;">Understood</button>
        </div>
      </div>
    `;
  }

  window.NoorModal.open({
    title: 'Install Raah-e-Ishq-o-Hidayat App',
    content: guideContent
  });
}

/* ============================================================
   SECTION 18 — BOOTSTRAP (runs on DOMContentLoaded)
   ============================================================ */

/**
 * Main entry point. Called once the DOM is ready.
 * Injects shared components and initialises all subsystems.
 */
function bootstrap() {
  // 1. Inject base styles (before anything is painted)
  injectBaseStyles();

  // 2. Inject shared header + footer
  injectHeader();
  injectFooter();

  // 3. Navigation
  setActiveNavLink();
  initMobileMenu();

  // 4. Scroll
  initScrollBehavior();
  initScrollToTop();

  // 5. Theme
  initTheme();

  // 6. Auth
  initAuth();

  // 7. Hijri date
  initHijriDate();

  // 8. Prayer greeting
  initPrayerGreeting();

  // 9. Search System
  initSearch();

  // 10. Bookmarks System
  initBookmarks();

  // 11. Reading Progress
  initReadingProgress();

  // 12. Audio Player
  initAyahAudioPlayer();

  // 13. PWA Registration & Install
  initPWA();

  console.info('[Raah-e-Ishq-o-Hidayat] Initialised ✓');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrap);
} else {
  // DOM already ready (e.g. script loaded with defer/async)
  bootstrap();
}
