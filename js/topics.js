/**
 * Noor (نور) — Quran Topic Explorer
 * Comprehensive curated guide through 15 life themes with authentic Quranic verses,
 * verified Urdu translations (Fateh Muhammad Jalandhry), reflection prompts, and Quran Reader integration.
 */

'use strict';

/* ============================================================
   1. 15 CURATED QURANIC TOPICS & VERIFIED AYAT DATABASE
   ============================================================ */

const TOPICS_DATABASE = [
  {
    id: 'sabr',
    category: 'spiritual',
    name: 'Sabr (Patience & Perseverance)',
    arabic: 'الصَّبْرُ وَالِاسْتِقَامَةُ',
    urdu: 'صبر اور استقامت',
    icon: '🌱',
    summary: 'Patience in times of difficulty, restraining the soul from disobedience, and persevering steadfastly upon the path of truth.',
    reflectionPrompt: 'When faced with unexpected delays, trials, or irritation today, how can you consciously replace impatience with trust in Allah’s timing?',
    ayahs: [
      {
        surahNumber: 2,
        ayahNumber: 153,
        surahNameEn: 'Al-Baqarah',
        surahNameAr: 'البقرة',
        ref: 'Surah Al-Baqarah (2:153)',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
        urdu: 'اے ایمان والو! صبر اور نماز کے ذریعے مدد چاہو، بے شک اللہ صبر کرنے والوں کے ساتھ ہے۔'
      },
      {
        surahNumber: 39,
        ayahNumber: 10,
        surahNameEn: 'Az-Zumar',
        surahNameAr: 'الزمر',
        ref: 'Surah Az-Zumar (39:10)',
        arabic: 'إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُم بِغَيْرِ حِسَابٍ',
        urdu: 'صبر کرنے والوں ہی کو ان کا ثواب بے حساب دیا جائے گا۔'
      }
    ]
  },
  {
    id: 'tawakkul',
    category: 'spiritual',
    name: 'Tawakkul (Trust in Allah)',
    arabic: 'التَّوَكُّلُ عَلَى اللَّهِ',
    urdu: 'اللہ پر توکل و بھروسہ',
    icon: '🛡️',
    summary: 'Taking lawful means with sincere effort while resigning hearts, worries, and outcomes entirely to Allah’s wisdom and divine decree.',
    reflectionPrompt: 'What current worry or anxiety are you clinging to? Take practical steps, then actively surrender the outcome to Allah.',
    ayahs: [
      {
        surahNumber: 65,
        ayahNumber: 3,
        surahNameEn: 'At-Talaq',
        surahNameAr: 'الطلاق',
        ref: 'Surah At-Talaq (65:3)',
        arabic: 'وَمَن يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ',
        urdu: 'اور جو اللہ پر بھروسہ رکھے گا وہ اس کو کافی ہوگا، بے شک اللہ اپنا کام پورا کرکے رہتا ہے۔'
      },
      {
        surahNumber: 3,
        ayahNumber: 159,
        surahNameEn: "Ali 'Imran",
        surahNameAr: 'آل عمران',
        ref: "Surah Ali 'Imran (3:159)",
        arabic: 'فَإِذَا عَزَمْتَ فَتَوَكَّلْ عَلَى اللَّهِ ۚ إِنَّ اللَّهَ يُحِبُّ الْمُتَوَكِّلِينَ',
        urdu: 'پھر جب تم کسی کام کا عزم کرلو تو اللہ پر بھروسہ کرو، بے شک اللہ توکل کرنے والوں سے محبت کرتا ہے۔'
      }
    ]
  },
  {
    id: 'shukar',
    category: 'spiritual',
    name: 'Shukar (Gratitude)',
    arabic: 'الشُّكْرُ وَالاعْتِرَافُ بِالنِّعْمَةِ',
    urdu: 'شکر اور اعترافِ نعمت',
    icon: '✨',
    summary: 'Recognizing blessings of health, faith, and family with the heart, expressing praise through speech, and utilizing gifts in obedience to Allah.',
    reflectionPrompt: 'Name three quiet, overlooked blessings in your life right now. How can you demonstrate gratitude through action today?',
    ayahs: [
      {
        surahNumber: 14,
        ayahNumber: 7,
        surahNameEn: 'Ibrahim',
        surahNameAr: 'إبراهيم',
        ref: 'Surah Ibrahim (14:7)',
        arabic: 'لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِن كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ',
        urdu: 'اگر تم شکر ادا کرو گے تو میں تمہیں اور زیادہ دوں گا، اور اگر تم ناشکری کرو گے تو بے شک میرا عذاب سخت ہے۔'
      },
      {
        surahNumber: 27,
        ayahNumber: 40,
        surahNameEn: 'An-Naml',
        surahNameAr: 'النمل',
        ref: 'Surah An-Naml (27:40)',
        arabic: 'هَٰذَا مِن فَضْلِ رَبِّي لِيَبْلُوَنِي أَأَشْكُرُ أَمْ أَكْفُرُ',
        urdu: 'یہ میرے پروردگار کا فضل ہے تاکہ وہ مجھے آزمائے کہ آیا میں شکر کرتا ہوں یا ناشکری۔'
      }
    ]
  },
  {
    id: 'forgiveness',
    category: 'spiritual',
    name: 'Forgiveness & Repentance (Maghfirah)',
    arabic: 'المَغْفِرَةُ وَالتَّوْبَةُ',
    urdu: 'مغفرت اور سچی توبہ',
    icon: '🕊️',
    summary: 'Returning to Allah with remorse over mistakes, confident in His vast pardon, and extending grace and forgiveness to fellow human beings.',
    reflectionPrompt: 'Is there an old mistake burdening your conscience, or someone you need to pardon to lighten your own heart?',
    ayahs: [
      {
        surahNumber: 39,
        ayahNumber: 53,
        surahNameEn: 'Az-Zumar',
        surahNameAr: 'الزمر',
        ref: 'Surah Az-Zumar (39:53)',
        arabic: 'قُلْ يَا عِبَادِيَ الَّذِينَ أَسْرَفُوا عَلَىٰ أَنفُسِهِمْ لَا تَقْنَطُوا مِن رَّحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا',
        urdu: 'آپ کہہ دیجیے کہ اے میرے بندو جنہوں نے اپنی جانوں پر زیادتی کی ہے، اللہ کی رحمت سے ناامید نہ ہو، بے شک اللہ سب گناہ بخش دیتا ہے۔'
      },
      {
        surahNumber: 4,
        ayahNumber: 110,
        surahNameEn: 'An-Nisa',
        surahNameAr: 'النساء',
        ref: 'Surah An-Nisa (4:110)',
        arabic: 'وَمَن يَعْمَلْ سُوءًا أَوْ يَظْلِمْ نَفْسَهُ ثُمَّ يَسْتَغْفِرِ اللَّهَ يَجِدِ اللَّهَ غَفُورًا رَّحِيمًا',
        urdu: 'اور جو شخص کوئی برا کام کرے یا اپنی جان پر ظلم کرے پھر اللہ سے بخشش مانگے تو وہ اللہ کو بخشنے والا مہربان پائے گا۔'
      }
    ]
  },
  {
    id: 'hope',
    category: 'spiritual',
    name: 'Hope in Allah (Raja’)',
    arabic: 'الرَّجَاءُ وَحُسْنُ الظَّنِّ',
    urdu: 'امید اور حسنِ ظن',
    icon: '🌅',
    summary: 'Maintaining radiant optimism and high expectation of goodness from Allah, regardless of how dark outward circumstances may appear.',
    reflectionPrompt: 'When feeling helpless, remember Prophet Yaqub’s hope in Allah. What hopeless situation can you renew your faith in today?',
    ayahs: [
      {
        surahNumber: 12,
        ayahNumber: 87,
        surahNameEn: 'Yusuf',
        surahNameAr: 'يوسف',
        ref: 'Surah Yusuf (12:87)',
        arabic: 'وَلَا تَيْأَسُوا مِن رَّوْحِ اللَّهِ ۖ إِنَّهُ لَا يَيْأَسُ مِن رَّوْحِ اللَّهِ إِلَّا الْقَوْمُ الْكَافِرُونَ',
        urdu: 'اور اللہ کی رحمت سے ناامید نہ ہو، کیونکہ اللہ کی رحمت سے وہی لوگ ناامید ہوتے ہیں جو کافر ہیں۔'
      },
      {
        surahNumber: 15,
        ayahNumber: 56,
        surahNameEn: 'Al-Hijr',
        surahNameAr: 'الحجر',
        ref: 'Surah Al-Hijr (15:56)',
        arabic: 'قَالَ وَمَن يَقْنَطُ مِن رَّحْمَةِ رَبِّهِ إِلَّا الضَّالُّونَ',
        urdu: 'کہا: اور اپنے پروردگار کی رحمت سے گمراہوں کے سوا کون ناامید ہو سکتا ہے؟'
      }
    ]
  },
  {
    id: 'mercy',
    category: 'spiritual',
    name: "Allah's Infinite Mercy (Rahmah)",
    arabic: 'رَحْمَةُ اللَّهِ الوَاسِعَةُ',
    urdu: 'اللہ کی وسیع رحمت',
    icon: '💧',
    summary: 'The all-encompassing compassion and loving kindness of Allah that precedes and triumphs over His wrath, nurturing all creation.',
    reflectionPrompt: 'In what ways have you experienced unexpected protection, ease, or kindness from Allah recently without asking?',
    ayahs: [
      {
        surahNumber: 7,
        ayahNumber: 156,
        surahNameEn: "Al-A'raf",
        surahNameAr: 'الأعراف',
        ref: "Surah Al-A'raf (7:156)",
        arabic: 'وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ ۚ فَسَأَكْتُبُهَا لِلَّذِينَ يَتَّقُونَ',
        urdu: 'اور میری رحمت تمام چیزوں پر محیط ہے، سو میں اسے ان لوگوں کے حق میں لکھ دوں گا جو تقویٰ اختیار کرتے ہیں۔'
      },
      {
        surahNumber: 6,
        ayahNumber: 54,
        surahNameEn: "Al-An'am",
        surahNameAr: 'الأنعام',
        ref: "Surah Al-An'am (6:54)",
        arabic: 'كَتَبَ رَبُّكُمْ عَلَىٰ نَفْسِهِ الرَّحْمَةَ',
        urdu: 'تمہارے پروردگار نے اپنی ذات پر رحمت کو لازم کر رکھا ہے۔'
      }
    ]
  },
  {
    id: 'parents',
    category: 'life',
    name: 'Honouring Parents (Birr al-Walidayn)',
    arabic: 'بِرُّ الوَالِدَيْنِ وَالإِحْسَانُ',
    urdu: 'والدین کی خدمت اور اطاعت',
    icon: '🏡',
    summary: 'Treating mother and father with unmatched tenderness, gentle speech, financial care, patience in aging, and frequent prayers.',
    reflectionPrompt: 'What intentional act of kindness, respectful word, or sincere Dua can you gift your parents (or make for them if departed) today?',
    ayahs: [
      {
        surahNumber: 17,
        ayahNumber: 23,
        surahNameEn: 'Al-Isra',
        surahNameAr: 'الإسراء',
        ref: 'Surah Al-Isra (17:23)',
        arabic: 'وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا ۚ إِمَّا يَبْلُغَنَّ عِندَكَ الْكِبَرَ أَحَدُهُمَا أَوْ كِلَاهُمَا فَلَا تَقُل لَّهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا وَقُل لَّهُمَا قَوْلًا كَرِيمًا',
        urdu: 'اور تمہارے پروردگار نے حکم دیا ہے کہ اس کے سوا کسی کی عبادت نہ کرو اور والدین کے ساتھ حسن سلوک کرو، اگر ان میں سے ایک یا دونوں تمہارے سامنے بڑھاپے کو پہنچ جائیں تو انہیں اف تک نہ کہو اور نہ انہیں جھڑکو اور ان سے ادب سے بات کرو۔'
      },
      {
        surahNumber: 31,
        ayahNumber: 14,
        surahNameEn: 'Luqman',
        surahNameAr: 'لقمان',
        ref: 'Surah Luqman (31:14)',
        arabic: 'وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ حَمَلَتْهُ أُمُّهُ وَهْنًا عَلَىٰ وَهْنٍ وَفِصَالُهُ فِي عَامَيْنِ أَنِ اشْكُرْ لِي وَلِوَالِدَيْكَ',
        urdu: 'اور ہم نے انسان کو اس کے والدین کے متعلق نصیحت کی، اس کی ماں نے تکلیف پر تکلیف اٹھا کر اسے پیٹ میں رکھا اور دو برس میں اس کا دودھ چھڑانا ہوا، کہ میرا بھی شکر ادا کر اور اپنے والدین کا بھی۔'
      }
    ]
  },
  {
    id: 'prayer',
    category: 'life',
    name: 'Prayer & Devotion (Salah)',
    arabic: 'إِقَامَةُ الصَّلَاةِ وَالخُشُوعُ',
    urdu: 'نماز کا قیام اور خشوع',
    icon: '🕌',
    summary: 'The spiritual pillar of Islam, establishing five daily personal rendezvous with the Creator that wash away sins and cultivate mindfulness.',
    reflectionPrompt: 'How can you transition your Salah from a routine checklist into an intimate, peaceful communion with your Maker?',
    ayahs: [
      {
        surahNumber: 29,
        ayahNumber: 45,
        surahNameEn: "Al-'Ankabut",
        surahNameAr: 'العنكبوت',
        ref: "Surah Al-'Ankabut (29:45)",
        arabic: 'اتْلُ مَا أُوحِيَ إِلَيْكَ مِنَ الْكِتَابِ وَأَقِمِ الصَّلَاةَ ۖ إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنكَرِ',
        urdu: 'جو کتاب آپ کی طرف وحی کی گئی ہے اسے پڑھیے اور نماز قائم کیجیے، بے شک نماز بے حیائی اور برائی سے روکتی ہے۔'
      },
      {
        surahNumber: 20,
        ayahNumber: 14,
        surahNameEn: 'Taha',
        surahNameAr: 'طه',
        ref: 'Surah Taha (20:14)',
        arabic: 'إِنَّنِي أَنَا اللَّهُ لَا إِلَٰهَ إِلَّا أَنَا فَاعْبُدْنِي وَأَقِمِ الصَّلَاةَ لِذِكْرِي',
        urdu: 'بے شک میں ہی اللہ ہوں، میرے سوا کوئی معبود نہیں، سو میری عبادت کرو اور میری یاد کے لیے نماز قائم رکھو۔'
      }
    ]
  },
  {
    id: 'honesty',
    category: 'character',
    name: 'Honesty & Truthfulness (Sidq)',
    arabic: 'الصِّدْقُ وَالأَمَانَةُ',
    urdu: 'سچائی اور دیانت داری',
    icon: '💎',
    summary: 'Integrity in word, deed, commerce, and conscience, aligning inner intentions with outer speech and upholding trusts without deceit.',
    reflectionPrompt: 'Is there any subtle exaggeration, half-truth, or broken promise you need to correct to purify your words?',
    ayahs: [
      {
        surahNumber: 9,
        ayahNumber: 119,
        surahNameEn: 'At-Tawbah',
        surahNameAr: 'التوبة',
        ref: 'Surah At-Tawbah (9:119)',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَكُونُوا مَعَ الصَّادِقِينَ',
        urdu: 'اے ایمان والو! اللہ سے ڈرو اور سچوں کے ساتھ ہو جاؤ۔'
      },
      {
        surahNumber: 33,
        ayahNumber: 70,
        surahNameEn: 'Al-Ahzab',
        surahNameAr: 'الأحزاب',
        ref: 'Surah Al-Ahzab (33:70)',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَقُولُوا قَوْلًا سَدِيدًا',
        urdu: 'اے ایمان والو! اللہ سے ڈرو اور بات سیدھی اور درست کہا کرو۔'
      }
    ]
  },
  {
    id: 'justice',
    category: 'character',
    name: 'Justice & Fairness (‘Adl)',
    arabic: 'العَدْلُ وَالقِسْطُ',
    urdu: 'عدل اور انصاف کا قیام',
    icon: '⚖️',
    summary: 'Upholding equity, fairness, and human rights even against oneself or loved ones, rejecting prejudice and oppressive partiality.',
    reflectionPrompt: 'How can you practice strict fairness in your family discussions, workplace evaluations, and disputes today?',
    ayahs: [
      {
        surahNumber: 4,
        ayahNumber: 135,
        surahNameEn: 'An-Nisa',
        surahNameAr: 'النساء',
        ref: 'Surah An-Nisa (4:135)',
        arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُونُوا قَوَّامِينَ بِالْقِسْطِ شُهَدَاءَ لِلَّهِ وَلَوْ عَلَىٰ أَنفُسِكُمْ أَوِ الْوَالِدَيْنِ وَالْأَقْرَبِينَ',
        urdu: 'اے ایمان والو! انصاف کے علمبردار بنو، اللہ کے لیے گواہی دینے والے، خواہ وہ تمہاری اپنی ذات پر ہو یا والدین اور قریبی رشتہ داروں کے خلاف ہی کیوں نہ ہو۔'
      },
      {
        surahNumber: 16,
        ayahNumber: 90,
        surahNameEn: 'An-Nahl',
        surahNameAr: 'النحل',
        ref: 'Surah An-Nahl (16:90)',
        arabic: 'إِنَّ اللَّهَ يَأْمُرُ بِالْعَدْلِ وَالْإِحْسَانِ وَإِيتَاءِ ذِي الْقُرْبَىٰ',
        urdu: 'بے شک اللہ عدل، احسان اور قرابت داروں کو دینے کا حکم دیتا ہے۔'
      }
    ]
  },
  {
    id: 'knowledge',
    category: 'character',
    name: 'Knowledge & Wisdom (‘Ilm)',
    arabic: 'العِلْمُ وَالحِكْمَةُ',
    urdu: 'علم اور حکمت کی طلب',
    icon: '📖',
    summary: 'Seeking sacred and beneficial understanding that illuminates truth, eradicates ignorance, elevates character, and guides right action.',
    reflectionPrompt: 'What beneficial Quranic or worldly knowledge will you actively study today to serve others and please your Creator?',
    ayahs: [
      {
        surahNumber: 20,
        ayahNumber: 114,
        surahNameEn: 'Taha',
        surahNameAr: 'طه',
        ref: 'Surah Taha (20:114)',
        arabic: 'وَقُل رَّبِّ زِدْنِي عِلْمًا',
        urdu: 'اور دعا کیجیے کہ اے میرے پروردگار! مجھے علم میں اور ترقی عطا فرما۔'
      },
      {
        surahNumber: 39,
        ayahNumber: 9,
        surahNameEn: 'Az-Zumar',
        surahNameAr: 'الزمر',
        ref: 'Surah Az-Zumar (39:9)',
        arabic: 'قُلْ هَلْ يَسْتَوِي الَّذِينَ يَعْلَمُونَ وَالَّذِينَ لَا يَعْلَمُونَ ۗ إِنَّمَا يَتَذَكَّرُ أُولُو الْأَلْبَابِ',
        urdu: 'فرما دیجیے: کیا وہ لوگ جو علم رکھتے ہیں اور وہ جو علم نہیں رکھتے برابر ہو سکتے ہیں؟ نصیحت تو صرف عقل والے ہی حاصل کرتے ہیں۔'
      }
    ]
  },
  {
    id: 'guidance',
    category: 'spiritual',
    name: 'Divine Guidance (Hidayah)',
    arabic: 'الهِدَايَةُ وَالصِّرَاطُ المُسْتَقِيمُ',
    urdu: 'ہدایت اور صراطِ مستقیم',
    icon: '🧭',
    summary: 'The constant yearning for Allah’s light to illuminate right decisions, keep hearts steadfast, and protect from deviation.',
    reflectionPrompt: 'In your daily decisions, how frequently do you pause and ask Allah for His clear guidance before choosing?',
    ayahs: [
      {
        surahNumber: 1,
        ayahNumber: 6,
        surahNameEn: 'Al-Fatihah',
        surahNameAr: 'الفاتحة',
        ref: 'Surah Al-Fatihah (1:6)',
        arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
        urdu: 'ہمیں سیدھا راستہ دکھا (اور اس پر قائم رکھ)۔'
      },
      {
        surahNumber: 2,
        ayahNumber: 2,
        surahNameEn: 'Al-Baqarah',
        surahNameAr: 'البقرة',
        ref: 'Surah Al-Baqarah (2:2)',
        arabic: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ',
        urdu: 'یہ وہ کتاب ہے جس میں کوئی شک نہیں، پرہیزگاروں کے لیے سراسر ہدایت ہے۔'
      }
    ]
  },
  {
    id: 'difficult-times',
    category: 'life',
    name: 'Difficult Times & Ease (Yusr ma’al ‘Usr)',
    arabic: 'الفَرَجُ بَعْدَ الشِّدَّةِ',
    urdu: 'مشکلات کے بعد آسانی',
    icon: '⛅',
    summary: 'The divine promise that hardship is temporary and accompanied by ease, and that no soul is tested beyond what it can bear.',
    reflectionPrompt: 'Look back at past trials you once thought insurmountable. Notice how Allah brought relief and made you stronger.',
    ayahs: [
      {
        surahNumber: 94,
        ayahNumber: 5,
        surahNameEn: 'Ash-Sharh',
        surahNameAr: 'الشرح',
        ref: 'Surah Ash-Sharh (94:5-6)',
        arabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ﴿٥﴾ إِنَّ مَعَ الْعُسْرِ يُسْرًا ﴿٦﴾',
        urdu: 'پس بے شک تنگی کے ساتھ آسانی ہے، بے شک تنگی کے ساتھ آسانی ہے۔'
      },
      {
        surahNumber: 2,
        ayahNumber: 286,
        surahNameEn: 'Al-Baqarah',
        surahNameAr: 'البقرة',
        ref: 'Surah Al-Baqarah (2:286)',
        arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
        urdu: 'اللہ کسی جان پر اس کی طاقت سے زیادہ بوجھ نہیں ڈالتا۔'
      }
    ]
  },
  {
    id: 'gratitude',
    category: 'life',
    name: 'Praise & Thanksgiving (Hamd)',
    arabic: 'الحَمْدُ لِلَّهِ وَالشُّكْرُ',
    urdu: 'حمد و سپاس اور اعتراف',
    icon: '☀️',
    summary: 'Beginning and concluding all matters with heartfelt praise to the Lord of all realms, whose majesty and benevolence are infinite.',
    reflectionPrompt: 'Begin your reflections today by reciting Alhamdulillah with complete concentration on everything it encompasses.',
    ayahs: [
      {
        surahNumber: 1,
        ayahNumber: 2,
        surahNameEn: 'Al-Fatihah',
        surahNameAr: 'الفاتحة',
        ref: 'Surah Al-Fatihah (1:2)',
        arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
        urdu: 'سب تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔'
      },
      {
        surahNumber: 34,
        ayahNumber: 13,
        surahNameEn: 'Saba',
        surahNameAr: 'سبإ',
        ref: 'Surah Saba (34:13)',
        arabic: 'اعْمَلُوا آلَ دَاوُودَ شُكْرًا ۚ وَقَلِيلٌ مِّنْ عِبَادِيَ الشَّكُورُ',
        urdu: 'اے داؤد کے گھر والو! شکر کے طور پر عمل کرو، اور میرے بندوں میں شکر گزار تھوڑے ہی ہیں۔'
      }
    ]
  },
  {
    id: 'character',
    category: 'character',
    name: 'Exemplary Character (Husn al-Khuluq)',
    arabic: 'حُسْنُ الخُلُقِ وَالمُعَامَلَةِ',
    urdu: 'حسنِ اخلاق اور نرم رویہ',
    icon: '🌿',
    summary: 'Kindness, humility, forgiving offenses, repelling negativity with grace, and emulating the noble moral character of the Prophet ﷺ.',
    reflectionPrompt: 'Who in your life challenges your composure? How can you respond to harshness with patience and beautiful manners?',
    ayahs: [
      {
        surahNumber: 68,
        ayahNumber: 4,
        surahNameEn: 'Al-Qalam',
        surahNameAr: 'القلم',
        ref: 'Surah Al-Qalam (68:4)',
        arabic: 'وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ',
        urdu: 'اور بے شک آپ اخلاق کے بڑے اعلیٰ مرتبے پر فائز ہیں۔'
      },
      {
        surahNumber: 41,
        ayahNumber: 34,
        surahNameEn: 'Fussilat',
        surahNameAr: 'فصلت',
        ref: 'Surah Fussilat (41:34)',
        arabic: 'ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ فَإِذَا الَّذِي بَيْنَكَ وَبَيْنَهُ عَدَاوَةٌ كَأَنَّهُ وَلِيٌّ حَمِيمٌ',
        urdu: 'برائی کو اچھائی سے دفع کرو، تو وہ شخص جس کے اور تمہارے درمیان دشمنی تھی ایسا ہو جائے گا جیسے گرم جوش دوست۔'
      }
    ]
  }
];

