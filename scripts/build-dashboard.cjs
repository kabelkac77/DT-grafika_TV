#!/usr/bin/env node
/**
 * Generuje dashboard stavu zadání ze souboru ZADANI.md.
 *
 * Jediným zdrojem stavu je ZADANI.md. Skript z něj přečte:
 *   - sledované body jednotlivých oddílů (značky K doplnění / K potvrzení / Rozpracováno / ✔ datum),
 *   - tabulku grafických částí G01–G08 z oddílu 4,
 *   - tabulku odpovědných osob z oddílu 1,
 *   - tabulku milníků z oddílu 14,
 *   - tabulku dílčích zadání z oddílu 15,
 * a vloží je do šablony docs/dashboard.template.html.
 *
 * Výstupy:
 *   docs/dashboard.body.html — obsah stránky (zdroj publikovaného odkazu)
 *   docs/index.html          — samostatná stránka pro GitHub Pages
 *
 * Volba --check nic nezapisuje, jen ohlásí, že výstupy nejsou aktuální (návratový kód 1).
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const REPO = 'kabelkac77/DT-grafika_TV';

const OWNERS = {
  'zadavatel': 'zadavatel',
  'časomíra': 'casomira',
  'režie': 'rezie',
  'led': 'led',
  'na nás': 'my'
};

/** Vrátí obsah oddílů `## N. Název` jako pole { n, title, body }. */
function splitSections(md) {
  const out = [];
  const re = /^##\s+(\d+)\.\s+(.+)$/gm;
  let m;
  const marks = [];
  while ((m = re.exec(md)) !== null) {
    marks.push({ n: m[1].padStart(2, '0'), title: m[2].trim(), start: m.index, headEnd: re.lastIndex });
  }
  marks.forEach((mark, i) => {
    const end = i + 1 < marks.length ? marks[i + 1].start : md.length;
    out.push({ n: mark.n, title: mark.title, body: md.slice(mark.headEnd, end) });
  });
  return out;
}

