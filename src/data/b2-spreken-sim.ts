import type { ExamSimTask } from '../types';

// Placeholder images use picsum with stable seeds.
// Replace URLs with real images generated via Bing Image Creator (free):
//   bing.com/images/create → paste imageLabels[i] text → download → public/sim/

const p = (seed: number, w = 600, h = 400) =>
  `https://picsum.photos/seed/nt2sim${seed}/${w}/${h}`;

export const b2SprekenSim: ExamSimTask[] = [
  {
    id: 'sim_b2_d1_01',
    deel: 'Deel 1',
    topic: 'Nieuwe kantoortuin',
    instructionNl:
      'U werkt op een groot kantoor. Er is een nieuwe werkruimte gekomen. U belt met een collega die deze ruimte nog niet heeft gezien. Kijk naar het plaatje. Beschrijf de nieuwe werkruimte voor uw collega.',
    imageUrls: [p(1)],
    imageLabels: ['Moderne open kantoorruimte met planten, flexplekken en koffiebar'],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Hoi! De nieuwe ruimte is geweldig. Het is een open kantoor met overal planten, comfortabele flexplekken en zelfs een eigen koffiebar.',
  },
  {
    id: 'sim_b2_d1_02',
    deel: 'Deel 1',
    topic: 'Oogoefening',
    instructionNl:
      'Als arbo-deskundige adviseert u medewerkers met klachten. U hebt een gesprek met een medewerker die last heeft van vermoeide ogen door beeldschermwerk. Vertel de medewerker hoe hij een oogoefening moet uitvoeren. Gebruik beide plaatjes.',
    imageUrls: [p(2), p(3)],
    imageLabels: ['Plaatje 1: Ogen strak dichtknijpen', 'Plaatje 2: Ver weg kijken uit het raam'],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Eerst moet je je ogen heel strak dichtknijpen voor een paar seconden. Daarna open je ze en kijk je ver weg door het raam.',
  },
  {
    id: 'sim_b2_d1_03',
    deel: 'Deel 1',
    topic: 'Presentaties beoordelen',
    instructionNl:
      'U volgt een managementcursus. Studenten moeten elkaars presentaties beoordelen. Een medestudent wil weten wat u daarvan vindt. Vertel uw mening en waarom u dat vindt.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Ik vind het een heel leerzaam systeem, omdat we zo leren om kritisch naar ons eigen werk en dat van anderen te kijken.',
  },
  {
    id: 'sim_b2_d1_04',
    deel: 'Deel 1',
    topic: 'Fietsparkeren',
    instructionNl:
      'Voor de ingang van uw kantoor worden altijd fietsen geparkeerd. Dit blokkeert de weg. U belt de gemeente met een voorstel. Vertel wat de gemeente zou moeten doen om dit op te lossen. Gebruik de plaatjes.',
    imageUrls: [p(4), p(5)],
    imageLabels: [
      'Plaatje 1 (Nu): Fietsen overal voor de deur',
      'Plaatje 2 (Voorstel): Bord "Fietsen verboden" met pijlen naar fietsenstalling',
    ],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Volgens mij moeten jullie een bord plaatsen waarop staat dat parkeren verboden is, en mensen doorverwijzen naar de speciale fietsenstalling.',
  },
  {
    id: 'sim_b2_d2_05',
    deel: 'Deel 2',
    topic: 'Carpoolen',
    instructionNl:
      'Uw bedrijf wil duurzamer werken en introduceert een carpoolprogramma. U bent enthousiast en probeert een collega te overtuigen om mee te doen. Gebruik daarbij alle plaatjes.',
    imageUrls: [p(6), p(7), p(8)],
    imageLabels: [
      'Plaatje 1: Gezellig samen in de auto',
      'Plaatje 2: Besparen op benzinekosten',
      'Plaatje 3: Beter voor het milieu (minder uitstoot)',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Je moet echt meedoen met carpoolen! Ten eerste is het veel gezelliger in de auto. Ten tweede bespaar je flink op de benzinekosten, en tot slot is het natuurlijk veel beter voor het milieu.',
  },
  {
    id: 'sim_b2_d2_06',
    deel: 'Deel 2',
    topic: 'Personeelstekort',
    instructionNl:
      'U bent filiaalmanager van een supermarkt. Er is een groot personeelstekort. U bespreekt dit met de regiomanager. Geef twee mogelijke oplossingen en vertel waarom dit goede oplossingen zijn.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'We zouden studenten flexibele uren kunnen aanbieden, want zij zoeken vaak bijbaantjes. Daarnaast kunnen we zelfscankassa\'s plaatsen, waardoor we minder personeel nodig hebben aan de kassa.',
  },
  {
    id: 'sim_b2_d2_07',
    deel: 'Deel 2',
    topic: 'Lekkage fiets',
    instructionNl:
      'U zag vanochtend dat de fiets van uw buurman een lekke band kreeg. Vertel aan uw buurman wat er precies gebeurd is. Gebruik alle plaatjes.',
    imageUrls: [p(9), p(10), p(11)],
    imageLabels: [
      'Plaatje 1: Iemand fietst over straat',
      'Plaatje 2: De fiets rijdt over gebroken glas',
      'Plaatje 3: De band is leeg en de persoon moet lopen',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Hoi buurman. Ik zag dat je over straat fietste en per ongeluk over een hoop gebroken glas reed. Daarna was je band helaas helemaal leeg en moest je verder lopen.',
  },
  {
    id: 'sim_b2_d2_08',
    deel: 'Deel 2',
    topic: 'Voorstel werkuitje',
    instructionNl:
      'U organiseert het jaarlijkse werkuitje. U doet een voorstel aan de directie om dit te veranderen. Overtuig de directie van uw voorstel. Geef twee argumenten op basis van de tabel.',
    imageUrls: [],
    imageLabels: [],
    tableData:
      'Vorige jaren: 1 duur diner in een restaurant\nVoorstel dit jaar: 3 interactieve kookworkshops verdeeld over het jaar',
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Ik stel voor om in plaats van één duur diner, drie kookworkshops te organiseren. Dat is beter omdat we elkaar zo vaker zien door het jaar heen, en omdat we zo actief samenwerken aan teambuilding.',
  },
  {
    id: 'sim_b2_d2_09',
    deel: 'Deel 2',
    topic: 'Privacy kantoor',
    instructionNl:
      'U controleert kantoorpanden op werkomstandigheden. U ziet drie problemen met betrekking tot privacy op de werkvloer. Vertel de kantoormanager welke drie maatregelen hij moet nemen. Gebruik alle plaatjes.',
    imageUrls: [p(12), p(13), p(14)],
    imageLabels: [
      'Plaatje 1: Vergaderruimte zonder deuren',
      'Plaatje 2: Computers met schermen richting het raam',
      'Plaatje 3: Open kasten met vertrouwelijke documenten',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'U moet deuren plaatsen in de vergaderruimte voor meer privacy. Ook moeten de computerschermen weggedraaid worden van het raam. Ten slotte moeten vertrouwelijke documenten in een afgesloten kast bewaard worden.',
  },
  {
    id: 'sim_b2_d2_10',
    deel: 'Deel 2',
    topic: 'Introductiedag',
    instructionNl:
      'U organiseert een introductiedag voor nieuwe medewerkers. Vertel een nieuwe medewerker wat het programma is. Gebruik alle plaatjes.',
    imageUrls: [p(15), p(16), p(17)],
    imageLabels: [
      'Plaatje 1 (09:00): Presentatie van de directeur',
      'Plaatje 2 (11:00): Rondleiding door het magazijn',
      'Plaatje 3 (13:00): Gezamenlijke lunch in de kantine',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Welkom! Om 9 uur beginnen we met een presentatie van de directeur. Daarna, om 11 uur, krijgen jullie een rondleiding door het magazijn. We sluiten af met een gezamenlijke lunch in de kantine om 1 uur.',
  },
  {
    id: 'sim_b2_d2_11',
    deel: 'Deel 2',
    topic: 'Gezonde kantine',
    instructionNl:
      'De middelbare school in uw wijk verbiedt de verkoop van ongezonde snacks in de kantine. Een journalist vraagt naar uw mening. Geef uw mening en twee argumenten.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Ik vind dit een uitstekend besluit. Het helpt overgewicht bij jongeren te voorkomen, en bovendien leren ze op school zo al vroeg wat een gezond voedingspatroon inhoudt.',
  },
  {
    id: 'sim_b2_d2_12',
    deel: 'Deel 2',
    topic: 'Robotisering',
    instructionNl:
      'In fabrieken wordt steeds meer werk overgenomen door robots. Dit is efficiënt, maar kost ook banen. Wat vindt u belangrijker: efficiëntie of het behouden van banen? Vertel ook waarom.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Ik vind het behouden van banen belangrijker. Werk zorgt niet alleen voor inkomen, maar geeft mensen ook een doel in het leven en sociale contacten.',
  },
  {
    id: 'sim_b2_d3_13',
    deel: 'Deel 3',
    topic: 'Ouderen en internet',
    instructionNl:
      'U volgt een opleiding Maatschappelijk Werk. U presenteert de resultaten van een onderzoek over ouderen en internetgebruik. Beschrijf de grafiek. Benoem twee problemen die kunnen ontstaan als ouderen geen internet gebruiken. Geef voor elk probleem een oplossing.',
    imageUrls: [p(18)],
    imageLabels: [
      'Grafiek: Online winkelen ouderen: 20% (10 jaar geleden) → 70% (nu). Beeldbellen: 10% → 60%.',
    ],
    tableData: null,
    prepSeconds: 120,
    speakSeconds: 120,
    modelAnswer:
      'Beste medestudenten. Als we naar de grafiek kijken, zien we een enorme stijging. Tien jaar geleden winkelde slechts twintig procent van de ouderen online, terwijl dat nu zeventig procent is. Ook het beeldbellen is gestegen van tien naar zestig procent. Dit brengt echter problemen met zich mee voor ouderen die niet digitaal vaardig zijn. Het eerste probleem is eenzaamheid, omdat veel communicatie nu online gaat. Een oplossing hiervoor is het organiseren van fysieke inloopochtenden in buurthuizen. Een tweede probleem is dat ze moeite hebben met praktische zaken, zoals bankzaken of online bestellingen. Hiervoor kunnen we vrijwilligers inzetten die hen thuis bezoeken en stapsgewijs helpen met het gebruik van de computer of smartphone.',
  },
];
