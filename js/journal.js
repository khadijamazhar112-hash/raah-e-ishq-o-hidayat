/**
 * Noor (نور) — Quran Reflection Journal
 * Personal Tadabbur & Reflection system.
 * Allows users to write, organize, search, edit, and export personal insights linked to Quranic verses.
 * 100% private by default, saved in localStorage with backend sync capability.
 */

'use strict';

/* ============================================================
   1. 114 SURAHS CATALOG METADATA
   ============================================================ */

const SURAHS_LIST = [
  { id: 1, name: "Al-Fatihah", arabic: "الفاتحة", urdu: "الفاتحہ", english: "The Opening", ayahs: 7 },
  { id: 2, name: "Al-Baqarah", arabic: "البقرة", urdu: "البقرہ", english: "The Cow", ayahs: 286 },
  { id: 3, name: "Ali 'Imran", arabic: "آل عمران", urdu: "آل عمران", english: "Family of Imran", ayahs: 200 },
  { id: 4, name: "An-Nisa", arabic: "النساء", urdu: "النساء", english: "The Women", ayahs: 176 },
  { id: 5, name: "Al-Ma'idah", arabic: "المائدة", urdu: "المائدہ", english: "The Table Spread", ayahs: 120 },
  { id: 6, name: "Al-An'am", arabic: "الأنعام", urdu: "الانعام", english: "The Cattle", ayahs: 165 },
  { id: 7, name: "Al-A'raf", arabic: "الأعراف", urdu: "الاعراف", english: "The Heights", ayahs: 206 },
  { id: 8, name: "Al-Anfal", arabic: "الأنفال", urdu: "الانفال", english: "The Spoils of War", ayahs: 75 },
  { id: 9, name: "At-Tawbah", arabic: "التوبة", urdu: "التوبہ", english: "The Repentance", ayahs: 129 },
  { id: 10, name: "Yunus", arabic: "يونس", urdu: "یونس", english: "Jonah", ayahs: 109 },
  { id: 11, name: "Hud", arabic: "هود", urdu: "ہود", english: "Hud", ayahs: 123 },
  { id: 12, name: "Yusuf", arabic: "يوسف", urdu: "یوسف", english: "Joseph", ayahs: 111 },
  { id: 13, name: "Ar-Ra'd", arabic: "الرعد", urdu: "الرعد", english: "The Thunder", ayahs: 43 },
  { id: 14, name: "Ibrahim", arabic: "إبراهيم", urdu: "ابراہیم", english: "Abraham", ayahs: 52 },
  { id: 15, name: "Al-Hijr", arabic: "الحجر", urdu: "الحجر", english: "The Rocky Tract", ayahs: 99 },
  { id: 16, name: "An-Nahl", arabic: "النحل", urdu: "النحل", english: "The Bee", ayahs: 128 },
  { id: 17, name: "Al-Isra", arabic: "الإسراء", urdu: "الاسراء", english: "The Night Journey", ayahs: 111 },
  { id: 18, name: "Al-Kahf", arabic: "الكهف", urdu: "الکہف", english: "The Cave", ayahs: 110 },
  { id: 19, name: "Maryam", arabic: "مريم", urdu: "مریم", english: "Mary", ayahs: 98 },
  { id: 20, name: "Ta-Ha", arabic: "طه", urdu: "طٰہٰ", english: "Ta-Ha", ayahs: 135 },
  { id: 21, name: "Al-Anbiya", arabic: "الأنبياء", urdu: "الانبیاء", english: "The Prophets", ayahs: 112 },
  { id: 22, name: "Al-Hajj", arabic: "الحج", urdu: "الحج", english: "The Pilgrimage", ayahs: 78 },
  { id: 23, name: "Al-Mu'minun", arabic: "المؤمنون", urdu: "المؤمنون", english: "The Believers", ayahs: 118 },
  { id: 24, name: "An-Nur", arabic: "النور", urdu: "النور", english: "The Light", ayahs: 64 },
  { id: 25, name: "Al-Furqan", arabic: "الفرقان", urdu: "الفرقان", english: "The Criterion", ayahs: 77 },
  { id: 26, name: "Ash-Shu'ara", arabic: "الشعراء", urdu: "الشعراء", english: "The Poets", ayahs: 227 },
  { id: 27, name: "An-Naml", arabic: "النمل", urdu: "النمل", english: "The Ant", ayahs: 93 },
  { id: 28, name: "Al-Qasas", arabic: "القصص", urdu: "القصص", english: "The Stories", ayahs: 88 },
  { id: 29, name: "Al-'Ankabut", arabic: "العنكبوت", urdu: "العنکبوت", english: "The Spider", ayahs: 69 },
  { id: 30, name: "Ar-Rum", arabic: "الروم", urdu: "الروم", english: "The Romans", ayahs: 60 },
  { id: 31, name: "Luqman", arabic: "لقمان", urdu: "لقمان", english: "Luqman", ayahs: 34 },
  { id: 32, name: "As-Sajdah", arabic: "السجدة", urdu: "السجدہ", english: "The Prostration", ayahs: 30 },
  { id: 33, name: "Al-Ahzab", arabic: "الأحزاب", urdu: "الاحزاب", english: "The Combined Forces", ayahs: 73 },
  { id: 34, name: "Saba", arabic: "سبإ", urdu: "سبا", english: "Sheba", ayahs: 54 },
  { id: 35, name: "Fatir", arabic: "فاطر", urdu: "فاطر", english: "The Originator", ayahs: 45 },
  { id: 36, name: "Ya-Sin", arabic: "يس", urdu: "یٰسین", english: "Ya-Sin", ayahs: 83 },
  { id: 37, name: "As-Saffat", arabic: "الصافات", urdu: "الصافات", english: "Those Who Set The Ranks", ayahs: 182 },
  { id: 38, name: "Sad", arabic: "ص", urdu: "ص", english: "Sad", ayahs: 88 },
  { id: 39, name: "Az-Zumar", arabic: "الزمر", urdu: "الزمر", english: "The Troops", ayahs: 75 },
  { id: 40, name: "Ghafir", arabic: "غافر", urdu: "المؤمن", english: "The Forgiver", ayahs: 85 },
  { id: 41, name: "Fussilat", arabic: "فصلت", urdu: "حم السجدہ", english: "Explained in Detail", ayahs: 54 },
  { id: 42, name: "Ash-Shura", arabic: "الشورى", urdu: "الشورٰی", english: "The Consultation", ayahs: 53 },
  { id: 43, name: "Az-Zukhruf", arabic: "الزخرف", urdu: "الزخرف", english: "The Ornaments of Gold", ayahs: 89 },
  { id: 44, name: "Ad-Dukhan", arabic: "الدخان", urdu: "الدخان", english: "The Smoke", ayahs: 59 },
  { id: 45, name: "Al-Jathiyah", arabic: "الجاثية", urdu: "الجاثیہ", english: "The Crouching", ayahs: 37 },
  { id: 46, name: "Al-Ahqaf", arabic: "الأحقاف", urdu: "الاحقاف", english: "The Wind-Curved Sandhills", ayahs: 35 },
  { id: 47, name: "Muhammad", arabic: "محمد", urdu: "محمد", english: "Muhammad", ayahs: 38 },
  { id: 48, name: "Al-Fath", arabic: "الفتح", urdu: "الفتح", english: "The Victory", ayahs: 29 },
  { id: 49, name: "Al-Hujurat", arabic: "الحجرات", urdu: "الحجرات", english: "The Rooms", ayahs: 18 },
  { id: 50, name: "Qaf", arabic: "ق", urdu: "ق", english: "Qaf", ayahs: 45 },
  { id: 51, name: "Adh-Dhariyat", arabic: "الذاريات", urdu: "الذاریات", english: "The Winnowing Winds", ayahs: 60 },
  { id: 52, name: "At-Tur", arabic: "الطور", urdu: "الطور", english: "The Mount", ayahs: 49 },
  { id: 53, name: "An-Najm", arabic: "النجم", urdu: "النجم", english: "The Star", ayahs: 62 },
  { id: 54, name: "Al-Qamar", arabic: "القمر", urdu: "القمر", english: "The Moon", ayahs: 55 },
  { id: 55, name: "Ar-Rahman", arabic: "الرحمن", urdu: "الرحمٰن", english: "The Beneficent", ayahs: 78 },
  { id: 56, name: "Al-Waqi'ah", arabic: "الواقعة", urdu: "الواقعہ", english: "The Inevitable", ayahs: 96 },
  { id: 57, name: "Al-Hadid", arabic: "الحديد", urdu: "الحدید", english: "The Iron", ayahs: 29 },
  { id: 58, name: "Al-Mujadila", arabic: "المجادلة", urdu: "المجادلہ", english: "The Pleading Woman", ayahs: 22 },
  { id: 59, name: "Al-Hashr", arabic: "الحشر", urdu: "الحشر", english: "The Exile", ayahs: 24 },
  { id: 60, name: "Al-Mumtahanah", arabic: "الممتحنة", urdu: "الممتحنہ", english: "She That Is To Be Examined", ayahs: 13 },
  { id: 61, name: "As-Saff", arabic: "الصف", urdu: "الصف", english: "The Ranks", ayahs: 14 },
  { id: 62, name: "Al-Jumu'ah", arabic: "الجمعة", urdu: "الجمعہ", english: "The Congregation", ayahs: 11 },
  { id: 63, name: "Al-Munafiqun", arabic: "المنافقون", urdu: "المنافقون", english: "The Hypocrites", ayahs: 11 },
  { id: 64, name: "At-Taghabun", arabic: "التغابن", urdu: "التغابن", english: "The Mutual Disillusion", ayahs: 18 },
  { id: 65, name: "At-Talaq", arabic: "الطلاق", urdu: "الطلاق", english: "The Divorce", ayahs: 12 },
  { id: 66, name: "At-Tahrim", arabic: "التحريم", urdu: "التحریم", english: "The Prohibition", ayahs: 12 },
  { id: 67, name: "Al-Mulk", arabic: "الملك", urdu: "الملک", english: "The Sovereignty", ayahs: 30 },
  { id: 68, name: "Al-Qalam", arabic: "القلم", urdu: "القلم", english: "The Pen", ayahs: 52 },
  { id: 69, name: "Al-Haqqah", arabic: "الحاقة", urdu: "الحاقہ", english: "The Reality", ayahs: 52 },
  { id: 70, name: "Al-Ma'arij", arabic: "المعارج", urdu: "المعارج", english: "The Ascending Stairways", ayahs: 44 },
  { id: 71, name: "Nuh", arabic: "نوح", urdu: "نوح", english: "Noah", ayahs: 28 },
  { id: 72, name: "Al-Jinn", arabic: "الجن", urdu: "الجن", english: "The Jinn", ayahs: 28 },
  { id: 73, name: "Al-Muzzammil", arabic: "المزمل", urdu: "المزمل", english: "The Enshrouded One", ayahs: 20 },
  { id: 74, name: "Al-Muddaththir", arabic: "المدثر", urdu: "المدثر", english: "The Cloaked One", ayahs: 56 },
  { id: 75, name: "Al-Qiyamah", arabic: "القيامة", urdu: "القیامہ", english: "The Resurrection", ayahs: 40 },
  { id: 76, name: "Al-Insan", arabic: "الإنسان", urdu: "الدھر", english: "The Human", ayahs: 31 },
  { id: 77, name: "Al-Mursalat", arabic: "المرسلات", urdu: "المرسلات", english: "The Emissaries", ayahs: 50 },
  { id: 78, name: "An-Naba", arabic: "النبأ", urdu: "النباء", english: "The Tidings", ayahs: 40 },
  { id: 79, name: "An-Nazi'at", arabic: "النازعات", urdu: "النازعات", english: "Those Who Drag Forth", ayahs: 46 },
  { id: 80, name: "'Abasa", arabic: "عبس", urdu: "عبس", english: "He Frowned", ayahs: 42 },
  { id: 81, name: "At-Takwir", arabic: "التكوير", urdu: "التکویر", english: "The Overthrowing", ayahs: 29 },
  { id: 82, name: "Al-Infitar", arabic: "الانفطار", urdu: "الانفطار", english: "The Cleaving", ayahs: 19 },
  { id: 83, name: "Al-Mutaffifin", arabic: "المطففين", urdu: "المطففین", english: "The Defrauding", ayahs: 36 },
  { id: 84, name: "Al-Inshiqaq", arabic: "الانشقاق", urdu: "الانشقاق", english: "The Splitting Open", ayahs: 25 },
  { id: 85, name: "Al-Buruj", arabic: "البروج", urdu: "البروج", english: "The Mansions of the Stars", ayahs: 22 },
  { id: 86, name: "At-Tariq", arabic: "الطارق", urdu: "الطارق", english: "The Nightcomer", ayahs: 17 },
  { id: 87, name: "Al-A'la", arabic: "الأعلى", urdu: "الاعلیٰ", english: "The Most High", ayahs: 19 },
  { id: 88, name: "Al-Ghashiyah", arabic: "الغاشية", urdu: "الغاشیہ", english: "The Overwhelming", ayahs: 26 },
  { id: 89, name: "Al-Fajr", arabic: "الفجر", urdu: "الفجر", english: "The Dawn", ayahs: 30 },
  { id: 90, name: "Al-Balad", arabic: "البلد", urdu: "البلد", english: "The City", ayahs: 20 },
  { id: 91, name: "Ash-Shams", arabic: "الشمس", urdu: "الشمس", english: "The Sun", ayahs: 15 },
  { id: 92, name: "Al-Layl", arabic: "الليل", urdu: "اللیل", english: "The Night", ayahs: 21 },
  { id: 93, name: "Ad-Duha", arabic: "الضحى", urdu: "الضحٰی", english: "The Morning Hours", ayahs: 11 },
  { id: 94, name: "Ash-Sharh", arabic: "الشرح", urdu: "الانشراح", english: "The Relief", ayahs: 8 },
  { id: 95, name: "At-Tin", arabic: "التين", urdu: "التین", english: "The Fig", ayahs: 8 },
  { id: 96, name: "Al-'Alaq", arabic: "العلق", urdu: "العلق", english: "The Clot", ayahs: 19 },
  { id: 97, name: "Al-Qadr", arabic: "القدر", urdu: "القدر", english: "The Power", ayahs: 5 },
  { id: 98, name: "Al-Bayyinah", arabic: "البينة", urdu: "البینہ", english: "The Clear Proof", ayahs: 8 },
  { id: 99, name: "Az-Zalzalah", arabic: "الزلزلة", urdu: "الزلزال", english: "The Earthquake", ayahs: 8 },
  { id: 100, name: "Al-'Adiyat", arabic: "العاديات", urdu: "العادیات", english: "The Courser", ayahs: 11 },
  { id: 101, name: "Al-Qari'ah", arabic: "القارعة", urdu: "القارaction", english: "The Calamity", ayahs: 11 },
  { id: 102, name: "At-Takathur", arabic: "التكاثر", urdu: "التکاثر", english: "The Rivalry in World Increase", ayahs: 8 },
  { id: 103, name: "Al-'Asr", arabic: "العصر", urdu: "العصر", english: "The Declining Day", ayahs: 3 },
  { id: 104, name: "Al-Humazah", arabic: "الهمزة", urdu: "الہمزہ", english: "The Traducer", ayahs: 9 },
  { id: 105, name: "Al-Fil", arabic: "الفيل", urdu: "الفیل", english: "The Elephant", ayahs: 5 },
  { id: 106, name: "Quraysh", arabic: "قريش", urdu: "قریش", english: "Quraysh", ayahs: 4 },
  { id: 107, name: "Al-Ma'un", arabic: "الماعون", urdu: "الماعون", english: "The Small Kindnesses", ayahs: 7 },
  { id: 108, name: "Al-Kawthar", arabic: "الكوثر", urdu: "الکوثر", english: "The Abundance", ayahs: 3 },
  { id: 109, name: "Al-Kafirun", arabic: "الكافرون", urdu: "الکافرون", english: "The Disbelievers", ayahs: 6 },
  { id: 110, name: "An-Nasr", arabic: "النصر", urdu: "النصر", english: "The Divine Support", ayahs: 3 },
  { id: 111, name: "Al-Masad", arabic: "المسد", urdu: "المسد", english: "The Palm Fiber", ayahs: 5 },
  { id: 112, name: "Al-Ikhlas", arabic: "الإخلاص", urdu: "الاخلاص", english: "The Sincerity", ayahs: 4 },
  { id: 113, name: "Al-Falaq", arabic: "الفلق", urdu: "الفلق", english: "The Daybreak", ayahs: 5 },
  { id: 114, name: "An-Nas", arabic: "الناس", urdu: "الناس", english: "Mankind", ayahs: 6 }
];

