/**
 * @fileoverview Noor (نور) — Daily Azkar Module
 * Features:
 *  - Verified authentic Azkar catalog from Hisn al-Muslim & Sahih Hadith
 *  - 5 Categories: Morning, Evening, After Salah, Before Sleep, General
 *  - Interactive persistent counter with target repetitions, reset & completion badges
 *  - Daily progress indicator (completed vs total)
 *  - Category filtering & instant search
 *  - Bookmarks / Favourites filter
 *  - Clean reading mode toggle & typography sizing
 *  - Mobile-friendly touch targets with haptic feedback
 *  - LocalStorage guest persistence
 *
 * Attribution:
 *  - Source: Hisn al-Muslim (حصن المسلم), Sahih al-Bukhari, Sahih Muslim,
 *            Sunan Abi Dawud, Jami` at-Tirmidhi, Sunan an-Nasa'i.
 */

'use strict';

/* ============================================================
   1. VERIFIED AZKAR CATALOG
   ============================================================ */

const AZKAR_DATABASE = [
  // ── MORNING AZKAR (أذكار الصباح) ─────────────────────────────
  {
    id: 'm-1',
    category: 'morning',
    categoryName: 'Morning Azkar',
    categoryArabic: 'أذكار الصباح',
    title: 'Sayyid al-Istighfar (The Master Supplication)',
    arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ لَكَ بِذَنْبِي فَاغْفِرْ لِي فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    urdu: 'اے اللہ! تو ہی میرا رب ہے، تیرے سوا کوئی معبود نہیں، تو نے مجھے پیدا کیا اور میں تیرا بندہ ہوں، اور میں اپنی طاقت کے مطابق تیرے عہد اور وعدے پر قائم ہوں۔ میں اپنے کیے کے شر سے تیری پناہ مانگتا ہوں۔ میں اپنے اوپر تیری نعمت کا اعتراف کرتا ہوں اور اپنے گناہ کا اقرار کرتا ہوں، پس مجھے معاف فرما دے کیونکہ تیرے سوا کوئی گناہوں کو معاف نہیں کر سکتا۔',
    reference: 'صحیح البخاری: 6306',
    merit: 'جس نے صبح کے وقت یقین کے ساتھ یہ دعا پڑھی اور شام سے پہلے وفات پا گیا وہ اہل جنت میں سے ہے۔',
    targetCount: 1
  },
  {
    id: 'm-2',
    category: 'morning',
    categoryName: 'Morning Azkar',
    categoryArabic: 'أذكار الصباح',
    title: 'Protection Against All Harm',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    urdu: 'اللہ کے نام کے ساتھ جس کے نام کی برکت سے زمین اور آسمان میں کوئی چیز نقصان نہیں پہنچا سکتی، اور وہی سب کچھ سننے والا، خوب جاننے والا ہے۔',
    reference: 'سنن ابی داود: 5088، جامع الترمذی: 3388 (صحیح)',
    merit: 'جو شخص صبح اور شام تین بار یہ پڑھے اسے کوئی ناگہانی مصیبت یا نقصان نہیں پہنچ سکتا۔',
    targetCount: 3
  },
  {
    id: 'm-3',
    category: 'morning',
    categoryName: 'Morning Azkar',
    categoryArabic: 'أذكار الصباح',
    title: 'Contentment with Allah, Islam & the Prophet',
    arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا',
    urdu: 'میں اللہ کے رب ہونے، اسلام کے دین ہونے اور محمد صلی اللہ علیہ وسلم کے نبی ہونے پر راضی اور خوش ہوں۔',
    reference: 'سنن ابی داود: 5072، جامع الترمذی: 3389 (حسن صحیح)',
    merit: 'جو صبح کے وقت یہ کہے، اللہ تعالیٰ پر حق ہے کہ قیامت کے دن اسے راضی و خوش فرمائے۔',
    targetCount: 3
  },
  {
    id: 'm-4',
    category: 'morning',
    categoryName: 'Morning Azkar',
    categoryArabic: 'أذكار الصباح',
    title: 'Supplication for All Affairs (Ya Hayyu Ya Qayyum)',
    arabic: 'يَا حَيُّ يَا قَيُّومُ بِرَحْمَتِكَ أَسْتَغِيثُ، أَصْلِحْ لِي شَأْنِي كُلَّهُ، وَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ',
    urdu: 'اے زندہ اور قائم رہنے والے! میں تیری رحمت کے وسیلے سے فریاد کرتا ہوں، تو میرے تمام معاملات سنوار دے اور مجھے آنکھ جھپکنے کی دیر کے لیے بھی میرے نفس کے حوالے نہ فرما۔',
    reference: 'سنن النسائی الکبریٰ: 10405، مستدرک الحاکم: 2000 (حسن)',
    merit: 'نبی کریم ﷺ نے اپنی لخت جگر سیدہ فاطمہ رضی اللہ عنہا کو صبح و شام یہ دعا پڑھنے کی وصیت فرمائی۔',
    targetCount: 1
  },
  {
    id: 'm-5',
    category: 'morning',
    categoryName: 'Morning Azkar',
    categoryArabic: 'أذكار الصباح',
    title: 'Morning Declaration of Dominion',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    urdu: 'ہم نے اور تمام بادشاہی نے اللہ کے لیے صبح کی، اور تمام تعریفیں اللہ ہی کے لیے ہیں، اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے اس کا کوئی شریک نہیں، اسی کے لیے بادشاہی ہے اور اسی کے لیے تعریف ہے اور وہ ہر چیز پر قادر ہے۔',
    reference: 'صحیح مسلم: 2723',
    merit: 'صبح کے آغاز میں اللہ تعالیٰ کی وحدانیت اور مطلق بادشاہی کا اقرار۔',
    targetCount: 1
  },

  // ── EVENING AZKAR (أذكار المساء) ─────────────────────────────
  {
    id: 'e-1',
    category: 'evening',
    categoryName: 'Evening Azkar',
    categoryArabic: 'أذكار المساء',
    title: 'Evening Declaration of Dominion',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    urdu: 'ہم نے اور تمام بادشاہی نے اللہ کے لیے شام کی، اور تمام تعریفیں اللہ ہی کے لیے ہیں، اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے اس کا کوئی شریک نہیں، اسی کے لیے بادشاہی ہے اور اسی کے لیے تعریف ہے اور وہ ہر چیز پر قادر ہے۔',
    reference: 'صحیح مسلم: 2723',
    merit: 'شام کے وقت اللہ کی حفاظت، پناہ اور شکرگزاری کا اعتراف۔',
    targetCount: 1
  },
  {
    id: 'e-2',
    category: 'evening',
    categoryName: 'Evening Azkar',
    categoryArabic: 'أذكار المساء',
    title: 'Refuge in Allah\'s Perfect Words',
    arabic: 'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ',
    urdu: 'میں اللہ کے مکمل اور بابرکت کلمات کی پناہ مانگتا ہوں ہر اس چیز کے شر سے جو اس نے پیدا فرمائی۔',
    reference: 'صحیح مسلم: 2709',
    merit: 'جو شام کے وقت تین بار پڑھے، اس رات کوئی زہریلا جانور یا شر اسے نقصان نہیں پہنچا سکتا۔',
    targetCount: 3
  },
  {
    id: 'e-3',
    category: 'evening',
    categoryName: 'Evening Azkar',
    categoryArabic: 'أذكار المساء',
    title: 'Tasbeeh of Forgiveness (100 Times)',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    urdu: 'اللہ پاک ہے اپنی تمام خوبیوں اور تعریفوں سمیت۔',
    reference: 'صحیح مسلم: 2692',
    merit: 'جو شخص دن میں سو بار یہ پڑھے، اس کے گناہ معاف کر دیے جاتے ہیں چاہے سمندر کی جھاگ کے برابر ہی کیوں نہ ہوں۔',
    targetCount: 100
  },
  {
    id: 'e-4',
    category: 'evening',
    categoryName: 'Evening Azkar',
    categoryArabic: 'أذكار المساء',
    title: 'Evening Protection from Harm',
    arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ',
    urdu: 'اللہ کے نام کے ساتھ جس کے نام کی برکت سے زمین اور آسمان میں کوئی چیز نقصان نہیں پہنچا سکتی، اور وہی سب کچھ سننے والا، خوب جاننے والا ہے۔',
    reference: 'سنن ابی داود: 5088',
    merit: 'شام کو تین بار پڑھنے سے رات بھر ہر بلا و آفت سے امان رہتی ہے۔',
    targetCount: 3
  },

  // ── AFTER SALAH AZKAR (أذكار بعد الصلاة) ─────────────────────
  {
    id: 'p-1',
    category: 'prayer',
    categoryName: 'After Salah',
    categoryArabic: 'أذكار بعد الصلاة',
    title: 'Istighfar & Greeting of Peace',
    arabic: 'أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ',
    urdu: 'میں اللہ سے بخشش مانگتا ہوں (تین بار)۔ اے اللہ! تو ہی سلامتی والا ہے اور تجھی سے سلامتی ملتی ہے، تو بڑی برکت والا ہے اے عظمت اور عزت والے۔',
    reference: 'صحیح مسلم: 591',
    merit: 'رسول اللہ ﷺ فرض نماز کے سلام کے بعد تین بار استغفار کرتے اور یہ کلمات ادا فرماتے۔',
    targetCount: 1
  },
  {
    id: 'p-2',
    category: 'prayer',
    categoryName: 'After Salah',
    categoryArabic: 'أذكار بعد الصلاة',
    title: 'SubhanAllah (Tasbeeh)',
    arabic: 'سُبْحَانَ اللَّهِ',
    urdu: 'اللہ ہر عیب اور نقص سے پاک ہے۔',
    reference: 'صحیح مسلم: 597',
    merit: 'ہر نماز کے بعد ۳۳ بار تسبیح پڑھنا احادیث صحیحہ سے ثابت ہے۔',
    targetCount: 33
  },
  {
    id: 'p-3',
    category: 'prayer',
    categoryName: 'After Salah',
    categoryArabic: 'أذكار بعد الصلاة',
    title: 'Alhamdulillah (Tahmeed)',
    arabic: 'الْحَمْدُ لِلَّهِ',
    urdu: 'تمام تعریفیں اور شکر اللہ ہی کے لیے سزاوار ہیں۔',
    reference: 'صحیح مسلم: 597',
    merit: 'ہر نماز کے بعد ۳۳ بار تحمید پڑھنا میزان کو بھر دیتا ہے۔',
    targetCount: 33
  },
  {
    id: 'p-4',
    category: 'prayer',
    categoryName: 'After Salah',
    categoryArabic: 'أذكار بعد الصلاة',
    title: 'Allahu Akbar (Takbeer)',
    arabic: 'اللَّهُ أَكْبَرُ',
    urdu: 'اللہ سب سے بڑا اور سب پر غالب ہے۔',
    reference: 'صحیح مسلم: 597',
    merit: 'ہر نماز کے بعد ۳۳ بار تکبیر پڑھ کر سو کا عدد پورا کرنا۔',
    targetCount: 33
  },
  {
    id: 'p-5',
    category: 'prayer',
    categoryName: 'After Salah',
    categoryArabic: 'أذكار بعد الصلاة',
    title: 'Completion of 100th Tasbeeh',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    urdu: 'اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کی تعریف ہے اور وہ ہر چیز پر قادر ہے۔',
    reference: 'صحیح مسلم: 597',
    merit: 'جو ۳۳ بار سبحان اللہ، ۳۳ بار الحمد للہ، ۳۳ بار اللہ اکبر اور ۱۰۰ واں کلمہ یہ پڑھے اس کے گناہ بخش دیے جاتے ہیں۔',
    targetCount: 1
  },
  {
    id: 'p-6',
    category: 'prayer',
    categoryName: 'After Salah',
    categoryArabic: 'أذكار بعد الصلاة',
    title: 'Ayat al-Kursi (The Throne Verse)',
    arabic: 'اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    urdu: 'اللہ وہ معبود برحق ہے جس کے سوا کوئی عبادت کے لائق نہیں، وہ زندہ ہے سب کو قائم رکھنے والا ہے۔ نہ اسے اونگھ آتی ہے نہ نیند۔ جو کچھ آسمانوں اور زمین میں ہے سب اسی کا ہے۔ کون ہے جو اس کی اجازت کے بغیر سفارش کر سکے؟ وہ سب جانتا ہے جو ان کے آگے اور پیچھے ہے، اور وہ اس کے علم میں سے کسی چیز کا احاطہ نہیں کر سکتے مگر جتنا وہ چاہے۔ اس کی کرسی آسمانوں اور زمین پر محیط ہے اور ان کی حفاظت اسے نہیں تھکاتی، اور وہ بلند رتبہ اور عظمت والا ہے۔',
    reference: 'سنن النسائی الکبریٰ: 9848، صحیح ابن حبان: 1198 (صحیح)',
    merit: 'جس نے ہر فرض نماز کے بعد آیت الکرسی پڑھی، اسے جنت میں داخل ہونے سے سوائے موت کے کوئی چیز نہیں روک سکتی۔',
    targetCount: 1
  },

  // ── BEFORE SLEEPING AZKAR (أذكار النوم) ──────────────────────
  {
    id: 's-1',
    category: 'sleep',
    categoryName: 'Before Sleeping',
    categoryArabic: 'أذكار النوم',
    title: 'Entrusting the Soul in Sleep',
    arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ',
    urdu: 'اے میرے رب! تیرے ہی نام سے میں نے اپنا پہلو رکھا اور تیرے ہی نام سے میں اسے اٹھاؤں گا۔ پس اگر تو میری جان کو روک لے تو اس پر رحم فرما، اور اگر تو اسے واپس بھیج دے تو اس کی اسی طرح حفاظت فرما جس طرح تو اپنے نیک بندوں کی حفاظت فرماتا ہے۔',
    reference: 'صحیح البخاری: 6320، صحیح مسلم: 2714',
    merit: 'سونے سے پہلے بستر پر لیٹ کر دائیں کروٹ یہ دعا پڑھنا سنت نبوی ﷺ ہے۔',
    targetCount: 1
  },
  {
    id: 's-2',
    category: 'sleep',
    categoryName: 'Before Sleeping',
    categoryArabic: 'أذكار النوم',
    title: 'Declaration of Life & Death',
    arabic: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
    urdu: 'اے اللہ! میں تیرے ہی نام کے ساتھ مرتا (سوتا) ہوں اور تیرے ہی نام سے جیتا (جاگتا) ہوں۔',
    reference: 'صحیح البخاری: 6312، صحیح مسلم: 2711',
    merit: 'نیند کی حالت میں اللہ کی یاد اور بیداری کے شکر کا عہد۔',
    targetCount: 1
  },
  {
    id: 's-3',
    category: 'sleep',
    categoryName: 'Before Sleeping',
    categoryArabic: 'أذكار النوم',
    title: 'The Mu\'awwidhatayn (3 Quls Blow 3 Times)',
    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
    urdu: 'سورۃ الاخلاص، سورۃ الفلق اور سورۃ الناس پڑھ کر ہاتھوں پر پھونک کر سر اور چہرے سے لے کر پورے جسم پر تین بار پھیرنا۔',
    reference: 'صحیح البخاری: 5017',
    merit: 'رسول اللہ ﷺ رات کو بستر پر تشریف لاتے تو دونوں ہاتھوں میں یہ سورتیں پڑھ کر دم فرماتے اور جسم مبارک پر پھیرتے۔',
    targetCount: 3
  },
  {
    id: 's-4',
    category: 'sleep',
    categoryName: 'Before Sleeping',
    categoryArabic: 'أذكار النوم',
    title: 'Tasbeeh of Fatimah at Bedtime',
    arabic: 'سُبْحَانَ اللَّهِ (۳۳ بار) ، الْحَمْدُ لِلَّهِ (۳۳ بار) ، اللَّهُ أَكْبَرُ (۳۴ بار)',
    urdu: 'سونے سے پہلے ۳۳ بار سبحان اللہ، ۳۳ بار الحمد للہ اور ۳۴ بار اللہ اکبر کہنا خادم رکھنے سے بھی بہتر اور باعث برکت ہے۔',
    reference: 'صحیح البخاری: 3705، صحیح مسلم: 2727',
    merit: 'رسول اللہ ﷺ نے سیدہ فاطمہ اور سیدنا علی رضی اللہ عنہما کو یہ تسبیح سکھائی جو ہر تھکن کا روحانی مداوا ہے۔',
    targetCount: 33
  },

  // ── GENERAL DAILY AZKAR (أذكار عامة ويومية) ─────────────────
  {
    id: 'g-1',
    category: 'general',
    categoryName: 'General Daily',
    categoryArabic: 'أذكار عامة ويومية',
    title: 'Treasure of Paradise (La Hawla)',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    urdu: 'نہ برائی سے بچنے کی کوئی طاقت ہے اور نہ نیکی کرنے کی کوئی قوت، مگر اللہ تعالیٰ کی توفیق و مدد سے۔',
    reference: 'صحیح البخاری: 6384، صحیح مسلم: 2704',
    merit: 'یہ کلمہ جنت کے خزانوں میں سے ایک قیمتی خزانہ ہے۔',
    targetCount: 10
  },
  {
    id: 'g-2',
    category: 'general',
    categoryName: 'General Daily',
    categoryArabic: 'أذكار عامة ويومية',
    title: 'Beloved to the Most Merciful',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ',
    urdu: 'اللہ پاک ہے اپنی خوبیوں سمیت، اللہ پاک ہے جو بڑی عظمت والا ہے۔',
    reference: 'صحیح البخاری: 6682، صحیح مسلم: 2694',
    merit: 'دو کلمے جو زبان پر ہلکے، میزان میں بہت بھاری اور رحمن کو بے حد پیارے ہیں۔',
    targetCount: 10
  },
  {
    id: 'g-3',
    category: 'general',
    categoryName: 'General Daily',
    categoryArabic: 'أذكار عامة ويومية',
    title: 'Durood / Salawat upon the Prophet (ﷺ)',
    arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ',
    urdu: 'اے اللہ! رحمت نازل فرما محمد پر اور محمد کی آل پر جیسا کہ تو نے رحمت نازل فرمائی ابراہیم پر اور ابراہیم کی آل پر، بے شک تو بڑی تعریف والا اور بزرگی والا ہے۔',
    reference: 'صحیح البخاری: 3370، صحیح مسلم: 406',
    merit: 'جو مجھ پر ایک بار درود بھیجتا ہے، اللہ تعالیٰ اس پر دس رحمتیں نازل فرماتا ہے اور دس گناہ معاف کرتا ہے۔',
    targetCount: 10
  },
  {
    id: 'g-4',
    category: 'general',
    categoryName: 'General Daily',
    categoryArabic: 'أذكار عامة ويومية',
    title: 'Universal Dhikr (Kalimah Tayyibah)',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
    urdu: 'اللہ کے سوا کوئی معبود نہیں، وہ اکیلا ہے اس کا کوئی شریک نہیں، اسی کی بادشاہی ہے اور اسی کے لیے تمام تعریف ہے اور وہ ہر چیز پر قادر ہے۔',
    reference: 'صحیح البخاری: 3293',
    merit: 'دن میں دس بار پڑھنے پر چار غلام آزاد کرنے جتنا ثواب ملتا ہے۔',
    targetCount: 10
  }
];

