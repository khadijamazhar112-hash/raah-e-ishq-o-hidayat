/**
 * Noor (نور) — Duas Model
 */

const { query } = require('../config/database');

const DUA_ITEMS = [
  {
    id: 'dua-waking-up',
    category: 'morning-evening',
    titleEn: 'After Waking Up',
    titleUr: 'نیند سے بیدار ہونے کے بعد',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    urdu: 'تمام تعریفیں اللہ کے لیے ہیں جس نے ہمیں مارنے کے بعد زندہ کیا اور اسی کی طرف لوٹ کر جانا ہے',
    transliteration: 'Alhamdu lillahil-lathee ahyana ba''da ma amatana wa-ilayhin-nushoor',
    source: 'صحیح البخاری: 6312 (حصن المسلم)'
  },
  {
    id: 'dua-sleeping',
    category: 'sleeping',
    titleEn: 'Before Sleeping',
    titleUr: 'سوتے وقت کی دعا',
    arabic: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
    urdu: 'اے اللہ! میں تیرے نام کے ساتھ مرتا (سوتا) ہوں اور جیتا (جاگتا) ہوں',
    transliteration: 'Allahumma bismika amootu wa-ahya',
    source: 'صحیح البخاری: 6324 (حصن المسلم)'
  },
  {
    id: 'dua-eating-before',
    category: 'eating',
    titleEn: 'Before Eating',
    titleUr: 'کھانا شروع کرنے سے پہلے',
    arabic: 'بِسْمِ اللَّهِ',
    urdu: 'اللہ کے نام کے ساتھ (میں کھانا شروع کرتا ہوں)',
    transliteration: 'Bismillah',
    source: 'صحیح البخاری: 5376، صحیح مسلم: 2017'
  },
  {
    id: 'dua-eating-after',
    category: 'eating',
    titleEn: 'After Eating',
    titleUr: 'کھانے سے فراغت کے بعد',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    urdu: 'تمام تعریفیں اللہ ہی کے لیے ہیں جس نے مجھے یہ کھانا کھلایا اور میری طاقت اور قوت کے بغیر یہ رزق مجھے عطا فرمایا',
    transliteration: 'Alhamdu lillahil-lathee at''amana hatha warazaqaneehi min ghayri hawlin minnee wala quwwah',
    source: 'سنن ترمذی: 3458 (حسن)'
  },
  {
    id: 'dua-leaving-home',
    category: 'home',
    titleEn: 'Leaving Home',
    titleUr: 'گھر سے نکلتے وقت',
    arabic: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    urdu: 'اللہ کے نام کے ساتھ، میں نے اللہ پر بھروسہ کیا، اور گناہوں سے بچنے اور نیکی کرنے کی کوئی طاقت نہیں مگر اللہ ہی کی توفیق سے',
    transliteration: 'Bismillahi tawakkaltu ''alallahi wala hawla wala quwwata illa billah',
    source: 'سنن ابوداؤد: 5095 (صحیح)'
  }
];

const Dua = {
  async getAll() {
    return DUA_ITEMS;
  },

  async getByCategory(cat) {
    if (!cat || cat === 'all') return DUA_ITEMS;
    return DUA_ITEMS.filter(d => d.category === cat);
  },

  async search(q) {
    if (!q) return DUA_ITEMS;
    const term = q.toLowerCase().trim();
    return DUA_ITEMS.filter(d => 
      d.titleEn.toLowerCase().includes(term) ||
      d.titleUr.includes(term) ||
      d.urdu.includes(term) ||
      d.arabic.includes(term)
    );
  }
};

module.exports = Dua;
