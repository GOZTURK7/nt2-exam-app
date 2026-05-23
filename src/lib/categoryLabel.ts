// Maps raw category strings (from vocabulary data) to display labels per language.
// Falls back to a cleaned-up version of the raw string when no entry is found.

const EN: Record<string, string> = {
  // Morning / daily routine
  'sabah ruti̇ni̇': 'Morning Routine',
  'gi̇ysi̇ eylemleri̇': 'Clothing Actions',
  'ev i̇şleri̇': 'Household Chores',
  'elektroni̇k': 'Electronics',
  // Preferences / opinions
  'terci̇h & görüş': 'Preferences & Opinions',
  'mening': 'Opinion',
  // Clothing
  'gi̇ysi̇ parçalari': 'Clothing Parts',
  'aksesuar': 'Accessories',
  // Movement / body
  'hareket fi̇i̇lleri̇': 'Movement Verbs',
  'vücut parçalari': 'Body Parts',
  // Health
  'zi̇ekenhui̇s': 'Hospital',
  'blessure': 'Injuries',
  'zi̇ekenhui̇s / tali̇mat': 'Hospital Instructions',
  'arbo / nek & rug [2025]': 'Workplace Health',
  // Transport
  'ulaşim fi̇i̇lleri̇ (stres altinda kaybolanlar)': 'Transport Verbs',
  'ulaşim araçlari': 'Vehicles',
  'trendeki̇ detaylar': 'Train Details',
  'transport / milieu': 'Transport & Environment',
  // Education
  'opleiding & stage': 'Education & Internship',
  'studie vergelijking': 'Study Comparison',
  'studi̇erei̇s voorstel [2025]': 'Study Trip Proposal',
  // Persuasion / proposals
  'ikna fi̇i̇lleri̇': 'Persuasion Verbs',
  'voorstel structuur': 'Proposal Structure',
  'formele taal': 'Formal Language',
  // Phone / office
  'telefoon kaliplari': 'Phone Phrases',
  'telefon açma / kapama': 'Phone Conversations',
  'kantoor / werk': 'Office & Work',
  'klantenservice / wachttijden [2025]': 'Customer Service',
  // Complaints / housing
  'şi̇kayet di̇li̇ (yeni̇)': 'Complaint Language',
  'konut problemleri̇': 'Housing Problems',
  'buurt & gemeente': 'Neighbourhood & Municipality',
  // Rules / society
  'kurallar (hafta 2 yeni̇)': 'Rules',
  'maatschappij': 'Society',
  'maatschappeli̇jke meni̇ngen': 'Social Opinions',
  'di̇gi̇tali̇zeri̇ng (hafta 2-3 yeni̇)': 'Digitalization',
  // Environment
  'milieu': 'Environment',
  'afval': 'Waste & Recycling',
  // Comparisons / data
  'karşilaştirma': 'Comparison',
  'araştirma di̇li̇': 'Research Language',
  'grafi̇k di̇li̇': 'Chart Language',
  'oorzaak / gevolg': 'Cause & Effect',
  'structuur woorden': 'Structure Words',
  // Safety
  'brandveiligheid [2025]': 'Fire Safety',
  // Delivery / sequences
  'bezorgdienst / pakket': 'Delivery & Packages',
  'siralamali eylemler': 'Sequential Actions',
  // Volunteer / money
  'gönüllüleri̇ çalişma': 'Volunteer Work',
  'geld & admi̇ni̇strati̇e': 'Money & Administration',
  // Children
  'ki̇nderen & vri̇je ti̇jd [2025 deel 3]': 'Children & Leisure',
  // Exam strategies
  'kelime atlatma (stres strateji̇si̇)': 'Word Bypass Strategies',
  // Review weeks
  'hafta 1-2 temel fi̇i̇ller': 'Week 1–2 Core Verbs',
  'hafta 3 temalar': 'Week 3 Topics',
};

const TR: Record<string, string> = {
  'sabah ruti̇ni̇': 'Sabah Rutini',
  'gi̇ysi̇ eylemleri̇': 'Giysi Eylemleri',
  'ev i̇şleri̇': 'Ev İşleri',
  'elektroni̇k': 'Elektronik',
  'terci̇h & görüş': 'Tercih & Görüş',
  'gi̇ysi̇ parçalari': 'Giysi Parçaları',
  'hareket fi̇i̇lleri̇': 'Hareket Fiilleri',
  'vücut parçalari': 'Vücut Parçaları',
  'zi̇ekenhui̇s': 'Hastane',
  'blessure': 'Yaralanma',
  'zi̇ekenhui̇s / tali̇mat': 'Hastane / Talimatlar',
  'arbo / nek & rug [2025]': 'İş Sağlığı',
  'ulaşim fi̇i̇lleri̇ (stres altinda kaybolanlar)': 'Ulaşım Fiilleri',
  'ulaşim araçlari': 'Ulaşım Araçları',
  'trendeki̇ detaylar': 'Tren Detayları',
  'opleiding & stage': 'Eğitim & Staj',
  'studie vergelijking': 'Eğitim Karşılaştırması',
  'studi̇erei̇s voorstel [2025]': 'Eğitim Gezisi Önerisi',
  'ikna fi̇i̇lleri̇': 'İkna Fiilleri',
  'telefoon kaliplari': 'Telefon Kalıpları',
  'telefon açma / kapama': 'Telefon Konuşmaları',
  'kantoor / werk': 'Ofis & İş',
  'klantenservice / wachttijden [2025]': 'Müşteri Hizmetleri',
  'şi̇kayet di̇li̇ (yeni̇)': 'Şikayet Dili',
  'konut problemleri̇': 'Konut Sorunları',
  'kurallar (hafta 2 yeni̇)': 'Kurallar',
  'maatschappeli̇jke meni̇ngen': 'Toplumsal Görüşler',
  'di̇gi̇tali̇zeri̇ng (hafta 2-3 yeni̇)': 'Dijitalleşme',
  'karşilaştirma': 'Karşılaştırma',
  'araştirma di̇li̇': 'Araştırma Dili',
  'grafi̇k di̇li̇': 'Grafik Dili',
  'brandveiligheid [2025]': 'Yangın Güvenliği',
  'bezorgdienst / pakket': 'Teslimat & Paket',
  'siralamali eylemler': 'Sıralı Eylemler',
  'gönüllüleri̇ çalişma': 'Gönüllü Çalışma',
  'geld & admi̇ni̇strati̇e': 'Para & Yönetim',
  'ki̇nderen & vri̇je ti̇jd [2025 deel 3]': 'Çocuklar & Boş Zaman',
  'kelime atlatma (stres strateji̇si̇)': 'Kelime Atlatma Stratejisi',
  'hafta 1-2 temel fi̇i̇ller': 'Hafta 1–2 Temel Fiiller',
  'hafta 3 temalar': 'Hafta 3 Temaları',
};

function cleanFallback(raw: string): string {
  return raw
    .replace(/\[.*?\]|\(.*?\)/g, '')
    .replace(/[-_]/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function categoryLabel(raw: string, lang: 'tr' | 'en'): string {
  const map = lang === 'en' ? EN : TR;
  return map[raw] ?? cleanFallback(raw);
}
