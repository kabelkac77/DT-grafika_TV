/* Drobný statický server pro místní zkoušku režijního pultu.
   Prohlížeče některé kroky (rámy, písma) v režimu file:// omezují,
   proto je pohodlnější otevřít projekt přes http. */
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const port = Number(process.argv[2] || process.env.PORT || 4173);
const types = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.cjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.ttf': 'font/ttf', '.woff2': 'font/woff2', '.md': 'text/plain; charset=utf-8'
};

http.createServer((request, response) => {
  let file = path.join(root, decodeURIComponent(request.url.split('?')[0]));
  // Ven z repozitáře se neleze.
  if (!file.startsWith(root)) { response.writeHead(403).end('403'); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
  fs.readFile(file, (error, body) => {
    if (error) { response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Nenalezeno: ' + request.url); return; }
    response.writeHead(200, { 'content-type': types[path.extname(file)] || 'application/octet-stream', 'cache-control': 'no-store' }).end(body);
  });
}).listen(port, () => console.log(`SVDT — režijní pult: http://localhost:${port}/broadcast/`));