/* ============================================================
   2. STATE MANAGEMENT & LOCAL STORAGE
   ============================================================ */

const TOPIC_REFLECTIONS_KEY = 'noor-topic-reflections';

const TopicState = {
  activeCategory: 'all',
  searchQuery: '',
  activeTopicId: null,
  fontSizeOffset: 0 // -2 to +4 px
};

function getSavedReflections() {
  try {
    return JSON.parse(localStorage.getItem(TOPIC_REFLECTIONS_KEY)) || {};
  } catch {
    return {};
  }
}

function saveReflection(topicId, text) {
  const all = getSavedReflections();
  all[topicId] = {
    text: text.trim(),
    updatedAt: new Date().toISOString()
  };
  localStorage.setItem(TOPIC_REFLECTIONS_KEY, JSON.stringify(all));
}

/* ============================================================
   3. RENDERING TOPIC CARDS
   ============================================================ */

function renderTopics() {
  const container = document.getElementById('topics-cards-container');
  const emptyState = document.getElementById('topics-empty-state');
  const activeCountText = document.getElementById('topics-active-count-text');
  if (!container) return;

  const query = TopicState.searchQuery.toLowerCase().trim();
  const category = TopicState.activeCategory;

  let filtered = TOPICS_DATABASE.filter(topic => {
    // 1. Category Filter
    if (category === 'saved') {
      // Show topics that have at least one bookmarked Ayah
      const hasSavedAyah = topic.ayahs.some(a => {
        const ayahId = `${a.surahNumber}:${a.ayahNumber}`;
        return window.NoorBookmarks && window.NoorBookmarks.isSaved(ayahId);
      });
      if (!hasSavedAyah) return false;
    } else if (category !== 'all') {
      if (topic.category !== category) return false;
    }

    // 2. Search Query Filter
    if (query) {
      const matchName = topic.name.toLowerCase().includes(query);
      const matchUrdu = topic.urdu.includes(query);
      const matchArabic = topic.arabic.includes(query);
      const matchSummary = topic.summary.toLowerCase().includes(query);
      const matchAyahs = topic.ayahs.some(a => 
        a.urdu.includes(query) || 
        a.arabic.includes(query) || 
        a.ref.toLowerCase().includes(query)
      );
      return matchName || matchUrdu || matchArabic || matchSummary || matchAyahs;
    }

    return true;
  });

  // Update UI Counters
  updateFilterCounts();
  if (activeCountText) {
    if (query) {
      activeCountText.textContent = `Found ${filtered.length} topic${filtered.length === 1 ? '' : 's'} matching "${TopicState.searchQuery}"`;
    } else if (category === 'saved') {
      activeCountText.textContent = `Showing ${filtered.length} topic${filtered.length === 1 ? '' : 's'} with saved verses`;
    } else if (category !== 'all') {
      activeCountText.textContent = `Showing ${filtered.length} topics in ${formatCategoryName(category)}`;
    } else {
      activeCountText.textContent = `Showing all ${filtered.length} topics`;
    }
  }

  // Handle empty state
  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  // Render cards
  const cardsHtml = filtered.map(topic => {
    const firstAyah = topic.ayahs[0];
    const categoryBadge = formatCategoryName(topic.category);

    return `
      <article class="topic-explorer-card" data-topic-id="${topic.id}" tabindex="0" role="button" aria-label="Explore topic ${topic.name}">
        <div class="topic-card-glow" aria-hidden="true"></div>
        <div class="topic-card-top">
          <div class="topic-card-icon-badge" aria-hidden="true">${topic.icon}</div>
          <span class="topic-category-tag">${categoryBadge}</span>
          <span class="topic-ayah-count-badge">${topic.ayahs.length} Verses</span>
        </div>

        <div class="topic-card-content">
          <div class="topic-card-arabic-title">${topic.arabic}</div>
          <h3 class="topic-card-title">${topic.name}</h3>
          <div class="topic-card-urdu-title">${topic.urdu}</div>
          <p class="topic-card-summary">${topic.summary}</p>
        </div>

        <div class="topic-card-quote-preview">
          <div class="quote-arabic" dir="rtl">${truncateText(firstAyah.arabic, 65)}</div>
          <div class="quote-ref">${firstAyah.ref}</div>
        </div>

        <div class="topic-card-footer">
          <button type="button" class="btn btn-primary btn-sm btn-open-topic" data-topic-id="${topic.id}">
            <span>Explore Verses & Reflection</span>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
          <a href="quran.html?surah=${firstAyah.surahNumber}&ayah=${firstAyah.ayahNumber}" class="btn-read-quick" title="Jump directly to ${firstAyah.ref} in Quran Reader" onclick="event.stopPropagation();">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            <span>Reader</span>
          </a>
        </div>
      </article>
    `;
  }).join('');

  container.innerHTML = cardsHtml;
}

