/**
 * Noor (نور) — Settings & Preferences Controller
 * Manages theme, typography size, translation toggles, reciter preferences,
 * and complete personal data backups.
 */

'use strict';

const SETTINGS_KEYS = {
  THEME: 'noor-theme',
  ARABIC_SIZE: 'noor-quran-arabic-size',
  SHOW_URDU: 'noor-quran-show-urdu',
  DEFAULT_RECITER: 'noor-quran-reciter',
  AUTOSCROLL: 'noor-quran-autoscroll'
};

function initSettings() {
  console.info('[Noor] Initialising Settings module...');

  // 1. Theme Controller
  initThemeSettings();

  // 2. Typography Controller & Live Preview
  initTypographySettings();

  // 3. Audio / Reciter Preferences
  initAudioSettings();

  // 4. Data & Privacy Actions
  initDataSettings();
}

/* ============================================================
   1. THEME SETTINGS
   ============================================================ */

function initThemeSettings() {
  const currentTheme = document.documentElement.getAttribute('data-theme') || localStorage.getItem(SETTINGS_KEYS.THEME) || 'light';
  
  const btnLight = document.getElementById('theme-btn-light');
  const btnDark = document.getElementById('theme-btn-dark');

  updateThemeButtonsUI(currentTheme);

  if (btnLight) {
    btnLight.addEventListener('click', () => {
      setTheme('light');
    });
  }

  if (btnDark) {
    btnDark.addEventListener('click', () => {
      setTheme('dark');
    });
  }
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(SETTINGS_KEYS.THEME, theme);
  updateThemeButtonsUI(theme);

  // Sync header icon if present
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }

  if (window.NoorToast) {
    window.NoorToast.show(`Theme set to ${theme === 'dark' ? 'Dark' : 'Light'} 🌓`, 'info');
  }
}

function updateThemeButtonsUI(theme) {
  const btnLight = document.getElementById('theme-btn-light');
  const btnDark = document.getElementById('theme-btn-dark');

  if (btnLight) btnLight.classList.toggle('active', theme === 'light');
  if (btnDark) btnDark.classList.toggle('active', theme === 'dark');
}

/* ============================================================
   2. TYPOGRAPHY SETTINGS & LIVE PREVIEW
   ============================================================ */

