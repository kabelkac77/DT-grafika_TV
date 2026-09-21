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
const crypto = require('crypto');
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

/**
 * Přečte ODKAZY.md: odrážky `- [Název](url) — popis`, volitelně pod nadpisem `## Skupina`.
 * Odkazy nad prvním nadpisem spadnou do skupiny Nezařazené.
 */
function readLinks(root) {
  const file = path.join(root, 'ODKAZY.md');
  if (!fs.existsSync(file)) return [];
  const out = [];
  let group = 'Nezařazené';
  let inFence = false;
  fs.readFileSync(file, 'utf8').split('\n').forEach(line => {
    if (/^\s*```/.test(line)) { inFence = !inFence; return; }
    if (inFence) return;
    const head = /^##\s+(.+?)\s*$/.exec(line);
    if (head) { group = head[1]; return; }
    const item = /^[-*]\s+\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)\s*(?:[—–-]\s*(.*))?$/.exec(line.trim());
    if (item) {
      out.push({ group, name: item[1].trim(), url: item[2], note: (item[3] || '').trim() || null });
    }
  });
  return out;
}

/** Převede české datum 12. 9. 2026 na 2026-09-12; jinak vrátí null. */
function toIso(cz) {
  const m = /(\d+)\.\s*(\d+)\.\s*(\d{4})/.exec(cz || '');
  return m ? `${m[3]}-${String(m[2]).padStart(2, '0')}-${String(m[1]).padStart(2, '0')}` : null;
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

  // (čeká: časomíra) nebo (čeká: časomíra, dotaz 12. 9. 2026)
  const ownerMatch = /\((?:čeká|ceka):\s*([^,)]+?)(?:\s*,\s*dotaz\s*([^)]+?))?\s*\)/i.exec(rest);
  const owner = ownerMatch ? OWNERS[ownerMatch[1].trim().toLowerCase()] : null;
  const asked = ownerMatch && ownerMatch[2] ? toIso(ownerMatch[2]) : null;
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

  return { t: label, s: status, o: owner || 'zadavatel', note: note || null, date, asked };
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

/** Zabalí obsah stránky do samostatného HTML souboru. */
function wrapPage(body, description) {
  const title = (body.match(/<title>([^<]*)<\/title>/) || [, 'Stav zadání SVDT'])[1];
  return `<!doctype html>
<html lang="cs">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${description}">
<meta name="color-scheme" content="dark light">
<meta name="robots" content="noindex, nofollow">
<title>${title}</title>
<style>html{color-scheme:dark light}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>
</head>
<body>
${body.replace(/<title>[^<]*<\/title>\s*/, '')}
</body>
</html>
`;
}

function build() {
  const md = fs.readFileSync(path.join(root, 'ZADANI.md'), 'utf8');
  const sections = splitSections(md);

  const data = { repo: REPO, updated: null, sections: [], parts: [], people: [],
    milestones: [], briefs: [], cardBriefs: [], links: readLinks(root) };

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
        if (r.length >= 4) {
          const iso = plain(r[2]);
          data.milestones.push({
            what: plain(r[0]), when: plain(r[1]),
            date: /^\d{4}-\d{2}-\d{2}$/.test(iso) ? iso : null,
            state: plain(r[3]),
            now: /nyní|probíhá/i.test(r[3])
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
      readTable(sec.body, '### Dílčí zadání jednotlivých karet').forEach(r => {
        if (r.length >= 3 && /^G\d+$/.test(r[0])) {
          data.cardBriefs.push({ part: r[0], file: plain(r[1]), state: plain(r[2]) });
        }
      });
    }
  });

  // Kumulativní počet zodpovězených bodů podle data odpovědi.
  const perDay = new Map();
  data.sections.forEach(s => s.items.forEach(i => {
    if (i.s !== 'done') return;
    const iso = toIso(i.date);
    if (iso) perDay.set(iso, (perDay.get(iso) || 0) + 1);
  }));
  let running = 0;
  data.answered = [...perDay.keys()].sort().map(date => {
    running += perDay.get(date);
    return { date, count: running };
  });
  data.trackedTotal = data.sections.reduce((n, s) => n + s.items.length, 0);

  // Časová osa: od prvního zodpovězeného bodu k poslednímu milníku s datem.
  const milestoneDates = data.milestones.map(m => m.date).filter(Boolean).sort();
  data.timeline = {
    start: (data.answered[0] && data.answered[0].date) || milestoneDates[0] || null,
    end: milestoneDates[milestoneDates.length - 1] || null
  };

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
    briefs: data.briefs.length,
    cardBriefs: data.cardBriefs.length,
    links: data.links.length
  };
  if (!data.timeline.start || !data.timeline.end) {
    throw new Error('Chybí data milníků pro časovou osu — doplňte sloupec Datum v tabulce Milníky.');
  }
  if (!counts.items || !counts.parts || !counts.briefs) {
    throw new Error('ZADANI.md nedal očekávaná data: ' + JSON.stringify(counts));
  }

  const tokens = fs.readFileSync(path.join(root, 'docs', 'tokens.css'), 'utf8').trim();
  const template = fs.readFileSync(path.join(root, 'docs', 'dashboard.template.html'), 'utf8')
    .replace('__TOKENS__', tokens);
  if (!template.includes('__DATA__')) throw new Error('V šabloně chybí značka __DATA__.');
  if (!template.includes('__BUILD__')) throw new Error('V šabloně chybí značka __BUILD__.');

  // Otisk obsahu, ne čas sestavení — stejné zadání dá stejný otisk, takže se
  // stránka necommituje znovu, dokud se opravdu něco nezmění.
  const build = crypto.createHash('sha1')
    .update(JSON.stringify(data))
    .update(template)
    .digest('hex')
    .slice(0, 10);

  const body = template
    .replace('__DATA__', JSON.stringify(data, null, 2))
    .replace('__BUILD__', build);

  const page = wrapPage(body, 'Přehled stavu obecného zadání broadcast systému SVDT — '
    + 'otevřené otázky, připravenost oddílů a odpovědné strany.');

  const linksTpl = fs.readFileSync(path.join(root, 'docs', 'links.template.html'), 'utf8')
    .replace('__TOKENS__', tokens);
  const linksBody = linksTpl
    .replace('__DATA__', JSON.stringify(data, null, 2))
    .replace('__BUILD__', build);
  const linksPage = wrapPage(linksBody, 'Sběrné místo odkazů k projektu SVDT — zadání, '
    + 'podklady, schůzky a zdroje.');

  const systemTpl = fs.readFileSync(path.join(root, 'docs', 'system.template.html'), 'utf8')
    .replace('__TOKENS__', tokens);
  if (!systemTpl.includes('__DATA__')) throw new Error('V šabloně systému chybí značka __DATA__.');
  const systemBody = systemTpl
    .replace('__DATA__', JSON.stringify(data, null, 2))
    .replace('__BUILD__', build);
  const systemPage = wrapPage(systemBody, 'Popis fungování broadcast systému SVDT pro jednání '
    + 's režií a s časomírou — tok dat, stavy odbavení a otevřené otázky.');

  const version = JSON.stringify({ build, updated: data.updated }, null, 2) + '\n';
  return { body, page, systemPage, linksPage, version, counts, updated: data.updated };
}

const out = build();
const bodyPath = path.join(root, 'docs', 'dashboard.body.html');
const pagePath = path.join(root, 'docs', 'index.html');
const versionPath = path.join(root, 'docs', 'version.json');
const systemPath = path.join(root, 'docs', 'system.html');
const linksPath = path.join(root, 'docs', 'odkazy.html');
const read = p => (fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : null);

if (process.argv.includes('--check')) {
  const stale = read(bodyPath) !== out.body || read(pagePath) !== out.page
    || read(versionPath) !== out.version || read(systemPath) !== out.systemPage
    || read(linksPath) !== out.linksPage;
  if (stale) {
    console.error('Dashboard není aktuální vůči ZADANI.md. Spusťte: npm run dashboard');
    process.exit(1);
  }
  console.log('Dashboard odpovídá ZADANI.md.');
} else {
  fs.writeFileSync(bodyPath, out.body);
  fs.writeFileSync(pagePath, out.page);
  fs.writeFileSync(versionPath, out.version);
  fs.writeFileSync(systemPath, out.systemPage);
  fs.writeFileSync(linksPath, out.linksPage);
  console.log(`Dashboard vygenerován ze ZADANI.md (aktualizováno ${out.updated}):`);
  console.log(`  oddílů ${out.counts.sections}, sledovaných bodů ${out.counts.items}, ` +
    `grafických částí ${out.counts.parts}, milníků ${out.counts.milestones}, ` +
    `dílčích zadání ${out.counts.briefs} + ${out.counts.cardBriefs} po kartách, ` +
    `odpovědných osob ${out.counts.people}, odkazů ${out.counts.links}`);
}