/* ============================================================
   2. STATE MANAGEMENT & STORAGE KEYS
   ============================================================ */

const STORAGE_KEYS = {
  REFLECTIONS: 'noor-reflections',
  DRAFT: 'noor-reflection-draft'
};

const JournalState = {
  reflections: [],
  activeFilterTag: 'all',
  searchQuery: '',
  sortBy: 'newest', // 'newest' | 'oldest' | 'surah'
  editingId: null,
  activeViewId: null
};

// Seed sample reflection if empty on very first visit
const DEFAULT_INITIAL_REFLECTIONS = [
  {
    id: 'ref_sample_1',
    surahNumber: 2,
    surahNameEn: 'Al-Baqarah',
    surahNameAr: 'البقرة',
    ayahNumber: 153,
    title: 'Patience and Prayer as Anchors in Life',
    body: 'Reflecting on "استعينوا بالصبر والصلاة": Allah couples patience with prayer. Patience holds the heart steady, while prayer lifts it upward toward the Divine. Whenever anxiety knocks on my door, this verse reminds me that I never fight battles alone—Allah is truly with the patient.',
    tag: 'Patience',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: 'ref_sample_2',
    surahNumber: 94,
    surahNameEn: 'Ash-Sharh',
    surahNameAr: 'الشرح',
    ayahNumber: 5,
    title: 'The Inevitability of Relief',
    body: 'The repetition in "فإن مع العسر يسرا" brings immense solace. Notice the preposition "مع" (with)—ease is not just after difficulty, it arrives intertwined with the trial itself. Even in the hardest seasons, subtle mercies surround us.',
    tag: 'Hope',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
  }
];

function loadReflectionsFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.REFLECTIONS);
    if (!raw) {
      // First visit: save initial sample reflections
      localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(DEFAULT_INITIAL_REFLECTIONS));
      return DEFAULT_INITIAL_REFLECTIONS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.warn('[Noor Journal] Error reading storage:', err);
    return [];
  }
}

function saveReflectionsToStorage(list) {
  try {
    localStorage.setItem(STORAGE_KEYS.REFLECTIONS, JSON.stringify(list));
    // Optionally trigger backend sync if user has an active session
    syncToBackendIfAvailable(list);
  } catch (err) {
    console.error('[Noor Journal] Failed to persist reflections:', err);
  }
}

function syncToBackendIfAvailable(reflections) {
  const authToken = localStorage.getItem('noor-auth-token');
  if (!authToken) return; // Guest mode: private on device

  // If user is signed in, sync securely to backend
  fetch('/api/journal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({ reflections })
  }).then(res => res.json())
    .catch(err => console.debug('[Noor Journal] Backend sync skipped:', err.message));
}

/* ============================================================
   3. POPULATE SURAH DROPDOWN & INPUT HELPERS
   ============================================================ */

function initSurahDropdown() {
  const select = document.getElementById('reflection-surah-select');
  if (!select) return;

  const options = SURAHS_LIST.map(s => {
    return `<option value="${s.id}">${s.id}. ${s.name} (${s.arabic}) — ${s.ayahs} Ayahs</option>`;
  }).join('');

  select.innerHTML = '<option value="">-- Choose a Surah (1 to 114) --</option>' + options;

  // Change handler to adjust Ayah input max
  select.addEventListener('change', () => {
    const surahId = parseInt(select.value, 10);
    const ayahInput = document.getElementById('reflection-ayah-input');
    const previewChip = document.getElementById('verse-preview-chip');
    const previewLink = document.getElementById('link-preview-in-quran');

    if (!surahId) {
      if (ayahInput) {
        ayahInput.max = 286;
        ayahInput.placeholder = 'Ayah #';
      }
      if (previewChip) previewChip.style.display = 'none';
      if (previewLink) previewLink.style.display = 'none';
      return;
    }

    const surah = SURAHS_LIST.find(s => s.id === surahId);
    if (surah && ayahInput) {
      ayahInput.max = surah.ayahs;
      ayahInput.placeholder = `1 to ${surah.ayahs}`;
      if (parseInt(ayahInput.value, 10) > surah.ayahs) {
        ayahInput.value = surah.ayahs;
      }
      updateAyahPreview(surah, parseInt(ayahInput.value, 10));
    }
  });

  const ayahInput = document.getElementById('reflection-ayah-input');
  if (ayahInput) {
    ayahInput.addEventListener('input', () => {
      const surahId = parseInt(select.value, 10);
      const surah = SURAHS_LIST.find(s => s.id === surahId);
      const ayahNum = parseInt(ayahInput.value, 10);
      if (surah && ayahNum) {
        updateAyahPreview(surah, ayahNum);
      }
    });
  }
}

