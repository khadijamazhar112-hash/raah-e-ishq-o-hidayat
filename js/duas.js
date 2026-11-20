/**
 * @fileoverview Noor (نور) — Daily Duas Module
 * Features:
 *  - 12 Complete authentic Dua categories from Hisn al-Muslim & Sahih Hadith
 *  - Arabic text, Urdu translation, English transliteration, and Hadith sources
 *  - One-click copy for Arabic text or Urdu translation
 *  - Native Web Share API integration
 *  - Pronunciation audio / audio guide
 *  - Bookmark / Favourite system stored in localStorage
 *  - Real-time search and 12 category filtering
 *  - Font sizing controls and responsive cards
 *
 * Attribution:
 *  - Sahih al-Bukhari, Sahih Muslim, Sunan Abi Dawud, Jami` at-Tirmidhi,
 *    Sunan an-Nasa'i, Sunan Ibn Majah, Hisn al-Muslim.
 */

'use strict';

/* ============================================================
   1. VERIFIED DUA DATABASE (12 Core Categories)
   ============================================================ */

const DUAS_DATABASE = [
  // ── 1. MORNING AND EVENING DUAS (أدعية الصباح والمساء) ─────────
  {
    id: 'dua-1',
    category: 'morning-evening',
    categoryName: 'Morning & Evening',
    categoryArabic: 'أدعية الصباح والمساء',
    title: 'Affirmation of Morning & Life',
    arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ النُّشُورُ',
    transliteration: "Allahumma bika asbahna, wa bika amsayna, wa bika nahya, wa bika namutu, wa ilaykan-nushur.",
    urdu: 'اے اللہ! تیری ہی توفیق سے ہم نے صبح کی اور تیرے ہی حکم سے ہم نے شام کی، اور تیرے ہی نام پر ہم جیتے ہیں اور تیرے ہی حکم سے ہم مرتے ہیں اور تیری ہی طرف دوبارہ جی اٹھنا ہے۔',
    reference: 'جامع الترمذی: 3391، سنن ابی داود: 5068 (صحیح)',
    occasion: 'Recited every morning upon starting the day'
  },
  {
    id: 'dua-2',
    category: 'morning-evening',
    categoryName: 'Morning & Evening',
    categoryArabic: 'أدعية الصباح والمساء',
    title: 'Affirmation of Evening & Destiny',
    arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا، وَبِكَ أَصْبَحْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ، وَإِلَيْكَ الْمَصِيرُ',
    transliteration: "Allahumma bika amsayna, wa bika asbahna, wa bika nahya, wa bika namutu, wa ilaykal-masir.",
    urdu: 'اے اللہ! تیرے ہی حکم سے ہم نے شام کی اور تیری ہی توفیق سے صبح کی، تیرے ہی نام پر ہم جیتے ہیں اور تیرے ہی حکم سے مرتے ہیں اور تیری ہی طرف پلٹنا ہے۔',
    reference: 'جامع الترمذی: 3391 (صحیح)',
    occasion: 'Recited every evening at dusk'
  },

  // ── 2. BEFORE SLEEPING (دعاء قبل النوم) ──────────────────────
  {
    id: 'dua-3',
    category: 'sleep',
    categoryName: 'Before Sleeping',
    categoryArabic: 'دعاء قبل النوم',
    title: 'Surrendering Life to Allah at Bedtime',
    arabic: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
    transliteration: "Allahumma bismika amutu wa ahya.",
    urdu: 'اے اللہ! میں تیرے ہی نام کے ساتھ مرتا (سوتا) ہوں اور جیتا (جاگتا) ہوں۔',
    reference: 'صحیح البخاری: 6312، صحیح مسلم: 2711',
    occasion: 'Recited when lying down to sleep'
  },
  {
    id: 'dua-4',
    category: 'sleep',
    categoryName: 'Before Sleeping',
    categoryArabic: 'دعاء قبل النوم',
    title: 'Entrusting the Soul (Bismika Rabbi)',
    arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
    transliteration: "Bismika Rabbi wada'tu janbi, wa bika arfa'uh, fa-in amsakta nafsi farhamha, wa in arsaltaha fahfazha bima tahfazu bihi 'ibadakas-salihin.",
    urdu: 'اے میرے رب! تیرے ہی نام سے میں نے اپنا پہلو رکھا اور تیرے ہی نام سے میں اسے اٹھاؤں گا۔ پس اگر تو میری جان کو روک لے تو اس پر رحم فرما، اور اگر تو اسے واپس بھیج دے تو اس کی اسی طرح حفاظت فرما جس طرح تو اپنے نیک بندوں کی حفاظت فرماتا ہے۔',
    reference: 'صحیح البخاری: 6320، صحیح مسلم: 2714',
    occasion: 'Sunnah supplication when lying on the right side'
  },

  // ── 3. AFTER WAKING UP (دعاء الاستيقاظ) ──────────────────────
  {
    id: 'dua-5',
    category: 'wake-up',
    categoryName: 'After Waking Up',
    categoryArabic: 'دعاء الاستيقاظ',
    title: 'Praise for Restoration of Life',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    transliteration: "Alhamdu lillahilladhi ahyana ba'da ma amatana wa ilayhin-nushur.",
    urdu: 'سب تعریفیں اللہ ہی کے لیے ہیں جس نے ہمیں مارنے (سلانے) کے بعد زندہ کیا (بیدار فرمایا) اور اسی کی طرف سب کو دوبارہ جی کر جانا ہے۔',
    reference: 'صحیح البخاری: 6312، صحیح مسلم: 2711',
    occasion: 'The very first words upon waking from sleep'
  },

  // ── 4. BEFORE EATING (دعاء قبل الطعام) ────────────────────────
  {
    id: 'dua-6',
    category: 'before-eating',
    categoryName: 'Before Eating',
    categoryArabic: 'دعاء قبل الطعام',
    title: 'Mentioning Allah\'s Name Before Meals',
    arabic: 'بِسْمِ اللَّهِ (فَإِنْ نَسِيَ فِي أَوَّلِهِ فَلْيَقُلْ: بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ)',
    transliteration: "Bismillah (If forgotten at start: Bismillahi awwalahu wa akhirahu).",
    urdu: 'اللہ کے نام کے ساتھ شروع کرتا ہوں (اور اگر شروع میں بھول جائے تو یاد آنے پر کہے: اللہ کے نام کے ساتھ اس کے اول اور آخر میں)۔',
    reference: 'سنن ابی داود: 3767، جامع الترمذی: 1858 (صحیح)',
    occasion: 'Recited before eating or drinking'
  },

  // ── 5. AFTER EATING (دعاء بعد الفراغ من الطعام) ──────────────
  {
    id: 'dua-7',
    category: 'after-eating',
    categoryName: 'After Eating',
    categoryArabic: 'دعاء بعد الطعام',
    title: 'Gratitude for Nourishment & Sustenance',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَٰذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    transliteration: "Alhamdu lillahilladhi at'amani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah.",
    urdu: 'تمام تعریفیں اس اللہ کے لیے ہیں جس نے مجھے یہ کھانا کھلایا اور میری کسی تدبیر اور طاقت کے بغیر مجھے یہ رزق عطا فرمایا۔',
    reference: 'سنن ابی داود: 4023، جامع الترمذی: 3458 (حسن صحیح)',
    occasion: 'Whosoever says this after meals, their past minor sins are forgiven'
  },

  // ── 6. LEAVING HOME (دعاء الخروج من المنزل) ─────────────────
  {
    id: 'dua-8',
    category: 'leaving-home',
    categoryName: 'Leaving Home',
    categoryArabic: 'دعاء الخروج من المنزل',
    title: 'Total Reliance Upon Allah',
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    transliteration: "Bismillahi tawakkaltu 'alallah, la hawla wa la quwwata illa billah.",
    urdu: 'اللہ کے نام کے ساتھ، میں نے اللہ ہی پر بھروسا کیا، برائی سے بچنے کی کوئی طاقت ہے نہ نیکی کرنے کی کوئی قوت مگر اللہ کی توفیق سے۔',
    reference: 'سنن ابی داود: 5095، جامع الترمذی: 3426 (صحیح)',
    occasion: 'When stepping out of the house; angels respond: "You are guided, defended and protected"'
  },

  // ── 7. ENTERING HOME (دعاء دخول المنزل) ──────────────────────
  {
    id: 'dua-9',
    category: 'entering-home',
    categoryName: 'Entering Home',
    categoryArabic: 'دعاء دخول المنزل',
    title: 'Entering With Peace & Remembrances',
    arabic: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى اللَّهِ رَبِّنَا تَوَكَّلْنَا (ثُمَّ يُسَلِّمُ عَلَى أَهْلِهِ)',
    transliteration: "Bismillahi walajna, wa bismillahi kharajna, wa 'alallahi Rabbina tawakkalna.",
    urdu: 'اللہ کے نام کے ساتھ ہم داخل ہوئے اور اللہ ہی کے نام سے ہم نکلے، اور اپنے رب اللہ ہی پر ہم نے بھروسا کیا۔ (پھر اپنے اہل خانہ کو سلام کرے)۔',
    reference: 'سنن ابی داود: 5096، حصن المسلم',
    occasion: 'When stepping into the house'
  },

  // ── 8. TRAVELLING (دعاء السفر) ──────────────────────────────
  {
    id: 'dua-10',
    category: 'travelling',
    categoryName: 'Travelling',
    categoryArabic: 'دعاء السفر',
    title: 'Supplication for Journeys & Transport',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ، اللَّهُمَّ إِنَّا نَسْأَلُكَ فِي سَفَرِنَا هَٰذَا الْبِرَّ وَالتَّقْوَىٰ، وَمِنَ الْعَمَلِ مَا تَرْضَىٰ',
    transliteration: "Subhanalladhi sakh-khara lana hadha wa ma kunna lahu muqrinin, wa inna ila Rabbina lamunqalibun. Allahumma inna nas'aluka fi safarina hadhal-birra wat-taqwa, wa minal-'amali ma tarda.",
    urdu: 'پاک ہے وہ ذات جس نے اس (سواری) کو ہمارے تابع کر دیا حالانکہ ہم اسے قابو کرنے والے نہ تھے، اور یقیناً ہم اپنے رب ہی کی طرف لوٹ کر جانے والے ہیں۔ اے اللہ! ہم اپنے اس سفر میں تجھ سے نیکی اور پرہیزگاری اور ایسے عمل کا سوال کرتے ہیں جس سے تو راضی ہو۔',
    reference: 'صحیح مسلم: 1342',
    occasion: 'Recited upon boarding any vehicle, car, plane, or beginning a journey'
  },

  // ── 9. ENTERING THE MOSQUE (دعاء دخول المسجد) ───────────────
  {
    id: 'dua-11',
    category: 'entering-mosque',
    categoryName: 'Entering Mosque',
    categoryArabic: 'دعاء دخول المسجد',
    title: 'Seeking the Gates of Divine Mercy',
    arabic: 'بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ',
    transliteration: "Bismillah, was-salatu was-salamu 'ala Rasulillah, Allahummaftah li abwaba rahmatik.",
    urdu: 'اللہ کے نام کے ساتھ، اور رسول اللہ ﷺ پر درود و سلام ہو، اے اللہ! میرے لیے اپنی رحمت کے دروازے کھول دے۔',
    reference: 'صحیح مسلم: 713، سنن ابی داود: 465',
    occasion: 'Recited when stepping with the right foot into the Masjid'
  },

  // ── 10. LEAVING THE MOSQUE (دعاء الخروج من المسجد) ───────────
  {
    id: 'dua-12',
    category: 'leaving-mosque',
    categoryName: 'Leaving Mosque',
    categoryArabic: 'دعاء الخروج من المسجد',
    title: 'Seeking the Gates of Divine Bounty',
    arabic: 'بِسْمِ اللَّهِ، وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ',
    transliteration: "Bismillah, was-salatu was-salamu 'ala Rasulillah, Allahumma inni as'aluka min fadlik.",
    urdu: 'اللہ کے نام کے ساتھ، اور رسول اللہ ﷺ پر درود و سلام ہو، اے اللہ! میں تجھ سے تیرے فضل و کرم کا سوال کرتا ہوں۔',
    reference: 'صحیح مسلم: 713',
    occasion: 'Recited when stepping with the left foot out of the Masjid'
  },

  // ── 11. BEFORE AND AFTER WUDU (دعاء الوضوء) ─────────────────
  {
    id: 'dua-13',
    category: 'wudu',
    categoryName: 'Before & After Wudu',
    categoryArabic: 'دعاء الوضوء',
    title: 'Declaration of Tawheed & Purity (Post-Wudu)',
    arabic: 'أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ، اللَّهُمَّ اجْعَلْنِي مِنَ التَّوَّابِينَ، وَاجْعَلْنِي مِنَ الْمُتَطَهِّرِينَ',
    transliteration: "Ash-hadu alla ilaha illallahu wahdahu la sharika lah, wa ash-hadu anna Muhammadan 'abduhu wa rasuluh. Allahummaj'alni minat-tawwabina waj'alni minal-mutatahhirin.",
    urdu: 'میں گواہی دیتا ہوں کہ اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے اس کا کوئی شریک نہیں، اور میں گواہی دیتا ہوں کہ محمد ﷺ اس کے بندے اور رسول ہیں۔ اے اللہ! مجھے خوب توبہ کرنے والوں اور خوب پاکیزگی اختیار کرنے والوں میں بنا دے۔',
    reference: 'صحیح مسلم: 234، جامع الترمذی: 55 (صحیح)',
    occasion: 'Recited after completing ablution; all 8 gates of Paradise are opened for the reciter'
  },

  // ── 12. GENERAL MASNOON DUAS (أدعية نبوية مأثورة عامة) ─────
  {
    id: 'dua-14',
    category: 'general',
    categoryName: 'General Masnoon',
    categoryArabic: 'أدعية عامة مأثورة',
    title: 'The Most Frequent Prayer (Good in Both Worlds)',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    transliteration: "Rabbana atina fid-dunya hasanatan wa fil-akhirati hasanatan waqina 'adhaban-nar.",
    urdu: 'اے ہمارے رب! ہمیں دنیا میں بھی بھلائی عطا فرما اور آخرت میں بھی بھلائی اور ہمیں آگ کے عذاب سے بچا۔',
    reference: 'سورۃ البقرۃ: 201، صحیح البخاری: 4522',
    occasion: 'The most frequent supplication of Prophet Muhammad (ﷺ)'
  },
  {
    id: 'dua-15',
    category: 'general',
    categoryName: 'General Masnoon',
    categoryArabic: 'أدعية عامة مأثورة',
    title: 'Relief from Anxiety, Debt & Depression',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ، وَضَلَعِ الدَّيْنِ وَغَلَبَةِ الرِّجَالِ',
    transliteration: "Allahumma inni a'udhu bika minal-hammi wal-hazan, wal-'ajzi wal-kasal, wal-bukhli wal-jubn, wa dala'id-dayni wa ghalabatir-rijal.",
    urdu: 'اے اللہ! میں تیری پناہ مانگتا ہوں فکر و غم سے، عاجزی اور سستی سے، بخل اور بزدلی سے، اور قرض کے بوجھ اور لوگوں کے دباؤ و غلبے سے۔',
    reference: 'صحیح البخاری: 2893',
    occasion: 'Daily prayer for mental clarity, freedom from distress and financial ease'
  },
  {
    id: 'dua-16',
    category: 'general',
    categoryName: 'General Masnoon',
    categoryArabic: 'أدعية عامة مأثورة',
    title: 'Supplication of Prophet Yunus in Distress',
    arabic: 'لَّا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',
    transliteration: "La ilaha illa Anta subhanaka inni kuntu minaz-zalimin.",
    urdu: 'تیرے سوا کوئی معبود نہیں، تو پاک ہے، بے شک میں ہی قصورواروں میں سے تھا۔',
    reference: 'سورۃ الانبیاء: 87، جامع الترمذی: 3505 (صحیح)',
    occasion: 'No Muslim supplicates with this in any distress except that Allah responds to him'
  },
  {
    id: 'dua-17',
    category: 'general',
    categoryName: 'General Masnoon',
    categoryArabic: 'أدعية عامة مأثورة',
    title: 'Seeking Beneficial Knowledge & Pure Provision',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا',
    transliteration: "Allahumma inni as'aluka 'ilman nafi'an, wa rizqan tayyiban, wa 'amalan mutaqabbala.",
    urdu: 'اے اللہ! میں تجھ سے نفع بخش علم، حلال و پاکیزہ رزق اور قبول ہونے والے عمل کا سوال کرتا ہوں۔',
    reference: 'سنن ابن ماجہ: 925 (صحیح)',
    occasion: 'Recited after Fajr prayer every day'
  }
];