function initTypographySettings() {
  const savedSize = parseInt(localStorage.getItem(SETTINGS_KEYS.ARABIC_SIZE), 10) || 28;
  const savedShowUrdu = localStorage.getItem(SETTINGS_KEYS.SHOW_URDU) !== 'false'; // default true

  const previewArabic = document.getElementById('preview-arabic-text');
  const previewUrdu = document.getElementById('preview-urdu-text');
  const toggleUrdu = document.getElementById('toggle-urdu-translation');
  const sizeGroup = document.getElementById('arabic-size-group');

  // Set initial preview
  if (previewArabic) previewArabic.style.fontSize = `${savedSize}px`;
  if (previewUrdu) previewUrdu.style.display = savedShowUrdu ? 'block' : 'none';
  if (toggleUrdu) toggleUrdu.checked = savedShowUrdu;

  // Font size buttons
  if (sizeGroup) {
    sizeGroup.querySelectorAll('.font-choice-btn').forEach(btn => {
      const size = parseInt(btn.getAttribute('data-size'), 10);
      btn.classList.toggle('active', size === savedSize);

      btn.addEventListener('click', () => {
        sizeGroup.querySelectorAll('.font-choice-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        localStorage.setItem(SETTINGS_KEYS.ARABIC_SIZE, size);
        if (previewArabic) previewArabic.style.fontSize = `${size}px`;

        if (window.NoorToast) {
          window.NoorToast.show(`Arabic font size set to ${size}px`, 'info');
        }
      });
    });
  }

  // Toggle Urdu Translation
  if (toggleUrdu) {
    toggleUrdu.addEventListener('change', (e) => {
      const checked = e.target.checked;
      localStorage.setItem(SETTINGS_KEYS.SHOW_URDU, checked ? 'true' : 'false');
      if (previewUrdu) previewUrdu.style.display = checked ? 'block' : 'none';

      if (window.NoorToast) {
        window.NoorToast.show(checked ? 'Urdu translation enabled' : 'Urdu translation hidden', 'info');
      }
    });
  }
}

/* ============================================================
   3. AUDIO PREFERENCES
   ============================================================ */

function initAudioSettings() {
  const savedReciter = localStorage.getItem(SETTINGS_KEYS.DEFAULT_RECITER) || 'Alafasy_128kbps';
  const savedAutoScroll = localStorage.getItem(SETTINGS_KEYS.AUTOSCROLL) !== 'false';

  const selectReciter = document.getElementById('select-default-reciter');
  const toggleAutoScroll = document.getElementById('toggle-autoscroll');

  if (selectReciter) {
    selectReciter.value = savedReciter;
    selectReciter.addEventListener('change', (e) => {
      localStorage.setItem(SETTINGS_KEYS.DEFAULT_RECITER, e.target.value);
      if (window.NoorToast) {
        window.NoorToast.show('Default reciter preference saved 🎙️', 'success');
      }
    });
  }

  if (toggleAutoScroll) {
    toggleAutoScroll.checked = savedAutoScroll;
    toggleAutoScroll.addEventListener('change', (e) => {
      localStorage.setItem(SETTINGS_KEYS.AUTOSCROLL, e.target.checked ? 'true' : 'false');
      if (window.NoorToast) {
        window.NoorToast.show(e.target.checked ? 'Auto-scroll enabled' : 'Auto-scroll disabled', 'info');
      }
    });
  }
}

/* ============================================================
   4. DATA & PRIVACY CONTROLS
   ============================================================ */

function initDataSettings() {
  // Export All Data JSON
  const btnExportAll = document.getElementById('btn-export-all-data');
  if (btnExportAll) {
    btnExportAll.addEventListener('click', exportCompleteUserData);
  }

  // Reset Today's Azkar
  const btnResetAzkar = document.getElementById('btn-reset-azkar-counters');
  if (btnResetAzkar) {
    btnResetAzkar.addEventListener('click', () => {
      if (confirm("Are you sure you want to reset today's Azkar counters to zero?")) {
        localStorage.removeItem('noor-azkar-progress');
        if (window.NoorToast) {
          window.NoorToast.show('Azkar counters reset successfully 📿', 'success');
        }
      }
    });
  }

  // Clear Bookmarks
  const btnClearBookmarks = document.getElementById('btn-clear-bookmarks');
  if (btnClearBookmarks) {
    btnClearBookmarks.addEventListener('click', () => {
      if (confirm('Warning: Are you sure you want to remove all saved Ayat bookmarks from this device?')) {
        localStorage.removeItem('noor-saved-ayat');
        if (window.NoorToast) {
          window.NoorToast.show('All bookmarks cleared from device', 'info');
        }
      }
    });
  }
}

function exportCompleteUserData() {
  const exportPayload = {
    app: 'Raah-e-Ishq-o-Hidayat (راہِ عشق و ہدایت)',
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    readingProgress: getStoredJson('noor-reading-progress'),
    savedBookmarks: getStoredJson('noor-saved-ayat'),
    reflections: getStoredJson('noor-reflections'),
    azkarProgress: getStoredJson('noor-azkar-progress'),
    settings: {
      theme: localStorage.getItem(SETTINGS_KEYS.THEME) || 'light',
      arabicSize: localStorage.getItem(SETTINGS_KEYS.ARABIC_SIZE) || '28',
      showUrdu: localStorage.getItem(SETTINGS_KEYS.SHOW_URDU) || 'true',
      defaultReciter: localStorage.getItem(SETTINGS_KEYS.DEFAULT_RECITER) || 'Alafasy_128kbps'
    }
  };

  const jsonStr = JSON.stringify(exportPayload, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `raah-e-ishq-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  if (window.NoorToast) {
    window.NoorToast.show('Complete data backup exported successfully 📥', 'success');
  }
}

function getStoredJson(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Initialise when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSettings);
} else {
  initSettings();
}
