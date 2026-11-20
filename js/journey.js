/**
 * Noor (نور) — My Quran Journey Dashboard
 * Personal dashboard uniting reading progress, saved Ayat bookmarks,
 * daily remembrance (Azkar) activity, and Tadabbur reflections.
 * Built with a mindful, pressure-free approach to spiritual growth.
 */

'use strict';

/* ============================================================
   1. STORAGE KEYS & CONSTANTS
   ============================================================ */

const JOURNEY_KEYS = {
  READING_PROGRESS: 'noor-reading-progress',
  BOOKMARKS: 'noor-saved-ayat',
  AZKAR_PROGRESS: 'noor-azkar-progress',
  REFLECTIONS: 'noor-reflections'
};

// 30 Juz Metadata (Start Surah & Ayah for direct jumping)
const JUZ_MAPPINGS = [
  { juz: 1, surah: 1, ayah: 1, name: 'Al-Fatihah' },
  { juz: 2, surah: 2, ayah: 142, name: 'Al-Baqarah' },
  { juz: 3, surah: 2, ayah: 253, name: 'Al-Baqarah' },
  { juz: 4, surah: 3, ayah: 93, name: "Ali 'Imran" },
  { juz: 5, surah: 4, ayah: 24, name: 'An-Nisa' },
  { juz: 6, surah: 4, ayah: 148, name: 'An-Nisa' },
  { juz: 7, surah: 5, ayah: 82, name: "Al-Ma'idah" },
  { juz: 8, surah: 6, ayah: 111, name: "Al-An'am" },
  { juz: 9, surah: 7, ayah: 88, name: "Al-A'raf" },
  { juz: 10, surah: 8, ayah: 41, name: 'Al-Anfal' },
  { juz: 11, surah: 9, ayah: 93, name: 'At-Tawbah' },
  { juz: 12, surah: 11, ayah: 6, name: 'Hud' },
  { juz: 13, surah: 12, ayah: 53, name: 'Yusuf' },
  { juz: 14, surah: 15, ayah: 1, name: 'Al-Hijr' },
  { juz: 15, surah: 17, ayah: 1, name: 'Al-Isra' },
  { juz: 16, surah: 18, ayah: 75, name: 'Al-Kahf' },
  { juz: 17, surah: 21, ayah: 1, name: 'Al-Anbiya' },
  { juz: 18, surah: 23, ayah: 1, name: "Al-Mu'minun" },
  { juz: 19, surah: 25, ayah: 21, name: 'Al-Furqan' },
  { juz: 20, surah: 27, ayah: 56, name: 'An-Naml' },
  { juz: 21, surah: 29, ayah: 46, name: "Al-'Ankabut" },
  { juz: 22, surah: 33, ayah: 31, name: 'Al-Ahzab' },
  { juz: 23, surah: 36, ayah: 28, name: 'Ya-Sin' },
  { juz: 24, surah: 39, ayah: 32, name: 'Az-Zumar' },
  { juz: 25, surah: 41, ayah: 47, name: 'Fussilat' },
  { juz: 26, surah: 46, ayah: 1, name: 'Al-Ahqaf' },
  { juz: 27, surah: 51, ayah: 31, name: 'Adh-Dhariyat' },
  { juz: 28, surah: 58, ayah: 1, name: 'Al-Mujadila' },
  { juz: 29, surah: 67, ayah: 1, name: 'Al-Mulk' },
  { juz: 30, surah: 78, ayah: 1, name: 'An-Naba' }
];

// Prescribed Azkar items per category count for dashboard breakdown
const AZKAR_CAT_TARGETS = {
  morning: 5,
  evening: 5,
  prayer: 5,
  sleep: 3
};

/* ============================================================
   2. DATA ACCESSORS
   ============================================================ */

