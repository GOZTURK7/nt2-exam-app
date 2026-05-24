# Skill: NT2 Sınav Görevi Üretici (`/add-sim-tasks`)

Bu skill, NT2 Staatsexamen B2 Spreken II formatında yeni `ExamSimTask` nesneleri üretir ve `src/data/b2-spreken-sim.ts` dosyasına ekler.

## Proje Dizini

`C:\Users\gokha\Desktop\staatsexamen`

---

## ExamSimTask Interface (ezberle)

```typescript
interface ExamSimTask {
  id: string;            // bkz. ID Naming bölümü
  deel: SimDeel;         // 'Deel 1' | 'Deel 2' | 'Deel 3'
  topic: string;         // kısa etiket: "Gemeente – parkeerprobleem"
  instructionNl: string; // tam Hollandaca talimat (resmi sınav dili)
  imageUrls: string[];   // gerçek SVG varsa ['/sim/spk_sim_NNN.svg'], yoksa []
  imageLabels: string[]; // her görsel için açıklama (imageUrls boşsa bu dolu olur)
  tableData: string | null; // tablo varsa markdown string, yoksa null
  prepSeconds: number;   // Deel 1: 5 | Deel 2: 15 | Deel 3: 120
  speakSeconds: number;  // Deel 1: 20 | Deel 2: 30 | Deel 3: 120
  modelAnswer: string;   // B2 seviyesi Hollandaca model cevap
}
```

---

## Timing Kuralları (değişmez)

| Deel   | prepSeconds | speakSeconds | Açıklama |
|--------|-------------|--------------|----------|
| Deel 1 | 5           | 20           | Kısa situatie/instructie/mening |
| Deel 2 | 15          | 30           | Plaatjes, proces, overtuigen |
| Deel 3 – standaard | 10 | 60         | Mening, vergelijken, discussie |
| Deel 3 – presentatie | 120 | 120      | Grafiek + aanbeveling (formele presentatie) |

Deel 3 görev türü seçimi: Grafik yoksa standaard (10/60), grafik+tabel varsa presentatie (120/120).

---

## ID Naming

- Deel 1 → `sim_b2_d1_{NNN}` (3 basamak, sıfır doldur: `005`, `006`…)
- Deel 2 → `sim_b2_d2_{NNN}`
- Deel 3 → `sim_b2_d3_{NNN}`

**Mevcut en yüksek ID'leri bulmak için:** `src/data/b2-spreken-sim.ts` dosyasını oku ve her deel için en yüksek NNN'i bul. Yeni görevler oradan devam eder. Hiçbir zaman çakışan ID yazma.

---

## NT2 Tema Bankası

```
İş/okul:  kantoor, school, ziekenhuis, supermarkt, gemeente, bibliotheek,
          sporthal, fabriek, restaurant, hotel, kinderopvang, apotheek
Sağlık:   zorg, gezondheid, EHBO, sport-en-beweging, voeding, arbo
Sosyal:   veiligheid, milieu, onderwijs, technologie, mobiliteit,
          vrije-tijd, wonen, media
Kişisel:  opvoeding, financiën, integratie, buurt, vrijwilligerswerk
```

---

## Görev Tipi Şablonları

**ZORUNLU FORMAT KURALI:**
Gerçek NT2 sınavında her görevin `instructionNl` yapısı şöyledir:
1. **Context** (Deel 1: 1-2 zin, Deel 2: 2-3 zin) — rol + situatie
2. **Actie-instructie** — kort en direct ("Vertel X wat Y. Gebruik daarbij [alle] de plaatjes.")
3. **Roleplay cue** — "U hoort eerst de [persoon]." (altijd de laatste zin)

---

### Deel 1 — Beschrijven via plaatjes (2 plaatjes)

**Subtype A: Spullen / situatie beschrijven aan iemand**
```
U werkt bij [bedrijf/organisatie]. [Situatie: iets moet gebeuren / iemand weet iets niet].
[Korte actie]: Vertel [persoon] [wat precies]. Gebruik daarbij de plaatjes.
U hoort eerst de [persoon].
```
Voorbeeld: "U werkt bij een bedrijf in Utrecht dat kantoorartikelen verkoopt. Er moeten spullen vervoerd worden naar een klant in Rotterdam. U belt een bezorgdienst en vertelt wat er precies gedaan moet worden. Kijk naar de plaatjes.\n\nVertel de medewerker van de bezorgdienst wat er precies gedaan moet worden. Gebruik daarbij de plaatjes. U hoort eerst de medewerker."
- imageLabels: ["Plaatje 1: [wat er te zien is]", "Plaatje 2: [wat er te zien is]"]

