/* Ukázková data režijního pultu. Všechno je fiktivní a slouží jen k předvedení ovládání.
   Žádný z těchto údajů nepochází z časomíry ani ze startovní listiny pořadatele. */

window.SVDT_BC_DATA = {
  race: 'Svatohorský Downtown Příbram',
  runs: [
    { id: 'q', label: 'Kvalifikace' },
    { id: 'r1', label: 'Jízda 1' },
    { id: 'r2', label: 'Jízda 2' }
  ],
  categories: ['Elite', 'Masters', 'Junior', 'Open', 'Ženy'],

  /* Startovní listina. bib je startovní číslo, time je fiktivní čas jízdy v ms. */
  riders: [
    { bib: '27', first: 'Adam',      last: 'Novák',      country: 'CZE', team: 'Ukázkový tým',            category: 'Elite',   portrait: true,  time: 104114 },
    { bib: '12', first: 'Jakub',     last: 'Dvořák',     country: 'CZE', team: 'Příbram Gravity',         category: 'Elite',   portrait: false, time: 104364 },
    { bib: '84', first: 'Martin',    last: 'Černý',      country: 'CZE', team: 'Brdy Racing',             category: 'Elite',   portrait: false, time: 104801 },
    { bib: '6',  first: 'Tomáš',     last: 'Veselý',     country: 'CZE', team: 'Ukázkový tým',            category: 'Elite',   portrait: false, time: 105256 },
    { bib: '35', first: 'David',     last: 'Svoboda',    country: 'SVK', team: 'Tatra Downhill',          category: 'Elite',   portrait: false, time: 106019 },
    { bib: '41', first: 'Jan',       last: 'Bartoš',     country: 'CZE', team: 'Příbram Gravity',         category: 'Elite',   portrait: false, time: 106205 },
    { bib: '9',  first: 'Šimon',     last: 'Urban',      country: 'CZE', team: 'Brdy Racing',             category: 'Elite',   portrait: false, time: 106590 },
    { bib: '16', first: 'Marek',     last: 'Doležal',    country: 'POL', team: 'Kraków DH',               category: 'Elite',   portrait: false, time: 106944 },
    { bib: '73', first: 'Daniel',    last: 'Kolář',      country: 'CZE', team: '',                        category: 'Elite',   portrait: false, time: 107315 },
    { bib: '58', first: 'Matyáš',    last: 'Sedláček',   country: 'AUT', team: 'Innsbruck Gravity',       category: 'Elite',   portrait: false, time: 107802 },
    { bib: '19', first: 'Petr',      last: 'Procházka',  country: 'CZE', team: 'Brdy Racing',             category: 'Masters', portrait: false, time: 106432 },
    { bib: '42', first: 'Michal',    last: 'Kučera',     country: 'CZE', team: 'Příbram Gravity',         category: 'Masters', portrait: false, time: 106878 },
    { bib: '8',  first: 'Lukáš',     last: 'Horák',      country: 'CZE', team: '',                        category: 'Masters', portrait: false, time: 107240 },
    { bib: '53', first: 'Ondřej',    last: 'Němec',      country: 'POL', team: 'Kraków DH',               category: 'Junior',  portrait: false, time: 107694 },
    { bib: '21', first: 'Filip',     last: 'Marek',      country: 'CZE', team: 'Brdy Racing',             category: 'Junior',  portrait: false, time: 108126 },
    { bib: '77', first: 'Vojtěch',   last: 'Beneš',      country: 'CZE', team: 'Ukázkový tým',            category: 'Junior',  portrait: false, time: 108640 },
    { bib: '128',first: 'Alexandr',  last: 'Černohorský-Novotný', country: 'CZE', team: 'Ukázkový závodní tým Příbram', category: 'Open', portrait: false, time: 109880 },
    { bib: '64', first: 'Radek',     last: 'Fiala',      country: 'CZE', team: '',                        category: 'Open',    portrait: false, time: 110310 },
    { bib: '3',  first: 'Tereza',    last: 'Dvořáková',  country: 'CZE', team: 'Příbram Gravity',         category: 'Ženy',    portrait: false, time: 112004 },
    { bib: '14', first: 'Kateřina',  last: 'Pokorná',    country: 'CZE', team: 'Brdy Racing',             category: 'Ženy',    portrait: false, time: 113518 },
    { bib: '29', first: 'Anna',      last: 'Šimková',    country: 'AUT', team: 'Innsbruck Gravity',       category: 'Ženy',    portrait: false, time: 114902 }
  ],

  /* Hosté pro rozhovorové vstupy — G05. */
  guests: [
    { name: 'Jan Novák',        role: 'moderátor' },
    { name: 'Petra Malá',       role: 'ředitelka závodu' },
    { name: 'Adam Novák',       role: 'vítěz kvalifikace' },
    { name: 'Marek Hrášek',     role: 'pořadatel SVDT' }
  ],

  /* Fiktivní mezičasy pro G08. Klíčem je startovní číslo; chybí-li, použije se výchozí. */
  splits: {
    '27': { time1: '0:24.180', delta1: '-0.144', time2: '0:51.902', delta2: '-0.377', finishTime: '1:44.114', finishDelta: '-0.250', rank: '1' },
    '12': { time1: '0:24.402', delta1: '+0.222', time2: '0:52.410', delta2: '+0.508', finishTime: '1:44.364', finishDelta: '+0.250', rank: '2' },
    '84': { time1: '0:24.610', delta1: '+0.430', time2: '0:52.688', delta2: '+0.786', finishTime: '1:44.801', finishDelta: '+0.687', rank: '3' },
    '_':  { time1: '0:25.040', delta1: '+0.860', time2: '0:53.120', delta2: '+1.218', finishTime: '',          finishDelta: '',       rank: '' }
  },

  /* Lídr, vůči kterému se v G08 porovnává. S kým se opravdu porovnává, potvrdí časomíra. */
  leader: { name: 'Adam Novák', country: 'CZE' },

  /* Ukázkový živý čas pro G04. Nic neběží, jde o statickou hodnotu. */
  clock: '1:23.456'
};