/** Odstraní markdown zvýraznění a odkazy, ať se text dá vypsat jako prostý řádek. */
function plain(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/\*\*/g, '')
    .replace(/`/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Rozloží odrážku zadání na sledovaný bod, nebo vrátí null. */
function parseItem(line) {
  const raw = line.replace(/^[-*]\s+/, '').trim();

  const done = /✔\s*(\d+\.\s*\d+\.\s*\d{4})/.exec(raw);
  const open = /\*\*(K doplnění|K potvrzení|Rozpracováno)\*\*/.exec(raw);
  if (!done && !open) return null;

  const colon = raw.indexOf(': ');
  if (colon === -1) return null;

  const label = plain(raw.slice(0, colon));
  let rest = raw.slice(colon + 2);

  const ownerMatch = /\((?:čeká|ceka):\s*([^)]+)\)/i.exec(rest);
  const owner = ownerMatch ? OWNERS[ownerMatch[1].trim().toLowerCase()] : null;
  if (ownerMatch) rest = rest.replace(ownerMatch[0], ' ');

  let status;
  let date = null;
  let note = '';

  if (done) {
    status = 'done';
    date = done[1].replace(/\s+/g, ' ');
    note = plain(rest.slice(0, rest.indexOf('✔')));
    const after = plain(rest.slice(rest.indexOf('✔') + 1).replace(date, ''));
    if (after.replace(/^[—-]\s*/, '')) note += ' — ' + after.replace(/^[—-]\s*/, '');
  } else {
    status = open[1] === 'Rozpracováno' ? 'part' : 'open';
    note = plain(rest.replace(open[0], ''));
    note = note.replace(/^[—-]\s*/, '');
  }

  note = note.replace(/\s+/g, ' ').replace(/^[—-]\s*/, '').trim();
  if (note) note = note.charAt(0).toUpperCase() + note.slice(1);

  if (status !== 'done' && !owner) {
    throw new Error(`Bod bez uvedené strany v ZADANI.md: "${label}"\n` +
      'Doplňte značku (čeká: zadavatel | časomíra | režie | LED | na nás).');
  }

  return { t: label, s: status, o: owner || 'zadavatel', note: note || null, date };
}

/** Přečte markdown tabulku, která následuje po zadaném nadpisu nebo textu. */
function readTable(body, afterText) {
  const start = afterText ? body.indexOf(afterText) : 0;
  if (start === -1) return [];
  const lines = body.slice(start).split('\n');
  const rows = [];
  let seen = false;
  for (const line of lines) {
    const isRow = /^\s*\|.*\|\s*$/.test(line);
    if (!isRow) {
      if (seen) break;
      continue;
    }
    seen = true;
    if (/^\s*\|[\s:|-]+\|\s*$/.test(line)) continue;
    rows.push(line.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim()));
  }
  return rows.slice(1); // bez hlavičky
}

function build() {
  const md = fs.readFileSync(path.join(root, 'ZADANI.md'), 'utf8');
  const sections = splitSections(md);

  const data = { repo: REPO, updated: null, sections: [], parts: [], people: [], milestones: [], briefs: [] };

  sections.forEach(sec => {
    const items = [];
    sec.body.split('\n').forEach(line => {
      if (!/^[-*]\s+/.test(line)) return;
      const item = parseItem(line);
      if (item) items.push(item);
    });
    data.sections.push({ n: sec.n, title: sec.title, items });

    if (sec.n === '01') {
      readTable(sec.body, '### Odpovědné osoby').forEach(r => {
        if (r.length >= 2) data.people.push({ name: plain(r[0]), role: plain(r[1]) });
      });
    }
    if (sec.n === '04') {
      readTable(sec.body, '| ID |').forEach(r => {
        if (r.length >= 5 && /^G\d+$/.test(r[0])) {
          data.parts.push({ id: r[0], name: plain(r[1]), build: plain(r[3]), state: plain(r[4]) });
        }
      });
    }
    if (sec.n === '14') {
      readTable(sec.body, '### Milníky').forEach(r => {
        if (r.length >= 3) {
          data.milestones.push({
            what: plain(r[0]), when: plain(r[1]), state: plain(r[2]),
            now: /nyní|probíhá/i.test(r[2])
          });
        }
      });
    }
    if (sec.n === '15') {
      readTable(sec.body, '| Krok |').forEach(r => {
        if (r.length >= 4 && /^\d+$/.test(r[0])) {
          data.briefs.push({ file: plain(r[1]), state: plain(r[3]) });
        }
      });
    }
  });

  // Datum aktualizace = nejnovější záznam rozhodnutí v ZADANI.md.
  const dates = [...md.matchAll(/^-\s*(\d+)\.\s*(\d+)\.\s*(\d{4}):/gm)]
    .map(m => ({ d: +m[1], m: +m[2], y: +m[3] }))
    .sort((a, b) => (b.y - a.y) || (b.m - a.m) || (b.d - a.d));
  data.updated = dates.length ? `${dates[0].d}. ${dates[0].m}. ${dates[0].y}` : 'neuvedeno';

  const counts = {
    sections: data.sections.length,
    items: data.sections.reduce((n, s) => n + s.items.length, 0),
    parts: data.parts.length,
    people: data.people.length,
    milestones: data.milestones.length,
    briefs: data.briefs.length
  };
  if (!counts.items || !counts.parts || !counts.briefs) {
    throw new Error('ZADANI.md nedal očekávaná data: ' + JSON.stringify(counts));
  }

  const template = fs.readFileSync(path.join(root, 'docs', 'dashboard.template.html'), 'utf8');
  if (!template.includes('__DATA__')) throw new Error('V šabloně chybí značka __DATA__.');
  const body = template.replace('__DATA__', JSON.stringify(data, null, 2));

  const title = (body.match(/<title>([^<]*)<\/title>/) || [, 'Stav zadání SVDT'])[1];
  const page = `<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Přehled stavu obecného zadání broadcast systému SVDT — otevřené otázky, připravenost oddílů a odpovědné strany.">
<meta name="color-scheme" content="dark light">
<title>${title}</title>
<style>html{color-scheme:dark light}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
${body.replace(/<title>[^<]*<\/title>\s*/, '')}
</body>
</html>
`;

  return { body, page, counts, updated: data.updated };
}

const out = build();
const bodyPath = path.join(root, 'docs', 'dashboard.body.html');
const pagePath = path.join(root, 'docs', 'index.html');
const read = p => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null);

if (process.argv.includes('--check')) {
  const stale = read(bodyPath) !== out.body || read(pagePath) !== out.page;
  if (stale) {
    console.error('Dashboard není aktuální vůči ZADANI.md. Spusťte: npm run dashboard');
    process.exit(1);
  }
  console.log('Dashboard odpovídá ZADANI.md.');
} else {
  fs.writeFileSync(bodyPath, out.body);
  fs.writeFileSync(pagePath, out.page);
  console.log(`Dashboard vygenerován ze ZADANI.md (aktualizováno ${out.updated}):`);
  console.log(`  oddílů ${out.counts.sections}, sledovaných bodů ${out.counts.items}, ` +
    `grafických částí ${out.counts.parts}, milníků ${out.counts.milestones}, ` +
    `dílčích zadání ${out.counts.briefs}, odpovědných osob ${out.counts.people}`);
}