/* ============================================================
   2. STORAGE KEYS & STATE
   ============================================================ */

const STORAGE_PROGRESS_KEY   = 'noor-azkar-progress';
const STORAGE_FAVOURITES_KEY = 'noor-azkar-favourites';

const NoorAzkarState = {
  currentFilter: 'all', // 'all' | 'morning' | 'evening' | 'prayer' | 'sleep' | 'general' | 'favourites'
  searchQuery: '',
  cleanMode: false,
  arabicFontSize: 28, // px
  urduFontSize: 18,   // px
  
  // Counts map: { 'm-1': 1, 'm-2': 3 }
  progress: {},
  // Favourites array of IDs: ['m-1', 'p-6']
  favourites: []
};

/* ============================================================
   3. PERSISTENCE HELPERS
   ============================================================ */

function loadSavedState() {
  try {
    const savedProg = localStorage.getItem(STORAGE_PROGRESS_KEY);
    if (savedProg) NoorAzkarState.progress = JSON.parse(savedProg);

    const savedFav = localStorage.getItem(STORAGE_FAVOURITES_KEY);
    if (savedFav) NoorAzkarState.favourites = JSON.parse(savedFav);
  } catch (e) {
    console.warn('[Noor] Azkar storage parse error', e);
  }
}

function saveProgress() {
  try {
    localStorage.setItem(STORAGE_PROGRESS_KEY, JSON.stringify(NoorAzkarState.progress));
    updateDailyProgressBar();
  } catch (e) {}
}

