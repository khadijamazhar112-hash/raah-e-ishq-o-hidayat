/**
 * Noor (نور) — Azkar Model & Categories
 */

const { query } = require('../config/database');

const AZKAR_CATEGORIES = [
  { id: 1, slug: 'morning', nameEn: 'Morning Azkar', nameAr: 'أذكار الصباح', nameUr: 'صبح کے اذکار', icon: '🌅', count: 5 },
  { id: 2, slug: 'evening', nameEn: 'Evening Azkar', nameAr: 'أذكار المساء', nameUr: 'شام کے اذکار', icon: '🌆', count: 5 },
  { id: 3, slug: 'prayer', nameEn: 'After Salah Azkar', nameAr: 'أذكار بعد الصلاة', nameUr: 'نماز کے بعد کے اذکار', icon: '🕌', count: 5 },
  { id: 4, slug: 'sleep', nameEn: 'Before Sleep Azkar', nameAr: 'أذكار النوم', nameUr: 'سوتے وقت کے اذکار', icon: '🌙', count: 3 },
  { id: 5, slug: 'general', nameEn: 'General Daily Azkar', nameAr: 'أذكار عامة', nameUr: 'عام یومیہ اذکار', icon: '📿', count: 3 }
];

const SAMPLE_AZKAR_ITEMS = [
  {
    id: 'm-1',
    category: 'morning',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ',
    urdu: 'ہم نے صبح کی اور اللہ کے سارے ملک نے صبح کی، اور سب تعریف اللہ کے لیے ہے، اللہ کے سوا کوئی معبود نہیں وہ اکیلا ہے اس کا کوئی شریک نہیں',
    count: 1,
    source: 'صحیح مسلم: 2723 (حصن المسلم)'
  },
  {
    id: 'm-2',
    category: 'morning',
    arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا، وَبِكَ أَمْسَيْنَا، وَبِكَ نَحْيَا، وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ',
    urdu: 'اے اللہ! تیری ہی توفیق سے ہم نے صبح کی اور تیری ہی توفیق سے ہم نے شام کی اور تیرے ہی حکم سے ہم جیتے ہیں اور تیرے ہی حکم سے مرتے ہیں اور تیری ہی طرف لوٹ کر جانا ہے',
    count: 1,
    source: 'سنن ترمذی: 3391 (صحیح)'
  },
  {
    id: 'e-1',
    category: 'evening',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَـهَ إِلاَّ اللهُ وَحْدَهُ لاَ شَرِيكَ لَهُ',
    urdu: 'ہم نے شام کی اور اللہ کے سارے ملک نے شام کی، اور سب تعریف اللہ ہی کے لیے ہے',
    count: 1,
    source: 'صحیح مسلم: 2723 (حصن المسلم)'
  },
  {
    id: 'p-1',
    category: 'prayer',
    arabic: 'أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ، أَسْتَغْفِرُ اللَّهَ',
    urdu: 'میں اللہ سے بخشش مانگتا ہوں، میں اللہ سے بخشش مانگتا ہوں، میں اللہ سے بخشش مانگتا ہوں',
    count: 3,
    source: 'صحیح مسلم: 591'
  },
  {
    id: 's-1',
    category: 'sleep',
    arabic: 'بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ',
    urdu: 'اے میرے رب! تیرے ہی نام کے ساتھ میں نے اپنا پہلو رکھا اور تیرے ہی نام کے ساتھ میں اسے اٹھاؤں گا',
    count: 1,
    source: 'صحیح البخاری: 6320، صحیح مسلم: 2714'
  }
];

const Azkar = {
  async getCategories() {
    try {
      const res = await query('SELECT * FROM azkar_categories ORDER BY id ASC');
      if (res && res.rows && res.rows.length > 0) return res.rows;
    } catch {}
    return AZKAR_CATEGORIES;
  },

  async getByCategory(categorySlug) {
    if (!categorySlug || categorySlug === 'all') return SAMPLE_AZKAR_ITEMS;
    return SAMPLE_AZKAR_ITEMS.filter(a => a.category === categorySlug);
  },

  async getById(id) {
    return SAMPLE_AZKAR_ITEMS.find(a => a.id === id) || null;
  }
};

module.exports = Azkar;