**Subtype B: Voor-na (probleem → oplossing)**
```
U werkt bij [organisatie]. Er is een probleem met [iets]. U heeft een voorstel.
U belt [persoon] op. Beschrijf het huidige probleem en uw voorstel. Gebruik de plaatjes.
U hoort eerst de [persoon].
```
- imageLabels: ["Plaatje 1 (Nu): [probleem]", "Plaatje 2 (Voorstel): [oplossing]"]

### Deel 1 — Mening + 2 redenen (geen plaatjes)
```
U werkt bij [organisatie]. [Situatie: discussie of vraag over onderwerp].
[Persoon] vraagt uw mening. Vertel uw mening en geef twee redenen.
U hoort eerst de [persoon].
```
- `imageUrls: []`, `imageLabels: []`, `tableData: null`

### Deel 1 — Aankondiging / bord doorgeven (1 plaatje)
```
U werkt bij/als [rol]. U ziet [aankondiging / poster / bord].
[Persoon X] heeft dit niet gezien. U belt [X] op.
Vertel [X] wat er [op het bord / in de aankondiging] staat. Gebruik het plaatje.
U hoort eerst de [persoon].
```
- imageLabels: ["Plaatje: [precieze inhoud — datum, tijd, locatie, wat er vereist is]"]

---

### Deel 2 — Proces uitleggen (3 plaatjes — stappenplan)

```
U werkt bij / U volgt [organisatie/cursus]. [Situatie: iemand weet niet hoe iets werkt / moet iets doen].
[Persoon] vraagt hoe dat moet. U vertelt [persoon] [wat].
Vertel [persoon] [wat precies]. Gebruik daarbij alle plaatjes.
U hoort eerst de [persoon].
```
Voorbeeld: "U volgt een taalcursus. Tijdens die cursus moeten cursisten gebruikmaken van de bibliotheek van de school. Daarvoor heeft men een pasje nodig. Een medecursist vraagt wat hij moet doen om zo'n pasje te krijgen. U vertelt hoe dat moet. Kijk naar de plaatjes.\n\nVertel de medecursist wat hij moet doen om zo'n pasje te krijgen. Gebruik daarbij alle plaatjes. U hoort eerst de medecursist."
- imageLabels: ["Plaatje 1: [stap 1 beschrijving]", "Plaatje 2: [stap 2]", "Plaatje 3: [stap 3]"]

### Deel 2 — Overtuigen / mening (geen of 2-3 plaatjes)
```
U werkt bij [organisatie]. [Situatie: discussie, verandering of voorstel].
[Persoon] vraagt uw mening / u moet [persoon] overtuigen.
Vertel [persoon] uw mening en geef twee argumenten. [Gebruik daarbij de plaatjes.]
U hoort eerst de [persoon].
```

### Deel 2 — Tabel uitleggen
```
U werkt bij [organisatie]. U heeft [gegevens / resultaten] verzameld over [onderwerp].
U presenteert dit aan [uw team / leidinggevende / collega's].
Beschrijf de belangrijkste resultaten. Gebruik daarbij de tabel.
U hoort eerst de [persoon].
```
- `tableData`: markdown tabel in één string, newlines als `\n`

### Deel 2 — Situatie beschrijven + oplossing (2 plaatjes)
```
U werkt bij [organisatie]. Er is een probleem met [iets].
U legt [persoon] het probleem uit en stelt een oplossing voor.
Beschrijf het probleem en uw voorstel. Gebruik daarbij de plaatjes.
U hoort eerst de [persoon].
```
- imageLabels: ["Plaatje 1 (Probleem): ...", "Plaatje 2 (Oplossing): ..."]

### Deel 3 — Grafiek beschrijven + taken (presentatie)

**ZORUNLU FORMAT — gerçek sınav yapısı:**

