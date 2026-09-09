# Karta hosta — schválený návrh 01

Stav: zadavatel schválil vzhled studie 01 dne 9. 9. 2026. Tento dokument je platným zadáním pro navazující implementaci; funkční HTML/CSS karta zatím není vytvořena.

## Účel

Decentní jmenovka člověka, který právě mluví ve vstupech mezi jízdami. Použití pro moderátora, starostu nebo jiného hosta. Má rychle sdělit jméno a funkci a ponechat prostor pro sledování rozhovoru.

## Obsah

Pouze dvě textová pole:

| Pole | Příklad (fiktivní) | Hierarchie |
| --- | --- | --- |
| Jméno a příjmení | Jan NOVÁK | Hlavní řádek, výraznější příjmení |
| Funkce nebo pozice | moderátor | Menší druhý řádek |

Bez startovního čísla, portrétu uvnitř karty, vlajky, země, týmu, kategorie nebo samostatného loga. Člověk v ilustrační scéně není portrétem konkrétního Jana Nováka. Do ostrých dat nepřebírat ukázkové jméno jako ověřenou osobu.

## Schválený vzhled

Navázat na kartu jezdce 06.4 a její společné podklady:
- Grafitový podklad, bílé jméno, světle šedá funkce; písmo Exo.
- Celý reliéf Svaté Hory propojený s horní hranou vpravo. Zmenšit proporcionálně, neořezávat věže ani spojovací části. Pro implementaci použít původní zdrojový reliéf karty jezdce.
- Jemná stopa MTB pneumatiky, především v pravé části; pod textem potlačená.
- Krátká tenká červená linka u spodního levého okraje; značková červená #E30613.
- Nízká vodorovná karta, vzdušné odsazení, decentně zkosený roh. Bez výrazných stínů nebo záře a bez opakovaného bílého loga.
- Jméno a funkce zarovnané vlevo, příjmení výraznější; zachovat českou diakritiku.
- Umístění vlevo dole, mimo obličej mluvící osoby. Vysílaný overlay má průhledné okolí.

## Náhled a rozměry

[Schválená kompozice](nahledy/karta-hosta-studie-01.jpg) obsahuje detail a ilustrační zasazení do obrazu. Je to prezentační náhled vytvořený pomocí imagegen, exportovaný do JPEG pro GitHub; není to průhledný overlay ani zdrojový kód. Fotografie i osoba jsou ilustrační.

Pracovní rámec pro implementaci: plátno 1920 × 1080 a orientační bezpečný okraj 5 %. Přesnou velikost karty určit podle schváleného náhledu a ověřit na reálném záběru, světlém i tmavém pozadí a v polovičním měřítku. Rozměry a kompatibilitu odbavení potvrdí režie.

## Navazující implementace

Vytvořit editovatelnou kartu se samostatnými daty jména a funkce, lokálním písmem Exo a podklady navazujícími na kartu jezdce. Zachovat celý text, dlouhá jména a funkce ověřit bez překryvů nebo neomezeného zmenšování písma. Chybějící funkce nemá zanechat prázdný druhý řádek; bez jména kartu nepovažovat za připravenou. Tato pravidla jsou implementačním výchozím bodem, nikoliv hotovým otestovaným chováním.

Náhledy ovládání a prezentační popisky nesmějí být součástí vysílané grafiky. Při realizaci ověřit čitelnost a celý reliéf; nepřebírat ilustrační fotografii do overlaye.

## Animace a otevřené vstupy

Požadavky na animaci doplní zadavatel později. Nástup, odchod, délka zobrazení ani automatické spouštění zatím nejsou schváleny. Nepřebírat automaticky animaci karty jezdce.

K doplnění zůstávají skutečná jména a funkce, animace a finální technické parametry režie. Karta hosta rozvíjí rozhovorovou jmenovku uvedenou ve společném zadání; na rozdíl od původní obecné položky G05 obsahuje podle nového výslovného zadání pouze jméno a funkci.