function updateAyahPreview(surah, ayahNum) {
  const previewChip = document.getElementById('verse-preview-chip');
  const previewText = document.getElementById('verse-preview-text');
  const previewReaderLink = document.getElementById('verse-preview-reader-link');
  const previewQuickBtn = document.getElementById('link-preview-in-quran');

  if (!surah || !ayahNum || ayahNum < 1 || ayahNum > surah.ayahs) {
    if (previewChip) previewChip.style.display = 'none';
    if (previewQuickBtn) previewQuickBtn.style.display = 'none';
    return;
  }

  const quranUrl = `quran.html?surah=${surah.id}&ayah=${ayahNum}`;

  if (previewText) {
    previewText.textContent = `Surah ${surah.name} (${surah.id}:${ayahNum}) • ${surah.arabic}`;
  }
  if (previewReaderLink) {
    previewReaderLink.href = quranUrl;
  }
  if (previewQuickBtn) {
    previewQuickBtn.href = quranUrl;
    previewQuickBtn.style.display = 'inline-flex';
  }
  if (previewChip) {
    previewChip.style.display = 'flex';
  }
}

/* ============================================================
   4. TAG PILLS & INSPIRATION PROMPTS
   ============================================================ */

function initTagAndPromptControls() {
  // 1. Tag pills selector
  const tagPillsContainer = document.getElementById('tag-selector-pills');
  const hiddenTagInput = document.getElementById('selected-theme-tag');

  if (tagPillsContainer && hiddenTagInput) {
    tagPillsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.tag-pill');
      if (!btn) return;
      const tag = btn.getAttribute('data-tag');
      hiddenTagInput.value = tag;

      tagPillsContainer.querySelectorAll('.tag-pill').forEach(p => {
        p.classList.toggle('active', p === btn);
      });
    });
  }

  // 2. Inspiration Prompts
  const promptsBox = document.querySelector('.prompts-chips-grid');
  const bodyTextarea = document.getElementById('reflection-body-input');

  if (promptsBox && bodyTextarea) {
    promptsBox.addEventListener('click', (e) => {
      const btn = e.target.closest('.prompt-chip-btn');
      if (!btn) return;
      const promptText = btn.getAttribute('data-prompt');

      const currentVal = bodyTextarea.value.trim();
      if (currentVal.length === 0) {
        bodyTextarea.value = promptText + '\n\n';
      } else {
        bodyTextarea.value = currentVal + '\n\n' + promptText + '\n\n';
      }

      bodyTextarea.focus();
      updateWordCount();
      saveDraft();

      if (window.NoorToast) {
        window.NoorToast.show('Prompt added to your reflection ✍️', 'info');
      }
    });
  }

  // 3. Word & Character Counter
  if (bodyTextarea) {
    bodyTextarea.addEventListener('input', () => {
      updateWordCount();
      saveDraftDebounced();
    });
  }
}

function updateWordCount() {
  const textarea = document.getElementById('reflection-body-input');
  const counter = document.getElementById('editor-word-count');
  if (!textarea || !counter) return;

  const text = textarea.value.trim();
  const chars = textarea.value.length;
  const words = text ? text.split(/\s+/).filter(Boolean).length : 0;

  counter.textContent = `${words} word${words === 1 ? '' : 's'} • ${chars} chars`;
}