`instructionNl` şu yapıya uymalı (iki paragraf + bullet görevler):
```
[Paragraf 1 — rol + achtergrond/situatie, 2-3 zinnen]
[Paragraf 2 — wat u gaat doen in de presentatie, 1-2 zinnen]

Wat moet u doen?
- [Taak 1: Beschrijf de resultaten. Gebruik hierbij de grafiek.]
- [Taak 2: Geef bij elk [categorie] een [voorbeeld / verklaring / gevolg].]
- [Taak 3: Leg uit op welke twee manieren [organisatie] [doel] het best kan [verbeteren/verminderen/bevorderen].]

U krijgt nu eerst twee minuten de tijd om te bedenken wat u gaat zeggen. Begin na de pieptoon met spreken.
```

**Concreet voorbeeld:**
```
'U zit in de gemeenteraad. Veel inwoners hebben de afgelopen tijd bij de gemeente geklaagd over geluidsoverlast. Daarom hebt u een onderzoek uit laten voeren naar geluidsoverlast in de stad. Aan de inwoners is gevraagd of ze wel eens te maken hebben met verschillende typen geluidsoverlast.\n\nTijdens een gemeenteraadsvergadering beschrijft u de resultaten van het onderzoek aan de hand van de grafiek. Ook geeft u een voorbeeld bij elk type geluidsoverlast. Ten slotte legt u uit op welke manieren de gemeente de geluidsoverlast in de toekomst het best kan verminderen.\n\nWat moet u doen?\n- Beschrijf de resultaten van het onderzoek. Gebruik hierbij de grafiek.\n- Geef bij elk type geluidsoverlast een voorbeeld.\n- Leg uit op welke twee manieren de gemeente de geluidsoverlast in de toekomst het best kan verminderen.\n\nU krijgt nu eerst twee minuten de tijd om te bedenken wat u gaat zeggen. Begin na de pieptoon met spreken.'
```

**Grafiek:**
- Enkelvoudig (één tijdstip) OF twee periodes vergelijken — BEIDE zijn mogelijk
- 3-5 categorieën met percentages of aantallen
- imageLabels format: `'Staafdiagram "[Titel]": [Cat A] [X%], [Cat B] [Y%], [Cat C] [Z%]'`
- `prepSeconds: 120`, `speakSeconds: 120`

### Deel 3 — Uitgebreide mening / discussie (standaard)
```
U bent uitgenodigd voor een discussie over [maatschappelijk onderwerp].
Geef uw mening. Gebruik minimaal drie argumenten. Noem ook een tegenargument.
```
- `imageUrls: []`, `imageLabels: []`, `tableData: null`
- `prepSeconds: 10`, `speakSeconds: 60`

---

## Model Answer Kuralları (B2 seviye)

- **Deel 1:** 2-3 volledige zinnen, formeel register (`u` niet `je/jij`), concrete details uit het plaatje/aankondiging

- **Deel 2:** 3-4 zinnen, stap-voor-stap structuur of vergelijking, minstens 1 bağlaç

- **Deel 3 standaard (60s):** 5-7 zinnen, 1 paragraaf, opening + 2-3 argumenten + conclusie

- **Deel 3 presentatie (120s) — ZORUNLU YAPI:**
  - Formele opening: `'Geachte raadsleden / Beste collega\'s / ...'`
  - **Tüm "Wat moet u doen?" bullet'larını sırayla kapsıyor olmalı**
  - Bullet 1 (grafiek): tüm kategorileri ve sayıları noem, meest opvallende trend markeer
  - Bullet 2 (voorbeelden): elke categorie voor een concreet voorbeeld
  - Bullet 3 (aanbevelingen): twee concrete en uitvoerbare maatregelen
  - Getallen voluit schrijven: `veertig procent` niet `40%`
  - **Minimaal 150 woorden**

- **Bağlaçlar (alle deelen):** `bovendien`, `daardoor`, `terwijl`, `omdat`, `dat betekent dat`, `aan de ene kant... aan de andere kant`, `het is opvallend dat`, `daarnaast`, `ten eerste... ten tweede`, `allereerst... vervolgens... tot slot`

---

## Çalışma Akışı

1. Kullanıcı `/add-sim-tasks` yazar
2. **Şu iki soruyu sor:**
   - "Kaç görev ve hangi Deel? (örn: Deel 1 × 4, Deel 2 × 3, mix tam sınav seti)"
   - "Tema tercihleri? (örn: kantoor + gezondheid) — atlarsan çeşitli tema seçerim"