/* Registr grafik. Zóna slouží ke kontrole kolizí na obraze, targets k výchozím výstupům.
   Rozměr a chování LED varianty nejsou potvrzené — viz ZADANI.md, oddíl 8.2. */
window.SVDT_BC_GRAPHICS = [
  {
    id: 'G01', key: '1', name: 'Výsledky',       hint: 'Deset výsledků kategorie a jízdy',
    frame: '../karta-vysledky/index.html', zones: ['panel'],
    object: 'category', duration: 12, targets: { tv: true, led: true }
  },
  {
    id: 'G02', key: '2', name: 'Karta jezdce',   hint: 'Představení vybraného jezdce',
    frame: '../karta-jezdce/index.html', zones: ['lower'],
    object: 'rider', duration: 6, targets: { tv: true, led: false },
    options: [
      { id: 'variant',  label: 'Rozložení', type: 'select', values: [['A', 'A — vodorovná lišta'], ['B', 'B — kompaktní blok']], value: 'A' },
      { id: 'portrait', label: 'Portrét',   type: 'check',  value: true }
    ]
  },
  {
    id: 'G04', key: '3', name: 'Časomíra',       hint: 'Čas jízdy vpravo dole',
    frame: '../%C4%8Dasom%C3%ADra/index.html', zones: ['corner'],
    object: 'clock', duration: 0, targets: { tv: true, led: false }
  },
  {
    id: 'G05', key: '4', name: 'Jmenovka hosta', hint: 'Jméno a funkce pro rozhovor',
    frame: '../karta-hosta/index.html', zones: ['lower'],
    object: 'guest', duration: 8, targets: { tv: true, led: false }
  },
  {
    id: 'G08', key: '5', name: 'Split time',     hint: 'Dva mezičasy a cíl vůči lídrovi',
    frame: '../split-time/index.html', zones: ['lower', 'corner'],
    object: 'rider', duration: 8, targets: { tv: true, led: true }
  }
];

/* Makra — pojmenované sledy grafik. V ukázce nic nespouštějí samy;
   jen připraví frontu, kterou režie odklepe povelem TAKE. */
window.SVDT_BC_MACROS = [
  { id: 'start',     name: 'Jezdec na startu',  steps: ['G02', 'G04'] },
  { id: 'mezicas',   name: 'Mezičas na trati',  steps: ['G08'] },
  { id: 'dojezd',    name: 'Dojezd jezdce',     steps: ['G08', 'G02', 'G01'] },
  { id: 'rozhovor',  name: 'Rozhovor',          steps: ['G05'] }
];
