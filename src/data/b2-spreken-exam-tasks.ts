import type { ExamSimTask } from '../types';

// Real NT2 Staatsexamen Spreken II (B2) tasks — 2021 through 2025.
// imageUrls: [] means the placeholder card is shown; replace with /sim/<file>.svg once illustrations exist.

// ─── 2021 ────────────────────────────────────────────────────────────────────

export const examTasks2021: ExamSimTask[] = [
  {
    id: 'exam_b2_2021_01',
    deel: 'Deel 1',
    topic: 'Lerarenopleiding – aankondiging',
    instructionNl:
      'U studeert aan een lerarenopleiding. U ziet een aankondiging op het schoolbord. Een medestudent heeft de aankondiging niet gezien. U belt hem op. Beschrijf wat er op het bord staat.',
    imageUrls: [],
    imageLabels: [
      'Schoolbord met aankondiging: verplichte bijeenkomst vrijdag 15 oktober, aula B, 14:30, handtekening vereist',
    ],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Hé, luister. Er hangt een aankondiging op het bord. Op vrijdag 15 oktober is er een verplichte bijeenkomst in aula B om half drie. Je moet daarna tekenen voor aanwezigheid.',
  },
  {
    id: 'exam_b2_2021_02',
    deel: 'Deel 1',
    topic: 'Politie – vaste locatie of rouleren',
    instructionNl:
      'U werkt bij de politie. Er is een discussie of agenten altijd op vaste locaties werken of door de stad rouleren. Een nieuwe collega vraagt uw mening. Vertel uw mening en geef twee redenen.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Ik vind dat agenten beter kunnen rouleren. Ten eerste leer je zo alle wijken kennen en ben je flexibeler inzetbaar. Ten tweede voorkom je dat je te persoonlijk betrokken raakt bij bewoners van één wijk.',
  },
  {
    id: 'exam_b2_2021_03',
    deel: 'Deel 1',
    topic: 'Kantoor – zonneschermen',
    instructionNl:
      'U werkt op een kantoor. Er is een probleem met de zon. U heeft een voorstel voor een oplossing. U belt de eigenaar van het pand. Beschrijf het huidige probleem en uw voorstel. Gebruik de plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1 (Nu): Kantoor zonder zonwering, felle zon schijnt op beeldschermen, medewerkers turen door het licht',
      'Plaatje 2 (Voorstel): Hetzelfde kantoor met uitgetrokken zonwerende screens voor de ramen',
    ],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Goedemiddag. Ik bel over de situatie op kantoor. Op dit moment schijnt de zon direct op de beeldschermen, waardoor het bijna onmogelijk werken is. Mijn voorstel is om buitenzonwering te plaatsen, zodat de zon buiten blijft en het aangenaam werken wordt.',
  },
  {
    id: 'exam_b2_2021_04',
    deel: 'Deel 1',
    topic: 'Brommer – minimumleeftijd',
    instructionNl:
      'Er is een voorstel om de minimumleeftijd voor een snorfietsrijbewijs te verlagen van 16 naar 15 jaar. Een journalist vraagt uw mening. Vertel uw mening en geef twee argumenten.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Ik ben tegen dit voorstel. Vijftienjarigen zijn nog niet rijp genoeg om goed op het verkeer te reageren. Bovendien laten ongelukkenstatistieken zien dat jonge brommerrijders al vaker betrokken zijn bij ongelukken.',
  },
  {
    id: 'exam_b2_2021_05',
    deel: 'Deel 2',
    topic: 'Voeding – van boer tot winkel',
    instructionNl:
      'U heeft een cursus gezonde voeding gevolgd. U vertelt een vriend wat u heeft geleerd over hoe ons voedsel wordt geproduceerd en verwerkt. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Verse groenten en fruit, rechtstreeks van de boer',
      'Plaatje 2: Voedselverwerking in een fabriek – wassen, snijden, verpakken',
      'Plaatje 3: Verpakte producten in het supermarktschap',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Op die cursus heb ik echt veel geleerd. Kijk, het begint allemaal met verse producten die rechtstreeks van de boer komen. Daarna worden ze in een fabriek gewassen, gesneden en verpakt. Uiteindelijk liggen ze verpakt in de supermarkt bij ons in de schappen. Het is eigenlijk een heel lang proces voordat iets in ons winkelmandje belandt!',
  },
  {
    id: 'exam_b2_2021_06',
    deel: 'Deel 2',
    topic: 'Kruispunt – voor en na renovatie',
    instructionNl:
      'U woont in een wijk die wordt verbeterd. U legt aan een vriend uit wat er is veranderd bij het kruispunt in uw buurt. Gebruik de plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1 (Oud): Gevaarlijk kruispunt zonder verkeerslichten, versleten wegmarkeringen, geparkeerde fietsen overal',
      'Plaatje 2 (Nieuw): Modern kruispunt met LED-verkeerslichten, brede zebrapaden, fietsstroken en groenvak',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Je moet het nieuwe kruispunt echt zien! Vroeger was het echt gevaarlijk: geen verkeerslichten, versleten strepen op de weg en fietsen die overal stonden. Nu is het totaal anders: moderne verkeerslichten, brede zebrapaden en aparte fietsstroken. Er is ook een groenstrook bijgekomen. Echt een verbetering voor de hele buurt!',
  },
  {
    id: 'exam_b2_2021_07',
    deel: 'Deel 2',
    topic: 'Vakantie Spanje – verslag',
    instructionNl:
      'U bent net terug van een vakantie in Spanje. U ontmoet een buurman op straat. Vertel hem wat er allemaal is gebeurd tijdens de reis. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Stel pakt koffers in, vrolijk klaar voor vertrek',
      'Plaatje 2: Op het vliegveld – bagageband staat stil, gezin staat te wachten bij "bagage verloren" balie',
      'Plaatje 3: Twee dagen later, heerlijk zonnebaden op het strand met koffers veilig naast hen',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Hé buurman! Wat een avontuurlijke vakantie was dat zeg! We pakten onze koffers en alles leek prima te gaan. Maar bij aankomst in Spanje bleek onze bagage kwijtgeraakt te zijn. We moesten twee dagen wachten voordat we onze koffers terugkregen. Gelukkig konden we daarna toch heerlijk genieten op het strand!',
  },
  {
    id: 'exam_b2_2021_08',
    deel: 'Deel 2',
    topic: 'Geld – geschiedenis van betalen',
    instructionNl:
      'U werkt als rondleider in een museum over de geschiedenis van geld. U legt een bezoeker uit hoe betalen door de eeuwen heen is veranderd. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Ruilhandel – twee mensen wisselen brood en werktuigen',
      'Plaatje 2: Gouden munten en bankbiljetten – vroegmodern betaalmiddel',
      'Plaatje 3: Pinpas en smartphone met betaalapp – modern digitaal betalen',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Welkom in ons museum! Zoals u op het eerste plaatje ziet, ruilden mensen vroeger goederen met elkaar – geen geld nodig. Later kwamen gouden munten en bankbiljetten, hier afgebeeld. Tegenwoordig betalen we steeds meer digitaal, met pinpas of smartphone. Fascinerende ontwikkeling van ruilhandel tot contactloos betalen!',
  },
  {
    id: 'exam_b2_2021_09',
    deel: 'Deel 2',
    topic: 'Les gaat niet door – keten van problemen',
    instructionNl:
      'U bent leraar en uw les gaat vandaag niet door. Een collega vraagt wat er precies is gebeurd. Vertel het verhaal. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      "Plaatje 1: Leraar ontdekt dat de beamer kapot is en belt de IT-afdeling",
      'Plaatje 2: IT-medewerker is al bezig met een ander defect in een andere klas',
      'Plaatje 3: Leraar stuurt leerlingen naar huis, lokaal is leeg',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Het was echt een drama-ochtend. Toen ik het lokaal binnenkwam, deed de beamer het niet. Ik belde meteen de IT-afdeling, maar die was al druk bezig met een storing in een andere klas. Uiteindelijk kon ik de les niet geven en moest ik alle leerlingen naar huis sturen.',
  },
  {
    id: 'exam_b2_2021_10',
    deel: 'Deel 2',
    topic: 'Kapper – het misging',
    instructionNl:
      'U vertelt uw vriend wat er vandaag is misgegaan bij de kapper. U zag ook iets bijzonders. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Persoon loopt langs kapperszaak en ziet een grote antieke klok in de etalage',
      'Plaatje 2: Kapper knipt het haar, klant kijkt bezorgd in de spiegel',
      'Plaatje 3: Klant verlaat kapperszaak met een te kort en scheef kapsel, teleurgesteld gezicht',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Weet je wat me overkwam? Ik liep langs de kapper en zag een prachtige oude klok in de etalage. Ik ging spontaan naar binnen voor een knipbeurt. Maar de kapper heeft het compleet verpest – hij knipte het veel te kort en scheef. Ik was echt teleurgesteld toen ik buiten stond!',
  },
  {
    id: 'exam_b2_2021_11',
    deel: 'Deel 2',
    topic: 'Klachtenprocedure uitleggen',
    instructionNl:
      'U werkt bij een bedrijf en legt een nieuwe medewerker de klachtenprocedure uit. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Klant staat bij de balie en dient mondeling een klacht in',
      'Plaatje 2: Medewerker noteert de klacht en verstuurt een schriftelijke bevestiging per e-mail',
      'Plaatje 3: Teamvergadering – klacht wordt besproken, oplossing wordt bepaald en klant wordt teruggebeld',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Oké, luister goed. Als een klant een klacht heeft, meldt hij dat bij de balie. Jij noteert alles en stuurt hem direct een schriftelijke bevestiging. Daarna bespreken we de klacht in onze wekelijkse vergadering en zorgen we voor een oplossing. Ten slotte bel je de klant terug met het resultaat.',
  },
  {
    id: 'exam_b2_2021_12',
    deel: 'Deel 2',
    topic: 'Spaaracties supermarkt – mening',
    instructionNl:
      'Veel supermarkten organiseren spaaracties voor klanten. U bespreekt dit met een collega die vraagt wat u ervan vindt. Geef uw mening met twee argumenten.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Eerlijk gezegd ben ik er niet zo enthousiast over. Ten eerste verleiden die acties mensen om meer te kopen dan ze nodig hebben, alleen om punten te sparen. Ten tweede zijn de prijzen die je ermee kunt winnen eigenlijk maar bescheiden. Het is meer een marketingtruc dan een echt voordeel voor de klant.',
  },
  {
    id: 'exam_b2_2021_13',
    deel: 'Deel 3',
    topic: 'Nieuwbouwwijk – twee ontwerpen vergelijken',
    instructionNl:
      'U werkt bij een gemeente die een nieuwe woonwijk gaat bouwen. Er zijn twee ontwerpen. U presenteert de ontwerpen, vergelijkt ze en beveelt het beste ontwerp aan met twee argumenten.',
    imageUrls: [],
    imageLabels: [
      'Twee kaarten naast elkaar: Ontwerp A (groen, laagbouw, speeltuinen) en Ontwerp B (hoog, winkels, station nabij)',
    ],
    tableData:
      'Ontwerp A: laagbouw, veel groen en speeltuinen, rustige woonstraten, 200 woningen, ver van station\nOntwerp B: hoogbouw, winkelcentrum en parkeergarage, dichtbij station, 500 woningen, weinig groen',
    prepSeconds: 120,
    speakSeconds: 120,
    modelAnswer:
      'Dames en heren, ik presenteer u vandaag twee ontwerpen voor onze nieuwe wijk. Ontwerp A kiest voor laagbouw met veel groen, speeltuinen en rustige straten voor 200 gezinnen. Ontwerp B gaat voor hoogbouw dichtbij het station, met een winkelcentrum en parkeergarage voor 500 woningen. Na zorgvuldige afweging adviseer ik Ontwerp B. Ten eerste pakt dit plan de grote woningbehoefte in onze gemeente beter aan. Ten tweede zorgt de nabijheid van het station en het winkelcentrum voor levendigheid en bereikbaarheid zonder auto. Het gebrek aan groen is een nadeel, maar dat kunnen we oplossen door verplichte dak- en gevelbeplanting op te nemen in het bestemmingsplan. Mijn conclusie: Ontwerp B biedt de beste combinatie van capaciteit en duurzaamheid.',
  },
];