3. `src/data/b2-spreken-sim.ts` dosyasını oku → her deel için en yüksek NNN'i bul
4. Görevleri üret (yukarıdaki şablonlardan, tema bankasından seçerek)
5. Dosyaya append et (aşağıdaki append kuralına göre)
6. `npx tsc --noEmit` çalıştır — hata yoksa bildir

---

## Dosya Yapısı

İki ayrı dosya var:

| Dosya | Export | Ne zaman kullan |
|-------|--------|-----------------|
| `src/data/b2-spreken-sim.ts` | `b2SprekenSimSets: SimSet[]` | Yeni deneme sınavı seti |
| `src/data/b2-spreken-exam-tasks.ts` | `examTasks20XX`, `examYears` | Gerçek DUO sınav görevi |

`SimSet` interface:
```typescript
interface SimSet {
  id: string;    // 'sim_set_003' formatı
  label: string; // 'Deneme 3' — uygulamada buton olarak görünür
  tasks: ExamSimTask[];
}
```

## Tam Set Üretme Kuralı (EN ÖNEMLİ)

Her `/add-sim-tasks` çalıştırmasında **tam bir 13 görevlik deneme sınavı** üret:
- 4 × Deel 1 (prepSeconds: 5, speakSeconds: 20)
- 8 × Deel 2 (prepSeconds: 15, speakSeconds: 30)
- 1 × Deel 3 (prepSeconds: 10/120, speakSeconds: 60/120)

**Toplam: 13 görev = 1 tam sınav simülasyonu**

## Dosyaya Append Etme Kuralı

### Adım 1 — Mevcut en yüksek numaraları bul
`src/data/b2-spreken-sim.ts` dosyasını oku:
- En yüksek `sim_set_NNN` → yeni setin numarası N+1
- Her deel için en yüksek ID → yeni görevler oradan devam eder

### Adım 2 — Yeni const + SimSet yaz
```typescript
// Dosyanın sonuna, export'tan ÖNCE ekle:

const denemeNTasks: ExamSimTask[] = [
  // 4 × Deel 1
  { id: 'sim_b2_d1_005', deel: 'Deel 1', ... },
  { id: 'sim_b2_d1_006', deel: 'Deel 1', ... },
  { id: 'sim_b2_d1_007', deel: 'Deel 1', ... },
  { id: 'sim_b2_d1_008', deel: 'Deel 1', ... },
  // 8 × Deel 2
  { id: 'sim_b2_d2_013', deel: 'Deel 2', ... },
  // ... 7 tane daha
  // 1 × Deel 3
  { id: 'sim_b2_d3_020', deel: 'Deel 3', ... },
];
```

### Adım 3 — b2SprekenSimSets array'ine ekle
```typescript
export const b2SprekenSimSets: SimSet[] = [
  // mevcut setler...
  {
    id: 'sim_set_00N',
    label: 'Deneme N',
    tasks: denemeNTasks,
  },
];
```

### Gerçek sınav görevi → `b2-spreken-exam-tasks.ts`
Mevcut yıla ekle veya yeni yıl bloğu aç:
```typescript
export const examTasks20XX: ExamSimTask[] = [ ... ];
export const examYears = [
  // ...
  { year: 20XX, tasks: examTasks20XX },
];
```

---

## SVG Oluşturma (opsiyonel — kullanıcı isterse)

Görsel istenmişse `public/sim/spk_sim_{NNN}[a/b/c].svg` dosyaları oluştur:

- Background: `#0d1a2a`
- Accent sarı: `#f5c432`, mavi: `#2060d0`, beyaz metin: `#d8ebff`, gri: `#6d8faa`
- Font: `font-family="monospace"`
- ViewBox: situatie/voor-na için `"0 0 360 260"`, grafiek için `"0 0 520 340"`
- SVG oluşturduktan sonra `imageUrls: ['/sim/spk_sim_{NNN}.svg']` olarak güncelle

---

## Doğrulama Kontrol Listesi

Append ettikten sonra:
1. `npx tsc --noEmit` → sıfır hata
2. Yeni ID'ler mevcut ID'lerle çakışmıyor
3. `deel` değeri tam olarak `'Deel 1'`, `'Deel 2'` veya `'Deel 3'` (büyük harf D, boşluklu)
4. `prepSeconds` ve `speakSeconds` timing tablosuna uyuyor
5. `modelAnswer` Hollandaca ve B2 seviyesinde
