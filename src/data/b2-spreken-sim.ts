import type { ExamSimTask, SimSet } from '../types';

const p = (seed: number, w = 600, h = 400) =>
  `https://picsum.photos/seed/nt2sim${seed}/${w}/${h}`;

// ─── Deneme 1 ─────────────────────────────────────────────────────────────────
// Tam sınav seti: 4 × Deel 1 + 8 × Deel 2 + 1 × Deel 3 = 13 görev

const deneme1Tasks: ExamSimTask[] = [
  {
    id: 'sim_b2_d1_01',
    deel: 'Deel 1',
    topic: 'Nieuwe kantoortuin',
    instructionNl:
      'U werkt op een groot kantoor. Uw bedrijf heeft recentelijk de kantoorruimte volledig verbouwd. U belt een collega die ziek thuis is en de nieuwe ruimte nog niet heeft gezien.\n\nBeschrijf de nieuwe werkruimte voor uw collega. Gebruik daarbij het plaatje. U hoort eerst de collega.',
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
      'U bent arbo-deskundige bij een groot bedrijf. Een medewerker komt bij u met klachten over vermoeide ogen door veel beeldschermwerk. U legt uit hoe hij een eenvoudige oogoefening kan doen.\n\nVertel de medewerker hoe hij de oogoefening moet uitvoeren. Gebruik daarbij de plaatjes. U hoort eerst de medewerker.',
    imageUrls: [p(2), p(3)],
    imageLabels: ['Plaatje 1: Ogen strak dichtknijpen', 'Plaatje 2: Ver weg kijken uit het raam'],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Eerst moet u uw ogen heel strak dichtknijpen voor een paar seconden. Daarna opent u ze en kijkt u ver weg door het raam.',
  },
  {
    id: 'sim_b2_d1_03',
    deel: 'Deel 1',
    topic: 'Presentaties beoordelen',
    instructionNl:
      'U volgt een managementcursus. De docent heeft aangekondigd dat studenten elkaars presentaties gaan beoordelen in plaats van een traditioneel examen. Een medestudent wil weten wat u van dit systeem vindt.\n\nVertel uw mening en geef twee redenen. U hoort eerst de medestudent.',
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
      'U werkt op een kantoor in het centrum van de stad. Voor de ingang worden dagelijks fietsen geparkeerd, waardoor de doorgang geblokkeerd wordt. U belt de gemeente om een oplossing voor te stellen.\n\nBeschrijf het huidige probleem en uw voorstel. Gebruik daarbij de plaatjes. U hoort eerst de medewerker van de gemeente.',
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
      'Uw bedrijf heeft besloten duurzamer te gaan werken. Als onderdeel daarvan wordt een nieuw carpoolprogramma geïntroduceerd. U bent erg enthousiast en wilt uw collega overtuigen om mee te doen.\n\nOvertuig uw collega om mee te doen aan het carpoolprogramma. Gebruik daarbij alle plaatjes. U hoort eerst de collega.',
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
      'U moet echt meedoen met carpoolen! Ten eerste is het veel gezelliger in de auto. Ten tweede bespaart u flink op de benzinekosten, en tot slot is het natuurlijk veel beter voor het milieu.',
  },
  {
    id: 'sim_b2_d2_06',
    deel: 'Deel 2',
    topic: 'Personeelstekort',
    instructionNl:
      'U bent filiaalmanager van een supermarkt. Door het drukke seizoen en een hoog ziekteverzuim is er een groot personeelstekort ontstaan. U bespreekt dit probleem met de regiomanager.\n\nGeef twee mogelijke oplossingen en vertel waarom dit goede oplossingen zijn. U hoort eerst de regiomanager.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      "We zouden studenten flexibele uren kunnen aanbieden, want zij zoeken vaak bijbaantjes. Daarnaast kunnen we zelfscankassa's plaatsen, waardoor we minder personeel nodig hebben aan de kassa.",
  },
  {
    id: 'sim_b2_d2_07',
    deel: 'Deel 2',
    topic: 'Lekkage fiets',
    instructionNl:
      'U bent buiten geweest en heeft gezien wat er met de fiets van uw buurman is gebeurd. Uw buurman vraagt ernaar. U vertelt wat u precies heeft gezien.\n\nVertel uw buurman wat er precies is gebeurd. Gebruik daarbij alle plaatjes. U hoort eerst de buurman.',
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
      'Hoi buurman. Ik zag dat u over straat fietste en per ongeluk over een hoop gebroken glas reed. Daarna was uw band helaas helemaal leeg en moest u verder lopen.',
  },
  {
    id: 'sim_b2_d2_08',
    deel: 'Deel 2',
    topic: 'Voorstel werkuitje',
    instructionNl:
      'U werkt bij een bedrijf en bent verantwoordelijk voor het organiseren van het jaarlijkse werkuitje. U vindt dat het anders moet dan vorige jaren en heeft een nieuw voorstel. U presenteert dit aan de directie.\n\nOvertuig de directie van uw voorstel. Geef twee argumenten op basis van de tabel. U hoort eerst de directeur.',
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
      'U bent inspecteur en controleert kantoorpanden op werkomstandigheden. U heeft een controle uitgevoerd bij een kantoor en drie privacyproblemen geconstateerd. U bespreekt de bevindingen met de kantoormanager.\n\nVertel de kantoormanager welke drie maatregelen hij moet nemen. Gebruik daarbij alle plaatjes. U hoort eerst de kantoormanager.',
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
      'U werkt bij de personeelsafdeling van een groot bedrijf. U organiseert de introductiedag voor nieuwe medewerkers. Een nieuwe medewerker vraagt wat er die dag allemaal gaat gebeuren.\n\nVertel de nieuwe medewerker wat het programma is. Gebruik daarbij alle plaatjes. U hoort eerst de nieuwe medewerker.',
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
      'Welkom! Om 9 uur beginnen we met een presentatie van de directeur. Daarna, om 11 uur, krijgt u een rondleiding door het magazijn. We sluiten af met een gezamenlijke lunch in de kantine om 13 uur.',
  },
  {
    id: 'sim_b2_d2_11',
    deel: 'Deel 2',
    topic: 'Gezonde kantine',
    instructionNl:
      'De middelbare school in uw wijk heeft besloten de verkoop van ongezonde snacks in de kantine te verbieden. Er is veel discussie over dit besluit in de buurt. Een journalist interviewt u erover.\n\nGeef uw mening over dit besluit en geef twee argumenten. U hoort eerst de journalist.',
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
      'In fabrieken wordt steeds meer werk overgenomen door robots. Dit leidt tot discussie: is efficiëntie belangrijker of het behouden van banen? U neemt deel aan een radioprogramma over dit onderwerp.\n\nVertel wat u belangrijker vindt en geef twee redenen. U hoort eerst de radiopresentator.',
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

// ─── Deel 3 Oefening ──────────────────────────────────────────────────────────
// Extra Deel 3 görevleri — uzun konuşma pratiği

const deel3OefeningTasks: ExamSimTask[] = [
  {
    id: 'sim_b2_d3_14',
    deel: 'Deel 3',
    topic: 'Thuiswerken',
    instructionNl:
      'Steeds meer mensen werken (deels) thuis. Uw leidinggevende vraagt naar uw mening: is thuiswerken beter dan werken op kantoor, of juist niet? Geef uw mening en onderbouw die met twee argumenten.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 10,
    speakSeconds: 60,
    modelAnswer:
      'Naar mijn mening is een combinatie van thuiswerken en op kantoor werken het beste. Allereerst is thuiswerken heel efficiënt, omdat u geen reistijd heeft en u beter kunt concentreren. Maar tegelijkertijd is samenwerken en sociale contacten op kantoor ook heel belangrijk voor de teamgeest en creativiteit. Ik denk dan ook dat twee of drie dagen thuis en de rest op kantoor ideaal is.',
  },
  {
    id: 'sim_b2_d3_15',
    deel: 'Deel 3',
    topic: 'Sociale media en jongeren',
    instructionNl:
      'Er wordt veel gediscussieerd over de invloed van sociale media op jongeren. Sommigen zeggen dat het slecht is, anderen vinden het juist positief. Wat is uw mening? Gebruik minimaal twee argumenten.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 10,
    speakSeconds: 60,
    modelAnswer:
      'Ik ben van mening dat sociale media voor jongeren meer nadelen dan voordelen heeft. Ten eerste zorgt het voor veel vergelijkingsdruk: jongeren zien alleen de mooie kanten van andermans leven, wat kan leiden tot onzekerheid en zelfs depressie. Bovendien brengen jongeren zo veel tijd door op hun telefoon dat ze minder bewegen en slechter slapen. Toch wil ik ook eerlijk zijn: sociale media kan jongeren verbinden en een gevoel van gemeenschap geven. Maar per saldo denk ik dat ouders en scholen jongeren moeten leren bewuster en kritischer met deze platformen om te gaan.',
  },
  {
    id: 'sim_b2_d3_16',
    deel: 'Deel 3',
    topic: 'Vierdaagse werkweek',
    instructionNl:
      'In verschillende landen wordt de vierdaagse werkweek getest. Werknemers werken vier dagen per week in plaats van vijf, maar krijgen hetzelfde salaris. Wat vindt u hiervan? Geef uw mening met twee argumenten.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 10,
    speakSeconds: 60,
    modelAnswer:
      'Ik sta positief tegenover de vierdaagse werkweek. Onderzoek laat zien dat mensen met een dag extra vrij productiever zijn op de dagen dat ze wél werken. Bovendien verbetert het de werk-privébalans aanzienlijk, waardoor mensen minder snel opgebrand raken. Ik begrijp de bezorgdheid van werkgevers over de kosten, maar als de productiviteit gelijk blijft of zelfs stijgt, is dat argument minder sterk. Al met al denk ik dat de voordelen voor zowel werknemers als werkgevers opwegen tegen de nadelen.',
  },
  {
    id: 'sim_b2_d3_17',
    deel: 'Deel 3',
    topic: 'Gratis openbaar vervoer',
    instructionNl:
      'De gemeente overweegt het openbaar vervoer gratis te maken voor iedereen. Er zijn voor- en nadelen. Wat vindt u: is gratis openbaar vervoer een goed idee? Geef uw mening en onderbouw die.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 10,
    speakSeconds: 60,
    modelAnswer:
      'Ik vind gratis openbaar vervoer een goed idee, maar wel met kanttekeningen. Het grote voordeel is dat meer mensen de auto laten staan, waardoor er minder files en uitstoot zijn. Aan de andere kant kost het de gemeente veel geld, en dat geld kan ook gebruikt worden voor betere of frequentere verbindingen. Mijn voorkeur gaat dan ook uit naar betaalbaar en toegankelijk openbaar vervoer in combinatie met stevige investeringen in de kwaliteit ervan.',
  },
  {
    id: 'sim_b2_d3_18',
    deel: 'Deel 3',
    topic: 'Mantelzorg of professionele zorg',
    instructionNl:
      'Steeds meer mensen zorgen thuis voor een ziek of oud familielid in plaats van professionele zorg in te schakelen. Wat vindt u beter: mantelzorg door familie of professionele zorg? Geef uw mening met twee argumenten.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 10,
    speakSeconds: 60,
    modelAnswer:
      'Dit is een moeilijke vraag, maar ik denk dat professionele zorg in veel gevallen beter is voor de zorgbehoevende. Professionele zorgverleners hebben de juiste opleiding en kunnen de juiste zorg bieden, ook in moeilijke situaties. Bovendien kan mantelzorg zwaar zijn voor de mantelzorger zelf, waardoor ook hij of zij overbelast kan raken. De ideale situatie is een combinatie: professionele zorg voor de medische taken en familie voor het emotionele contact.',
  },
  {
    id: 'sim_b2_d3_19',
    deel: 'Deel 3',
    topic: 'Vliegbelasting',
    instructionNl:
      'De overheid wil vliegen duurder maken door een hogere vliegbelasting. Sommige mensen zijn het daarmee eens, anderen niet. Wat is uw standpunt? Gebruik de grafiek en geef twee argumenten.',
    imageUrls: [p(19)],
    imageLabels: [
      'Grafiek: CO2-uitstoot transport NL: Auto 45%, Vliegtuig 30%, Vrachtauto 20%, Trein 5%.',
    ],
    tableData: null,
    prepSeconds: 10,
    speakSeconds: 60,
    modelAnswer:
      'Als we naar de grafiek kijken, zien we dat vliegtuigen dertig procent van de totale CO2-uitstoot van transport voor hun rekening nemen. Ik ben dan ook voorstander van een hogere vliegbelasting. Ten eerste stimuleert het mensen om vaker de trein te nemen voor kortere afstanden. Ten tweede zorgt de extra belastingopbrengst ervoor dat de overheid kan investeren in duurzamere alternatieven. Ik begrijp dat het pijn doet voor mensen met een laag inkomen, maar vrijstelling voor vluchtroutes zonder treinverbinding kan dat probleem deels oplossen.',
  },
];

// ─── Deneme 2 ─────────────────────────────────────────────────────────────────
// Temalar: Zorg/Gezondheid · Gemeente/Veiligheid · Onderwijs/Milieu

const deneme2Tasks: ExamSimTask[] = [
  {
    id: 'sim_b2_d1_005',
    deel: 'Deel 1',
    topic: 'Ziekenhuis – griepvaccinatie',
    instructionNl:
      'U werkt als verpleegkundige in een ziekenhuis. Er hangt een aankondiging op de afdeling over de jaarlijkse griepvaccinatie. Uw collega heeft dit niet gezien. U belt haar op. Beschrijf de aankondiging.',
    imageUrls: [],
    imageLabels: [
      'Aankondiging: Griepvaccinatie 2024 — maandag 4 november, 10:00–12:00, behandelkamer 3, verplicht voor alle medewerkers patiëntenzorg, aanmelden via intranet vóór 28 oktober',
    ],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Hallo. Er hangt een aankondiging over de jaarlijkse griepvaccinatie. Die is op maandag 4 november tussen 10 en 12 uur in behandelkamer 3. Het is verplicht voor iedereen in de patiëntenzorg en u moet zich vóór 28 oktober aanmelden via het intranet.',
  },
  {
    id: 'sim_b2_d1_006',
    deel: 'Deel 1',
    topic: 'Gemeente – camerabewaking wijk',
    instructionNl:
      'U werkt bij de gemeente. Er is een discussie over het plaatsen van beveiligingscamera\'s in de wijk. Een buurtbewoner vraagt uw mening. Vertel uw mening en geef twee redenen.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      "Ik ben voorstander van camera's in de wijk. Ten eerste zorgen ze voor meer veiligheid: daders weten dat ze gefilmd worden en dat werkt afschrikwekkend. Ten tweede helpen de beelden bij het oplossen van misdrijven, want de politie heeft dan concreet bewijs.",
  },
  {
    id: 'sim_b2_d1_007',
    deel: 'Deel 1',
    topic: 'School – studieplek renovatie',
    instructionNl:
      'U werkt op een middelbare school. De school heeft de hal verbouwd tot een moderne studieplek. De schooldirecteur was op vakantie en heeft dit nog niet gezien. U belt hem op. Beschrijf de situatie voor en na de verbouwing. Gebruik de plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1 (Voor): Lege hal met alleen stoelen langs de muur, geen faciliteiten',
      'Plaatje 2 (Na): Moderne studieplek met tafels, computers, stopcontacten en een stille zone met borden',
    ],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Goedemiddag. De hal ziet er heel anders uit! Vroeger stonden er alleen wat stoelen langs de muur, maar nu is het een echte studieplek met tafels, computers en stopcontacten. Er is ook een stille zone ingericht.',
  },
  {
    id: 'sim_b2_d1_008',
    deel: 'Deel 1',
    topic: 'Kantoor – afvalscheiding',
    instructionNl:
      'U werkt op een kantoor. Er hangt een nieuwe poster over het afvalscheidingssysteem. Een nieuwe collega weet niet hoe het werkt. U legt het uit. Beschrijf wat er op de poster staat.',
    imageUrls: [],
    imageLabels: [
      'Poster: Nieuw afvalscheidingssysteem — 4 bakken: blauw (papier), groen (gft/etensresten), geel (plastic/blik), grijs (restafval). Batterijen en elektronica apart bij receptie inleveren.',
    ],
    tableData: null,
    prepSeconds: 5,
    speakSeconds: 20,
    modelAnswer:
      'Wij hebben nu vier verschillende afvalbakken. De blauwe is voor papier, de groene voor etensresten, de gele voor plastic en blik, en de grijze voor de rest. Batterijen en oude elektronica lever u apart in bij de receptie.',
  },
  {
    id: 'sim_b2_d2_013',
    deel: 'Deel 2',
    topic: 'Zorg – bloeddruk meten',
    instructionNl:
      'U werkt als thuiszorgmedewerker. U moet een nieuwe collega uitleggen hoe zij bij een patiënt de bloeddruk correct meet. Gebruik de plaatjes. Leg de stappen uit.',
    imageUrls: [],
    imageLabels: [
      'Stap 1: Patiënt laat arm ontspannen rusten op tafel, manchet om de bovenarm aanbrengen op hartniveau',
      'Stap 2: Manchet oppompen tot 180 mmHg, dan langzaam lucht aflaten terwijl u luistert met stethoscoop',
      'Stap 3: Waarden aflezen en noteren: systolisch (eerste toon) en diastolisch (laatste toon), resultaat doorgeven aan arts',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Allereerst laat u de arm van de patiënt ontspannen rusten op de tafel en brengt u de manchet op hartniveau aan. Vervolgens pompt u de manchet op tot 180 millimeter kwik en laat u langzaam de lucht ontsnappen terwijl u met de stethoscoop luistert. Ten slotte leest u de waarden af: de eerste toon is de bovendruk en de laatste is de onderdruk, en u geeft ze door aan de arts.',
  },
  {
    id: 'sim_b2_d2_014',
    deel: 'Deel 2',
    topic: 'Gemeente – overlastklachten',
    instructionNl:
      'U werkt bij de afdeling Openbare Orde van de gemeente. U presenteert de klachtenregistratie van de afgelopen twee jaar aan uw team. Gebruik de tabel. Noem de opvallendste ontwikkelingen.',
    imageUrls: [],
    imageLabels: [],
    tableData:
      '| Type klacht | 2022 | 2024 |\n|---|---|---|\n| Geluidsoverlast | 312 | 489 |\n| Parkeeroverlast | 201 | 178 |\n| Afvaloverlast | 145 | 267 |\n| Burenruzie | 88 | 102 |',
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Als we naar de tabel kijken, zien we twee opvallende stijgingen. Geluidsoverlast is het meest toegenomen: van 312 naar 489 klachten. Ook afvaloverlast is bijna verdubbeld, van 145 naar 267. Dat zijn zorgwekkende ontwikkelingen die extra aandacht vereisen. Parkeeroverlast is daarentegen licht gedaald, wat positief is.',
  },
  {
    id: 'sim_b2_d2_015',
    deel: 'Deel 2',
    topic: 'School – aanmeldingsprocedure',
    instructionNl:
      'U werkt als schooladministrateur op een basisschool. U moet ouders uitleggen hoe de aanmeldingsprocedure voor nieuwe leerlingen werkt. Gebruik de plaatjes. Leg de stappen uit.',
    imageUrls: [],
    imageLabels: [
      'Stap 1: Ouders vullen het digitale aanmeldformulier in via de schoolwebsite — vóór 1 april van het jaar voorafgaand aan de start',
      'Stap 2: School nodigt ouders en kind uit voor een kennismakingsgesprek (duurt 30 minuten)',
      'Stap 3: Ouders ontvangen binnen twee weken een schriftelijke bevestiging of afwijzing per e-mail',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'De procedure bestaat uit drie stappen. Allereerst vult u het digitale aanmeldformulier in via onze website, en dat moet vóór 1 april. Daarna nodigen we u en uw kind uit voor een kennismakingsgesprek van dertig minuten. Tot slot ontvangt u binnen twee weken een schriftelijke bevestiging of afwijzing per e-mail.',
  },
  {
    id: 'sim_b2_d2_016',
    deel: 'Deel 2',
    topic: 'Kantoor – papierloos werken',
    instructionNl:
      'U bent duurzaamheidscoördinator op uw kantoor. Er wordt veel papier verspild. U heeft een voorstel om over te gaan naar een papierloze werkplek. U presenteert dit aan de directie. Beschrijf het probleem en uw oplossing. Gebruik de plaatjes.',
    imageUrls: [],
    imageLabels: [
      'Plaatje 1 (Nu): Bureau vol uitgeprinte documenten, printer die constant gebruikt wordt, overvolle papierbak',
      'Plaatje 2 (Voorstel): Opgeruimd bureau met alleen laptop, digitale handtekeningmodule op scherm, recyclingbak leeg',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Op dit moment zien we dat medewerkers enorm veel papier printen: de printers draaien de hele dag en de papierbakken lopen over. Ik stel voor om over te stappen op volledig digitaal werken, waarbij alle documenten digitaal worden opgeslagen en ondertekend. Dat bespaart niet alleen papier, maar ook tijd en kosten.',
  },
  {
    id: 'sim_b2_d2_017',
    deel: 'Deel 2',
    topic: 'Zorg – BHV training',
    instructionNl:
      'U bent arbo-coördinator in een groot ziekenhuis. U vindt dat nieuwe medewerkers meer BHV-training (bedrijfshulpverlening) nodig hebben. Overtuig de leidinggevende van uw standpunt. Geef twee argumenten.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Ik ben ervan overtuigd dat nieuwe medewerkers meer BHV-training nodig hebben. Ten eerste werken we in een ziekenhuis waar noodsituaties altijd kunnen optreden: als medewerkers niet goed getraind zijn, kost dat kostbare tijd. Ten tweede toont onderzoek aan dat regelmatig geoefende hulpverleners in crisissituaties veel effectiever handelen dan mensen met verouderde kennis.',
  },
  {
    id: 'sim_b2_d2_018',
    deel: 'Deel 2',
    topic: 'Gemeente – paspoortafspraak',
    instructionNl:
      'U werkt bij de gemeente als baliemedewerker. U legt een nieuwe inwoner uit hoe hij een afspraak kan maken voor een paspoortaanvraag. Gebruik de plaatjes. Leg de stappen uit.',
    imageUrls: [],
    imageLabels: [
      'Stap 1: Ga naar de gemeentewebsite, kies "Afspraak maken" → "Identiteitsdocumenten" en kies een datum en tijdstip',
      'Stap 2: Neem mee op de dag: oud paspoort of ID-kaart, pasfoto (niet ouder dan 6 maanden), pinpas voor betaling (€81,80)',
      'Stap 3: Kom 5 minuten voor de afspraak aan, meld u aan bij de receptie en wacht tot uw naam wordt omgeroepen',
    ],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Allereerst maakt u online een afspraak via onze website: kies "Identiteitsdocumenten" en selecteer een datum. Op de dag zelf neemt u mee: uw huidige paspoort of ID, een recente pasfoto en uw pinpas voor de betaling van ruim 81 euro. Kom vijf minuten van tevoren aan en meld u bij de receptie.',
  },
  {
    id: 'sim_b2_d2_019',
    deel: 'Deel 2',
    topic: 'School – aanwezigheidspercentage',
    instructionNl:
      'U bent teamleider op een ROC. U presenteert het aanwezigheidspercentage van de studenten per kwartaal aan de directie. Gebruik de tabel. Bespreek de opvallendste cijfers.',
    imageUrls: [],
    imageLabels: [],
    tableData:
      '| Kwartaal | 2023–2024 | 2024–2025 |\n|---|---|---|\n| Q1 (sep–nov) | 87% | 91% |\n| Q2 (dec–feb) | 79% | 82% |\n| Q3 (mrt–mei) | 74% | 78% |\n| Q4 (jun–aug) | 68% | 71% |',
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      'Uit de tabel blijkt dat de aanwezigheid dit schooljaar in alle kwartalen hoger ligt dan vorig jaar, wat positief is. Wel zien we een duidelijke daling richting het einde van het jaar: in Q4 is de aanwezigheid het laagst, namelijk 71 procent. Een mogelijke maatregel is extra activiteiten inplannen in Q4 om de betrokkenheid te verhogen.',
  },
  {
    id: 'sim_b2_d2_020',
    deel: 'Deel 2',
    topic: 'Milieu – elektrische auto\'s',
    instructionNl:
      'De overheid overweegt om nieuwe benzineauto\'s te verbieden vanaf 2030. Alleen elektrische auto\'s zouden dan nog verkocht mogen worden. Een collega vraagt uw mening. Wat vindt u ervan? Geef twee argumenten.',
    imageUrls: [],
    imageLabels: [],
    tableData: null,
    prepSeconds: 15,
    speakSeconds: 30,
    modelAnswer:
      "Ik ben voor dit plan, maar met nuances. Enerzijds is het goed voor het milieu: elektrische auto's stoten geen directe uitstoot uit, wat de luchtkwaliteit in steden sterk verbetert. Anderzijds maak ik me zorgen over de kosten: elektrische auto's zijn nu nog duurder dan benzineauto's, en dat is een probleem voor mensen met een laag inkomen. De overheid moet zorgen voor goede subsidieregelingen.",
  },
  {
    id: 'sim_b2_d3_020',
    deel: 'Deel 3',
    topic: 'Gemeente – afvalscheiding per wijk',
    instructionNl:
      'U werkt bij de milieudienst van de gemeente. De gemeente heeft als doel om in 2030 minstens 65% van het huishoudelijk afval te scheiden. Uit een onderzoek blijkt dat dit in sommige wijken nog niet lukt. U presenteert de resultaten van het onderzoek aan de gemeenteraad.\n\nTijdens de vergadering beschrijft u de resultaten aan de hand van de grafiek. U geeft bij elke wijk een mogelijke verklaring voor het percentage. Ten slotte legt u uit op welke twee manieren de gemeente de afvalscheiding in de hele stad kan verbeteren.\n\nWat moet u doen?\n- Beschrijf de resultaten van het onderzoek. Gebruik hierbij de grafiek.\n- Geef bij elke wijk een mogelijke verklaring voor het afvalscheidingspercentage.\n- Leg uit op welke twee manieren de gemeente de afvalscheiding het best kan verbeteren.\n\nU krijgt nu eerst twee minuten de tijd om te bedenken wat u gaat zeggen. Begin na de pieptoon met spreken.',
    imageUrls: [],
    imageLabels: [
      'Staafdiagram "Afvalscheiding per wijk 2024": Centrum 42%, Noord 68%, Oost 71%, Zuid 55%. Landelijk gemiddelde 2030-doel: 65%.',
    ],
    tableData: null,
    prepSeconds: 120,
    speakSeconds: 120,
    modelAnswer:
      'Geachte raadsleden. Ik presenteer u vandaag de resultaten van ons onderzoek naar afvalscheiding per wijk. Als we naar de grafiek kijken, zien we grote verschillen. Wijk Oost scoort het hoogst met eenenzeventig procent, gevolgd door Noord met achtenzestig procent. Beide wijken hebben ons doel van vijfenzestig procent al bereikt. Zuid zit met vijfenvijftig procent nog net onder het doel. Maar het Centrum doet het duidelijk slechter dan de rest: slechts tweeenveertig procent, bijna vijfentwintig procentpunten onder het doel. Dat is zorgwekkend.\n\nVoor deze verschillen zijn verklaringen. Oost en Noord hebben de afgelopen twee jaar actief ingezet op bewustwordingscampagnes en extra containers, wat duidelijk vruchten afwerpt. In het Centrum wonen relatief veel huurders in flats zonder eigen buitenruimte, waardoor de drempel om afval te scheiden hoger is. Voor Zuid speelt mogelijk een gebrek aan informatie in verschillende talen een rol, omdat er veel nieuwkomers wonen. Om de afvalscheiding in de hele stad te verbeteren, beveel ik twee maatregelen aan. Ten eerste: plaatst meer ondergrondse verzamelcontainers in het Centrum, zodat bewoners hun afval gemakkelijk kunnen scheiden zonder een grote buitenruimte nodig te hebben. Ten tweede: start een meertalige informatiecampagne in Zuid en het Centrum, zodat alle bewoners weten wat in welke bak hoort.',
  },
];

// ─── Export ────────────────────────────────────────────────────────────────────

export const b2SprekenSimSets: SimSet[] = [
  {
    id: 'sim_set_001',
    label: 'Deneme 1',
    tasks: deneme1Tasks,
  },
  {
    id: 'sim_set_002',
    label: 'Deel 3 Oefening',
    tasks: deel3OefeningTasks,
  },
  {
    id: 'sim_set_003',
    label: 'Deneme 2',
    tasks: deneme2Tasks,
  },
];
