# Skill: NT2 İçerik Girişi (`/add-content`)

Bu skill, NT2 Staatsexamen hazırlık uygulaması için sınav içeriğini (kelimeler, kalıplar, okuma metinleri) TypeScript veri dosyalarına dönüştürür.

## Projenin Veri Mimarisi

Proje: `C:\Users\gokha\Desktop\staatsexamen`

```
src/data/
  content.ts              ← ExamContent ana nesnesi, tüm skill dosyalarını import eder
  extracted-b2-spreken.ts ← mevcut örnek: B2 spreken verisi
  {level}-{skill}.ts      ← yeni dosyalar bu formatta oluşturulur (örn: b1-lezen.ts)

src/types/index.ts        ← tüm interface tanımları burada
```

## TypeScript Interface'leri (ezberle)

```typescript
interface Word {
  id: string;                          // "w_b1_lz_001"
  nl: string;                          // Hollandaca kelime/ifade
  translations: Record<string, string>; // { tr: "Türkçe karşılık" }
  context: string;                     // örnek cümle (tek cümle, yalın)
  category: string;                    // kelime grubu adı (küçük harf, tire ile)
  isConcreteWord: boolean;             // aşağıdaki kurallara göre
}

interface Phrase {
  id: string;                          // "p_b1_lz_001"
  nl: string;                          // Hollandaca kalıp
  translations: Record<string, string>; // { tr: "Türkçe karşılık" }
}

interface ReadingText {
  id: string;                          // "txt_b1_lz_2017_01"
  year: number;                        // sınav yılı: 2017, 2025...
  title: string;                       // metnin başlığı
  text: string;                        // tam metin (paragrafları \n\n ile ayır)
  level: 'B1' | 'B2';
  theme: string;                       // 'milieu', 'werk', 'gezondheid', 'samenleving'...
  questions?: ReadingQuestion[];        // opsiyonel, varsa ekle
}

interface ReadingQuestion {
  id: string;                          // "q_b1_lz_2017_01_01"
  question: string;
  type: 'multiple-choice' | 'open';
  options?: string[];                  // MC için ["A. ...", "B. ...", "C. ...", "D. ..."]
  answer: string;                      // MC için "A", open için tam cevap
}
```

## ID Naming Kuralları

| Tür       | Format                          | Örnek                   |
|-----------|----------------------------------|-------------------------|
| Word      | `w_{level}_{skill}_{NNN}`       | `w_b1_lz_001`           |
| Phrase    | `p_{level}_{skill}_{NNN}`       | `p_b2_sw_012`           |
| ReadingText | `txt_{level}_{skill}_{year}_{NN}` | `txt_b1_lz_2017_01`  |
| Question  | `q_{level}_{skill}_{year}_{text_NN}_{q_NN}` | `q_b1_lz_2017_01_03` |

**Skill kısaltmaları:**
- spreken → `sp`
- lezen → `lz`
- schrijven → `sw`
- luisteren → `ls`

**Level kısaltmaları:** `b1`, `b2`

## `isConcreteWord` Karar Kuralları

`true` — fiziksel, elle tutulur, somut nesneler:
- Giysi parçaları (veter, rits, mouw, kraag, naad...)
- Aksesuarlar (armband, ketting, ring, oorbellen...)
- Vücut parçaları (knie, enkel, pols, schouder...)
- Güvenlik ekipmanları (brandblusser, rookmelder, nooduitgang...)
- Fiziksel tıbbi araçlar (kruk, recept...)

`false` — fiiller, soyut kavramlar, bağlaçlar, söylem işaretleyicileri:
- Eylem fiilleri (opstaan, afwassen, overstappen...)
- Soyut isimler (vrijheid, verantwoordelijkheid, verslaving...)
- Söylem kalıpları (bovendien, kortom, volgens mij...)

**İstisna `true`:** stofzuigen, dweilen (stres altında kaybolan spesifik fiiller)

## Output Dosyası Formatı

Yeni bir `src/data/{level}-{skill}.ts` dosyası oluştur:

```typescript
import type { Word, Phrase } from '../types';
// lezen için: import type { Word, Phrase, ReadingText } from '../types';

export const {camelCase}Words: Word[] = [
  { id: '...', nl: '...', translations: { tr: '...' }, context: '...', category: '...', isConcreteWord: false },
  // ...
];

export const {camelCase}Phrases: Phrase[] = [
  { id: '...', nl: '...', translations: { tr: '...' } },
  // ...
];

// Sadece lezen:
export const {camelCase}Texts: ReadingText[] = [
  {
    id: '...',
    year: 2017,
    title: '...',
    text: `Paragraf 1...\n\nParagraf 2...`,
    level: 'B1',
    theme: '...',
    questions: [
      { id: '...', question: '...', type: 'multiple-choice', options: ['A. ...', 'B. ...', 'C. ...', 'D. ...'], answer: 'B' },
    ],
  },
];
```

**camelCase dönüşümü:** `b1-lezen` → `b1Lezen`, `b2-schrijven` → `b2Schrijven`

## `content.ts` Güncelleme Kuralı

Yeni dosyayı `src/data/content.ts`'e ekle:

```typescript
// Yeni import ekle:
import { b1LezenWords, b1LezenPhrases, b1LezenTexts } from './b1-lezen';

// İlgili satırı güncelle (EMPTY yerine):
B1: {
  lezen: { words: b1LezenWords, phrases: b1LezenPhrases, texts: b1LezenTexts },
  // ...
}
```

## Çalışma Akışı

1. Kullanıcı `/add-content` yazar
2. **Sor:** "Hangi level ve skill? (örn: B1 lezen, B2 schrijven)"
3. **Sor:** "Ham içeriği paste et — sınav soruları, metinler, kelime listeleri"
4. İçeriği analiz et:
   - Kelimeleri ayıkla → `Word[]`
   - Kalıpları ayıkla → `Phrase[]`
   - Lezen için metin varsa → `ReadingText[]`
5. Dosyayı yaz: `src/data/{level}-{skill}.ts`
6. `content.ts`'i güncelle (import + atama)
7. TypeScript kontrolü: `npx tsc --noEmit`

## Lezen'e Özel Kategori İsimleri

Okuma becerisinde standart kategoriler:
- `leesvaardigheid` — genel okuma becerileri
- `tekstbegrip` — metin anlama
- `woordenschat-context` — bağlam içinde kelime bilgisi
- `verbindingswoorden` — bağlaçlar ve geçiş ifadeleri
- `leesstrategieën` — okuma stratejileri (skimmen, scannen...)
- `signaalwoorden` — sinyal kelimeler (echter, daarentegen, bovendien...)
- `thema: {tema-adı}` — konu bazlı (milieu, werk, gezondheid...)

## Yazım / Dinleme Becerisi Notları

**schrijven (B1/B2):** Kelimeler formal yazı diline ait olmalı. Kategoriler:
- `formele-taal`, `brief-structuur`, `argumentatie`, `connectiewoorden`

**luisteren (B1/B2):** Konuşma diline ait kelimeler. Kategoriler:
- `gesprekstaal`, `nuance`, `intonatie-signalen`, `begripswoorden`
