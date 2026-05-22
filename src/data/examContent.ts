import type { ExamContent } from '../types';

const emptySkills = {
  spreken: [],
  schrijven: [],
  lezen: [],
  luisteren: [],
};

export const initialExamContent: ExamContent = {
  version: '1.0.0',
  B1: { ...emptySkills },
  B2: {
    spreken: [
      {
        dayNumber: 1,
        titleTranslations: {
          tr: 'Günlük Rutin & Ev Fiilleri – Temel Liste',
          en: 'Daily Routines & Home Verbs – Basic List',
        },
        examType: 'Deel 1',
        vocabulary: [
          {
            id: 'w_b2_s1_1',
            nl: 'opstaan',
            translations: { tr: 'kalkmak', en: 'to get up' },
            context: 'Ik sta elke dag om zeven uur op.',
            category: 'dagelijks-leven',
            isConcreteWord: false,
          },
          {
            id: 'w_b2_s1_2',
            nl: 'de rits',
            translations: { tr: 'fermuar', en: 'zipper' },
            context: 'De rits is stuk.',
            category: 'kleding',
            isConcreteWord: true,
          },
          {
            id: 'w_b2_s1_3',
            nl: 'de armband',
            translations: { tr: 'bilezik', en: 'bracelet' },
            context: 'Zij draagt een gouden armband.',
            category: 'accessoires',
            isConcreteWord: true,
          },
          {
            id: 'w_b2_s1_4',
            nl: 'stofzuigen',
            translations: { tr: 'elektrik süpürgesiyle süpürmek', en: 'to vacuum' },
            context: 'Ik stofzuig de woonkamer één keer per week.',
            category: 'huishouden',
            isConcreteWord: false,
          },
        ],
        functionalPhrases: [
          {
            id: 'p_b2_s1_1',
            nl: 'Zoals u kunt zien op het plaatje...',
            translations: {
              tr: 'Resimde gördüğünüz gibi...',
              en: 'As you can see in the picture...',
            },
          },
          {
            id: 'p_b2_s1_2',
            nl: 'Ten eerste... ten tweede... ten slotte...',
            translations: {
              tr: 'İlk olarak... ikinci olarak... son olarak...',
              en: 'First... second... finally...',
            },
          },
        ],
        examTask: {
          id: 'task_b2_s1',
          type: 'audio',
          instructionTranslations: {
            tr: 'Resimdeki durumu analiz ederek 20 saniye içinde uygun bir çözüm önerisi sunun.',
            en: 'Analyze the situation in the picture and present a suitable solution within 20 seconds.',
          },
          durationSeconds: 20,
        },
      },
    ],
    schrijven: [],
    lezen: [],
    luisteren: [],
  },
};
