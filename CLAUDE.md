# NT2 Staatsexamen – Proje Bağlamı

## Proje Nedir
NT2 Staatsexamen Programma II (B2) sınav hazırlık uygulaması. Şu an kişisel kullanım için yapıldı, sınav sonrası (25 Haziran 2026) herkese açık ürüne dönüştürülecek.

## Tech Stack
- **Frontend:** React 18 + Vite + TypeScript
- **Stil:** Tailwind CSS (cyberpunk tema — `cyber-yellow`, `cyber-blue`, `cyber-green` vs.)
- **State:** Zustand (`src/store/useProgressStore.ts`)
- **i18n:** react-i18next, diller: `tr` + `en` (`src/i18n/locales/`)
- **Audio:** MediaRecorder API + IndexedDB (`src/services/audioService.ts`, `src/hooks/useAudioRecorder.ts`)
- **İkonlar:** lucide-react (`LucideIcon` tipi kullan, `ComponentType<{size?:number}>` değil)

## Klasör Yapısı
```
src/
  components/
    dashboard/     ← Ana ekran, skill kartları, gün listesi
    study/         ← FlashcardTab, ExamTab (timer + kayıt), StudyScreen
    layout/        ← AppBar, BottomNav
    ui/            ← Paylaşılan UI bileşenleri
  data/
    content.ts              ← ExamContent ana nesnesi (import hub)
    extracted-b2-spreken.ts ← B2 spreken: Word[] + Phrase[] (330 kelime)
    {level}-{skill}.ts      ← Yeni içerik dosyaları bu formatta eklenir
  hooks/           ← useAudioRecorder
  i18n/locales/    ← en.json, tr.json
  lib/             ← tokens.ts (renk sabitleri)
  services/        ← audioService.ts (IndexedDB)
  store/           ← useProgressStore.ts
  types/           ← index.ts (tüm interface'ler)
.claude/
  commands/
    add-content.md ← /add-content slash command (içerik girişi için)
```

## Veri Modeli (src/types/index.ts)
```typescript
Word     { id, nl, translations: {tr, en}, context, examples?: string[], category, isConcreteWord }
Phrase   { id, nl, translations: {tr, en}, examples?: string[] }
ReadingText    { id, year, title, text, level, theme, questions? }
ReadingQuestion { id, question, type, options?, answer }
SkillContent   { words: Word[], phrases: Phrase[], texts?: ReadingText[] }
ExamContent    { version, B1: Record<Skill, SkillContent>, B2: Record<Skill, SkillContent> }
ProgramDay     { dayNumber, titleTranslations, examType, vocabulary, functionalPhrases, examTask }
ExamTask       { id, type, instructionTranslations: {nl,tr,en}, durationSeconds?, prepSeconds? }
```

## İçerik Durumu
| Level | Skill | Durum |
|-------|-------|-------|
| B2 | spreken | Tamamlandı — 330 kelime, 123 kalıp (tr+en+examples), 13 sim görevi |
| B2 | schrijven | Boş |
| B2 | lezen | Boş |
| B2 | luisteren | Boş |
| B1 | tümü | Boş |

## ExamTab Görev Sistemi (schedule.ts)
- Kategori → Deel tipi eşlemesi: DEEL1_CATS / DEEL2_CATS (diğerleri Deel 3)
- Deel 1 (situatie/instructie): prepSeconds=5, speakSeconds=20
- Deel 2 (plaatjes): prepSeconds=5, speakSeconds=40
- Deel 3 (discussie/mening): prepSeconds=10, speakSeconds=60
- instructionTranslations: `{ nl, tr, en }` — nl sınav dili olarak gösterilir, lang çevirisi altında
- ExamTab'da "Kullanabileceğiniz kalıplar" collapsible bölümü mevcut

Yeni içerik eklemek için: `/add-content` slash command'ı kullan.

## ID Naming Kuralları
- Word: `w_{level}_{skill}_{NNN}` → `w_b2_sp_001`, `w_b1_lz_042`
- Phrase: `p_{level}_{skill}_{NNN}` → `p_b2_sw_005`
- ReadingText: `txt_{level}_{skill}_{year}_{NN}` → `txt_b1_lz_2017_01`
- Skill kısaltmaları: sp=spreken, lz=lezen, sw=schrijven, ls=luisteren

## isConcreteWord Kuralı
- `true`: fiziksel nesneler (giysi parçaları, aksesuarlar, vücut parçaları, güvenlik ekipmanı) + stres altında kaybolan özel fiiller: `stofzuigen`, `dweilen`
- `false`: soyut kavramlar, genel fiiller, bağlaçlar, söylem işaretleyicileri

## Önemli Teknik Detaylar
- **LucideIcon tipi:** `import type { LucideIcon } from 'lucide-react'` — `React.ComponentType<{size?:number}>` kullanma, TypeScript hatası verir
- **ExamTab timer:** rAF (requestAnimationFrame) bazlı, drift yok. `startRef` pattern ile prep→recording geçişi yapılır
- **Audio URL lifecycle:** `idbUrlRef` ile IDB URL'leri yönetilir, unmount'ta revoke edilir
- **Zustand persist:** `useProgressStore` localStorage'a yazar

## Ürün Yol Haritası (Sınav Sonrası)

### FAZ 1 — Task Type Sistemi + Supabase Şeması
T1-T10 task taxonomy, `ExamStructureTemplate` tipi, Supabase tabloları:
`speaking_tasks`, `prompts`, `images`, `vocabulary`, `user_progress`

### FAZ 2 — Auth + İçerik Migrasyonu
Supabase Auth (email + Google), statik TS dosyaları → Supabase tablolarına

### FAZ 3 — AI Feedback Engine
OpenAI Whisper (transkript) + GPT-4o (yapısal geri bildirim, B2 değerlendirmesi)

### FAZ 4 — Pattern Training + Adaptive
Task-type modülleri, mock exam mode, score history, weak point tracking

**Tahmini:** ~15 oturum, ~240k token, 6-7 hafta

## Sınav
25 Haziran 2026 — sınav öncesi uygulamada büyük değişiklik yapma.