function formatCategoryName(category) {
  switch (category) {
    case 'spiritual': return 'Spiritual & Faith';
    case 'character': return 'Character & Ethics';
    case 'life': return 'Life & Family';
    case 'saved': return 'Saved Ayat';
    default: return 'Quranic Theme';
  }
}

function truncateText(str, maxLen) {
  if (!str || str.length <= maxLen) return str;
  return str.substring(0, maxLen).trim() + '…';
}

function updateFilterCounts() {
  const counts = {
    all: TOPICS_DATABASE.length,
    spiritual: TOPICS_DATABASE.filter(t => t.category === 'spiritual').length,
    character: TOPICS_DATABASE.filter(t => t.category === 'character').length,
    life: TOPICS_DATABASE.filter(t => t.category === 'life').length
  };

  const countAll = document.getElementById('count-all');
  const countSpiritual = document.getElementById('count-spiritual');
  const countCharacter = document.getElementById('count-character');
  const countLife = document.getElementById('count-life');

  if (countAll) countAll.textContent = counts.all;
  if (countSpiritual) countSpiritual.textContent = counts.spiritual;
  if (countCharacter) countCharacter.textContent = counts.character;
  if (countLife) countLife.textContent = counts.life;

  // Saved Ayat count
  if (window.NoorBookmarks) {
    const savedList = window.NoorBookmarks.getAll();
    const countSaved = document.getElementById('count-saved');
    if (countSaved) countSaved.textContent = savedList.length;
  }
}

