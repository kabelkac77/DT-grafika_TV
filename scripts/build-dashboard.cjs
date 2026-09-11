#!/usr/bin/env node
/**
 * Zabalí docs/dashboard.body.html do samostatné HTML stránky docs/index.html.
 * Tělo je společný zdroj pro GitHub Pages i pro publikovaný odkaz na dashboard.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const src = path.join(root, 'docs', 'dashboard.body.html');
const out = path.join(root, 'docs', 'index.html');

const raw = fs.readFileSync(src, 'utf8');
const title = (raw.match(/<title>([^<]*)<\/title>/) || [, 'SVDT — stav zadání'])[1];
const body = raw.replace(/<title>[^<]*<\/title>\s*/, '');

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
${body}
</body>
</html>
`;

fs.writeFileSync(out, page);
console.log(`docs/index.html vygenerován z docs/dashboard.body.html (${page.length} B)`);