// ─── 2022 ────────────────────────────────────────────────────────────────────

export const examTasks2022: ExamSimTask[] = [
  {
    id: 'exam_b2_2022_01',
    deel: 'Deel 1',
    topic: 'Taalcursus – docent ziek',
    instructionNl:
      'U volgt een taalcursus. Vandaag is de docent ziek en de les gaat niet door. U belt een medestudent die dat nog niet weet. Vertel het nieuws en wat dit voor de planning betekent.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Hé, ik bel je even om te zeggen dat de les van vandaag niet doorgaat. De docent is ziek. De school heeft gebeld dat de les volgende week wordt ingehaald. Zet het even in je agenda!',
  },
  {
    id: 'exam_b2_2022_02',
    deel: 'Deel 1',
    topic: 'Weekendje weg – reisplanner en trein',
    instructionNl:
      'U heeft een weekendje weg gepland voor u en uw partner. U bekijkt de reisplanner en ziet dat de trein niet rijdt. U belt uw partner. Vertel wat er aan de hand is en stel een alternatief voor.',
    imageUrls: [],
    imageLabels: [
      'Reisplanner op telefoon: trein geannuleerd wegens werkzaamheden, alternatief: bus + overstap',
    ],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Schat, ik heb net in de reisplanner gekeken en de trein rijdt dit weekend niet vanwege werkzaamheden. We kunnen een bus nemen en dan overstappen, maar dat duurt veel langer. Zullen we liever de auto pakken?',
  },
  {
    id: 'exam_b2_2022_03',
    deel: 'Deel 1',
    topic: 'Apotheek – medicijn ophalen',
    instructionNl:
      'U haalt een medicijn op bij de apotheek voor uw zieke buurvrouw. De apotheker geeft u uitleg over het gebruik. Beschrijf wat de apotheker heeft gezegd. Gebruik het plaatje.',
    imageUrls: [],
    imageLabels: [
      'Bijsluiter met instructie: 3× per dag 1 tablet bij de maaltijd innemen, niet combineren met alcohol, kuur van 7 dagen',
    ],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Hier zijn de tabletten. De apotheker zei dat je ze drie keer per dag moet innemen, steeds bij de maaltijd. Je mag geen alcohol drinken tijdens de kuur. En de kuur duurt precies zeven dagen, ook als je je eerder beter voelt.',
  },
  {
    id: 'exam_b2_2022_04',
    deel: 'Deel 1',
    topic: 'Bedrijfsbezoeken – programma',
    instructionNl:
      'U organiseert bedrijfsbezoeken voor studenten. Een student vraagt wat het programma is voor de bezoekdag. Gebruik het plaatje en leg het programma uit.',
    imageUrls: [],
    imageLabels: [
      'Programmaoverzicht: 09:00 welkom en introductie, 10:00 rondleiding productiehal, 12:00 lunch, 13:30 presentatie door managers, 15:00 vragen en afsluiting',
    ],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Het programma begint om 9 uur met een welkom en een introductie. Om 10 uur gaan we de productiehal bekijken. Na de lunch, om half twee, houden managers een presentatie. We sluiten af om 3 uur met een vragenronde.',
  },
  {
    id: 'exam_b2_2022_05',
    deel: 'Deel 2',
    topic: 'Auto – reiskosten vergelijken',
    instructionNl:
      'U wilt uw werkgever overtuigen om de reiskostenvergoeding te verhogen. U vergelijkt de huidige vergoeding met de werkelijke kosten. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Benzinepomp met hoge prijzen per liter',
      'Plaatje 2: Rekenmachine met berekening: werkelijke kosten €0,34/km vs. vergoeding €0,19/km',
      'Plaatje 3: Medewerker overhandigt formulier aan leidinggevende',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Ik wil u vragen om de reiskostenvergoeding te herzien. De benzineprijs is enorm gestegen, waardoor ik nu 34 cent per kilometer kwijt ben. Maar ik krijg slechts 19 cent vergoed. Dat verschil loopt per maand op tot meer dan honderd euro. Ik heb hier een formulier met een formeel verzoek tot verhoging.',
  },
  {
    id: 'exam_b2_2022_06',
    deel: 'Deel 2',
    topic: 'Unicef – vrijwilligerswerk werven',
    instructionNl:
      'U werkt als vrijwilliger voor Unicef en probeert een vriend te overtuigen om ook vrijwilliger te worden. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Gelukkige kinderen in een ontwikkelingsland dankzij schoolmaterialen',
      'Plaatje 2: Groep vrolijke vrijwilligers op een evenement',
      'Plaatje 3: Certificaat van Unicef als dank voor 100 vrijwilligersuren',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Je moet echt overwegen om vrijwilliger te worden! Kijk hoe blij die kinderen zijn met schoolmaterialen die wij hebben ingezameld. En het is ook ontzettend gezellig – wij vormen een hecht team en het is echt een feest om samen aan evenementen te werken. Bovendien krijg je na honderd uur een officieel certificaat van Unicef. Echt de moeite waard!',
  },
  {
    id: 'exam_b2_2022_07',
    deel: 'Deel 2',
    topic: 'Straattaal – voor en nadelen',
    instructionNl:
      'Er is een discussie over het gebruik van straattaal door jongeren. U bespreekt dit met een collega. Geef uw mening over de voor- en nadelen van straattaal en vertel wat u er zelf van vindt.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Straattaal heeft zowel voor- als nadelen. Aan de ene kant zorgt het voor verbinding tussen jongeren en is het een manier om je te onderscheiden. Aan de andere kant kan het een drempel zijn op de arbeidsmarkt of in formele situaties. Zelf vind ik dat jongeren beide taalregisters moeten kunnen gebruiken: straattaal onder vrienden, maar formeel Nederlands op het werk.',
  },
  {
    id: 'exam_b2_2022_08',
    deel: 'Deel 2',
    topic: 'Fiets kopen – duur of goedkoop',
    instructionNl:
      'U wilt een nieuwe fiets kopen en twijfelt tussen een duurdere fiets van €600 en een goedkopere van €350. U bespreekt dit met een vriend. Gebruik de plaatjes en leg uit welke u kiest en waarom.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Hoogwaardige fiets €600 – lichtgewicht frame, garantie 5 jaar, ingebouwde dynamo en slot',
      "Plaatje 2: Budgetfiets €350 – standaard uitrusting, 1 jaar garantie, geen extra's",
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Na lang nadenken kies ik toch voor de fiets van €600. Ja, hij is duurder, maar hij heeft vijf jaar garantie en een ingebouwde dynamo en slot. Dat bespaart me apart aanschaffen van die accessoires. Op de lange termijn is hij veel goedkoper dan elke paar jaar een nieuwe goedkope fiets kopen.',
  },
  {
    id: 'exam_b2_2022_09',
    deel: 'Deel 2',
    topic: 'Journalist – een dag op de redactie',
    instructionNl:
      'U heeft een dag meegelopen bij een krant als journalist. U vertelt uw partner wat u die dag allemaal heeft gedaan. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Journalist luistert naar ochtendvergadering, onderwerpen worden verdeeld',
      'Plaatje 2: Journalist interviewt iemand op straat met een microfoon',
      'Plaatje 3: Journalist typt artikel achter computerscherm, deadline telt af',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Wat een interessante dag! Eerst was er een ochtendvergadering waar de redacteur de onderwerpen verdeelde. Ik mocht een straatinterview doen over de nieuwe parkeerregels. Daarna moest ik snel een artikel schrijven voor de deadline. Het is echt een hectisch vak, maar super boeiend!',
  },
  {
    id: 'exam_b2_2022_10',
    deel: 'Deel 2',
    topic: 'Vijver aanleggen – stap voor stap',
    instructionNl:
      'U heeft zelf een vijver in de tuin aangelegd. Uw buurman wil dat ook doen en vraagt hoe u het heeft gedaan. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Gat graven op de gewenste plek in de tuin',
      'Plaatje 2: Vijverfolie leggen en vastmaken aan de randen',
      'Plaatje 3: Vijver gevuld met water, waterplanten en vissen erin',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Het is eigenlijk niet zo moeilijk! Eerst graaf je een gat op de plek waar je de vijver wilt. Dan leg je een speciale vijverfolie in het gat en zet je die vast aan de randen met stenen. Daarna vul je hem met water en kun je waterplanten en vissen toevoegen. Na een paar weken is het ecosysteem vanzelf in balans.',
  },
  {
    id: 'exam_b2_2022_11',
    deel: 'Deel 2',
    topic: 'Presentatie – printer doet het niet',
    instructionNl:
      'U geeft een presentatie voor uw afdeling, maar de printer werkt niet en uw handouts zijn niet klaar. U legt dit uit aan uw leidinggevende voor de presentatie. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Printer geeft foutmelding, papierstoring',
      'Plaatje 2: IT-medewerker probeert printer te repareren',
      'Plaatje 3: Presentator staat voor groep en verwijst naar digitale versie op scherm',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Goedemorgen. Ik moet u iets vertellen voor we beginnen. De printer heeft een papierstoring en de IT-afdeling is er nog mee bezig. De handouts zijn helaas niet klaar. Maar geen zorgen: ik heb de presentatie ook digitaal beschikbaar en die projecteer ik op het scherm. Iedereen kan meelezen.',
  },
  {
    id: 'exam_b2_2022_12',
    deel: 'Deel 2',
    topic: 'Sporten – blessure en revalidatie',
    instructionNl:
      'U heeft een sportblessure opgelopen en moet revalideren. U vertelt een vriend hoe dat is gegaan. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Sporter valt tijdens voetbalwedstrijd en houdt enkel vast',
      'Plaatje 2: Bezoek aan fysiotherapeut – enkel wordt behandeld met tape',
      'Plaatje 3: Sporter doet revalidatieoefeningen in de sportschool, stap voor stap herstel',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Tijdens de voetbalwedstrijd verzwikte ik mijn enkel bij een sliding. Ik ben meteen naar de fysiotherapeut gegaan, die mijn enkel behandelde en intapete. Daarna heb ik zes weken lang revalidatieoefeningen gedaan. Vorige week kon ik eindelijk weer meedoen met de training!',
  },
  {
    id: 'exam_b2_2022_13',
    deel: 'Deel 3',
    topic: 'Waterplas – visgebied of recreatie',
    instructionNl:
      'In uw gemeente is een grote waterplas. Er zijn twee plannen: het water inrichten als beschermd visgebied of als recreatiegebied met zwemmers en boten. U presenteert beide opties, vergelijkt ze en geeft uw aanbeveling met twee argumenten.',
    imageUrls: [],
    imageLabels: [
      'Kaart van waterplas met twee zones: links visserijgebied met borden "geen toegang", rechts recreatiegebied met steigers, reddingsboei en strandje',
    ],
    tableData:
      'Plan A – Beschermd visgebied: geen recreatie, herstel van visstand, goed voor biodiversiteit, beperkte toegang\nPlan B – Recreatiegebied: zwemmen, kanoën, strandje, economisch voordeel voor omliggende horeca, meer drukte en geluidsoverlast',
    prepSeconds: 120,
    speakSeconds: 120,
    modelAnswer:
      'Beste aanwezigen. Vandaag presenteer ik twee plannen voor de waterplas. Plan A maakt er een beschermd visgebied van: geen recreatie, maar herstel van de visstand en betere biodiversiteit. Plan B kiest voor recreatie: zwemmen, kanoën en een strandje, wat economisch goed is voor de omgeving maar ook drukte meebrengt. Mijn aanbeveling is Plan A, het beschermde visgebied, en wel om twee redenen. Ten eerste is de visstand in onze gemeente de afgelopen twintig jaar sterk afgenomen. Bescherming is hard nodig om verder verlies te voorkomen. Ten tweede hebben we in de directe omgeving al voldoende recreatiemogelijkheden. De toegevoegde waarde van nóg een zwemplas is beperkt, terwijl de ecologische winst van bescherming groot is. Ik adviseer dan ook Plan A, eventueel met een kleine observatiesteiger zodat bezoekers van de natuur kunnen genieten zonder die te verstoren.',
  },
];

