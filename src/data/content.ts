import type { ExamContent } from '../types';

// ─── B2 · SPREKEN · DAY 1 ────────────────────────────────────────────────────
// Topic: Giysi, Aksesuar & Beden  (Deel 2 – Plaatjes)
// Source: 33-günlük program – Gün 3 (Cmt 24 Mayıs)
// ─────────────────────────────────────────────────────────────────────────────

export const examContent: ExamContent = {
  version: '1.0.0',

  // ── B1 – will be filled in future iterations ────────────────────────────
  B1: {
    spreken:   [],
    schrijven: [],
    lezen:     [],
    luisteren: [],
  },

  // ── B2 ──────────────────────────────────────────────────────────────────
  B2: {
    schrijven: [],
    lezen:     [],
    luisteren: [],

    spreken: [
      {
        dayNumber: 1,
        titleTranslations: {
          tr: 'Giysi, Aksesuar & Beden – Plaatjes Temeli',
          en: 'Clothing, Accessories & Size – Picture Description Basics',
        },
        examType: 'Deel 2 – Plaatjes',

        // ── VOCABULARY ──────────────────────────────────────────────────
        vocabulary: [

          // --- GİYSİ PARÇALARI ---
          {
            id: 'w_b2_sp1_01',
            nl: 'de veter / de veters',
            translations: { tr: 'ayakkabı bağı / ayakkabı bağları', en: 'shoelace / shoelaces' },
            context: 'De veter is te lang.',
            category: 'kleding',
            isConcreteWord: true,
          },
          {
            id: 'w_b2_sp1_02',
            nl: 'de riem',
            translations: { tr: 'kemer', en: 'belt' },
            context: 'De riem zit om zijn middel.',
            category: 'kleding',
            isConcreteWord: true,
          },
          {
            id: 'w_b2_sp1_03',
            nl: 'de rits',
            translations: { tr: 'fermuar', en: 'zipper' },
            context: 'De rits is stuk.',
            category: 'kleding',
            isConcreteWord: true,
          },
          {
            id: 'w_b2_sp1_04',
            nl: 'de knoop / de knopen',
            translations: { tr: 'düğme / düğmeler', en: 'button / buttons' },
            context: 'Er mist een knoop.',
            category: 'kleding',
            isConcreteWord: true,
          },
          {
            id: 'w_b2_sp1_05',
            nl: 'de mouw',
            translations: { tr: 'kol (giysi)', en: 'sleeve' },
            context: 'De mouw is te kort.',
            category: 'kleding',
            isConcreteWord: true,
          },
          {
            id: 'w_b2_sp1_06',
            nl: 'de kraag',
            translations: { tr: 'yaka', en: 'collar' },
            context: 'Hij staat zijn kraag op.',
            category: 'kleding',
            isConcreteWord: true,
          },
          {
            id: 'w_b2_sp1_07',
            nl: 'de naad',
            translations: { tr: 'dikiş yeri', en: 'seam' },
            context: 'De naad is gescheurd.',
            category: 'kleding',
            isConcreteWord: true,
          },
          {
            id: 'w_b2_sp1_08',
            nl: 'de stof / het materiaal',
            translations: { tr: 'kumaş / malzeme', en: 'fabric / material' },
            context: 'De stof voelt zacht aan.',
            category: 'kleding',
            isConcreteWord: true,
          },
          {
            id: 'w_b2_sp1_09',
            nl: 'de maat',
            translations: { tr: 'beden / ölçü', en: 'size' },
            context: 'Welke maat heeft u?',
            category: 'kleding',
            isConcreteWord: false,
          },

          // --- AKSESUAR ---
          {
            id: 'w_b2_sp1_10',
            nl: 'de armband',
            translations: { tr: 'bilezik', en: 'bracelet' },
            context: 'Ze draagt een gouden armband.',
            category: 'accessoires',
            isConcreteWord: true,
          },
          {
            id: 'w_b2_sp1_11',
            nl: 'de ketting',
            translations: { tr: 'kolye', en: 'necklace' },
            context: 'Hij heeft een ketting om zijn nek.',
            category: 'accessoires',
            isConcreteWord: true,
          },
          {
            id: 'w_b2_sp1_12',
            nl: 'de ring',
            translations: { tr: 'yüzük', en: 'ring' },
            context: 'Ze heeft een ring aan haar vinger.',
            category: 'accessoires',
            isConcreteWord: true,
          },
          {
            id: 'w_b2_sp1_13',
            nl: 'de oorbellen',
            translations: { tr: 'küpe', en: 'earrings' },
            context: 'Ze draagt zilveren oorbellen.',
            category: 'accessoires',
            isConcreteWord: true,
          },
          {
            id: 'w_b2_sp1_14',
            nl: 'de sjaal',
            translations: { tr: 'eşarp / atkı', en: 'scarf' },
            context: 'Ze wikkelt de sjaal om haar nek.',
            category: 'accessoires',
            isConcreteWord: true,
          },
          {
            id: 'w_b2_sp1_15',
            nl: 'de handschoenen',
            translations: { tr: 'eldiven', en: 'gloves' },
            context: 'Hij trekt handschoenen aan.',
            category: 'accessoires',
            isConcreteWord: true,
          },
          {
            id: 'w_b2_sp1_16',
            nl: 'de paraplu',
            translations: { tr: 'şemsiye', en: 'umbrella' },
            context: 'Ze vouwt de paraplu open.',
            category: 'accessoires',
            isConcreteWord: true,
          },
          {
            id: 'w_b2_sp1_17',
            nl: 'de portemonnee',
            translations: { tr: 'cüzdan', en: 'wallet' },
            context: 'Hij haalt zijn portemonnee tevoorschijn.',
            category: 'accessoires',
            isConcreteWord: true,
          },

          // --- HAREKET FİİLLERİ ---
          {
            id: 'w_b2_sp1_18',
            nl: 'oprapen',
            translations: { tr: 'yerden almak', en: 'to pick up' },
            context: 'Ik raap de pen op die op de grond ligt.',
            category: 'bewegingsverbs',
            isConcreteWord: false,
          },
          {
            id: 'w_b2_sp1_19',
            nl: 'laten vallen',
            translations: { tr: 'düşürmek', en: 'to drop' },
            context: 'Ik laat mijn telefoon vallen.',
            category: 'bewegingsverbs',
            isConcreteWord: false,
          },
          {
            id: 'w_b2_sp1_20',
            nl: 'dragen',
            translations: { tr: 'taşımak / giymek', en: 'to carry / to wear' },
            context: 'Ik draag twee zware tassen.',
            category: 'bewegingsverbs',
            isConcreteWord: false,
          },
          {
            id: 'w_b2_sp1_21',
            nl: 'reiken / aanreiken',
            translations: { tr: 'uzatmak / vermek', en: 'to reach / to hand over' },
            context: 'Ze reikt hem het formulier aan.',
            category: 'bewegingsverbs',
            isConcreteWord: false,
          },
          {
            id: 'w_b2_sp1_22',
            nl: 'aantrekken',
            translations: { tr: 'giymek', en: 'to put on (clothing)' },
            context: 'Hij trekt zijn jas aan want het regent.',
            category: 'bewegingsverbs',
            isConcreteWord: false,
          },
          {
            id: 'w_b2_sp1_23',
            nl: 'uittrekken / uitdoen',
            translations: { tr: 'çıkarmak', en: 'to take off (clothing)' },
            context: 'Ik doe mijn schoenen uit als ik thuis kom.',
            category: 'bewegingsverbs',
            isConcreteWord: false,
          },
        ],

        // ── FUNCTIONAL PHRASES ───────────────────────────────────────────
        functionalPhrases: [
          {
            id: 'p_b2_sp1_01',
            nl: 'Zoals u kunt zien op het plaatje...',
            translations: {
              tr: 'Resimde gördüğünüz gibi...',
              en: 'As you can see in the picture...',
            },
          },
          {
            id: 'p_b2_sp1_02',
            nl: 'Op de eerste afbeelding is te zien dat...',
            translations: {
              tr: 'İlk resimde görülüyor ki...',
              en: 'In the first image we can see that...',
            },
          },
          {
            id: 'p_b2_sp1_03',
            nl: 'Vervolgens / daarna...',
            translations: {
              tr: 'Ardından / sonra...',
              en: 'Subsequently / then...',
            },
          },
          {
            id: 'p_b2_sp1_04',
            nl: 'Ten slotte / tot slot...',
            translations: {
              tr: 'Son olarak...',
              en: 'Finally / in conclusion...',
            },
          },
          {
            id: 'p_b2_sp1_05',
            nl: 'Hij/zij is bezig met...',
            translations: {
              tr: '...yapmakla meşgul',
              en: 'He/she is in the process of...',
            },
          },
          {
            id: 'p_b2_sp1_06',
            nl: 'Het is een soort... waarbij je...',
            translations: {
              tr: 'Bu bir tür..., ...yaptığın şey.',
              en: 'It is a kind of... where you...',
            },
          },
        ],

        // ── EXAM TASK ────────────────────────────────────────────────────
        examTask: {
          id: 'task_b2_sp1',
          type: 'audio',
          instructionTranslations: {
            tr: 'Resimdeki kişinin ne yaptığını 20 saniye içinde tarif edin. Giysi ve aksesuarları Hollandaca olarak açıklayın.',
            en: 'Describe what the person in the picture is doing within 20 seconds. Name their clothing and accessories in Dutch.',
          },
          durationSeconds: 20,
        },
      },
    ],
  },
};