/* ============================================================
   2. STORAGE & STATE MANAGEMENT
   ============================================================ */

const DUAS_FAV_KEY = 'noor-duas-favourites';

const NoorDuasState = {
  currentCategory: 'all',
  searchQuery: '',
  arabicFontSize: 28, // px
  urduFontSize: 18,   // px
  favourites: []
};

function loadDuasFavourites() {
  try {
    const saved = localStorage.getItem(DUAS_FAV_KEY);
    if (saved) NoorDuasState.favourites = JSON.parse(saved);
  } catch (e) {
    console.warn('[Noor] Favourites storage error', e);
  }
}

function saveDuasFavourites() {
  try {
    localStorage.setItem(DUAS_FAV_KEY, JSON.stringify(NoorDuasState.favourites));
  } catch (e) {}
}

function toggleDuaFavourite(duaId) {
  const idx = NoorDuasState.favourites.indexOf(duaId);
  let isFav = false;

  if (idx >= 0) {
    NoorDuasState.favourites.splice(idx, 1);
    isFav = false;
  } else {
    NoorDuasState.favourites.push(duaId);
    isFav = true;
  }

  saveDuasFavourites();
  updateDuaCardFavouriteUI(duaId, isFav);

  window.NoorToast?.show(
    isFav ? 'Added to Favourite Duas ⭐' : 'Removed from Favourite Duas',
    'info'
  );

  if (NoorDuasState.currentCategory === 'favourites') {
    renderDuasList();
  }
}