// ─── 2023 ────────────────────────────────────────────────────────────────────

export const examTasks2023: ExamSimTask[] = [
  {
    id: 'exam_b2_2023_01',
    deel: 'Deel 1',
    topic: 'Scriptie of stage – advies geven',
    instructionNl:
      'U studeert en moet kiezen tussen een scriptie schrijven of stage lopen als afstudeervorm. Een medestudent vraagt uw mening. Vertel uw mening en geef twee argumenten.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Ik zou zeker voor een stage kiezen. Ten eerste doe je praktijkervaring op die werkgevers later erg waarderen. Ten tweede leer je in een echte werkomgeving sneller dan achter je bureau een scriptie schrijven.',
  },
  {
    id: 'exam_b2_2023_02',
    deel: 'Deel 1',
    topic: 'Douane – beveiligingspoort uitleggen',
    instructionNl:
      'U werkt bij de douane op een vliegveld. Een passagier begrijpt niet wat er bij de beveiligingspoort allemaal moet. Leg de procedure uit. Gebruik het plaatje.',
    imageUrls: [],
    imageLabels: [
      'Beveiligingspoort met instructiebordje: laptop uit tas, riem en schoenen uit, vloeistoffen in zakje, telefoon in bak',
    ],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Goedemiddag. Ik leg het even uit. U moet uw laptop uit de tas halen en apart in een bak leggen. Riem en schoenen gaan ook uit. Vloeistoffen moeten in een doorzichtig zakje en uw telefoon in een aparte bak. Daarna loopt u door de poort.',
  },
  {
    id: 'exam_b2_2023_03',
    deel: 'Deel 1',
    topic: 'Weekenddienst – regeling bespreken',
    instructionNl:
      'U werkt in de zorg en er is een discussie over weekenddiensten. Sommige collega\'s willen meer beloning voor weekenddiensten, anderen vinden dat iedereen evenveel diensten moet draaien. Een collega vraagt uw mening. Vertel uw mening met twee argumenten.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Ik vind dat weekenddiensten extra beloond moeten worden. Ten eerste mis je dan vrije tijd met je gezin of vrienden, dat verdient compensatie. Ten tweede zijn niet alle roosters gelijk: sommige collega\'s hebben altijd meer weekenddiensten dan anderen.',
  },
  {
    id: 'exam_b2_2023_04',
    deel: 'Deel 1',
    topic: 'Laptop kapot – oplossing zoeken',
    instructionNl:
      'Uw laptop is kapot en u heeft hem hard nodig voor een deadline. U belt uw leidinggevende om uitleg te geven en een oplossing te vragen.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Goedemorgen. Ik bel met een probleem: mijn laptop is vanmorgen kapot gegaan en ik heb hem echt nodig voor de deadline van morgen. Zou ik tijdelijk een reserve-laptop kunnen lenen van de afdeling?',
  },
  {
    id: 'exam_b2_2023_05',
    deel: 'Deel 2',
    topic: 'Overlast – feestjes in de buurt',
    instructionNl:
      'In uw buurt is er veel overlast van feestjes bij een buurman. U bespreekt dit met een andere buurman en geeft twee mogelijke oplossingen. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Huis met luide muziek en mensen voor de deur, nachtelijk tijdstip',
      'Plaatje 2: Brief in brievenbus van buurman met vriendelijk verzoek om rustiger te zijn',
      'Plaatje 3: Buurtbewoners in gesprek met wijkagent op straat',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Die overlast is echt niet meer te doen. Ik stel twee dingen voor. Eerst schrijven we samen een vriendelijke brief aan de buurman met de vraag om eerder te stoppen met feesten. Als dat niet helpt, schakelen we de wijkagent in. Die kan bemiddelen en zo nodig optreden. Zo lossen we het stap voor stap op.',
  },
  {
    id: 'exam_b2_2023_06',
    deel: 'Deel 2',
    topic: 'Sportjournalist – stagiaire inwerken',
    instructionNl:
      'U bent sportjournalist en werkt een stagiaire in. U legt uit hoe een werkdag eruitziet. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Ochtend – redactievergadering, sportagenda doornemen',
      'Plaatje 2: Middag – verslag doen van een persconferentie met sportcoach',
      'Plaatje 3: Avond – artikel schrijven, inleveren voor deadline',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Welkom! Laat me je een dag als sportjournalist uitleggen. \'s Ochtends beginnen we met de redactievergadering waar we de sportagenda doornemen. \'s Middags ga ik vaak naar persconferenties, zoals die van een voetbalcoach. \'s Avonds schrijf ik het artikel en lever ik dat in voor de deadline. Het is een lange dag, maar de variatie maakt het geweldig!',
  },
  {
    id: 'exam_b2_2023_07',
    deel: 'Deel 2',
    topic: 'Vrijwilligerswerk – overtuigen',
    instructionNl:
      'U doet vrijwilligerswerk bij een voedselbank en probeert een vriend te overtuigen om ook te helpen. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Vrijwilliger sorteert voedselpakketten in magazijn',
      'Plaatje 2: Blij gezin ontvangt een voedselpakket',
      'Plaatje 3: Vrijwilligers samen koffiedrinken, gezellige sfeer',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Je moet echt meedoen! Kijk: elke week help ik met het sorteren van voedselpakketten voor gezinnen die het financieel moeilijk hebben. Het is zo mooi om te zien hoe blij mensen zijn als ze hun pakket ontvangen. Bovendien zijn de andere vrijwilligers super gezellig – we drinken altijd samen koffie na afloop. Je doet goed én het is leuk!',
  },
  {
    id: 'exam_b2_2023_08',
    deel: 'Deel 2',
    topic: 'Stage ziekenhuis – dag beschrijven',
    instructionNl:
      'U heeft stage gelopen in een ziekenhuis. U vertelt uw ouders hoe een typische dag verliep. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Ochtendronde – arts en stagiaire bezoeken patiënten op de afdeling',
      'Plaatje 2: Laboratorium – bloed afnemen en analyses uitvoeren',
      'Plaatje 3: Overleg met verpleegkundig team aan het einde van de dag',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Elke dag begon met de ochtendronde langs de patiënten samen met de arts. Daarna werkte ik in het laboratorium: bloed afnemen en analyses uitvoeren. Aan het einde van de dag was er altijd een teamoverleg met de verpleegkundigen. Het was intensief maar ik heb ontzettend veel geleerd!',
  },
  {
    id: 'exam_b2_2023_09',
    deel: 'Deel 2',
    topic: 'Makelaar – twee huizen vergelijken',
    instructionNl:
      'U bent makelaar en toont een klant twee huizen. Beschrijf de voor- en nadelen van beide huizen en adviseeer welk huis het beste past bij de wensen van de klant. Gebruik de plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Huis A – vrijstaand huis, grote tuin, ver van het centrum, €380.000',
      'Plaatje 2: Huis B – appartement in het centrum, balkon, dichtbij OV, €320.000',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Goedemiddag! Laat me u beide opties toelichten. Huis A is een vrijstaand huis met een grote tuin buiten het centrum voor 380.000 euro. Huis B is een centrumappartement met balkon dichtbij het openbaar vervoer voor 320.000 euro. U heeft aangegeven dat u rust en ruimte belangrijk vindt, dan zou ik Huis A aanbevelen. De tuin en de rust opwegen tegen het iets hogere prijskaartje.',
  },
  {
    id: 'exam_b2_2023_10',
    deel: 'Deel 2',
    topic: 'Festival – organisatie verslag',
    instructionNl:
      'U heeft geholpen bij de organisatie van een festival. U vertelt een vriend hoe de dag verlopen is. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Vroege ochtend – tenten en podium worden opgebouwd',
      'Plaatje 2: Middag – druk festival met muziek, publiek geniet',
      'Plaatje 3: Avond – vrijwilligers ruimen op na afloop',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Het was een geweldige dag, maar wel druk! Vroeg in de ochtend bouwden we samen de tenten en het podium op. Overdag was het festival een succes: het was druk en iedereen genoot van de muziek. Na afloop hebben we met het hele vrijwilligersteam alles opgeruimd. Moe maar trots!',
  },
  {
    id: 'exam_b2_2023_11',
    deel: 'Deel 2',
    topic: 'Bank – niet storen teken',
    instructionNl:
      'U werkt bij een bank en er is een discussie of medewerkers een "niet storen"-bord op hun bureau mogen plaatsen tijdens geconcentreerd werk. Een collega vraagt uw mening. Geef uw mening met twee argumenten.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Ik ben er voorstander van. Ten eerste vergroot geconcentreerd werken de kwaliteit: fouten in financiële documenten zijn echt niet acceptabel. Ten tweede is de productiviteit hoger als je niet steeds wordt onderbroken. We kunnen afspreken dat het bord alleen voor een uur per dag mag worden gebruikt.',
  },
  {
    id: 'exam_b2_2023_12',
    deel: 'Deel 2',
    topic: 'Rijbewijs op 17 jaar – mening',
    instructionNl:
      'Er is een voorstel om jongeren al op 17 jaar een rijbewijs te laten halen onder begeleiding. Een journalist vraagt uw mening. Geef uw mening met twee argumenten.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Ik ben er voorstander van. Allereerst krijgen jongeren zo meer rijervaring voor ze zelfstandig de weg op gaan, wat de verkeersveiligheid ten goede komt. Bovendien is de begeleide rijvariant al in andere landen succesvol gebleken en leidt dit tot minder ongelukken onder nieuwe bestuurders.',
  },
  {
    id: 'exam_b2_2023_13',
    deel: 'Deel 3',
    topic: 'Vervoer NL–Engeland – grafiek',
    instructionNl:
      'U presenteert onderzoeksresultaten over hoe Nederlanders reizen van Nederland naar Engeland. Beschrijf de grafiek, benoem twee opvallende trends en bespreek mogelijke oorzaken.',
    imageUrls: [],
    imageLabels: [
      'Staafdiagram: vervoermiddel NL–Engeland 2015 vs 2023. Vliegtuig: 72% → 58%. Eurostar (trein): 15% → 28%. Boot/ferry: 10% → 10%. Auto/tunnel: 3% → 4%.',
    ],
    tableData:
      'Vervoer NL–Engeland (% reizigers):\nVliegtuig: 72% (2015) → 58% (2023)\nEurostar: 15% (2015) → 28% (2023)\nBoot/ferry: 10% (2015) → 10% (2023)\nAuto/tunnel: 3% (2015) → 4% (2023)',
    prepSeconds: 120,
    speakSeconds: 120,
    modelAnswer:
      'Goedemiddag. Ik presenteer u vandaag gegevens over hoe Nederlanders naar Engeland reizen, een vergelijking tussen 2015 en 2023. De meest opvallende trend is de daling van het vliegtuig: van 72 naar 58 procent. Tegelijkertijd is de Eurostar gestegen van 15 naar 28 procent. Boot en auto blijven nagenoeg gelijk. Twee oorzaken vallen op. Ten eerste is er groeiende bewustheid over de CO2-uitstoot van vliegen, waardoor meer reizigers bewust kiezen voor de trein. Ten tweede heeft Eurostar zijn capaciteit en comfort verbeterd, waardoor de reis aantrekkelijker is geworden. Toch vliegt nog steeds de meerderheid. Dit vraagt om structureel beleid: hogere vliegbelasting en betaalbaardere treinprijzen zouden de verschuiving naar de trein versnellen. Al met al laat de grafiek zien dat duurzamer reizen in opkomst is, maar dat er nog een lange weg te gaan is.',
  },
];

