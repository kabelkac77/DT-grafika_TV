# DT grafika

Repozitář s grafickými podklady pro projekt **Downtown (DT)**.

## Struktura

Každý druh výstupu má vlastní složku:

| Složka | Co do ní patří |
|---|---|
| `karta-jezdce/` | Grafika karty jezdce (finální i podklady) |
| `loga/` | Loga a jejich varianty |
| `bannery/` | Bannery (web, sociální sítě, tisk) |
| `zdroje/` | Zdrojové soubory (PSD, AI, INDD…) |

## Jak přidat další sekci

Novou složku přidáš tak, že při vytváření souboru na GitHubu
(Add file → Create new file) napíšeš do názvu např.:

```
nazev-nove-sekce/README.md
```

Lomítko `/` GitHub pochopí jako složku a rovnou ji založí.

## Velikost souborů (důležité u grafiky)

- Nahrávání přes prohlížeč: **max 25 MB na soubor**.
- Přes příkazovou řádku: varování nad 50 MB, blok nad 100 MB.
- Velké zdrojáky (PSD, AI, TIFF) proto nahrávej přes příkazovou
  řádku, nebo použij Git LFS. Do složky `zdroje/` viz poznámka tam.