function updateDuaCardFavouriteUI(duaId, isFav) {
  const card = document.getElementById(`dua-card-${duaId}`);
  if (!card) return;

  const btn = card.querySelector('.btn-dua-fav');
  if (btn) {
    btn.classList.toggle('active', isFav);
    const svg = btn.querySelector('svg');
    if (svg) svg.setAttribute('fill', isFav ? '#C9A84C' : 'none');
  }
}

/* ============================================================
   3. RENDERING & FILTERING
   ============================================================ */

function getFilteredDuas() {
  return DUAS_DATABASE.filter(dua => {
    // Category filter
    if (NoorDuasState.currentCategory === 'favourites') {
      if (!NoorDuasState.favourites.includes(dua.id)) return false;
    } else if (NoorDuasState.currentCategory !== 'all') {
      if (dua.category !== NoorDuasState.currentCategory) return false;
    }

    // Search query filter
    if (NoorDuasState.searchQuery) {
      const q = NoorDuasState.searchQuery.toLowerCase();
      const match = dua.title.toLowerCase().includes(q) ||
        dua.arabic.includes(q) ||
        dua.urdu.includes(q) ||
        dua.transliteration.toLowerCase().includes(q) ||
        dua.reference.toLowerCase().includes(q) ||
        dua.categoryName.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });
}

function renderDuasList() {
  const container = document.getElementById('duas-cards-container');
  if (!container) return;

  const list = getFilteredDuas();

  if (list.length === 0) {
    container.innerHTML = `
      <div class="duas-empty-state">
        <div class="empty-icon">🤲</div>
        <h3>No Supplications Found</h3>
        <p>No Duas match the selected category or search keyword.</p>
        <button class="btn btn-primary btn-sm" onclick="clearDuasFilters()">Show All Duas</button>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(dua => {
    const isFav = NoorDuasState.favourites.includes(dua.id);

    return `
      <article class="dua-card" id="dua-card-${dua.id}" data-id="${dua.id}">
        <!-- Card Top Bar -->
        <div class="dua-card-top-bar">
          <span class="dua-category-badge">
            ${dua.categoryArabic} · ${dua.categoryName}
          </span>

          <div class="dua-top-actions">
            <!-- Share button -->
            <button class="dua-icon-btn btn-dua-share" data-id="${dua.id}" title="Share this Dua" aria-label="Share Dua">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>

            <!-- Favourite button -->
            <button class="dua-icon-btn btn-dua-fav ${isFav ? 'active' : ''}" data-id="${dua.id}" title="${isFav ? 'Remove from Favourites' : 'Add to Favourites'}" aria-label="Toggle favourite">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? '#C9A84C' : 'none'}" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Dua Title -->
        <h3 class="dua-title">${dua.title}</h3>

        <!-- Arabic Text -->
        <div class="dua-arabic-text" lang="ar" dir="rtl" style="font-size: ${NoorDuasState.arabicFontSize}px;">
          ${dua.arabic}
        </div>

        <!-- Transliteration -->
        <div class="dua-transliteration-text">
          <em>${dua.transliteration}</em>
        </div>

        <!-- Urdu Translation -->
        <div class="dua-urdu-text" lang="ur" dir="rtl" style="font-size: ${NoorDuasState.urduFontSize}px;">
          ${dua.urdu}
        </div>

        <!-- Reference & Occasion Note -->
        <div class="dua-reference-box">
          <div class="dua-ref-source">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            <span><strong>مصدر / Source:</strong> ${dua.reference}</span>
          </div>
          ${dua.occasion ? `<div class="dua-occasion-text"><strong>مناسبت / Occasion:</strong> ${dua.occasion}</div>` : ''}
        </div>

        <!-- Action Buttons Bar -->
        <div class="dua-action-bar">
          <button class="btn-copy-chip btn-copy-arabic" data-id="${dua.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            <span>Copy Arabic</span>
          </button>

          <button class="btn-copy-chip btn-copy-urdu" data-id="${dua.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            <span>Copy Urdu</span>
          </button>

          <button class="btn-copy-chip btn-audio-play" data-id="${dua.id}">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            <span>Pronunciation</span>
          </button>
        </div>
      </article>
    `;
  }).join('');

  bindDuaCardActions();
}

/* ============================================================
   4. COPY, SHARE & AUDIO INTERACTIONS
   ============================================================ */

function bindDuaCardActions() {
  const container = document.getElementById('duas-cards-container');
  if (!container) return;

  // 1. Copy Arabic text
  container.querySelectorAll('.btn-copy-arabic').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = DUAS_DATABASE.find(d => d.id === id);
      if (item && navigator.clipboard) {
        navigator.clipboard.writeText(item.arabic).then(() => {
          window.NoorToast?.show('Arabic text copied! 📋', 'success');
        });
      }
    });
  });

  // 2. Copy Urdu translation
  container.querySelectorAll('.btn-copy-urdu').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = DUAS_DATABASE.find(d => d.id === id);
      if (item && navigator.clipboard) {
        navigator.clipboard.writeText(item.urdu).then(() => {
          window.NoorToast?.show('Urdu translation copied! 📋', 'success');
        });
      }
    });
  });

  // 3. Share Dua via Web Share API
  container.querySelectorAll('.btn-dua-share').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = DUAS_DATABASE.find(d => d.id === id);
      if (!item) return;

      const shareText = `${item.title}\n\n${item.arabic}\n\n"${item.urdu}"\n\n— Reference: ${item.reference}\nShared via Noor (نور)`;

      if (navigator.share) {
        navigator.share({
          title: `${item.title} — Noor (نور)`,
          text: shareText,
          url: window.location.href
        }).catch(() => {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
          window.NoorToast?.show('Dua text copied to clipboard for sharing! 📋', 'success');
        });
      }
    });
  });

  // 4. Favourite Button
  container.querySelectorAll('.btn-dua-fav').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      toggleDuaFavourite(id);
    });
  });

  // 5. Audio / Pronunciation Guide
  container.querySelectorAll('.btn-audio-play').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const item = DUAS_DATABASE.find(d => d.id === id);
      if (!item) return;

      // Use Web Speech synthesis Arabic voice if available
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(item.arabic);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.85;

        btn.classList.add('playing');
        utterance.onend = () => btn.classList.remove('playing');
        utterance.onerror = () => btn.classList.remove('playing');

        window.speechSynthesis.speak(utterance);
        window.NoorToast?.show(`Playing Arabic pronunciation 🎧`, 'info', 2000);
      } else {
        window.NoorToast?.show('Audio speech playback not supported in this browser.', 'info');
      }
    });
  });
}

/* ============================================================
   5. FILTERS & CONTROLS
   ============================================================ */

function initDuasFiltersAndControls() {
  // Category Pill Filters
  document.querySelectorAll('.dua-filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.dua-filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      NoorDuasState.currentCategory = pill.getAttribute('data-cat');
      renderDuasList();
    });
  });

  // Search Input
  const searchInput = document.getElementById('duas-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      NoorDuasState.searchQuery = e.target.value.trim();
      renderDuasList();
    });
  }

  // Font Size Adjusters
  document.getElementById('btn-dua-size-plus')?.addEventListener('click', () => {
    if (NoorDuasState.arabicFontSize < 44) {
      NoorDuasState.arabicFontSize += 2;
      document.querySelectorAll('.dua-arabic-text').forEach(el => el.style.fontSize = `${NoorDuasState.arabicFontSize}px`);
    }
  });

  document.getElementById('btn-dua-size-minus')?.addEventListener('click', () => {
    if (NoorDuasState.arabicFontSize > 22) {
      NoorDuasState.arabicFontSize -= 2;
      document.querySelectorAll('.dua-arabic-text').forEach(el => el.style.fontSize = `${NoorDuasState.arabicFontSize}px`);
    }
  });
}

function clearDuasFilters() {
  NoorDuasState.currentCategory = 'all';
  NoorDuasState.searchQuery = '';

  const input = document.getElementById('duas-search-input');
  if (input) input.value = '';

  document.querySelectorAll('.dua-filter-pill').forEach(p => {
    p.classList.toggle('active', p.getAttribute('data-cat') === 'all');
  });

  renderDuasList();
}

/* ============================================================
   6. MODULE INITIALIZATION
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  loadDuasFavourites();

  // Check URL category parameter if navigated from home
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('category');
  if (cat) {
    NoorDuasState.currentCategory = cat;
    document.querySelectorAll('.dua-filter-pill').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-cat') === cat);
    });
  }

  initDuasFiltersAndControls();
  renderDuasList();

  console.info('[Noor] Duas module fully initialized ✓');
});