/* ============================================================
   5. AUTO-DRAFT SAVING
   ============================================================ */

let draftDebounceTimer = null;

function saveDraftDebounced() {
  clearTimeout(draftDebounceTimer);
  draftDebounceTimer = setTimeout(saveDraft, 800);
}

function saveDraft() {
  // Only save draft when not in edit mode
  if (JournalState.editingId) return;

  const surahSelect = document.getElementById('reflection-surah-select');
  const ayahInput = document.getElementById('reflection-ayah-input');
  const titleInput = document.getElementById('reflection-title-input');
  const tagInput = document.getElementById('selected-theme-tag');
  const bodyTextarea = document.getElementById('reflection-body-input');
  const draftIndicator = document.getElementById('draft-save-indicator');

  const draftData = {
    surahId: surahSelect ? surahSelect.value : '',
    ayah: ayahInput ? ayahInput.value : '',
    title: titleInput ? titleInput.value : '',
    tag: tagInput ? tagInput.value : 'Patience',
    body: bodyTextarea ? bodyTextarea.value : '',
    timestamp: Date.now()
  };

  if (!draftData.title && !draftData.body) {
    localStorage.removeItem(STORAGE_KEYS.DRAFT);
    if (draftIndicator) draftIndicator.style.display = 'none';
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify(draftData));
    if (draftIndicator) {
      draftIndicator.style.display = 'inline-block';
      draftIndicator.textContent = 'Draft auto-saved';
    }
  } catch {}
}

function restoreDraft() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DRAFT);
    if (!raw) return;
    const draft = JSON.parse(raw);

    const surahSelect = document.getElementById('reflection-surah-select');
    const ayahInput = document.getElementById('reflection-ayah-input');
    const titleInput = document.getElementById('reflection-title-input');
    const tagInput = document.getElementById('selected-theme-tag');
    const bodyTextarea = document.getElementById('reflection-body-input');
    const draftIndicator = document.getElementById('draft-save-indicator');

    if (surahSelect && draft.surahId) {
      surahSelect.value = draft.surahId;
      surahSelect.dispatchEvent(new Event('change'));
    }
    if (ayahInput && draft.ayah) ayahInput.value = draft.ayah;
    if (titleInput && draft.title) titleInput.value = draft.title;
    if (bodyTextarea && draft.body) bodyTextarea.value = draft.body;
    if (tagInput && draft.tag) {
      tagInput.value = draft.tag;
      document.querySelectorAll('#tag-selector-pills .tag-pill').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-tag') === draft.tag);
      });
    }

    updateWordCount();
    if (draftIndicator) {
      draftIndicator.style.display = 'inline-block';
      draftIndicator.textContent = 'Draft restored';
    }
  } catch {}
}

function clearDraft() {
  localStorage.removeItem(STORAGE_KEYS.DRAFT);
  const draftIndicator = document.getElementById('draft-save-indicator');
  if (draftIndicator) draftIndicator.style.display = 'none';
}

/* ============================================================
   6. FORM SUBMISSION (CREATE & EDIT)
   ============================================================ */

function initReflectionForm() {
  const form = document.getElementById('journal-reflection-form');
  const btnReset = document.getElementById('btn-reset-form');
  const btnCancelEdit = document.getElementById('btn-cancel-edit');

  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      if (confirm('Clear the reflection form? Any unsaved changes will be lost.')) {
        resetForm();
      }
    });
  }

  if (btnCancelEdit) {
    btnCancelEdit.addEventListener('click', () => {
      cancelEdit();
    });
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const surahSelect = document.getElementById('reflection-surah-select');
  const ayahInput = document.getElementById('reflection-ayah-input');
  const titleInput = document.getElementById('reflection-title-input');
  const tagInput = document.getElementById('selected-theme-tag');
  const bodyTextarea = document.getElementById('reflection-body-input');

  const surahId = parseInt(surahSelect.value, 10);
  const ayahNum = parseInt(ayahInput.value, 10);
  const title = titleInput.value.trim();
  const body = bodyTextarea.value.trim();
  const tag = tagInput.value || 'Patience';

  // Validation
  if (!surahId) {
    showInputError(surahSelect, 'Please select a Surah');
    return;
  }

  const surah = SURAHS_LIST.find(s => s.id === surahId);
  if (!surah) {
    showInputError(surahSelect, 'Invalid Surah selected');
    return;
  }

  if (!ayahNum || ayahNum < 1 || ayahNum > surah.ayahs) {
    showInputError(ayahInput, `Ayah must be between 1 and ${surah.ayahs}`);
    return;
  }

  if (!title) {
    showInputError(titleInput, 'Please provide a title for your reflection');
    return;
  }

  if (!body) {
    showInputError(bodyTextarea, 'Please write your reflection before saving');
    return;
  }

  const now = new Date().toISOString();

  if (JournalState.editingId) {
    // UPDATE existing reflection
    const index = JournalState.reflections.findIndex(r => r.id === JournalState.editingId);
    if (index !== -1) {
      JournalState.reflections[index] = {
        ...JournalState.reflections[index],
        surahNumber: surah.id,
        surahNameEn: surah.name,
        surahNameAr: surah.arabic,
        ayahNumber: ayahNum,
        title: title,
        body: body,
        tag: tag,
        updatedAt: now
      };

      saveReflectionsToStorage(JournalState.reflections);
      if (window.NoorToast) {
        window.NoorToast.show('Reflection updated successfully ✨', 'success');
      }
    }
    cancelEdit();
  } else {
    // CREATE new reflection
    const newReflection = {
      id: 'ref_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      surahNumber: surah.id,
      surahNameEn: surah.name,
      surahNameAr: surah.arabic,
      ayahNumber: ayahNum,
      title: title,
      body: body,
      tag: tag,
      createdAt: now,
      updatedAt: now
    };

    JournalState.reflections.unshift(newReflection);
    saveReflectionsToStorage(JournalState.reflections);
    clearDraft();
    resetForm();

    if (window.NoorToast) {
      window.NoorToast.show('Reflection saved to your private journal 📖', 'success');
    }
  }

  renderVault();
  updateStats();
}