// ─── 2024 ────────────────────────────────────────────────────────────────────

export const examTasks2024: ExamSimTask[] = [
  {
    id: 'exam_b2_2024_01',
    deel: 'Deel 1',
    topic: 'Rijexamen – man met kruk',
    instructionNl:
      'U bent rijinstructeur. Er meldt zich een nieuwe leerling met een kruk vanwege een knieblessure. U vraagt de leerling naar zijn situatie en legt uit wat de regels zijn voor rijlessen met een blessure.',
    imageUrls: [],
    imageLabels: [
      'Man met kruk loopt naar rijschool, been in verband, rijbewijs formulier in hand',
    ],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Goedemiddag. Ik zie dat u een kruk heeft. Kunt u me vertellen wat er is? Een knieblessure – begrijpelijk. Helaas kunnen we de rijlessen pas hervatten als uw arts heeft bevestigd dat u veilig kunt rijden. Zodra u een verklaring heeft, plannen we direct een les in.',
  },
  {
    id: 'exam_b2_2024_02',
    deel: 'Deel 1',
    topic: 'Avondcollege – mening over studeren',
    instructionNl:
      'U volgt een avondcollege naast uw werk. Een collega vraagt wat u daarvan vindt. Vertel uw mening over studeren naast werken en geef twee argumenten.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Het is zwaar maar zeker de moeite waard. Je breidt je kennis en carrièrekansen uit, en dat terwijl je gewoon blijft werken. Bovendien leer je de theorie direct toepassen op je dagelijkse werkpraktijk, wat erg waardevol is.',
  },
  {
    id: 'exam_b2_2024_03',
    deel: 'Deel 1',
    topic: 'Bezorgdienst – stoelen en dozen',
    instructionNl:
      'U werkt bij een bezorgdienst. U heeft een bestelling bezorgd maar de klant klaagt dat er stoelen ontbreken en er dozen beschadigd zijn. U belt uw leidinggevende om de situatie te melden en een oplossing voor te stellen.',
    imageUrls: [],
    imageLabels: [
      'Bezorger naast bestelwagen met dozen, klant staat voor deur met beschadigde doos, ontbrekende stoelen',
    ],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Goedemiddag. Ik bel over een probleem bij bezorging nummer 4521. Er ontbreken twee stoelen en een doos is beschadigd bij de klant. Ik stel voor om een nieuwe levering te plannen en de klant een korting aan te bieden als compensatie. Wat vindt u?',
  },
  {
    id: 'exam_b2_2024_04',
    deel: 'Deel 1',
    topic: 'Presentatie – vragen stellen',
    instructionNl:
      'U heeft net een presentatie gegeven. Een collega wil weten hoe u omgaat met moeilijke vragen van het publiek tijdens een presentatie. Geef uw mening met twee praktische tips.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Mijn eerste tip is: neem even de tijd voordat je antwoord geeft. Het is prima om te zeggen: "Goede vraag, daar denk ik even over na." Mijn tweede tip is: als je het antwoord niet weet, zeg dat eerlijk en beloof het na te zoeken. Dat is veel professioneler dan iets fouts zeggen.',
  },
  {
    id: 'exam_b2_2024_05',
    deel: 'Deel 2',
    topic: 'Kamer verven – instructie',
    instructionNl:
      'U heeft zelf een kamer geverfd. Uw vriend wil dat ook doen en vraagt hoe u het heeft gedaan. Leg de stappen uit. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Meubels worden verplaatst en afgedekt met plastic zeilen, plinten worden afgeplakt',
      'Plaatje 2: Muren worden gegrond met een roller',
      'Plaatje 3: Eindresultaat – kamer is geschilderd, plastic weg, meubels teruggeplaatst',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Het verven zelf is niet moeilijk, maar de voorbereiding is het belangrijkst! Eerst verplaats je de meubels en dek je de vloer af met plastic. Tape de plinten af. Dan breng je een grondlaag aan met een roller. Nadat die droog is, schilder je de eindlaag. Daarna haal je het plastic weg en schuif je de meubels terug. Klaar!',
  },
  {
    id: 'exam_b2_2024_06',
    deel: 'Deel 2',
    topic: 'Tas – vriendin in Antwerpen vergeten',
    instructionNl:
      'U bent met een vriendin naar Antwerpen geweest en zij heeft daar haar tas vergeten. U vertelt een andere vriend hoe dat is gegaan en hoe het is opgelost. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Twee vriendinnen winkelen in Antwerpen, tas staat op stoel in café',
      'Plaatje 2: In de trein terug realiseert vriendin zich dat tas weg is, schrik op gezicht',
      'Plaatje 3: Telefoontje naar het café – tas is gevonden en bewaard door de eigenaar',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'We hadden een gezellig dagje Antwerpen, maar in de trein terug realiseerde mijn vriendin zich dat ze haar tas had laten staan in het café. We schrokken ons wild! Ze belde meteen het café op en gelukkig had de eigenaar de tas gevonden en bewaard. We hebben hem de volgende dag opgehaald, opgelucht!',
  },
  {
    id: 'exam_b2_2024_07',
    deel: 'Deel 2',
    topic: 'Pasje aanvragen – procedure',
    instructionNl:
      'U legt een nieuwe bewoner uit hoe hij een OV-chipkaart kan aanvragen. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Website met aanvraagformulier invullen, pasfoto uploaden',
      'Plaatje 2: Bevestigingsmail ontvangen met verwachte levertijd',
      'Plaatje 3: OV-chipkaart arriveert in brievenbus, activatie via automaat',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Het is heel eenvoudig. Ga naar de website en vul het aanvraagformulier in. Upload een recente pasfoto. Je ontvangt dan een bevestigingsmail met de levertijd, meestal vijf werkdagen. Zodra de kaart in de brievenbus ligt, activeer je hem bij een automaat op het station. Dan kun je direct reizen!',
  },
  {
    id: 'exam_b2_2024_08',
    deel: 'Deel 2',
    topic: 'Uitwisseling Italië – overtuigen',
    instructionNl:
      'Uw school organiseert een uitwisselingsprogramma met een Italiaanse school. U probeert een medestudent te overtuigen om mee te doen. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Groep studenten bij het Colosseum in Rome, breed lachend',
      'Plaatje 2: Italiaanse taalles in een Italiaanse school',
      'Plaatje 3: Internationaal netwerk – studenten wisselen contactgegevens uit',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Je moet echt meegaan naar Italië! Ten eerste doe je unieke culturele ervaringen op – je ziet Rome met eigen ogen. Ten tweede verbeter je je Italiaans of Engels enorm door samen lessen te volgen. En tot slot bouw je een internationaal netwerk op dat je later in je carrière goed van pas kan komen. Zo\'n kans krijg je niet snel meer!',
  },
  {
    id: 'exam_b2_2024_09',
    deel: 'Deel 2',
    topic: 'Computercursus – klacht indienen',
    instructionNl:
      'U heeft een computercursus gevolgd die erg teleurstellend was. U belt het cursuscentrum om te klagen. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Deelnemers zitten in een lokaal, de docent is niet gearriveerd',
      'Plaatje 2: Computerapparatuur werkt niet, schermen zijn zwart',
      'Plaatje 3: Cursist belt telefonisch naar cursuscentrum met een klachtenformulier voor zich',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Goedemiddag. Ik bel om een klacht in te dienen over de cursus van afgelopen maandag. Ten eerste was de docent te laat en hebben we twintig minuten gewacht. Ten tweede werkten twee computers helemaal niet, waardoor ik nauwelijks kon oefenen. Ik wil graag weten hoe u dit gaat compenseren.',
  },
  {
    id: 'exam_b2_2024_10',
    deel: 'Deel 2',
    topic: 'Hogeschool of universiteit – keuze',
    instructionNl:
      'U bespreekt met een vriend de voor- en nadelen van hogeschool versus universiteit. Gebruik de tabel en geef uw aanbeveling.',
    imageUrls: [],
    imageLabels: [],
    tableData:
      'Hogeschool (HBO): praktijkgericht, kortere studieduur (4 jr), stage verplicht, directe arbeidsmarkt\nUniversiteit (WO): theoretisch, mogelijkheid tot promotie, langere studieduur (3+2 jr), wetenschappelijk onderzoek',
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Beide hebben voor- en nadelen. De hogeschool is praktijkgericht en je bent sneller klaar, wat goed is als je snel aan het werk wilt. De universiteit is theoretischer maar biedt meer doorgroeimogelijkheden en de kans om te promoveren. Als je nog niet zeker bent van je richting, zou ik zeggen: ga naar de hogeschool en kijk hoe je je later wilt specialiseren.',
  },
  {
    id: 'exam_b2_2024_11',
    deel: 'Deel 2',
    topic: 'Geld ophalen voor milieu – actie',
    instructionNl:
      'U organiseert een geldinzamelingsactie voor een milieudoelen. U vraagt collega\'s om mee te doen. Gebruik alle plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1: Poster met slogan "Teken voor een groen schoolplein" en QR-code',
      'Plaatje 2: Collega\'s verzamelen handtekeningen op kantoor',
      'Plaatje 3: Cheque van ingezameld geld wordt overhandigd aan gemeente',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Hallo iedereen. We hebben een geweldige actie lopen voor een groener schoolplein in de buurt. We verzamelen handtekeningen en donaties. Kijk, met de QR-code op deze poster kun je direct online doneren. Al met ons ingezameld geld overhandigen we straks een cheque aan de gemeente. Doe je mee?',
  },
  {
    id: 'exam_b2_2024_12',
    deel: 'Deel 2',
    topic: 'Maximumsnelheid – verlaging of niet',
    instructionNl:
      'Er is een voorstel om de maximumsnelheid op snelwegen te verlagen van 130 naar 100 km/u voor het milieu. Een collega vraagt uw mening. Geef uw mening met twee argumenten.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Ik ben er voorstander van. Ten eerste is aangetoond dat rijden op 100 km/u de stikstofuitstoot aanzienlijk vermindert, wat goed is voor de natuur. Ten tweede levert het ook veiligheidsvoordelen op: lagere snelheid betekent minder ernstige ongelukken. De reistijd wordt iets langer, maar de milieu- en veiligheidswinst is het meer dan waard.',
  },
  {
    id: 'exam_b2_2024_13',
    deel: 'Deel 3',
    topic: 'Geluidsoverlast – grafiek interpreteren',
    instructionNl:
      'U presenteert onderzoeksresultaten over geluidsoverlast in Nederlandse steden. Beschrijf de grafiek, noem twee opvallende punten en bespreek mogelijke oorzaken en oplossingen.',
    imageUrls: [],
    imageLabels: [
      'Staafdiagram geluidsoverlast per bron: verkeer 45% (2018) → 52% (2023), buren 30% (2018) → 25% (2023), horeca 15% (2018) → 18% (2023), overig 10% (2018) → 5% (2023)',
    ],
    tableData:
      'Geluidsoverlast per bron (% meldingen):\nVerkeer: 45% (2018) → 52% (2023)\nBuren: 30% (2018) → 25% (2023)\nHoreca: 15% (2018) → 18% (2023)\nOverig: 10% (2018) → 5% (2023)',
    prepSeconds: 120,
    speakSeconds: 120,
    modelAnswer:
      'Dames en heren. Ik presenteer u vandaag cijfers over geluidsoverlast in Nederlandse steden tussen 2018 en 2023. De grafiek laat zien dat verkeersoverlast is gestegen van 45 naar 52 procent van alle meldingen. Dit is opvallend, want je zou verwachten dat meer thuiswerken de verkeersdrukte zou verminderen. Een mogelijke oorzaak is de sterke groei van bezorgdiensten, die meer vrachtverkeer in wijken brengt. Het tweede opvallende punt is dat burengerucht is gedaald van 30 naar 25 procent. Dit kan komen doordat gemeenten meer mediation aanbieden. Tegelijkertijd zien we een lichte stijging bij horeca-overlast, van 15 naar 18 procent. Mogelijke oplossingen voor verkeersoverlast zijn: knip drukke doorgaande wegen in woongebieden en stimuleer elektrisch vervoer dat stiller is. Voor horeca-overlast zouden strengere geluidsnormen en betere handhaving helpen. Samengevat: verkeersoverlast is het grootste en groeiende probleem. Hier moet de prioriteit liggen.',
  },
];