/* ============================================================
   4. TOPIC DETAIL MODAL
   ============================================================ */

function openTopicModal(topicId) {
  const topic = TOPICS_DATABASE.find(t => t.id === topicId);
  if (!topic) return;

  TopicState.activeTopicId = topicId;

  const modal = document.getElementById('topic-detail-modal');
  if (!modal) return;

  // Populate Header
  const categoryBadge = document.getElementById('modal-category-badge');
  const topicEn = document.getElementById('modal-topic-en');
  const topicAr = document.getElementById('modal-topic-ar');
  const topicUr = document.getElementById('modal-topic-ur');
  const topicIcon = document.getElementById('modal-topic-icon');
  const topicDesc = document.getElementById('modal-topic-desc');
  const reflectionPrompt = document.getElementById('modal-reflection-prompt');
  const footerQuranBtn = document.getElementById('modal-footer-quran-btn');

  if (categoryBadge) categoryBadge.textContent = formatCategoryName(topic.category);
  if (topicEn) topicEn.textContent = topic.name;
  if (topicAr) topicAr.textContent = topic.arabic;
  if (topicUr) topicUr.textContent = topic.urdu;
  if (topicIcon) topicIcon.textContent = topic.icon;
  if (topicDesc) topicDesc.textContent = topic.summary;
  if (reflectionPrompt) reflectionPrompt.textContent = topic.reflectionPrompt;

  // First Ayah link for quick jump
  if (footerQuranBtn && topic.ayahs.length > 0) {
    const a = topic.ayahs[0];
    footerQuranBtn.href = `quran.html?surah=${a.surahNumber}&ayah=${a.ayahNumber}`;
    footerQuranBtn.innerHTML = `
      Read ${topic.ayahs.length > 1 ? 'Verses' : 'Verse'} in Quran Reader
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
    `;
  }

  // Populate Verses List
  renderModalVerses(topic);

  // Populate Reflection Note
  const savedReflections = getSavedReflections();
  const reflectionTextarea = document.getElementById('topic-reflection-note');
  const reflectionStatus = document.getElementById('reflection-saved-status');

  if (reflectionTextarea) {
    reflectionTextarea.value = savedReflections[topicId]?.text || '';
  }
  if (reflectionStatus) {
    if (savedReflections[topicId]?.updatedAt) {
      const date = new Date(savedReflections[topicId].updatedAt);
      reflectionStatus.textContent = `Last saved: ${date.toLocaleDateString()} at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      reflectionStatus.textContent = '';
    }
  }

  // Show Modal
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  // Apply font size
  applyModalFontSize();

  // Update browser URL query without reloading (for shareable links)
  try {
    const url = new URL(window.location);
    url.searchParams.set('topic', topicId);
    window.history.replaceState({}, '', url);
  } catch {}
}

function closeTopicModal() {
  const modal = document.getElementById('topic-detail-modal');
  if (!modal) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  TopicState.activeTopicId = null;

  // Clean URL query
  try {
    const url = new URL(window.location);
    url.searchParams.delete('topic');
    window.history.replaceState({}, '', url);
  } catch {}
}

function renderModalVerses(topic) {
  const container = document.getElementById('modal-verses-list');
  if (!container) return;

  const versesHtml = topic.ayahs.map((ayah, idx) => {
    const ayahId = `${ayah.surahNumber}:${ayah.ayahNumber}`;
    const isBookmarked = window.NoorBookmarks && window.NoorBookmarks.isSaved(ayahId);

    return `
      <div class="topic-modal-ayah-card" data-ayah-id="${ayahId}">
        <div class="ayah-card-top-bar">
          <div class="ayah-num-badge">
            <span class="num-circle">${idx + 1}</span>
            <span class="ayah-surah-ref">${ayah.ref}</span>
          </div>

          <div class="ayah-actions-toolbar">
            <button 
              type="button" 
              class="btn-verse-tool btn-verse-bookmark ${isBookmarked ? 'bookmarked' : ''}" 
              data-bookmark-id="${ayahId}"
              data-surah="${ayah.surahNameEn}"
              data-ayah="${ayah.ayahNumber}"
              data-ref="${ayah.ref}"
              title="${isBookmarked ? 'Remove Bookmark' : 'Bookmark this Ayah'}"
              aria-label="Bookmark verse"
              aria-pressed="${isBookmarked ? 'true' : 'false'}"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>${isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button 
              type="button" 
              class="btn-verse-tool btn-copy-verse" 
              data-ayah-id="${ayahId}"
              title="Copy Arabic & Urdu to Clipboard"
              aria-label="Copy verse text"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>Copy</span>
            </button>

            <a 
              href="quran.html?surah=${ayah.surahNumber}&ayah=${ayah.ayahNumber}" 
              class="btn-verse-tool btn-quran-jump" 
              title="Open Ayah in Al-Quran Reader with Recitation"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              <span>Read in Quran</span>
            </a>

            <a 
              href="journal.html?surah=${ayah.surahNumber}&ayah=${ayah.ayahNumber}&title=${encodeURIComponent('Reflection on ' + ayah.ref)}" 
              class="btn-verse-tool btn-journal-jump" 
              title="Write a personal reflection on this Ayah in My Journal"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              <span>Reflect</span>
            </a>
          </div>
        </div>

        <div class="ayah-modal-arabic" dir="rtl" lang="ar">
          ${ayah.arabic}
          <span class="ayah-end-sign" aria-hidden="true"> ۝${ayah.ayahNumber}</span>
        </div>

        <div class="ayah-modal-urdu" dir="rtl" lang="ur">
          ${ayah.urdu}
        </div>

        <div class="ayah-translator-meta">
          <span>ترجمہ: مولانا فتح محمد جالندھری (مستند ایڈیشن)</span>
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = versesHtml;
}

function applyModalFontSize() {
  const container = document.getElementById('modal-verses-list');
  if (!container) return;
  const offset = TopicState.fontSizeOffset;
  container.style.setProperty('--font-size-offset', `${offset}px`);
}

/* ============================================================
   5. COPY VERSE UTILITY
   ============================================================ */

function copyVerseToClipboard(ayahId) {
  // Find ayah in database
  let targetAyah = null;
  for (const topic of TOPICS_DATABASE) {
    const found = topic.ayahs.find(a => `${a.surahNumber}:${a.ayahNumber}` === ayahId);
    if (found) {
      targetAyah = found;
      break;
    }
  }

  if (!targetAyah) return;

  const textToCopy = `${targetAyah.arabic}\n\n${targetAyah.urdu}\n\n— ${targetAyah.ref}\n(Raah-e-Ishq-o-Hidayat | راہِ عشق و ہدایت)`;

  navigator.clipboard.writeText(textToCopy).then(() => {
    if (window.NoorToast) {
      window.NoorToast.show('Verse copied to clipboard 📋', 'success');
    } else {
      alert('Verse copied to clipboard!');
    }
  }).catch(() => {
    // Fallback for older browsers
    const tempInput = document.createElement('textarea');
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    if (window.NoorToast) {
      window.NoorToast.show('Verse copied to clipboard 📋', 'success');
    }
  });
}

/* ============================================================
   6. EVENT LISTENERS & INITIALIZATION
   ============================================================ */

function initTopicsPage() {
  console.info('[Noor] Initialising Quran Topic Explorer module...');

  // 1. Initial Render
  renderTopics();

  // 2. Search Input Handling (with debounce)
  const searchInput = document.getElementById('topics-search-input');
  const searchClear = document.getElementById('topics-search-clear');
  let searchDebounceTimer = null;

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const val = e.target.value;
      if (searchClear) {
        searchClear.style.display = val ? 'flex' : 'none';
      }
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(() => {
        TopicState.searchQuery = val;
        renderTopics();
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
      TopicState.searchQuery = '';
      renderTopics();
    });
  }

  const btnResetSearch = document.getElementById('btn-reset-topics-search');
  if (btnResetSearch) {
    btnResetSearch.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.style.display = 'none';
      TopicState.searchQuery = '';
      TopicState.activeCategory = 'all';

      document.querySelectorAll('.topic-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-category') === 'all');
        btn.setAttribute('aria-selected', btn.getAttribute('data-category') === 'all' ? 'true' : 'false');
      });

      renderTopics();
    });
  }

  // 3. Category Filter Tabs
  const filterPillsContainer = document.getElementById('topics-filter-pills');
  if (filterPillsContainer) {
    filterPillsContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.topic-filter-btn');
      if (!btn) return;

      const category = btn.getAttribute('data-category');
      TopicState.activeCategory = category;

      document.querySelectorAll('.topic-filter-btn').forEach(b => {
        const isActive = b === btn;
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      renderTopics();
    });
  }

  // 4. Topic Cards Click Delegation
  const cardsContainer = document.getElementById('topics-cards-container');
  if (cardsContainer) {
    cardsContainer.addEventListener('click', (e) => {
      const card = e.target.closest('.topic-explorer-card');
      if (!card) return;

      // Ignore if clicked on a direct link
      if (e.target.closest('a')) return;

      const topicId = card.getAttribute('data-topic-id');
      if (topicId) {
        openTopicModal(topicId);
      }
    });

    // Keyboard access (Enter / Space on card)
    cardsContainer.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const card = e.target.closest('.topic-explorer-card');
        if (card && e.target === card) {
          e.preventDefault();
          const topicId = card.getAttribute('data-topic-id');
          if (topicId) openTopicModal(topicId);
        }
      }
    });
  }

  // 5. Modal Close Controls
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalFooterClose = document.getElementById('modal-footer-close');
  const modal = document.getElementById('topic-detail-modal');

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeTopicModal);
  if (modalFooterClose) modalFooterClose.addEventListener('click', closeTopicModal);

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeTopicModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const m = document.getElementById('topic-detail-modal');
      if (m && m.classList.contains('active')) {
        closeTopicModal();
      }
    }
  });

  // 6. Modal Font Sizing Controls
  const btnFontDec = document.getElementById('btn-modal-font-dec');
  const btnFontReset = document.getElementById('btn-modal-font-reset');
  const btnFontInc = document.getElementById('btn-modal-font-inc');

  if (btnFontDec) {
    btnFontDec.addEventListener('click', () => {
      if (TopicState.fontSizeOffset > -4) {
        TopicState.fontSizeOffset -= 2;
        applyModalFontSize();
      }
    });
  }

  if (btnFontReset) {
    btnFontReset.addEventListener('click', () => {
      TopicState.fontSizeOffset = 0;
      applyModalFontSize();
    });
  }

  if (btnFontInc) {
    btnFontInc.addEventListener('click', () => {
      if (TopicState.fontSizeOffset < 8) {
        TopicState.fontSizeOffset += 2;
        applyModalFontSize();
      }
    });
  }

  // 7. Modal Ayah Actions Delegation (Copy, Bookmark)
  const modalVersesList = document.getElementById('modal-verses-list');
  if (modalVersesList) {
    modalVersesList.addEventListener('click', (e) => {
      // Copy Verse
      const copyBtn = e.target.closest('.btn-copy-verse');
      if (copyBtn) {
        e.preventDefault();
        const ayahId = copyBtn.getAttribute('data-ayah-id');
        copyVerseToClipboard(ayahId);
        return;
      }

      // Bookmark Verse Toggle
      const bookmarkBtn = e.target.closest('.btn-verse-bookmark');
      if (bookmarkBtn) {
        e.preventDefault();
        const ayahId = bookmarkBtn.getAttribute('data-bookmark-id');
        const surah = bookmarkBtn.getAttribute('data-surah');
        const ayah = bookmarkBtn.getAttribute('data-ayah');
        const ref = bookmarkBtn.getAttribute('data-ref');

        if (window.NoorBookmarks) {
          const isSaved = window.NoorBookmarks.toggle({
            id: ayahId,
            surah: surah,
            ayah: ayah,
            ref: ref
          });

          bookmarkBtn.classList.toggle('bookmarked', isSaved);
          bookmarkBtn.setAttribute('aria-pressed', isSaved ? 'true' : 'false');
          bookmarkBtn.querySelector('span').textContent = isSaved ? 'Saved' : 'Save';
          bookmarkBtn.querySelector('svg').setAttribute('fill', isSaved ? 'currentColor' : 'none');

          updateFilterCounts();
        }
      }
    });
  }

  // 8. Personal Reflection Note Saving
  const btnSaveReflection = document.getElementById('btn-save-topic-reflection');
  if (btnSaveReflection) {
    btnSaveReflection.addEventListener('click', () => {
      if (!TopicState.activeTopicId) return;
      const textarea = document.getElementById('topic-reflection-note');
      const text = textarea ? textarea.value : '';
      saveReflection(TopicState.activeTopicId, text);

      const status = document.getElementById('reflection-saved-status');
      if (status) {
        const now = new Date();
        status.textContent = `Saved at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        status.style.color = 'var(--color-primary)';
      }

      if (window.NoorToast) {
        window.NoorToast.show('Personal reflection note saved 📝', 'success');
      }
    });
  }

  // 9. Check URL Query for Direct Topic Link (e.g. topics.html?topic=sabr)
  const params = new URLSearchParams(window.location.search);
  const directTopic = params.get('topic');
  if (directTopic) {
    const matched = TOPICS_DATABASE.find(t => t.id === directTopic.toLowerCase());
    if (matched) {
      setTimeout(() => {
        openTopicModal(matched.id);
      }, 150);
    }
  }

  // 10. Update bookmarks count if changed
  window.addEventListener('storage', () => {
    updateFilterCounts();
  });
}

// Initialise when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTopicsPage);
} else {
  initTopicsPage();
}