function showInputError(element, message) {
  element.focus();
  element.classList.add('input-error');
  setTimeout(() => element.classList.remove('input-error'), 2500);

  if (window.NoorToast) {
    window.NoorToast.show(message, 'warning');
  } else {
    alert(message);
  }
}

function resetForm() {
  const form = document.getElementById('journal-reflection-form');
  if (form) form.reset();

  const previewChip = document.getElementById('verse-preview-chip');
  const previewQuickBtn = document.getElementById('link-preview-in-quran');
  if (previewChip) previewChip.style.display = 'none';
  if (previewQuickBtn) previewQuickBtn.style.display = 'none';

  const hiddenTag = document.getElementById('selected-theme-tag');
  if (hiddenTag) hiddenTag.value = 'Patience';

  document.querySelectorAll('#tag-selector-pills .tag-pill').forEach((p, idx) => {
    p.classList.toggle('active', idx === 0);
  });

  updateWordCount();
  clearDraft();
}

function cancelEdit() {
  JournalState.editingId = null;
  const editingIdInput = document.getElementById('editing-reflection-id');
  const editorHeading = document.getElementById('editor-heading');
  const btnSaveText = document.getElementById('btn-save-text');
  const btnCancelEdit = document.getElementById('btn-cancel-edit');

  if (editingIdInput) editingIdInput.value = '';
  if (editorHeading) editorHeading.textContent = 'Write New Reflection';
  if (btnSaveText) btnSaveText.textContent = 'Save Reflection';
  if (btnCancelEdit) btnCancelEdit.style.display = 'none';

  resetForm();
}

function loadForEdit(reflectionId) {
  const reflection = JournalState.reflections.find(r => r.id === reflectionId);
  if (!reflection) return;

  JournalState.editingId = reflection.id;

  const editingIdInput = document.getElementById('editing-reflection-id');
  const editorHeading = document.getElementById('editor-heading');
  const btnSaveText = document.getElementById('btn-save-text');
  const btnCancelEdit = document.getElementById('btn-cancel-edit');
  const surahSelect = document.getElementById('reflection-surah-select');
  const ayahInput = document.getElementById('reflection-ayah-input');
  const titleInput = document.getElementById('reflection-title-input');
  const tagInput = document.getElementById('selected-theme-tag');
  const bodyTextarea = document.getElementById('reflection-body-input');

  if (editingIdInput) editingIdInput.value = reflection.id;
  if (editorHeading) editorHeading.textContent = `Edit Reflection`;
  if (btnSaveText) btnSaveText.textContent = 'Update Reflection';
  if (btnCancelEdit) btnCancelEdit.style.display = 'inline-flex';

  if (surahSelect) {
    surahSelect.value = reflection.surahNumber;
    surahSelect.dispatchEvent(new Event('change'));
  }
  if (ayahInput) {
    ayahInput.value = reflection.ayahNumber;
  }
  if (titleInput) {
    titleInput.value = reflection.title;
  }
  if (tagInput) {
    tagInput.value = reflection.tag;
    document.querySelectorAll('#tag-selector-pills .tag-pill').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tag') === reflection.tag);
    });
  }
  if (bodyTextarea) {
    bodyTextarea.value = reflection.body;
  }

  const surah = SURAHS_LIST.find(s => s.id === reflection.surahNumber);
  if (surah) {
    updateAyahPreview(surah, reflection.ayahNumber);
  }

  updateWordCount();

  // Scroll smoothly to editor
  const editorCard = document.getElementById('journal-editor-card');
  if (editorCard) {
    editorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Close modal if open
  closeViewModal();

  if (window.NoorToast) {
    window.NoorToast.show('Loaded reflection for editing ✏️', 'info');
  }
}

/* ============================================================
   7. VAULT RENDERING, SEARCH, FILTER & SORT
   ============================================================ */

function initVaultControls() {
  // 1. Search input
  const searchInput = document.getElementById('vault-search-input');
  const searchClear = document.getElementById('vault-search-clear');
  let searchDebounce = null;

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (searchClear) searchClear.style.display = val ? 'block' : 'none';
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        JournalState.searchQuery = val.toLowerCase().trim();
        renderVault();
      }, 200);
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
      }
      searchClear.style.display = 'none';
      JournalState.searchQuery = '';
      renderVault();
    });
  }

  const btnResetSearch = document.getElementById('btn-reset-vault-search');
  if (btnResetSearch) {
    btnResetSearch.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.style.display = 'none';
      JournalState.searchQuery = '';
      JournalState.activeFilterTag = 'all';

      document.querySelectorAll('#vault-tags-filter .vault-tag-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === 'all');
      });

      renderVault();
    });
  }

  // 2. Sort dropdown
  const sortSelect = document.getElementById('vault-sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      JournalState.sortBy = e.target.value;
      renderVault();
    });
  }

  // 3. Tag Filter Pills
  const tagsFilterContainer = document.getElementById('vault-tags-filter');
  if (tagsFilterContainer) {
    tagsFilterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.vault-tag-btn');
      if (!btn) return;
      const filter = btn.getAttribute('data-filter');
      JournalState.activeFilterTag = filter;

      tagsFilterContainer.querySelectorAll('.vault-tag-btn').forEach(b => {
        b.classList.toggle('active', b === btn);
      });

      renderVault();
    });
  }

  // 4. Focus Editor button in empty state
  const btnFocusEditor = document.getElementById('btn-focus-editor');
  if (btnFocusEditor) {
    btnFocusEditor.addEventListener('click', () => {
      const editorCard = document.getElementById('journal-editor-card');
      if (editorCard) {
        editorCard.scrollIntoView({ behavior: 'smooth' });
        const select = document.getElementById('reflection-surah-select');
        if (select) select.focus();
      }
    });
  }

  // 5. Vault Card Actions Delegation (View, Edit, Delete)
  const vaultContainer = document.getElementById('reflections-list-container');
  if (vaultContainer) {
    vaultContainer.addEventListener('click', (e) => {
      // Direct Quran Link click
      if (e.target.closest('.btn-card-quran')) return;

      // Edit Button
      const editBtn = e.target.closest('.btn-card-edit');
      if (editBtn) {
        e.stopPropagation();
        const id = editBtn.getAttribute('data-id');
        loadForEdit(id);
        return;
      }

      // Delete Button
      const deleteBtn = e.target.closest('.btn-card-delete');
      if (deleteBtn) {
        e.stopPropagation();
        const id = deleteBtn.getAttribute('data-id');
        handleDeleteReflection(id);
        return;
      }

      // Card Click -> Open Detail View Modal
      const card = e.target.closest('.reflection-card');
      if (card) {
        const id = card.getAttribute('data-id');
        openViewModal(id);
      }
    });
  }

  // 6. Export Journal Button
  const btnExport = document.getElementById('btn-export-journal');
  if (btnExport) {
    btnExport.addEventListener('click', exportJournalAsText);
  }
}