function saveFavourites() {
  try {
    localStorage.setItem(STORAGE_FAVOURITES_KEY, JSON.stringify(NoorAzkarState.favourites));
  } catch (e) {}
}

/* ============================================================
   4. COUNTER & PROGRESS LOGIC
   ============================================================ */

function incrementCounter(azkarId) {
  const item = AZKAR_DATABASE.find(a => a.id === azkarId);
  if (!item) return;

  const current = NoorAzkarState.progress[azkarId] || 0;
  if (current >= item.targetCount) {
    // Already completed
    window.NoorToast?.show(`Prescribed count (${item.targetCount}x) already completed! ✨`, 'info');
    return;
  }

  const newCount = current + 1;
  NoorAzkarState.progress[azkarId] = newCount;
  saveProgress();

  // Haptic feedback on mobile if supported
  if ('vibrate' in navigator) {
    navigator.vibrate(newCount >= item.targetCount ? [40, 60, 40] : 30);
  }

  // Visual toast upon reaching target
  if (newCount >= item.targetCount) {
    window.NoorToast?.show(`Alhamdulillah! "${item.title}" completed (${item.targetCount}x) ✓`, 'success');
  }

  updateCardUI(azkarId);
}

function resetCounter(azkarId) {
  delete NoorAzkarState.progress[azkarId];
  saveProgress();
  updateCardUI(azkarId);
  window.NoorToast?.show('Counter reset', 'info');
}