// ─── 2025 ────────────────────────────────────────────────────────────────────

export const examTasks2025: ExamSimTask[] = [
  {
    id: 'exam_b2_2025_01',
    deel: 'Deel 1',
    topic: 'Personeelsruimte beschrijven',
    instructionNl:
      'U werkt op een kantoor. Er is een nieuwe personeelsruimte. U belt een collega die er nog niet geweest is. Beschrijf de ruimte aan de hand van het plaatje.',
    imageUrls: ['/sim/spk_2025_01.svg'],
    imageLabels: [
      'Personeelsruimte: koffiehoek links, tafel met vier stoelen midden, prikbord met roosters rechts, raam op de achtergrond',
    ],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Hé! De nieuwe personeelsruimte is echt fijn. Links staat een koffiehoek met een machine en een koelkast. In het midden staat een grote tafel met vier stoelen om samen te lunchen. Rechts hangt een prikbord met de roosters. En er is ook een groot raam, dus veel licht!',
  },
  {
    id: 'exam_b2_2025_02',
    deel: 'Deel 1',
    topic: 'Arbo – nek- en rugoefeningr',
    instructionNl:
      'U bent arbo-deskundige. Een medewerker heeft last van zijn nek en rug door langdurig beeldschermwerk. U legt uit hoe hij twee oefeningen moet uitvoeren. Gebruik beide plaatjes.',
    imageUrls: ['/sim/spk_2025_02a.svg', '/sim/spk_2025_02b.svg'],
    imageLabels: [
      'Plaatje 1: Nekoefening – hoofd langzaam naar links en rechts draaien, schouders laag',
      'Plaatje 2: Rugoefening – achterover leunen in stoel, armen gestrekt boven het hoofd',
    ],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Ik zal de twee oefeningen uitleggen. Voor je nek: draai je hoofd langzaam naar links, houd drie seconden vast, dan naar rechts. Houd je schouders ontspannen laag. Voor je rug: leun achterover in je stoel en strek je armen boven je hoofd. Houd dat ook drie seconden vast. Doe dit elk uur even.',
  },
  {
    id: 'exam_b2_2025_03',
    deel: 'Deel 1',
    topic: 'Nakijken of verbeteren – mening',
    instructionNl:
      'U bent docent. Er is een discussie of u het werk van leerlingen moet nakijken of ook uitgebreid moet verbeteren met suggesties. Een collega vraagt uw mening. Vertel uw mening en geef twee redenen.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Ik vind dat verbeteren met suggesties veel waardevoller is. Ten eerste leren leerlingen meer van gerichte feedback dan van alleen een cijfer. Ten tweede geeft het hen concrete handvatten om zich te verbeteren. Het kost meer tijd, maar de leerwinst is groot.',
  },
  {
    id: 'exam_b2_2025_04',
    deel: 'Deel 1',
    topic: 'Glasbak – huidige situatie en voorstel',
    instructionNl:
      'Voor uw appartementencomplex staat een glasbak die veel overlast geeft. U belt de gemeente met een voorstel voor een betere locatie. Beschrijf de huidige situatie en uw voorstel. Gebruik beide plaatjes.',
    imageUrls: ['/sim/spk_2025_04a.svg', '/sim/spk_2025_04b.svg'],
    imageLabels: [
      'Plaatje 1 (Nu): Glasbak direct voor ingang appartementengebouw, rommel eromheen, bewoners lopen er langs',
      'Plaatje 2 (Voorstel): Glasbak verplaatst naar parkeerterrein 50 meter verderop, omsloten door groen scherm',
    ],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Goedemiddag. Ik bel over de glasbak voor ons appartementengebouw. Op dit moment staat die direct bij de ingang en dat geeft veel lawaai en rommel. Mijn voorstel is om de glasbak te verplaatsen naar het parkeerterrein vijftig meter verderop en hem te omringen met een groen scherm. Dan is het voor iedereen prettiger.',
  },
  {
    id: 'exam_b2_2025_05',
    deel: 'Deel 2',
    topic: 'Mentorprogramma – opzet uitleggen',
    instructionNl:
      'Uw bedrijf start een mentorprogramma waarbij ervaren medewerkers nieuwe collega\'s begeleiden. U legt een nieuwe medewerker uit hoe het programma werkt. Gebruik alle plaatjes.',
    imageUrls: ['/sim/spk_2025_05a.svg', '/sim/spk_2025_05b.svg', '/sim/spk_2025_05c.svg'],
    imageLabels: [
      'Plaatje 1: Introductiegesprek – mentor en nieuwe medewerker leren elkaar kennen',
      'Plaatje 2: Wekelijks overleg – mentor begeleidt bij concrete werktaken',
      'Plaatje 3: Evaluatiegesprek na drie maanden – beide ondertekenen evaluatieformulier',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Welkom bij ons mentorprogramma! Het werkt zo: in de eerste week heb je een introductiegesprek met je mentor om elkaar te leren kennen en doelen te stellen. Daarna heb je elke week een overleg waarbij je mentor je begeleidt bij je taken en vragen beantwoordt. Na drie maanden doen we een evaluatiegesprek en vullen we samen een formulier in. Zo volgen we jouw voortgang goed.',
  },
  {
    id: 'exam_b2_2025_06',
    deel: 'Deel 2',
    topic: 'Wachttijden klantenservice – oplossingen',
    instructionNl:
      'U werkt bij een klantenservice. De wachttijden zijn erg lang en klanten klagen. U bespreekt twee mogelijke oplossingen met uw leidinggevende. Geef uw mening en twee aanbevelingen.',
    imageUrls: [],
    imageLabels: [],
    tableData:
      'Probleem: gemiddelde wachttijd 18 minuten, klanttevredenheid gedaald naar 5,2/10\nOptie A: Extra medewerkers aanstellen (kosten: hoog)\nOptie B: Chatbot voor eenvoudige vragen + medewerkers voor complexe (kosten: middel)',
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'De wachttijden zijn inderdaad te lang. Ik zou Optie B aanbevelen: een chatbot voor eenvoudige vragen zoals openingstijden en bestellingen controleren. Zo houden onze medewerkers tijd over voor de ingewikkelde gevallen. Als tweede maatregel stel ik voor dat klanten een terugbelverzoek kunnen indienen, zodat ze niet in de wacht hoeven te wachten. Dit verbetert de tevredenheid snel.',
  },
  {
    id: 'exam_b2_2025_07',
    deel: 'Deel 2',
    topic: 'Pakket – bij buren afgegeven',
    instructionNl:
      'U heeft een pakket besteld maar was niet thuis. De bezorger heeft het bij de buren afgegeven. U vertelt uw partner hoe dat is gegaan. Gebruik alle plaatjes.',
    imageUrls: ['/sim/spk_2025_07a.svg', '/sim/spk_2025_07b.svg', '/sim/spk_2025_07c.svg'],
    imageLabels: [
      'Plaatje 1: Bezorger belt aan, niemand thuis – bordje "niet thuis" op de deur',
      'Plaatje 2: Bezorger loopt naar buren en geeft pakket af, buurvrouw tekent',
      'Plaatje 3: Bewoner haalt pakket op bij buren, blij gezicht',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Ik was niet thuis toen het pakket werd bezorgd. De bezorger heeft het bij de buren afgegeven – mevrouw Van Dam heeft het aangenomen en getekend. Ik heb haar een appje gestuurd en ben het pakket gaan ophalen. Het was gelukkig niets beschadigd! Volgende keer zet ik een afleverinstructie bij de bestelling.',
  },
  {
    id: 'exam_b2_2025_08',
    deel: 'Deel 2',
    topic: 'Studiereis – programma vergelijken',
    instructionNl:
      'Uw klas organiseert een studiereis. Er zijn twee opties. U bespreekt deze met een medestudent en geeft uw voorkeur aan. Gebruik de tabel.',
    imageUrls: [],
    imageLabels: [],
    tableData:
      'Reis A – Berlijn: 3 dagen, museumbezoeken en bedrijfsbezoek, €280 p.p., trein\nReis B – Parijs: 4 dagen, workshops aan universiteit, culturele activiteiten, €420 p.p., vliegtuig',
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Ik heb beide opties bekeken. Reis A naar Berlijn is goedkoper en duurt drie dagen, met museumbezoeken en een bedrijfsbezoek per trein. Reis B naar Parijs duurt vier dagen met workshops aan een universiteit, maar kost 140 euro meer en je vliegt. Persoonlijk kies ik voor Reis B: de workshops zijn direct relevant voor onze studie en vier dagen geeft meer ruimte om echt iets mee te krijgen.',
  },
  {
    id: 'exam_b2_2025_09',
    deel: 'Deel 2',
    topic: 'Brandveiligheid – procedure uitleggen',
    instructionNl:
      'U bent bedrijfshulpverlener (BHV) en legt nieuwe medewerkers de brandveiligheidsprocedure uit. Gebruik alle plaatjes.',
    imageUrls: ['/sim/spk_2025_09a.svg', '/sim/spk_2025_09b.svg', '/sim/spk_2025_09c.svg'],
    imageLabels: [
      'Plaatje 1: Brandmelder gaat af – rode lamp knippert, signaal klinkt',
      'Plaatje 2: Medewerkers lopen kalm naar nooduitgang via gemarkeerde vluchtroute',
      'Plaatje 3: Verzamelpunt buiten – BHV-er telt mensen, iedereen aanwezig',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Let goed op, want dit is de brandveiligheidsprocedure. Zodra de brandmelder afgaat, blijft u kalm. Loop direct naar de dichtstbijzijnde nooduitgang via de aangegeven vluchtroute. Gebruik nooit de lift. Bij het verzamelpunt buiten wacht u totdat ik iedereen heb geteld. Alleen als u zeker iemand ziet die hulp nodig heeft, meldt u dat aan mij. Vragen?',
  },
  {
    id: 'exam_b2_2025_10',
    deel: 'Deel 2',
    topic: 'Uitstapje Rotterdam – verslag',
    instructionNl:
      'U bent met uw klas op uitstap geweest naar Rotterdam. U vertelt uw ouders wat u die dag heeft gedaan. Gebruik alle plaatjes.',
    imageUrls: ['/sim/spk_2025_10a.svg', '/sim/spk_2025_10b.svg', '/sim/spk_2025_10c.svg'],
    imageLabels: [
      'Plaatje 1: Groep studenten bij de Erasmusbrug, selfie moment',
      'Plaatje 2: Rondleiding in de Markthal, gids legt architectuur uit',
      'Plaatje 3: Lunch op het terras aan de Maas, zonnig weer',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      "Het was een geweldig dagje Rotterdam! We begonnen bij de Erasmusbrug waar we een grote klassenfoto hebben gemaakt. Daarna kregen we een rondleiding in de Markthal – wat een bijzonder gebouw! We sloten af met een heerlijke lunch op een terras aan de Maas in het zonnetje. De treinreis terug was ook gezellig. Ik wil zeker terug!",
  },
  {
    id: 'exam_b2_2025_11',
    deel: 'Deel 2',
    topic: 'Straat afsluiten – voor en nadelen',
    instructionNl:
      'In uw buurt wil de gemeente een straat afsluiten voor autoverkeer om meer ruimte te maken voor fietsers en voetgangers. Een buurvrouw vraagt uw mening. Geef uw mening met twee argumenten.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Ik ben er voor. Ten eerste wordt de straat veiliger: kinderen kunnen er buiten spelen zonder gevaar voor auto\'s. Ten tweede worden fietsers en voetgangers meer gestimuleerd, wat goed is voor de gezondheid en het milieu. Ik snap dat automobilisten een omweg moeten maken, maar de leefbaarheid van de buurt gaat er sterk op vooruit.',
  },
  {
    id: 'exam_b2_2025_12',
    deel: 'Deel 2',
    topic: 'Tijd of geld – wat is belangrijker',
    instructionNl:
      'U bespreekt met een vriend wat belangrijker is: meer vrije tijd of meer geld verdienen. Geef uw mening en twee argumenten.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Ik vind vrije tijd belangrijk, maar tot op zekere hoogte. Boven een bepaald inkomensniveau maakt meer geld je niet gelukkiger. Vrije tijd daarentegen stelt je in staat om te doen wat je echt waardevol vindt: tijd met familie, sporten, reizen. Maar je hebt wel voldoende geld nodig om die vrije tijd te kunnen genieten. Het gaat om de juiste balans.',
  },
  {
    id: 'exam_b2_2025_13',
    deel: 'Deel 3',
    topic: 'Vrije tijd kinderen – grafiek',
    instructionNl:
      'U presenteert onderzoeksresultaten over hoe kinderen hun vrije tijd besteden in Nederland. Beschrijf de grafiek, noem twee opvallende veranderingen en bespreek mogelijke oorzaken en gevolgen.',
    imageUrls: ['/sim/spk_2025_13.svg'],
    imageLabels: [
      'Staafdiagram – Vrije tijdsbesteding kinderen (8–12 jaar): Sociale media: 5% (2014) → 40% (2024). TV kijken: 25% (2014) → 30% (2024). Sporten: 40% (2014) → 20% (2024). Muziek luisteren: 25% (2014) → 10% (2024).',
    ],
    tableData:
      'Vrije tijdsbesteding kinderen 8–12 jaar:\nSociale media: 5% (2014) → 40% (2024)\nTV kijken: 25% (2014) → 30% (2024)\nSporten: 40% (2014) → 20% (2024)\nMuziek luisteren: 25% (2014) → 10% (2024)',
    prepSeconds: 120,
    speakSeconds: 120,
    modelAnswer:
      'Dames en heren. Ik presenteer vandaag gegevens over hoe kinderen van 8 tot 12 jaar hun vrije tijd besteden, een vergelijking tussen 2014 en 2024. De meest opvallende verandering is de explosieve groei van sociale media: van slechts 5 procent in 2014 naar 40 procent in 2024. Dit is een verachteling in tien jaar tijd. Tegelijkertijd is sporten gehalveerd: van 40 naar 20 procent. Dit zijn zorgwekkende ontwikkelingen. Mogelijke oorzaak van de stijging in sociale media is de brede beschikbaarheid van smartphones en tablets al op jonge leeftijd. Platforms zoals TikTok en YouTube zijn specifiek ontworpen om aandacht vast te houden. De daling in sporten hangt hier direct mee samen: kinderen die meer tijd online doorbrengen, bewegen minder. Dit heeft gevolgen voor de gezondheid: overgewicht en concentratieproblemen nemen toe bij kinderen. Muziek luisteren via de radio of cd is ook sterk gedaald, maar dit wordt deels verklaard doordat muziek nu via sociale media of streamingdiensten wordt geconsumeerd. Mijn conclusie: we moeten als maatschappij actie ondernemen. Scholen kunnen meer sportactiviteiten aanbieden en mediagebruik bespreekbaar maken. Ouders kunnen grenzen stellen aan schermtijd. Het is geen luxe, het is noodzaak.',
  },
];

// ─── Jaar-bundels ─────────────────────────────────────────────────────────────

export const examYears: { year: number; tasks: ExamSimTask[] }[] = [
  { year: 2021, tasks: examTasks2021 },
  { year: 2022, tasks: examTasks2022 },
  { year: 2023, tasks: examTasks2023 },
  { year: 2024, tasks: examTasks2024 },
  { year: 2025, tasks: examTasks2025 },
];