function getReadingProgress() {
  if (window.NoorReadingProgress) {
    return window.NoorReadingProgress.get();
  }
  try {
    const raw = localStorage.getItem(JOURNEY_KEYS.READING_PROGRESS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    surahNameEn: 'Surah Al-Kahf',
    surahNameAr: 'سورة الكهف',
    surahNumber: 18,
    ayahNumber: 19,
    juzNumber: 15,
    percentJuz: 17,
    lastReadDate: 'Today'
  };
}

function getBookmarks() {
  if (window.NoorBookmarks) {
    return window.NoorBookmarks.getAll();
  }
  try {
    const raw = localStorage.getItem(JOURNEY_KEYS.BOOKMARKS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

function getAzkarProgress() {
  try {
    const raw = localStorage.getItem(JOURNEY_KEYS.AZKAR_PROGRESS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {};
}

function getReflections() {
  try {
    const raw = localStorage.getItem(JOURNEY_KEYS.REFLECTIONS);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];
}

/* ============================================================
   3. SECTION 1 — READING PROGRESS & JUZ EXPLORER
   ============================================================ */

function renderReadingProgress() {
  const progress = getReadingProgress();

  const surahNameEl = document.getElementById('dash-surah-name');
  const surahArabicEl = document.getElementById('dash-surah-arabic');
  const ayahRefEl = document.getElementById('dash-ayah-reference');
  const progressFill = document.getElementById('dash-progress-fill');
  const progressPercentEl = document.getElementById('dash-progress-percent');
  const lastReadTimeEl = document.getElementById('dash-last-read-time');
  const continueBtn = document.getElementById('btn-continue-reading');
  const reflectBtn = document.getElementById('btn-reflect-last-read');
  const juzCurrentLabel = document.getElementById('juz-current-label');

  const sNumber = progress.surahNumber || 18;
  const aNumber = progress.ayahNumber || 19;
  const jNumber = progress.juzNumber || 15;
  const percent = progress.percentJuz || 17;

  if (surahNameEl) surahNameEl.textContent = progress.surahNameEn || 'Surah Al-Kahf';
  if (surahArabicEl) surahArabicEl.textContent = progress.surahNameAr || 'سُورَةُ الكَهْفِ';
  if (ayahRefEl) ayahRefEl.textContent = `Ayah ${aNumber} • Juz ${jNumber}`;
  if (progressFill) progressFill.style.width = `${percent}%`;
  if (progressPercentEl) progressPercentEl.textContent = `${percent}% of Surah`;
  if (lastReadTimeEl) lastReadTimeEl.textContent = `Last read: ${progress.lastReadDate || 'Recently'}`;

  const quranUrl = `quran.html?surah=${sNumber}&ayah=${aNumber}`;
  const journalUrl = `journal.html?surah=${sNumber}&ayah=${aNumber}&title=${encodeURIComponent('Reflection on ' + progress.surahNameEn + ' ' + sNumber + ':' + aNumber)}`;

  if (continueBtn) continueBtn.href = quranUrl;
  if (reflectBtn) reflectBtn.href = journalUrl;
  if (juzCurrentLabel) juzCurrentLabel.textContent = `Currently in Juz ${jNumber}`;

  // Update hero summary pill
  const summaryLastRead = document.getElementById('summary-last-read');
  const summaryLastAyah = document.getElementById('summary-last-ayah');
  if (summaryLastRead) summaryLastRead.textContent = progress.surahNameEn || 'Surah Al-Kahf';
  if (summaryLastAyah) summaryLastAyah.textContent = `Ayah ${aNumber} • Juz ${jNumber}`;

  // Render 30 Juz interactive pills
  renderJuzGrid(jNumber);
}

function renderJuzGrid(currentJuz) {
  const container = document.getElementById('juz-mini-grid');
  if (!container) return;

  const html = JUZ_MAPPINGS.map(item => {
    const isCurrent = item.juz === currentJuz;
    const isPast = item.juz < currentJuz;
    let stateClass = '';
    if (isCurrent) stateClass = 'current';
    else if (isPast) stateClass = 'read';

    return `
      <a 
        href="quran.html?surah=${item.surah}&ayah=${item.ayah}" 
        class="juz-pill ${stateClass}" 
        title="Juz ${item.juz} (Starts at ${item.name} ${item.surah}:${item.ayah})"
        aria-label="Read Juz ${item.juz}"
      >
        <span class="juz-num">${item.juz}</span>
      </a>
    `;
  }).join('');

  container.innerHTML = html;
}

/* ============================================================
   4. SECTION 2 — SAVED AYAT (BOOKMARKS)
   ============================================================ */

let activeBookmarkModalAyah = null;

function renderSavedAyat() {
  const bookmarks = getBookmarks();
  const listContainer = document.getElementById('saved-ayat-list');
  const emptyState = document.getElementById('saved-ayat-empty');
  const countChip = document.getElementById('saved-ayat-count-chip');
  const summaryCount = document.getElementById('summary-saved-count');
  const subtitle = document.getElementById('saved-ayat-subtitle');

  const count = bookmarks.length;
  if (countChip) countChip.textContent = `${count} saved`;
  if (summaryCount) summaryCount.textContent = count;
  if (subtitle) {
    subtitle.textContent = count === 1 
      ? '1 cherished verse saved' 
      : `${count} cherished verses saved`;
  }

  if (count === 0) {
    if (listContainer) listContainer.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  if (!listContainer) return;

  const html = bookmarks.map(b => {
    // Parse surah & ayah numbers if present
    let surahNum = 1;
    let ayahNum = 1;
    if (b.id && b.id.includes(':')) {
      const parts = b.id.split(':');
      surahNum = parseInt(parts[0], 10) || 1;
      ayahNum = parseInt(parts[1], 10) || 1;
    } else if (b.ayah) {
      ayahNum = parseInt(b.ayah, 10) || 1;
    }

    const refLabel = b.ref || `Surah ${b.surah || 'Al-Quran'} (${surahNum}:${ayahNum})`;
    const quranUrl = `quran.html?surah=${surahNum}&ayah=${ayahNum}`;
    const arabicSnippet = b.arabic ? truncateText(b.arabic, 70) : 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
    const translationSnippet = b.translation ? truncateText(b.translation, 90) : (b.text || 'Saved Ayah');

    return `
      <div class="saved-ayah-card" data-id="${b.id}" tabindex="0" role="button" aria-label="View bookmark ${refLabel}">
        <div class="saved-ayah-card-top">
          <span class="bookmark-ref-badge">${escapeHtml(refLabel)}</span>
          <div class="bookmark-quick-actions">
            <a href="${quranUrl}" class="btn-bm-action btn-bm-quran" title="Open in Quran Reader" onclick="event.stopPropagation();">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              <span>Reader</span>
            </a>
            <button type="button" class="btn-bm-action btn-bm-remove" data-id="${b.id}" title="Remove Bookmark" onclick="event.stopPropagation();">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>

        <div class="saved-ayah-arabic" dir="rtl" lang="ar">
          ${escapeHtml(arabicSnippet)}
        </div>

        <div class="saved-ayah-translation" dir="rtl" lang="ur">
          ${escapeHtml(translationSnippet)}
        </div>
      </div>
    `;
  }).join('');

  listContainer.innerHTML = html;
}

function initBookmarkEvents() {
  const listContainer = document.getElementById('saved-ayat-list');
  if (listContainer) {
    listContainer.addEventListener('click', (e) => {
      // Remove button
      const removeBtn = e.target.closest('.btn-bm-remove');
      if (removeBtn) {
        e.stopPropagation();
        const id = removeBtn.getAttribute('data-id');
        removeBookmark(id);
        return;
      }

      // Card Click -> Open Detail Modal
      const card = e.target.closest('.saved-ayah-card');
      if (card) {
        const id = card.getAttribute('data-id');
        openBookmarkModal(id);
      }
    });
  }

  // Modal events
  const modalClose = document.getElementById('modal-bm-close');
  const modalDelete = document.getElementById('modal-bm-delete');
  const modal = document.getElementById('journey-bookmark-modal');

  if (modalClose) modalClose.addEventListener('click', closeBookmarkModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeBookmarkModal();
    });
  }

  if (modalDelete) {
    modalDelete.addEventListener('click', () => {
      if (activeBookmarkModalAyah) {
        removeBookmark(activeBookmarkModalAyah.id);
        closeBookmarkModal();
      }
    });
  }
}

function removeBookmark(id) {
  if (window.NoorBookmarks) {
    window.NoorBookmarks.toggle({ id });
  } else {
    let list = getBookmarks();
    list = list.filter(item => item.id !== id);
    localStorage.setItem(JOURNEY_KEYS.BOOKMARKS, JSON.stringify(list));
  }

  renderSavedAyat();
  renderActivityTimeline();
  if (window.NoorToast) {
    window.NoorToast.show('Bookmark removed', 'info');
  }
}

function openBookmarkModal(id) {
  const bookmarks = getBookmarks();
  const found = bookmarks.find(b => b.id === id);
  if (!found) return;

  activeBookmarkModalAyah = found;

  const modal = document.getElementById('journey-bookmark-modal');
  const tagEl = document.getElementById('modal-bm-tag');
  const titleEl = document.getElementById('modal-bm-title');
  const arabicEl = document.getElementById('modal-bm-arabic');
  const transEl = document.getElementById('modal-bm-translation');
  const readerLink = document.getElementById('modal-bm-reader-link');
  const reflectLink = document.getElementById('modal-bm-reflect-link');

  let surahNum = 1;
  let ayahNum = 1;
  if (found.id && found.id.includes(':')) {
    const parts = found.id.split(':');
    surahNum = parseInt(parts[0], 10) || 1;
    ayahNum = parseInt(parts[1], 10) || 1;
  }

  const ref = found.ref || `Surah ${found.surah || 'Al-Quran'} (${surahNum}:${ayahNum})`;
  if (tagEl) tagEl.textContent = ref;
  if (titleEl) titleEl.textContent = found.surah || 'Bookmarked Verse';
  if (arabicEl) arabicEl.textContent = found.arabic || 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ';
  if (transEl) transEl.textContent = found.translation || found.text || '';

  if (readerLink) readerLink.href = `quran.html?surah=${surahNum}&ayah=${ayahNum}`;
  if (reflectLink) reflectLink.href = `journal.html?surah=${surahNum}&ayah=${ayahNum}&title=${encodeURIComponent('Reflection on ' + ref)}`;

  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }
}

function closeBookmarkModal() {
  const modal = document.getElementById('journey-bookmark-modal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  activeBookmarkModalAyah = null;
}

/* ============================================================
   5. SECTION 3 — DAILY AZKAR PROGRESS
   ============================================================ */

function renderAzkarProgress() {
  const progressMap = getAzkarProgress();
  const summaryAzkarCount = document.getElementById('summary-azkar-count');
  const overallPercentEl = document.getElementById('azkar-overall-percent');
  const overallFillEl = document.getElementById('azkar-overall-fill');
  const completedSubEl = document.getElementById('azkar-completed-sub');

  // Calculate counts per category
  // Keys in NoorAzkarState are like: m-1, m-2 (morning), e-1 (evening), p-1 (prayer), s-1 (sleep)
  const catCounts = {
    morning: 0,
    evening: 0,
    prayer: 0,
    sleep: 0
  };

  let totalCompleted = 0;

  Object.entries(progressMap).forEach(([id, count]) => {
    if (count > 0) {
      if (id.startsWith('m-')) catCounts.morning++;
      else if (id.startsWith('e-')) catCounts.evening++;
      else if (id.startsWith('p-')) catCounts.prayer++;
      else if (id.startsWith('s-')) catCounts.sleep++;
      totalCompleted++;
    }
  });

  const totalTargets = AZKAR_CAT_TARGETS.morning + AZKAR_CAT_TARGETS.evening + AZKAR_CAT_TARGETS.prayer + AZKAR_CAT_TARGETS.sleep; // 18 items
  const overallPct = Math.min(100, Math.round((totalCompleted / totalTargets) * 100));

  if (summaryAzkarCount) summaryAzkarCount.textContent = totalCompleted;
  if (overallPercentEl) overallPercentEl.textContent = `${overallPct}%`;
  if (overallFillEl) overallFillEl.style.width = `${overallPct}%`;
  if (completedSubEl) {
    completedSubEl.textContent = `${totalCompleted} of ${totalTargets} daily remembrances completed today`;
  }

  // Update categories
  updateCatUI('morning', catCounts.morning, AZKAR_CAT_TARGETS.morning);
  updateCatUI('evening', catCounts.evening, AZKAR_CAT_TARGETS.evening);
  updateCatUI('prayer', catCounts.prayer, AZKAR_CAT_TARGETS.prayer);
  updateCatUI('sleep', catCounts.sleep, AZKAR_CAT_TARGETS.sleep);
}

function updateCatUI(category, current, max) {
  const fill = document.getElementById(`azkar-cat-${category}-fill`);
  const status = document.getElementById(`azkar-cat-${category}-status`);

  const pct = Math.min(100, Math.round((current / max) * 100));
  if (fill) fill.style.width = `${pct}%`;
  if (status) status.textContent = `${current}/${max}`;
}

/* ============================================================
   6. SECTION 4 — PERSONAL REFLECTIONS
   ============================================================ */

function renderReflections() {
  const reflections = getReflections();
  const container = document.getElementById('dashboard-reflections-list');
  const emptyState = document.getElementById('dashboard-reflections-empty');
  const summaryCount = document.getElementById('summary-reflections-count');

  if (summaryCount) summaryCount.textContent = reflections.length;

  if (!reflections || reflections.length === 0) {
    if (container) container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  if (!container) return;

  // Take the most recent 3 reflections
  const recent = reflections.slice(0, 3);

  const html = recent.map(r => {
    const dateFormatted = formatReflectionDate(r.updatedAt || r.createdAt);
    const quranUrl = `quran.html?surah=${r.surahNumber}&ayah=${r.ayahNumber}`;

    return `
      <div class="dash-reflection-card">
        <div class="dash-ref-top">
          <div class="dash-ref-surah">
            <span class="ref-badge">Surah ${escapeHtml(r.surahNameEn)} (${r.surahNumber}:${r.ayahNumber})</span>
            <span class="dash-ref-tag tag-${r.tag.toLowerCase().replace(/\s+/g, '-')}">${escapeHtml(r.tag)}</span>
          </div>
          <span class="dash-ref-date">${dateFormatted}</span>
        </div>

        <h4 class="dash-ref-title">${escapeHtml(r.title)}</h4>
        <p class="dash-ref-snippet">${escapeHtml(truncateText(r.body, 140))}</p>

        <div class="dash-ref-actions">
          <a href="journal.html" class="btn-ref-link">
            <span>Read in Journal</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>
          <a href="${quranUrl}" class="btn-ref-quran" title="Open in Quran Reader">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            <span>Read Ayah</span>
          </a>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

/* ============================================================
   7. SECTION 5 — PERSONAL ACTIVITY TIMELINE FEED
   ============================================================ */

function renderActivityTimeline() {
  const container = document.getElementById('activity-timeline-feed');
  if (!container) return;

  const reading = getReadingProgress();
  const bookmarks = getBookmarks();
  const reflections = getReflections();
  const azkar = getAzkarProgress();

  const activities = [];

  // 1. Reading activity item
  if (reading && reading.surahNumber) {
    activities.push({
      type: 'reading',
      icon: '📖',
      title: `Read ${reading.surahNameEn} (${reading.surahNumber}:${reading.ayahNumber})`,
      subtitle: `Marked checkpoint in Juz ${reading.juzNumber || 15}`,
      link: `quran.html?surah=${reading.surahNumber}&ayah=${reading.ayahNumber}`,
      linkText: 'Continue',
      time: reading.lastReadDate || 'Recently'
    });
  }

  // 2. Bookmarks activity
  bookmarks.slice(0, 3).forEach(b => {
    activities.push({
      type: 'bookmark',
      icon: '⭐',
      title: `Bookmarked ${b.ref || b.surah || 'Quran Verse'}`,
      subtitle: b.translation ? truncateText(b.translation, 55) : 'Saved to personal collection',
      link: `quran.html?surah=${b.ayah ? b.id.split(':')[0] : 1}&ayah=${b.ayah || 1}`,
      linkText: 'View',
      time: 'Saved'
    });
  });

  // 3. Reflections activity
  reflections.slice(0, 3).forEach(r => {
    activities.push({
      type: 'reflection',
      icon: '✍️',
      title: `Wrote Reflection: "${truncateText(r.title, 35)}"`,
      subtitle: `Surah ${r.surahNameEn} (${r.surahNumber}:${r.ayahNumber}) • ${r.tag}`,
      link: 'journal.html',
      linkText: 'Journal',
      time: formatReflectionDate(r.updatedAt || r.createdAt)
    });
  });

  // 4. Azkar activity
  const azkarCompletedCount = Object.values(azkar).filter(c => c > 0).length;
  if (azkarCompletedCount > 0) {
    activities.push({
      type: 'azkar',
      icon: '📿',
      title: `Recited ${azkarCompletedCount} Daily Azkar`,
      subtitle: 'Morning, evening, and after-prayer remembrance',
      link: 'azkar.html',
      linkText: 'Azkar',
      time: 'Today'
    });
  }

  if (activities.length === 0) {
    container.innerHTML = `
      <div class="timeline-empty">
        <p>No recent activity yet. As you read the Quran, recite Azkar, and write reflections, your personal journey milestones will appear here.</p>
      </div>
    `;
    return;
  }

  const html = activities.map(act => {
    return `
      <div class="timeline-item item-${act.type}">
        <div class="timeline-icon-bubble">${act.icon}</div>
        <div class="timeline-content">
          <div class="timeline-title-row">
            <span class="timeline-title">${escapeHtml(act.title)}</span>
            <span class="timeline-time">${escapeHtml(act.time)}</span>
          </div>
          <p class="timeline-sub">${escapeHtml(act.subtitle)}</p>
        </div>
        <a href="${act.link}" class="btn-timeline-action">${act.linkText} ↗</a>
      </div>
    `;
  }).join('');

  container.innerHTML = html;
}

/* ============================================================
   8. EXPORT JOURNEY SUMMARY
   ============================================================ */

function exportJourneySummary() {
  const reading = getReadingProgress();
  const bookmarks = getBookmarks();
  const reflections = getReflections();
  const azkar = getAzkarProgress();
  const azkarCount = Object.values(azkar).filter(c => c > 0).length;

  let text = `====================================================================\n`;
  text += `NOOR (نور) — MY QURAN JOURNEY SUMMARY (رحلتي مع القرآن)\n`;
  text += `Exported on: ${new Date().toLocaleString()}\n`;
  text += `====================================================================\n\n`;

  text += `1. READING PROGRESS\n`;
  text += `--------------------------------------------------------------------\n`;
  text += `Last Read: ${reading.surahNameEn} (${reading.surahNumber}:${reading.ayahNumber})\n`;
  text += `Juz: ${reading.juzNumber || 15} • Progress: ${reading.percentJuz || 0}%\n`;
  text += `Last Activity: ${reading.lastReadDate || 'Recently'}\n\n`;

  text += `2. SAVED BOOKMARKS (${bookmarks.length} Ayat)\n`;
  text += `--------------------------------------------------------------------\n`;
  bookmarks.forEach((b, i) => {
    text += `[${i + 1}] ${b.ref || b.surah}\n`;
    if (b.arabic) text += `    Arabic: ${b.arabic}\n`;
    if (b.translation) text += `    Urdu: ${b.translation}\n`;
  });
  text += `\n`;

  text += `3. DAILY AZKAR\n`;
  text += `--------------------------------------------------------------------\n`;
  text += `Completed Azkar: ${azkarCount} daily remembrances\n\n`;

  text += `4. PERSONAL TADABBUR REFLECTIONS (${reflections.length} Entries)\n`;
  text += `--------------------------------------------------------------------\n`;
  reflections.forEach((r, i) => {
    text += `[${i + 1}] ${r.title} — Surah ${r.surahNameEn} (${r.surahNumber}:${r.ayahNumber})\n`;
    text += `    Tag: ${r.tag} | Date: ${formatReflectionDate(r.createdAt)}\n`;
    text += `    "${r.body}"\n\n`;
  });

  text += `====================================================================\n`;
  text += `Noor | نور — https://noor.islamic\n`;
  text += `====================================================================\n`;

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `noor-journey-summary-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  if (window.NoorToast) {
    window.NoorToast.show('Journey summary exported to text 📥', 'success');
  }
}

/* ============================================================
   9. HELPER UTILITIES
   ============================================================ */

function truncateText(str, maxLen) {
  if (!str || str.length <= maxLen) return str;
  return str.substring(0, maxLen).trim() + '…';
}

function formatReflectionDate(isoString) {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return isoString;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ============================================================
   10. INITIALIZATION
   ============================================================ */

function initJourneyPage() {
  console.info('[Noor] Initialising My Quran Journey Dashboard...');

  // Render components
  renderReadingProgress();
  renderSavedAyat();
  initBookmarkEvents();
  renderAzkarProgress();
  renderReflections();
  renderActivityTimeline();

  // Export button
  const btnExport = document.getElementById('btn-export-journey-summary');
  if (btnExport) {
    btnExport.addEventListener('click', exportJourneySummary);
  }

  // Listen for storage changes across tabs
  window.addEventListener('storage', () => {
    renderReadingProgress();
    renderSavedAyat();
    renderAzkarProgress();
    renderReflections();
    renderActivityTimeline();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initJourneyPage);
} else {
  initJourneyPage();
}