function resetAllProgress() {
  if (confirm('Are you sure you want to reset all daily Azkar progress for today?')) {
    NoorAzkarState.progress = {};
    saveProgress();
    renderAzkarList();
    window.NoorToast?.show('All daily Azkar counters reset', 'info');
  }
}

function toggleFavourite(azkarId) {
  const idx = NoorAzkarState.favourites.indexOf(azkarId);
  let isFav = false;

  if (idx >= 0) {
    NoorAzkarState.favourites.splice(idx, 1);
    isFav = false;
  } else {
    NoorAzkarState.favourites.push(azkarId);
    isFav = true;
  }

  saveFavourites();
  updateCardUI(azkarId);

  window.NoorToast?.show(
    isFav ? 'Added to Favourites ⭐' : 'Removed from Favourites',
    'info'
  );

  // If in favourites filter view, re-render
  if (NoorAzkarState.currentFilter === 'favourites') {
    renderAzkarList();
  }
}

/* ============================================================
   5. RENDERING AZKAR CARDS
   ============================================================ */

function getFilteredAzkar() {
  return AZKAR_DATABASE.filter(item => {
    // 1. Category filter
    if (NoorAzkarState.currentFilter === 'favourites') {
      if (!NoorAzkarState.favourites.includes(item.id)) return false;
    } else if (NoorAzkarState.currentFilter !== 'all') {
      if (item.category !== NoorAzkarState.currentFilter) return false;
    }

    // 2. Search query filter
    if (NoorAzkarState.searchQuery) {
      const q = NoorAzkarState.searchQuery.toLowerCase();
      const match = item.title.toLowerCase().includes(q) ||
        item.arabic.includes(q) ||
        item.urdu.includes(q) ||
        item.reference.toLowerCase().includes(q) ||
        item.categoryName.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });
}

function renderAzkarList() {
  const container = document.getElementById('azkar-cards-container');
  if (!container) return;

  const items = getFilteredAzkar();

  if (items.length === 0) {
    container.innerHTML = `
      <div class="azkar-empty-state">
        <div class="empty-icon">📿</div>
        <h3>No Azkar Found</h3>
        <p>No supplications match the selected filter or search term.</p>
        <button class="btn btn-primary btn-sm" onclick="clearFilters()">Reset Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => {
    const current = NoorAzkarState.progress[item.id] || 0;
    const target = item.targetCount;
    const isCompleted = current >= target;
    const isFav = NoorAzkarState.favourites.includes(item.id);
    const remaining = Math.max(0, target - current);
    const progressPercent = Math.min(100, Math.round((current / target) * 100));

    return `
      <article class="azkar-interactive-card ${isCompleted ? 'azkar-completed' : ''}" 
               id="card-${item.id}"
               data-azkar-id="${item.id}">
        
        <!-- Card Top Bar -->
        <div class="azkar-card-top-bar">
          <div class="azkar-badge-group">
            <span class="azkar-category-pill pill-${item.category}">
              ${item.categoryArabic} · ${item.categoryName}
            </span>
            ${isCompleted ? '<span class="azkar-status-completed">✓ Completed</span>' : ''}
          </div>

          <div class="azkar-top-actions">
            <!-- Favourite / Bookmark button -->
            <button class="azkar-btn-icon btn-fav ${isFav ? 'active' : ''}" 
                    data-id="${item.id}" 
                    title="${isFav ? 'Remove from Favourites' : 'Add to Favourites'}"
                    aria-label="Toggle favourite">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? '#C9A84C' : 'none'}" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </button>

            <!-- Reset Counter button -->
            <button class="azkar-btn-icon btn-reset" 
                    data-id="${item.id}" 
                    title="Reset counter"
                    aria-label="Reset counter">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                <polyline points="3 3 3 8 8 8"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Title -->
        <h3 class="azkar-card-heading">${item.title}</h3>

        <!-- Arabic Text -->
        <div class="azkar-arabic-body" 
             lang="ar" 
             dir="rtl" 
             style="font-size: ${NoorAzkarState.arabicFontSize}px;">
          ${item.arabic}
        </div>

        <!-- Urdu Translation -->
        <div class="azkar-urdu-body ${NoorAzkarState.cleanMode ? 'hidden' : ''}" 
             lang="ur" 
             dir="rtl" 
             style="font-size: ${NoorAzkarState.urduFontSize}px;">
          ${item.urdu}
        </div>

        <!-- Source Reference & Merit -->
        <div class="azkar-meta-details ${NoorAzkarState.cleanMode ? 'hidden' : ''}">
          <div class="azkar-ref-source">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
            <span><strong>مصدر / Reference:</strong> ${item.reference}</span>
          </div>
          ${item.merit ? `<p class="azkar-merit-note"><strong>فضیلت:</strong> ${item.merit}</p>` : ''}
        </div>

        <!-- Interactive Counter Control Bar -->
        <div class="azkar-counter-bar">
          <div class="counter-info-left">
            <span class="prescribed-count-badge">Prescribed: <strong>${target}×</strong></span>
            <span class="remaining-indicator">
              ${isCompleted ? 'Target Reached ✨' : `Remaining: <strong>${remaining}</strong>`}
            </span>
          </div>

          <!-- Large Tap Target Counter Button -->
          <button class="azkar-tap-counter-btn ${isCompleted ? 'completed-pulse' : ''}" 
                  data-id="${item.id}" 
                  aria-label="Tap to count (Current: ${current} of ${target})">
            <span class="counter-digits">${current} / ${target}</span>
            <span class="counter-label">${isCompleted ? '✓ Done' : 'Tap to Count +1'}</span>
          </button>
        </div>

        <!-- Mini Progress Bar on Card -->
        <div class="card-progress-track">
          <div class="card-progress-fill" style="width: ${progressPercent}%;"></div>
        </div>

      </article>
    `;
  }).join('');

  bindCardEvents();
  updateDailyProgressBar();
}

function updateCardUI(azkarId) {
  const card = document.getElementById(`card-${azkarId}`);
  if (!card) return;

  const item = AZKAR_DATABASE.find(a => a.id === azkarId);
  if (!item) return;

  const current = NoorAzkarState.progress[azkarId] || 0;
  const target = item.targetCount;
  const isCompleted = current >= target;
  const isFav = NoorAzkarState.favourites.includes(azkarId);
  const remaining = Math.max(0, target - current);
  const progressPercent = Math.min(100, Math.round((current / target) * 100));

  card.classList.toggle('azkar-completed', isCompleted);

  // Counter digits & label
  const counterBtn = card.querySelector('.azkar-tap-counter-btn');
  if (counterBtn) {
    counterBtn.classList.toggle('completed-pulse', isCompleted);
    const digits = counterBtn.querySelector('.counter-digits');
    const label = counterBtn.querySelector('.counter-label');
    if (digits) digits.textContent = `${current} / ${target}`;
    if (label) label.textContent = isCompleted ? '✓ Done' : 'Tap to Count +1';
  }

  // Remaining indicator
  const remEl = card.querySelector('.remaining-indicator');
  if (remEl) {
    remEl.innerHTML = isCompleted ? 'Target Reached ✨' : `Remaining: <strong>${remaining}</strong>`;
  }

  // Mini progress track
  const fill = card.querySelector('.card-progress-fill');
  if (fill) fill.style.width = `${progressPercent}%`;

  // Favourite icon
  const favBtn = card.querySelector('.btn-fav');
  if (favBtn) {
    favBtn.classList.toggle('active', isFav);
    const svg = favBtn.querySelector('svg');
    if (svg) svg.setAttribute('fill', isFav ? '#C9A84C' : 'none');
  }

  // Completion badge in header
  const badgeGroup = card.querySelector('.azkar-badge-group');
  let statusBadge = badgeGroup.querySelector('.azkar-status-completed');
  if (isCompleted) {
    if (!statusBadge) {
      statusBadge = document.createElement('span');
      statusBadge.className = 'azkar-status-completed';
      statusBadge.textContent = '✓ Completed';
      badgeGroup.appendChild(statusBadge);
    }
  } else if (statusBadge) {
    statusBadge.remove();
  }

  updateDailyProgressBar();
}

function bindCardEvents() {
  const container = document.getElementById('azkar-cards-container');
  if (!container) return;

  // Counter Tap Button
  container.querySelectorAll('.azkar-tap-counter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      incrementCounter(id);
    });
  });

  // Reset Button
  container.querySelectorAll('.btn-reset').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      resetCounter(id);
    });
  });

  // Favourite Button
  container.querySelectorAll('.btn-fav').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      toggleFavourite(id);
    });
  });
}

/* ============================================================
   6. DAILY PROGRESS SUMMARY
   ============================================================ */

function updateDailyProgressBar() {
  const totalItems = AZKAR_DATABASE.length;
  let completedCount = 0;

  AZKAR_DATABASE.forEach(item => {
    const cur = NoorAzkarState.progress[item.id] || 0;
    if (cur >= item.targetCount) completedCount++;
  });

  const percent = Math.min(100, Math.round((completedCount / totalItems) * 100));

  const countEl = document.getElementById('azkar-completed-count');
  const barEl = document.getElementById('azkar-overall-progress-bar');
  const pctEl = document.getElementById('azkar-progress-percent');

  if (countEl) countEl.textContent = `${completedCount} of ${totalItems}`;
  if (barEl) barEl.style.width = `${percent}%`;
  if (pctEl) pctEl.textContent = `${percent}% Completed`;
}

/* ============================================================
   7. CONTROLS, FILTERS & CLEAN MODE
   ============================================================ */

function initFiltersAndControls() {
  // 1. Category Filter Buttons
  document.querySelectorAll('.azkar-filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.azkar-filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      NoorAzkarState.currentFilter = pill.getAttribute('data-filter');
      renderAzkarList();
    });
  });

  // 2. Search Input
  const searchInput = document.getElementById('azkar-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      NoorAzkarState.searchQuery = e.target.value.trim();
      renderAzkarList();
    });
  }

  // 3. Clean Reading Mode Toggle
  const cleanToggle = document.getElementById('btn-clean-mode');
  if (cleanToggle) {
    cleanToggle.addEventListener('click', () => {
      NoorAzkarState.cleanMode = !NoorAzkarState.cleanMode;
      cleanToggle.classList.toggle('active', NoorAzkarState.cleanMode);
      
      document.querySelectorAll('.azkar-urdu-body, .azkar-meta-details').forEach(el => {
        el.classList.toggle('hidden', NoorAzkarState.cleanMode);
      });

      window.NoorToast?.show(
        NoorAzkarState.cleanMode ? 'Clean mode active (Arabic focus) 🌙' : 'Standard view restored',
        'info'
      );
    });
  }

  // 4. Font Sizing Controls
  document.getElementById('btn-azkar-size-plus')?.addEventListener('click', () => {
    if (NoorAzkarState.arabicFontSize < 44) {
      NoorAzkarState.arabicFontSize += 2;
      document.querySelectorAll('.azkar-arabic-body').forEach(el => el.style.fontSize = `${NoorAzkarState.arabicFontSize}px`);
    }
  });

  document.getElementById('btn-azkar-size-minus')?.addEventListener('click', () => {
    if (NoorAzkarState.arabicFontSize > 22) {
      NoorAzkarState.arabicFontSize -= 2;
      document.querySelectorAll('.azkar-arabic-body').forEach(el => el.style.fontSize = `${NoorAzkarState.arabicFontSize}px`);
    }
  });

  // 5. Reset All Button
  document.getElementById('btn-reset-all-azkar')?.addEventListener('click', resetAllProgress);
}

function clearFilters() {
  NoorAzkarState.currentFilter = 'all';
  NoorAzkarState.searchQuery = '';
  
  const searchInput = document.getElementById('azkar-search-input');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.azkar-filter-pill').forEach(p => {
    p.classList.toggle('active', p.getAttribute('data-filter') === 'all');
  });

  renderAzkarList();
}

/* ============================================================
   8. MODULE INITIALIZATION
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  loadSavedState();

  // Check URL param e.g. ?category=morning
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('category');
  if (cat && ['morning', 'evening', 'prayer', 'sleep', 'general'].includes(cat)) {
    NoorAzkarState.currentFilter = cat;
    document.querySelectorAll('.azkar-filter-pill').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-filter') === cat);
    });
  }

  initFiltersAndControls();
  renderAzkarList();

  console.info('[Noor] Azkar module fully initialized ✓');
});
