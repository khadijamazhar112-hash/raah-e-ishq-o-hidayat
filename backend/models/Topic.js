/**
 * Noor (نور) — Topic Model
 */

const TOPIC_ITEMS = [
  {
    id: 'sabr',
    category: 'spiritual',
    name: 'Sabr (Patience & Perseverance)',
    arabic: 'الصَّبْرُ وَالِاسْتِقَامَةُ',
    urdu: 'صبر اور استقامت',
    icon: '🌱',
    summary: 'Patience in difficulty, restraining the soul, and steadfastness in worship.',
    reflectionPrompt: 'When faced with trials today, how can you replace irritation with trust in Allah’s timing?',
    ayahsCount: 2
  },
  {
    id: 'tawakkul',
    category: 'spiritual',
    name: 'Tawakkul (Trust in Allah)',
    arabic: 'التَّوَكُّلُ عَلَى اللَّهِ',
    urdu: 'اللہ پر توکل و بھروسہ',
    icon: '🛡️',
    summary: 'Taking lawful means with sincere effort while leaving outcomes to Allah.',
    reflectionPrompt: 'What worry are you holding on to that you can surrender to Allah after taking your steps?',
    ayahsCount: 2
  },
  {
    id: 'shukar',
    category: 'spiritual',
    name: 'Shukar (Gratitude)',
    arabic: 'الشُّكْرُ وَالاعْتِرَافُ بِالنِّعْمَةِ',
    urdu: 'شکر اور اعترافِ نعمت',
    icon: '✨',
    summary: 'Recognizing blessings with the heart, expressing praise, and acting in obedience.',
    reflectionPrompt: 'Name three quiet blessings today. How will you express your gratitude?',
    ayahsCount: 2
  },
  {
    id: 'forgiveness',
    category: 'spiritual',
    name: 'Forgiveness & Repentance (Maghfirah)',
    arabic: 'المَغْفِرَةُ وَالتَّوْبَةُ',
    urdu: 'مغفرت اور سچی توبہ',
    icon: '🕊️',
    summary: 'Returning to Allah with remorse, confident in His vast pardon.',
    reflectionPrompt: 'Is there a burden on your heart you need to seek forgiveness for today?',
    ayahsCount: 2
  },
  {
    id: 'parents',
    category: 'life',
    name: 'Honouring Parents (Birr al-Walidayn)',
    arabic: 'بِرُّ الوَالِدَيْنِ وَالإِحْسَانُ',
    urdu: 'والدین کی خدمت اور اطاعت',
    icon: '🏡',
    summary: 'Treating parents with tenderness, respectful speech, and prayers.',
    reflectionPrompt: 'What kind deed or sincere prayer can you offer for your parents today?',
    ayahsCount: 2
  }
];

const Topic = {
  getAll() {
    return TOPIC_ITEMS;
  },

  getById(id) {
    return TOPIC_ITEMS.find(t => t.id === id.toLowerCase()) || null;
  }
};

module.exports = Topic;