function renderVault() {
  const container = document.getElementById('reflections-list-container');
  const emptyState = document.getElementById('vault-empty-state');
  const noResultsState = document.getElementById('vault-no-results-state');
  const vaultSubtitle = document.getElementById('vault-subtitle');
  if (!container) return;

  const totalCount = JournalState.reflections.length;
  if (totalCount === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    if (noResultsState) noResultsState.style.display = 'none';
    if (vaultSubtitle) vaultSubtitle.textContent = 'No reflections recorded';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  // Filter
  const q = JournalState.searchQuery;
  const tagFilter = JournalState.activeFilterTag;

  let filtered = JournalState.reflections.filter(r => {
    if (tagFilter !== 'all' && r.tag !== tagFilter) return false;
    if (q) {
      const matchTitle = r.title.toLowerCase().includes(q);
      const matchBody = r.body.toLowerCase().includes(q);
      const matchSurah = r.surahNameEn.toLowerCase().includes(q) || r.surahNameAr.includes(q);
      const matchRef = `${r.surahNumber}:${r.ayahNumber}`.includes(q);
      const matchTag = r.tag.toLowerCase().includes(q);
      return matchTitle || matchBody || matchSurah || matchRef || matchTag;
    }
    return true;
  });

  // Sort
  filtered.sort((a, b) => {
    if (JournalState.sortBy === 'newest') {
      return new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt);
    }
    if (JournalState.sortBy === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    if (JournalState.sortBy === 'surah') {
      if (a.surahNumber !== b.surahNumber) return a.surahNumber - b.surahNumber;
      return a.ayahNumber - b.ayahNumber;
    }
    return 0;
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (noResultsState) noResultsState.style.display = 'block';
    if (vaultSubtitle) vaultSubtitle.textContent = 'No matching reflections found';
    return;
  }

  if (noResultsState) noResultsState.style.display = 'none';
  if (vaultSubtitle) {
    vaultSubtitle.textContent = `Showing ${filtered.length} of ${totalCount} reflection${totalCount === 1 ? '' : 's'}`;
  }

  // Render cards
  const cardsHtml = filtered.map(r => {
    const formattedDate = formatReflectionDate(r.updatedAt || r.createdAt);
    const quranUrl = `quran.html?surah=${r.surahNumber}&ayah=${r.ayahNumber}`;

    return `
      <article class="reflection-card" data-id="${r.id}" tabindex="0" role="button" aria-label="View reflection: ${escapeHtml(r.title)}">
        <div class="card-meta-top">
          <div class="card-verse-badge">
            <span class="verse-ref-tag">Surah ${r.surahNameEn} (${r.surahNumber}:${r.ayahNumber})</span>
            <span class="verse-arabic-name">${r.surahNameAr}</span>
          </div>
          <span class="card-theme-tag tag-${r.tag.toLowerCase().replace(/\s+/g, '-')}">${r.tag}</span>
        </div>

        <h3 class="card-title">${escapeHtml(r.title)}</h3>
        <p class="card-snippet">${escapeHtml(truncateSnippet(r.body, 140))}</p>

        <div class="card-footer-row">
          <span class="card-date-text">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${formattedDate}
          </span>

          <div class="card-actions-group">
            <a href="${quranUrl}" class="btn-card-action btn-card-quran" title="Open verse in Al-Quran Reader" target="_blank" onclick="event.stopPropagation();">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              <span>Reader</span>
            </a>
            <button type="button" class="btn-card-action btn-card-edit" data-id="${r.id}" title="Edit reflection">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              <span>Edit</span>
            </button>
            <button type="button" class="btn-card-action btn-card-delete" data-id="${r.id}" title="Delete reflection">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = cardsHtml;
}

function handleDeleteReflection(id) {
  const reflection = JournalState.reflections.find(r => r.id === id);
  if (!reflection) return;

  const confirmed = confirm(`Are you sure you want to delete this reflection?\n\n"${reflection.title}"`);
  if (!confirmed) return;

  JournalState.reflections = JournalState.reflections.filter(r => r.id !== id);
  saveReflectionsToStorage(JournalState.reflections);

  if (JournalState.editingId === id) {
    cancelEdit();
  }

  closeViewModal();
  renderVault();
  updateStats();

  if (window.NoorToast) {
    window.NoorToast.show('Reflection deleted from your journal', 'info');
  }
}

/* ============================================================
   8. VIEW FULL REFLECTION MODAL
   ============================================================ */

function initViewModal() {
  const modal = document.getElementById('journal-view-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const editBtn = document.getElementById('modal-btn-edit');
  const deleteBtn = document.getElementById('modal-btn-delete');

  if (closeBtn) closeBtn.addEventListener('click', closeViewModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeViewModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const m = document.getElementById('journal-view-modal');
      if (m && m.classList.contains('active')) closeViewModal();
    }
  });

  if (editBtn) {
    editBtn.addEventListener('click', () => {
      if (JournalState.activeViewId) {
        loadForEdit(JournalState.activeViewId);
      }
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      if (JournalState.activeViewId) {
        handleDeleteReflection(JournalState.activeViewId);
      }
    });
  }
}

function openViewModal(id) {
  const reflection = JournalState.reflections.find(r => r.id === id);
  if (!reflection) return;

  JournalState.activeViewId = id;

  const modal = document.getElementById('journal-view-modal');
  const ayahBadge = document.getElementById('modal-ref-ayah-badge');
  const tagBadge = document.getElementById('modal-ref-tag-badge');
  const titleEl = document.getElementById('modal-ref-title');
  const dateEl = document.getElementById('modal-ref-date');
  const contentEl = document.getElementById('modal-ref-content');
  const linkQuran = document.getElementById('modal-link-quran');

  if (ayahBadge) {
    ayahBadge.textContent = `Surah ${reflection.surahNameEn} (${reflection.surahNumber}:${reflection.ayahNumber}) • ${reflection.surahNameAr}`;
  }
  if (tagBadge) {
    tagBadge.textContent = reflection.tag;
    tagBadge.className = `modal-tag-badge tag-${reflection.tag.toLowerCase().replace(/\s+/g, '-')}`;
  }
  if (titleEl) titleEl.textContent = reflection.title;
  if (dateEl) {
    const formatted = formatReflectionDate(reflection.updatedAt || reflection.createdAt);
    dateEl.textContent = `Saved on ${formatted}`;
  }
  if (contentEl) {
    // Render formatted paragraphs
    const paragraphs = escapeHtml(reflection.body)
      .split('\n\n')
      .map(p => p.trim())
      .filter(Boolean)
      .map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`)
      .join('');
    contentEl.innerHTML = paragraphs;
  }
  if (linkQuran) {
    linkQuran.href = `quran.html?surah=${reflection.surahNumber}&ayah=${reflection.ayahNumber}`;
  }

  if (modal) {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }
}

function closeViewModal() {
  const modal = document.getElementById('journal-view-modal');
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  JournalState.activeViewId = null;
}

/* ============================================================
   9. STATS & EXPORT UTILITIES
   ============================================================ */

function updateStats() {
  const list = JournalState.reflections;
  const totalEl = document.getElementById('journal-stat-total');
  const surahsEl = document.getElementById('journal-stat-surahs');
  const wordsEl = document.getElementById('journal-stat-words');

  const total = list.length;
  const uniqueSurahs = new Set(list.map(r => r.surahNumber)).size;
  const totalWords = list.reduce((acc, r) => {
    const words = r.body ? r.body.trim().split(/\s+/).filter(Boolean).length : 0;
    return acc + words;
  }, 0);

  if (totalEl) totalEl.textContent = total;
  if (surahsEl) surahsEl.textContent = uniqueSurahs;
  if (wordsEl) wordsEl.textContent = totalWords.toLocaleString();
}

function exportJournalAsText() {
  const list = JournalState.reflections;
  if (list.length === 0) {
    if (window.NoorToast) {
      window.NoorToast.show('No reflections to export yet', 'warning');
    } else {
      alert('Your journal is currently empty.');
    }
    return;
  }

  let text = `====================================================================\n`;
  text += `NOOR (نور) — MY QURAN REFLECTION JOURNAL (مذكرتي)\n`;
  text += `Exported on: ${new Date().toLocaleString()}\n`;
  text += `Total Reflections: ${list.length}\n`;
  text += `====================================================================\n\n`;

  list.forEach((r, idx) => {
    text += `--------------------------------------------------------------------\n`;
    text += `ENTRY #${idx + 1}: ${r.title.toUpperCase()}\n`;
    text += `Surah: ${r.surahNameEn} (${r.surahNumber}:${r.ayahNumber}) • ${r.surahNameAr}\n`;
    text += `Theme / Tag: ${r.tag}\n`;
    text += `Date: ${formatReflectionDate(r.createdAt)}\n`;
    text += `--------------------------------------------------------------------\n\n`;
    text += `${r.body}\n\n\n`;
  });

  text += `====================================================================\n`;
  text += `Generated with Noor | نور — https://noor.islamic\n`;
  text += `====================================================================\n`;

  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `noor-quran-reflections-${new Date().toISOString().split('T')[0]}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  if (window.NoorToast) {
    window.NoorToast.show('Reflections exported to text file 📥', 'success');
  }
}

/* ============================================================
   10. URL QUERY PRE-FILL (LINK FROM QURAN READER / TOPICS)
   ============================================================ */

function checkUrlPreFill() {
  const params = new URLSearchParams(window.location.search);
  const surahParam = parseInt(params.get('surah'), 10);
  const ayahParam = parseInt(params.get('ayah'), 10);
  const titleParam = params.get('title');

  if (surahParam && surahParam >= 1 && surahParam <= 114) {
    const surahSelect = document.getElementById('reflection-surah-select');
    const ayahInput = document.getElementById('reflection-ayah-input');
    const titleInput = document.getElementById('reflection-title-input');

    if (surahSelect) {
      surahSelect.value = surahParam;
      surahSelect.dispatchEvent(new Event('change'));
    }

    if (ayahInput && ayahParam) {
      ayahInput.value = ayahParam;
      const surah = SURAHS_LIST.find(s => s.id === surahParam);
      if (surah) updateAyahPreview(surah, ayahParam);
    }

    if (titleInput && titleParam) {
      titleInput.value = decodeURIComponent(titleParam);
    }

    // Scroll to editor
    const editorCard = document.getElementById('journal-editor-card');
    if (editorCard) {
      setTimeout(() => {
        editorCard.scrollIntoView({ behavior: 'smooth' });
        const bodyTextarea = document.getElementById('reflection-body-input');
        if (bodyTextarea) bodyTextarea.focus();
      }, 250);
    }
  }
}

/* ============================================================
   11. HELPER UTILITIES
   ============================================================ */

function truncateSnippet(text, maxLength) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '…';
}

function formatReflectionDate(isoString) {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
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
   12. INITIALIZATION
   ============================================================ */

function initJournalPage() {
  console.info('[Noor] Initialising Quran Reflection Journal module...');

  // 1. Load data
  JournalState.reflections = loadReflectionsFromStorage();

  // 2. Setup components
  initSurahDropdown();
  initTagAndPromptControls();
  initReflectionForm();
  initVaultControls();
  initViewModal();

  // 3. Render initial views
  renderVault();
  updateStats();
  restoreDraft();

  // 4. Check for URL pre-fill from reader or topic explorer
  checkUrlPreFill();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initJournalPage);
} else {
  initJournalPage();
}
