<!-- Zdroj: https://app.notion.com/p/3d6e300ba5e481a3920be4969648b664?pvs=204
Cesta v Notion: DownTown / Nápady
Poslední úprava zdroje: 2026-09-10T17:41:42.783Z
Převzato: 2026-09-18. Úplný text stránky; změněno pouze formátování Notion na Markdown.
Jde o archiv zadání. Stav realizace a pracovní upřesnění jsou v README.md a dokumentaci kroku 01.
-->

## DT 3D Diorama — offline televizní 3D mapa trati
> **Doporučené řešení pro Svatohorský DownTown:** vlastní 3D miniatura Příbrami vytvořená z bezplatných českých geodat, vyrenderovaná předem v maximální kvalitě a doplněná živou HTML/CSS broadcast grafikou. Cíl: luxusní vzhled ve stylu Red Bull Cerro Abajo, nulová závislost na internetu a prakticky nulové náklady na software/API.
## Základní myšlenka
Nechceme během závodu živě načítat Google Photorealistic 3D Tiles ani renderovat celé město v Cesiu. Pro televizní přenos nepotřebujeme interaktivní mapu — potřebujeme, aby **každý frame vypadal perfektně, spolehlivě a pokaždé stejně**.
Proto vytvoříme **vlastní 3D dioramu Příbrami**:
- skutečný terén a výškové poměry,
- vystouplé budovy,
- stromy a vegetace,
- ortofoto povrch města,
- černé „uříznuté“ boky modelu jako fyzická maketa,
- výrazná žlutá 3D trať,
- broadcastové značky **START / SPLIT / KEY SECTION / FINISH**,
- samostatná živá vrstva se statistikami a časy.
3D část bude připravená **offline před závodem** jako kvalitní video/sekvence. Živé údaje — jména, časy, splity, výsledky a Track Stats — zůstanou ve stávajícím systému `DT-grafika_TV` jako HTML/CSS.
## Proč je to lepší než původní Google Tiles varianta
Původní Cesium + Google Photorealistic 3D Tiles řešení je dobré pro interaktivní webovou mapu, ale pro TV přenos zbytečně přidává rizika:
- závislost na internetovém připojení,
- API klíč a fakturace,
- možnost nedotažených nebo rozmazaných dlaždic,
- vyšší nároky na počítač během live přenosu,
- proměnlivý vzhled podle načtení dat,
- komplikovanější ladění alfa vrstvy a realtime renderu.
U předrenderované dioramy tato rizika odpadají. Render můžeme připravit klidně přes noc ve 4K, se špičkovými stíny, antialiasingem, ambient occlusion a kvalitním světlem. Během závodu se už pouze přehraje hotová sekvence a přes ni se zobrazí živá grafika.
## Bezplatný datový základ
Pro výrobu lze využít česká otevřená geodata a open-source software.
| Vrstva | Zdroj / nástroj | Účel |
| --- | --- | --- |
| Terén | ČÚZK DMR 5G | Skutečný reliéf, svahy a výškové rozdíly |
| Povrch / výšky objektů | ČÚZK DMP OK | Výšky budov a vegetace |
| Fotorealistický povrch | ČÚZK Ortofoto | Reálné střechy, silnice, zeleň a náměstí |
| Půdorysy budov | RÚIAN | Čisté ostré 3D budovy |
| Trať | GPX / KML DownTownu | Přesná 3D křivka závodní trasy |
| Příprava geodat | QGIS | Ořez, výšky, převod a export |
| 3D scéna + render | Blender | Diorama, kamera, světlo, animace, finální render |
| Živá TV grafika | DT-grafika_TV / HTML / CSS / JS | Časy, splity, jména, statistiky a další dynamická data |
ČÚZK publikuje otevřená data bezplatně; pro projekt je vhodné ověřit konkrétní licenci každé použité vrstvy a přidat požadovanou atribuci. Základní zdroje:
- [ČÚZK Open Data](https://ags.cuzk.gov.cz/opendata/)
- [ČÚZK 3D data / DMP OK](https://geoportal.cuzk.gov.cz/)
- [Blender](https://www.blender.org/)
- [QGIS](https://qgis.org/)
### Licence a atribuce
Otevřená data ČÚZK jsou poskytována pod licencí **CC-BY 4.0**, takže je nutná viditelná atribuce **© ČÚZK** — drobným písmem v rohu hero sekvence a jednostránkový licenční záznam v repozitáři. Teprve tím je argument z odstavce o Google Earth Studiu skutečně splněný, ne jen deklarovaný.
OpenStreetMap je z pipeline vypuštěn záměrně: licence ODbL a její share-alike podmínky jsou u komerčně sponzorovaného přenosu zbytečná komplikace. Půdorysy z RÚIAN + výšky z DMP OK stačí a jsou licenčně čisté.
**Pozor na DMP 1G:** ČÚZK ho označuje za na většině území zastaralý a od 1. 1. 2027 ho přestane poskytovat. Náhradou je DMP OK, na kterém toto zadání staví — proto se DMP 1G nikde nepoužívá.
## Jak bude mapa vizuálně vypadat
Cíl není „Google Maps ve 3D“. Cíl je **prémiová televizní fyzická maketa města**.
### 1. Diorama / fyzický blok města
Vyřízne se pouze oblast kolem závodní trati, přibližně pás **300–500 m na každou stranu**. Celá oblast bude mít vlastní tvar a spodní část se protáhne dolů jako masivní 3D blok.
Boční stěny budou:
- matně černé,
- čisté,
- bez textur,
- lehce nasvícené pouze hranovým světlem.
Právě tento detail vytvoří dojem skutečné makety položené před kamerou, podobně jako na referenčních záběrech Red Bullu.
### 2. Reálný povrch Příbrami
Na terén se položí kvalitní ortofoto. Silnice, střechy, zeleň a městský prostor tedy budou skutečně odpovídat Příbrami.
Budovy nemusí být za každou cenu fotogrammetrické. Z televizního pohledu bude pravděpodobně lepší kombinace:
- přesný půdorys,
- reálná výška,
- jednoduchá kvalitní fasáda,
- ortofoto střechy,
- několik důležitých dominant ručně dotažených do vyššího detailu.
**Svatá Hora** by měla mít nadstandardní detail, protože je ikonickým bodem startu a jedním z hlavních vizuálních orientačních bodů celé mapy.
### 3. Žlutá 3D trať
Trať bude samostatná 3D křivka vedená několik desítek centimetrů nad terénem, aby nikdy nezanikla ve městě.
Vizuální styl:
- výrazná žlutá,
- jemný glow,
- kulatý profil linky,
- decentní světelný odraz do okolí,
- animované „nakreslení“ od STARTU až do CÍLE.
Křivka může při pohybu kamery fungovat i jako navigační prvek — kamera ji bude sledovat po celé trase.
**Broadcast omezení:** glow držet decentní, je to první věc, kterou zabije bitrate streamu. Lepší ostré jádro linky a jemný bloom než opačně. Minimální tloušťka linky i markerů **~3 px ve 1080p**, jinak prvek v interlacovaném signálu bliká. Sytou žlutou projet vektroskopem, ať není mimo broadcast-legal gamut.
### 4. Broadcast značky
Nad důležitými místy se zobrazí jednoduché čisté markery:
- START,
- SPLIT 1,
- SPLIT 2,
- SPLIT 3,
- KEY SECTION,
- DROP / JUMP názvy,
- FINISH.
Graficky mají vycházet ze stejného design systému jako karty jezdce, výsledků a dalších prvků `DT-grafika_TV`, aby celý přenos vypadal jako jeden profesionální broadcast package.
**Markery se ale nezapékají do renderu.** V Blenderu budou na jejich místech pouze prázdné objekty (empties) a při renderu se skriptem přes `world_to_camera_view` vyexportuje JSON s jejich promítnutými 2D souřadnicemi pro každý frame, včetně příznaku viditelnosti (zakrytí budovou, mimo záběr). Markery pak kreslí živá HTML vrstva.
Důvody: text v H.264 měkne, zapečený marker nejde přebarvit bez rerenderu a hlavně **nemůže nést živá data**. Takto se u SPLITU 2 může objevit reálný mezičas jezdce, který právě jede — což je nejsilnější věc, kterou ta mapa umí udělat.
## Kamera a filmový vzhled
Nepoužívat klasický širokoúhlý „mapový“ pohled. Kamera má působit jako kdyby skutečně natáčela fyzickou miniaturu města.
Doporučené nastavení:
- lehce teleobjektivový / izometrický pohled,
- pomalé orbitální pohyby,
- jemný depth of field,
- ambient occlusion,
- měkké stíny,
- decentní atmosférická perspektiva,
- vysoká ostrost trati a markerů,
- žádné přehnané filmové efekty.
Výsledkem má být kombinace **reálného města + fyzické dioramy + moderní sportovní grafiky**.
### Tvrdý limit výšky kamery
Ortofoto ČR má rozlišení 12,5 cm/px. Z toho plyne strop, který nejde obejít: v záběru musí být **minimálně ~250 m terénu na šířku ve 1080p** (~500 m ve 4K). Pod touto hranicí se textura zvětšuje a místo města je vidět rozmazaná pixelová kaše bez fasád. Kamera proto nikdy neklesá „pár desítek metrů nad trať“.
### Převýšení
DownTown má na kilometr trati málo výšky na to, aby při teleobjektivovém pohledu působil strmě. Osu Z je proto potřeba **vědomě přehnat 1,3–2×** jako parametr scény. U sportovních grafik je to standard.
### Vegetace
Stromy nebrat přímo z povrchového modelu — zblízka vypadají jako roztavené zelené hroudy. Vegetační body detekovat a **instancovat low-poly stromy přes geometry nodes**. Miniaturní stromky navíc přesně podporují dioramový vzhled.
## Doporučené animační sekvence
Nevyrábět pouze jedno video. Z jednoho Blender projektu připravit sadu opakovaně použitelných sekvencí.
### A — HERO / představení celé trati
Délka přibližně **8–12 sekund**.
1. Černá obrazovka / přechod z live kamery.
2. Ze tmy se vysune 3D blok Příbrami.
3. Kamera se lehce přiblíží.
4. Od Svaté Hory se začne kreslit žlutá trať.
5. Postupně se objeví SPLIT 1 → KEY SECTION → SPLIT 2 → SPLIT 3 → FINISH.
6. Kamera zpomalí do finálního hero pohledu.
7. Zprava přijede panel TRACK STATS.
8. Přechod zpět do živého obrazu.
### B — sledovací orbit celé tratě
Kamera **zůstává vysoko**, teleobjektivem sleduje bod postupující po žluté lince od startu do cíle a pomalu se otáčí. Vhodné před startem elitní kategorie, před hlavním závodem nebo do televizní znělky.
Původní varianta „POV průlet těsně nad tratí“ je zamítnutá — na rozlišení ortofota se rozpadne (viz Tvrdý limit výšky kamery). Vysoký orbit je navíc bližší dojmu fyzické makety, o který v celém zadání jde.
### C — detail konkrétní sekce
Krátká **2–4sekundová** animace pro komentátora. Například: „Podíváme se na Split 2.“ Mapa se objeví, kamera přiletí ke konkrétní části trati, sekce se zvýrazní a následuje návrat do live kamery.
### D — statický hero loop
Pomalý téměř neznatelný orbit celé mapy. Použitelný jako podklad při čekání, představování trati nebo delším komentáři.
### E — jednotlivé splity
Každý Split bude mít vlastní krátký předěl, aby bylo možné během přenosu okamžitě skočit na libovolnou část tratě.
## Výstupní formát a broadcast parametry
Tohle se musí rozhodnout **před prvním finálním renderem**, protože zpětně se to neopraví.
- **Frame rate:** 25 nebo 50 fps podle výstupu do mixeru. Render ve 30 fps do 25fps signálu = trhání, které už nejde spravit.
- **Rozlišení:** master ve 4K, dodávka v cílovém broadcast rozlišení.
- **Alfa kanál:** pro sekvence přes živý obraz (detail sekce, přechody) je nutná průhlednost.
- **Kodek:** doporučeně **WebM / VP9 s alfou**. Přehraje se přímo ve `video` elementu uvnitř stávající browser source `DT-grafika_TV`, takže celý balík zůstane jednou HTML vrstvou v OBS, synchronizace markerů s videem je triviální (`requestVideoFrameCallback`) a odpadá zvláštní media source. ProRes 4444 je alternativa, ale je to samostatný zdroj a horší sync.
- **Statický poslední frame:** ke každé sekvenci vyrenderovat i poslední snímek jako obrázek. Když komentátor mluví déle, než sekvence trvá, HTML vrstva zamrzne na stillu místo nepříjemného loopu. Nula práce navíc, velká záchrana v přenosu.
## TRACK STATS panel
Text a čísla nebudou napevno součástí Blender renderu. Budou živou HTML/CSS vrstvou.
Možná data:
- Track length,
- Vertical drop,
- Start altitude,
- Finish altitude,
- počet skoků / dropů,
- počet splitů,
- případně rekord trati.
Výhoda: hodnoty lze změnit bez nového renderování 3D mapy a grafika zůstane dokonale ostrá.
## Technická architektura
**Offline část před závodem:**
1. ČÚZK (DMR 5G, DMP OK, Ortofoto) / RÚIAN / GPX data.
2. QGIS — sjednocení souřadnic, ořez dat a příprava terénu.
3. Blender — diorama, budovy, materiály, trať, světla, kamera a animace.
4. Render ve 4K nebo alespoň ve vyšším rozlišení než finální broadcast.
5. Export jednotlivých TV sekvencí ve zvoleném formátu (viz Výstupní formát), včetně JSON s 2D pozicemi markerů a posledního snímku každé sekvence jako stillu.
**Live část během závodu:**
1. Hotová 3D sekvence se přehraje jako video.
2. `DT-grafika_TV` vykreslí živé HTML/CSS prvky.
3. OBS / broadcast počítač složí video + živé grafické prvky.
4. Výstup pokračuje do televizního mixeru / streamu.
Tím oddělíme nejtěžší 3D práci od live systému. **Během přenosu už 3D prakticky nemůže selhat.**
## Napojení na DT-grafika_TV
Mapa má být součástí stejného grafického systému jako:
- karta jezdce,
- karta hosta,
- výsledková tabulka,
- timer,
- split grafika,
- další TV overlaye.
Doporučení do repozitáře: samostatný modul například `track-map` nebo `3d-map`, který bude řídit přehrávání jednotlivých předrenderovaných videí a přes ně zobrazovat dynamické HTML vrstvy.
Modul potřebuje **manifest JSON** popisující každou sekvenci: id, délka, fps, má/nemá alfu, cesta k videu, cesta k marker trackingu a cesta ke stillu posledního snímku.
Později lze vytvořit jednoduchý webový ovladač s tlačítky:
- FULL MAP,
- TRACK ORBIT,
- SPLIT 1,
- SPLIT 2,
- SPLIT 3,
- FINISH,
- TRACK STATS ON/OFF.
## iPad workflow
Výroba samotného kvalitního 3D modelu bude jednorázově vyžadovat **Mac nebo PC**, protože QGIS + Blender nejsou vhodné pro kompletní produkční workflow pouze na iPadu.
Jakmile jsou ale 3D sekvence jednou vyrenderované, **obsluha během eventu může zůstat webová a ovládaná z iPadu**. iPad může fungovat jako ovládací panel pro spuštění jednotlivých scén, zatímco render / OBS běží na produkčním počítači.
Pozor: ten ovládací panel je **samostatná komponenta** (WebSocket server + tlačítka na společné síti), ne vedlejší produkt renderu. Musí být v plánu prací.
## Proč nepoužívat Google Earth Studio jako hlavní řešení
Google Earth Studio může vizuálně posloužit jako inspirace nebo test kamery, ale nebyl by ideální jako základ hlavního broadcast systému. Použití imagery má vlastní podmínky a atribuci a u komerčního / sponzorovaného televizního eventu nechceme stavět celý vizuální asset na řešení, které nekontrolujeme.
Proto je bezpečnější mít hlavní mapu postavenou z dat, jejichž použití a licenci můžeme jednoznačně doložit.
## Náklady
Software:
- QGIS — **0 Kč**,
- Blender — **0 Kč**,
- vlastní HTML/CSS/JS — **0 Kč**,
- Google Map Tiles API — **není potřeba**.
Mapová data lze postavit na bezplatných otevřených datech. Reálný náklad je tedy primárně **čas na přípravu modelu a render**.
Realistický odhad toho času: **50–80 hodin** pro první ročník — QGIS→Blender pipeline, materiály, ručně dotažená Svatá Hora, kamerová práce, testy čitelnosti a render celé sady. „Levné“ se týká softwaru, ne práce.
### Jednodenní ověřovací spike — dělat jako první
Před vším ostatním: koridor DMR 5G + ortofoto + GPX linka + jeden pohyb kamery + testrender 5 s. Za jeden den je jasné, jestli to vypadá jako Red Bull, nebo jako Google Earth z roku 2012. Když druhá varianta, přepíše se zadání, dokud to nic nestálo.
## Co bude potřeba připravit
- [ ] **Jednodenní ověřovací spike jako první krok** (viz Náklady).
- [ ] Přesná GPX/KML trasa závodu 2027.
- [ ] Definovat START, FINISH a jednotlivé SPLITY.
- [ ] Vybrat 3–6 nejdůležitějších sekcí / dropů / skoků pro samostatné animace.
- [ ] Stáhnout a ověřit vhodné vrstvy ČÚZK pro oblast trati.
- [ ] Vyříznout mapový koridor kolem trati.
- [ ] Připravit první QGIS → Blender prototyp.
- [ ] Dotažení Svaté Hory a dalších dominant.
- [ ] Navrhnout žlutou trať a markery v designu DownTownu.
- [ ] Připravit první 5–10sekundový test render.
- [ ] Ověřit čitelnost v reálném TV rozlišení.
- [ ] Vyrenderovat kompletní sadu sekvencí.
- [ ] Napojit sekvence na `DT-grafika_TV`.
- [ ] Otestovat ovládání z iPadu + OBS / mixer.
- [ ] Rozhodnout frame rate, rozlišení a kodek s alfou před finálním renderem.
- [ ] Nastavit převýšení osy Z a ověřit limit výšky kamery.
- [ ] Skript na export 2D pozic markerů z Blenderu do JSON.
- [ ] Manifest JSON sekvencí pro modul `track-map`.
- [ ] Ovládací panel (WebSocket server + tlačítka) jako samostatný úkol.
- [ ] Zajistit atribuci © ČÚZK a licenční záznam v repu.
- [ ] Ověřit broadcast-legal barvy a tloušťku linky na vektroskopu.
## Město jako trvalý asset, trať jako roční vrstva
Trať se rok od roku mění, **město ne**. Projekt je proto potřeba od začátku rozdělit na dvě části:
- **Diorama Příbrami** — trvalý asset, postaví se jednou pořádně.
- **Trať, markery a sekvence** — vrstva regenerovaná každý ročník.
Druhý rok je pak nová mapa otázka odpoledne, ne dalších padesáti hodin. Ten samý asset navíc jde použít na web, do PWA / event appky, na plakát, do sponzorské prezentace i na sociální sítě. Tím se zásadně mění návratnost celé práce.
## Cílový výsledek
> **ČÚZK + vlastní 3D diorama + předrenderované 4K animace + živá HTML vrstva DT-grafika_TV.** Vizuálně prémiové jako profesionální Red Bull broadcast, ale bez placeného 3D mapového API a bez závislosti na internetu během závodu.
---
## Revize zadání — 10. 9. 2026
Zapracovaná technická revize. Původní architektura (offline render + živá HTML vrstva) zůstává beze změny, je zvolená správně. Změněno bylo následující:
1. **Markery vyjmuty z renderu** do živé HTML vrstvy řízené exportem 2D pozic z Blenderu. Původní dělicí čára byla nekonzistentní (TRACK STATS živě, markery zapečené) a zapečený marker nemůže nést živá data.
2. **Sekvence B přepsána** z POV průletu na vysoký sledovací orbit. Původní varianta by se na rozlišení ortofota rozpadla.
3. **Doplněn tvrdý limit výšky kamery** (~250 m terénu na šířku ve 1080p), převýšení osy Z a instancovaná vegetace místo stromů z povrchového modelu.
4. **Doplněna sekce Výstupní formát a broadcast parametry** — frame rate, alfa, kodek VP9/WebM, statické poslední snímky. V původním zadání zcela chyběla.
5. **OpenStreetMap vypuštěn** z datové základny kvůli ODbL; doplněna atribuce CC-BY / © ČÚZK a poznámka ke konci podpory DMP 1G.
6. **Doplněna broadcast omezení k trati** — glow vs. bitrate, minimální tloušťka linky, legální gamut žluté.
7. **Náklady upřesněny** na 50–80 h první ročník a předřazen jednodenní ověřovací spike.
8. **Doplněna sekce Město jako trvalý asset** — rozdělení na trvalou dioramu a ročně regenerovanou vrstvu trati.
9. Doplněn manifest JSON sekvencí a ovládací panel jako samostatná komponenta v plánu prací.
