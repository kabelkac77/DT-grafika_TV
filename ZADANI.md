# Zadání celého úkolu — grafika pro TV přenos DownTown Příbram

Pracovní dokument. Slouží jako společný základ, ze kterého později vzniknou jednotlivá dílčí zadání, například pro vizuální návrh, jednotlivé grafické části, práci s daty a ovládání.

## Stav a způsob doplňování

- Potvrzené informace jsou uvedeny jako fakta.
- **K doplnění** znamená dosud nezodpovězenou otázku, nikoliv požadavek.
- **Návrh k rozhodnutí** označuje možnost, která ještě nebyla schválena.
- Výčty příkladů níže nejsou potvrzeným rozsahem dodávky.

## Dosud potvrzené informace

- Úkolem je připravit grafiku pro televizní přenos závodu DownTown Příbram a přenos na velkoplošné obrazovky.
- Součástí bude více grafických částí, nejen grafika z referenční fotografie.
- Nejprve vznikne obecné zadání celého úkolu; následně z něj odvodíme dílčí zadání.
- Informace se budou doplňovat postupně. Neznámé požadavky zůstávají otevřené.
- Původní referenční fotografie a archiv `SVDT Design System.zip` byly vstupními podklady při přípravě zadání, ale nejsou uloženy v tomto repozitáři. Rozbalený design systém je součástí složky `design-system/`; použité obrazové podklady aktuální studie jsou popsány v `karta-jezdce/README.md`.

## 1. Základní informace o akci

- Oficiální název: **Svatohorský Downtown Příbram (SVDT)**. Jde o městský sjezd horských kol na čas.
- Datum dalšího ročníku: **zatím není známo** (potvrzeno zadavatelem). Číslo a označení dalšího ročníku: **K doplnění**.
- Web nyní popisuje 10. ročník ze dne 23. 5. 2026; datum, harmonogram, status MČR ani partnery tohoto ročníku nepřebírat automaticky do nové grafiky.
- Místo: Příbram, trať ze Svaté Hory do Pražské ulice. Pořadatel: **COWÁRNA z.s.** Zdroj: [oficiální web](https://svdtpribram.cz/), ověřeno 8. 9. 2026.
- Veřejné kontakty z webu: info@svdtpribram.cz, +420 721 332 266; ředitel závodu Vojtěch Hrach, partneři / marketing / PR Vlastimil Ševr. Odpovědná kontaktní osoba pro tento projekt: **K doplnění**.
- Kontaktní osoba za televizní produkci / režii: **K doplnění**.
- Jazyk nebo jazykové varianty přenosu: **K doplnění**.

## 2. Cíl a rozsah celého úkolu

- Výsledek: **grafické soubory a funkční řešení** pro odbavení požadované grafiky. Konkrétní způsob ovládání a napojení dat se doplní s režií a časomírou.
- Použití: **TV přenos a přenos na velkoplošné obrazovky**. Zda budou oba výstupy stejné, nebo budou potřebovat samostatné varianty: **K doplnění s režií**.
- Zda má řešení sloužit jedné akci, nebo být opakovaně použitelné: **K doplnění**.
- Co do úkolu patří a co je mimo jeho rozsah: **K doplnění**.
- Priority a minimální rozsah nutný pro první použití: **K doplnění**.

## 3. Formát a pravidla závodu

Níže je referenční stav ročníku 2026, nikoliv potvrzená pravidla dalšího ročníku. Zdroje ověřené 8. 9. 2026: [hlavní závod](https://svdtpribram.cz/hlavni-zavod/) a [pravidla 2026, PDF](https://svdtpribram.cz/wp-content/uploads/2026/04/Pravidla_Svatohorsky_Downtown_Pribram_2026.pdf).

- Kategorie podle PDF: Ženy od 12 let, Open od 12 let, Junior 12–18 let, Elite 19–29 let a Masters 30+. Open je pro nelicencované; ostatní kategorie vyžadují licenci. Minimální účast: 3 ženy, ostatní kategorie 4 jezdci. Případné slučování určuje pořadatel.
- Dvě měřené jízdy. Běžně rozhoduje lepší čas, pro MČR pouze čas druhé jízdy. **Způsob hodnocení a status příštího ročníku musí potvrdit pořadatel; výpočet nezafixovat podle domněnky.**
- PDF spojuje pořadí první jízdy s odbavením při prezenci. Web uvádí pořadí kategorií ženy, open, junior, master, elite, interval 30 sekund a druhou jízdu podle časů od nejpomalejšího. Posledních 10 startujících z licencovaných kategorií startuje po dojezdu předchozího. Přesný výklad a pravidla dalšího ročníku: **K potvrzení**.
- Důsledek pro návrh: počítat s možností více jezdců současně na trati; přiřazení grafiky k jezdci na obraze se musí vyřešit s režií.
- Web uvádí délku 1 200 m a převýšení 85 m. Finální trasa a mapa příštího ročníku: **K doplnění**.
- Rozpor zdrojů: stránka hlavního závodu uvádí limit 120 jezdců, PDF 140. Kapacita pro další ročník: **K potvrzení**, do grafiky zatím nevkládat pevné číslo.
- Počet měřených úseků / mezičasů: **K doplnění**.
- Pravidla pro shodné časy, penalizace, nestartování, nedokončení a diskvalifikaci: **K doplnění**.

## 4. Seznam grafických částí

Potvrzené části:

| ID | Část | Obsah / upřesnění |
| --- | --- | --- |
| G01 | Tabulka výsledků jezdců | 10 výsledků: startovní číslo, jméno, stát, čas / ztráta. Měnitelná kategorie a jízda, loga vpravo ve společném panelu. [Dílčí zadání](karta-vysledky/ZADANI_KARTA_VYSLEDKU.md). Průběžná/finální varianta a stránkování se doplní. |
| G02 | Představení / popis jezdce | Údaje o jezdci podle oddílu 5; podoba a okamžik zobrazení se doplní. |
| G03 | Mapa trati | Finální trasu a požadované body je nutné dodat nebo potvrdit. |
| G04 | Časomíra | Přesné stavy před startem, za jízdy a v cíli se doplní podle dostupných dat. |
| G05 | Jmenovka pro rozhovory | Jméno, startovní číslo a tým. |
| G06 | Přechody mezi sestřihy | Počet variant, délka a způsob použití se upřesní s režií. |
| G07 | Partneři | Loga a způsob prezentace podle postupně dodávaných podkladů. |

**Volitelná část G08:** ztráta / zisk na jednotlivých sekcích. Realizace závisí na dostupnosti mezičasů a potvrzení rozsahu zadavatelem. Určit, zda jde o rozdíl za daný úsek, nebo kumulovaný rozdíl od startu, a vůči komu se počítá.

Další části z původní osnovy (například startovní listina, program, stupně vítězů nebo informační sdělení) zatím nejsou objednaným rozsahem. Priority G01–G07: **K doplnění**.

Pro každou zvolenou část později určujeme: účel, zobrazovaná data, podobu, okamžik spuštění, dobu zobrazení, způsob skrytí, varianty a prioritu při souběhu s jinou grafikou.

## 5. Údaje o závodnících a další obsah

- Rozsah údajů potvrzený zadavatelem: **jméno, startovní číslo, země, tým, kategorie, portrét a vlajka**. Rozdělení na povinné a volitelné údaje pro jednotlivé grafiky: **K doplnění**.
- Konkrétní portréty, vlajky a další obrazové podklady: **K doplnění**.
- Kdo dodá seznam závodníků, v jakém formátu a kdy: **K doplnění**.
- Kdo kontroluje správnost jmen, týmů a dalších údajů: **K doplnění**.
- Pravidla pro dlouhá jména, diakritiku a chybějící údaje: **K doplnění**.
- Texty pro informační grafiku a další obsah: **K doplnění**.

## 6. Časomíra a závodní data

- Zadavatel poskytl [výsledkovou stránku SLCR Live](https://vysledky.ok1kuo.cz/?s=22147) jako podklad k časomíře.
- Ověření 8. 9. 2026: stránka zobrazuje rozhraní pro jezdce na trati a dojezd, pole pořadí, číslo, jméno, kategorie, klub / země, Run 1, Run 2, Time a Gap. Při kontrole nebyly zobrazeny konkrétní výsledkové řádky ani název zvoleného závodu.
- Samotný odkaz nepotvrzuje dostupnost datového rozhraní, automatického odběru, živého času ani mezičasů. Způsob propojení a zdroj pro příští ročník je nutné dohodnout s časomírou; nevycházet pouze z vzhledu veřejné výsledkové stránky.
- Dodavatel a systém časomíry, technický kontakt: **K doplnění**.
- Jaká data jsou dostupná a jak se předávají: **K doplnění**.
- Automatické napojení, import souboru nebo ruční zadávání: **K doplnění**.
- Dostupnost startů, živého času, mezičasů, cílových časů a pořadí: **K doplnění**.
- Přesnost a způsob zápisu času: **K doplnění**.
- S kým se jezdec porovnává a zda se porovnání během jízdy mění: **K doplnění**.
- Rozlišení času úseku a celkového času od startu: **K doplnění**.
- Rozlišení předběžných a potvrzených výsledků: **K doplnění**.
- Postup při opravě výsledku, opožděných datech nebo výpadku: **K doplnění**.
- Dostupnost ukázkových dat pro přípravu a zkoušku: **K doplnění**.

## 7. Ovládání během přenosu

- **Režie bude zajištěna.** Konkrétní způsob obsluhy grafiky zatím zadavatel nezná; požadavky se doplní společně s režií.
- Kdo bude grafiku obsluhovat a kolik lidí se zapojí: **K doplnění**.
- Co se má spouštět automaticky a co ručně: **K doplnění**.
- Způsob výběru závodníka, kategorie a grafické části: **K doplnění**.
- Potřeba náhledu před odvysíláním: **K doplnění**.
- Způsob oprav a nouzového skrytí veškeré grafiky: **K doplnění**.
- Požadované ovládací zařízení nebo propojení s režií: **K doplnění**.
- Chování při souběhu více grafických částí: **K doplnění**.

## 8. Technické prostředí přenosu

- **Technické prostředí řeší režie.** Následující body jsou seznamem vstupů k získání od režie, nikoliv požadavkem, aby je nyní určoval zadavatel.
- Odbavovací systém režie a jeho verze: **K doplnění**.
- Způsob předání grafiky do přenosu a požadovaný formát: **K doplnění**.
- Rozlišení, poměr stran a snímková frekvence: **K doplnění**.
- Požadavky na průhlednost a barevné zpracování: **K doplnění**.
- Počítače, operační systém a další dostupné vybavení: **K doplnění**.
- Dostupnost místní sítě a internetu; požadavek na provoz bez internetu: **K doplnění**.
- Případné odlišné výstupy pro televizi, stream a místní obrazovku: **K doplnění**.
- Technická omezení a požadavky produkce: **K doplnění**.

## 9. Vizuální směr a pravidla značky

- Podklad: dodaný archiv `SVDT Design System.zip`; jeho rozbalená pracovní podoba je uložena v `design-system/`, samotný archiv není součástí repozitáře.
- Zjištění z archivu: téměř černé plochy, bílý text, značková červená `#E30613`, akcentní červená `#FF1A1A`, písmo Exo a číslice se stejnou šířkou.
- Archiv obsahuje zejména pravidla a komponenty pro web a další materiály; konkrétní pravidla pro TV grafiku je potřeba určit.
- Potvrzený směr: vycházet z dodaného design systému a přizpůsobit jej televiznímu přenosu a velkoplošným obrazovkám. Konkrétní návrhy schvaluje zadavatel.
- Fotografie slouží jako reference rozložení závodních informací; výslednou grafiku převést do identity SVDT. Detailní rozložení bude předmětem dílčího zadání.
- Umístění grafiky, bezpečné okraje a prostor pro logo televize: **K doplnění**.
- Velikost textů a čitelnost nad světlými i tmavými záběry: **K doplnění**.
- Barevné významy náskoku, ztráty, lídra a dalších stavů: **K doplnění**.
- Průhlednost podkladů, animace a délka jejich trvání: **K doplnění**.
- Návrh k rozhodnutí: doplnit do pravidel značky použití zelené pro náskok; archiv ji nyní vyhrazuje formulářovým stavům.

## 10. Loga, fotografie, písma a partneři

- Zjištění z archivu: skutečné logo akce, fotografie ani loga partnerů nejsou přiloženy; písmo je odkazované z internetu, nikoliv přibalené jako soubor.
- Oficiální loga a další podklady bude **zadavatel dodávat postupně**.
- Partneři budou upřesněni později; zadavatel následně dodá jejich loga. Hierarchie a pravidla zobrazování: **K doplnění**. Partnery z webu ročníku 2026 automaticky nepřebírat.
- Kdo dodá portréty a ostatní obrazové podklady: **K doplnění**.
- Zajištění potřebných práv k použití podkladů a písem: **K doplnění**.
- Termín dodání finálních podkladů: **K doplnění**.

## 11. Spolehlivost a náhradní postupy

- Potvrzený požadavek: **zajistit zálohování dat**.
- Návrh provedení k upřesnění: zálohovat seznam jezdců, přijaté výsledky, ruční opravy, nastavení a grafické podklady; zachovat historii a ověřit obnovu. Interval, umístění nezávislé kopie, délka uchování a odpovědná osoba: **K doplnění**.
- Zálohování dat a pokračování živého přenosu při výpadku jsou samostatné věci; náhradní provozní režim dosud není určen.
- Požadované chování při výpadku časomíry, sítě nebo ovládání: **K doplnění**.
- Náhradní ruční režim a statické záložní podklady: **K doplnění**.
- Postup při restartu a návratu do přenosu: **K doplnění**.
- Jak se zabrání zobrazení nesprávného jezdce nebo zastaralých výsledků: **K doplnění**.
- Odpovědnost za provoz a řešení problémů během akce: **K doplnění**.

## 12. Výstupy a předání

- Potvrzené výstupy: **soubory a funkční řešení**. Konkrétní formáty souborů a způsob spuštění se určí podle požadavků režie.
- Požadavek na editovatelné zdroje a možnost dalších úprav: **K doplnění**.
- Rozsah návodu, instalace a zaškolení obsluhy: **K doplnění**.
- Ukázková data a demonstrace celého průběhu závodu: **K doplnění**.
- Kdo výstupy přebírá a kde budou uloženy: **K doplnění**.

## 13. Ověření a schválení

- Finální schválení: **zadavatel**. Návrh ověření: režie ověří kompatibilitu a časomíra správnost přebíraných dat; schválení zadavatele tím není nahrazeno.
- Kritéria, podle kterých bude úkol považován za dokončený: **K doplnění**.
- Termín a prostředí zkoušky s režií a časomírou: **K doplnění**.
- Situace pro ověření — běžná jízda, dlouhé jméno, chybějící portrét, více jezdců na trati, oprava výsledku, výpadek dat: **K doplnění podle potvrzeného rozsahu**.

## 14. Termíny, priority a omezení

- Termín prvního návrhu: **K doplnění**.
- Termín funkční ukázky a společné zkoušky: **K doplnění**.
- Preferovaný cílový termín dokončení: **začátek ledna 2027**. Přesný den: **K doplnění**. Datum závodu ani den ostrého nasazení dosud nejsou známy.
- Rozpočet a případná omezení placených nástrojů nebo služeb: **K doplnění**.
- Pořadí priorit a volitelné části při nedostatku času: **K doplnění**.

## 15. Navazující dílčí zadání

Navržený postup realizace na žádost zadavatele. Názvy souborů níže označují budoucí dílčí zadání; zatím nebyla vytvořena. Tento dokument zůstává společným základem.

| Krok | Dílčí zadání | Výsledek a závislosti |
| --- | --- | --- |
| 1 | `01_VIZUALNI_SYSTEM.md` | Pravidla TV grafiky podle SVDT, čitelnost pro oba výstupy a ukázky výsledkové tabulky, jezdce a časomíry. Lze připravit nyní s označenými ukázkovými daty; rozměry zůstanou pracovní do potvrzení režií. |
| 2 | `02_GRAFICKE_CASTI.md` | Přesné zadání G01–G07: obsah, rozložení, varianty, animace a chování při chybějících údajích. G08 oddělit jako volitelné rozšíření. Navazuje na schválený vizuální směr. |
| 3 | `03_PODKLADY_A_OBSAH.md` | Seznam a organizace jezdců, portrétů, log a mapy; pravidla pojmenování a doplňování. Podklady lze shromažďovat současně s kroky 1 a 2. |
| 4 | `04_DATA_A_CASOMIRA.md` | Dohodnutý zdroj dat, přiřazení jezdců a jízd, pravidla pořadí, mezičasy, opravy a ukázková data. Vyžaduje součinnost časomíry a potvrzení pravidel dalšího ročníku. |
| 5 | `05_FUNKCNI_GRAFIKA_A_REZIE.md` | Funkční šablony, způsob ovládání, náhled, spuštění a skrytí, přechody a výstupy do režie. Vyžaduje technické parametry od režie a dohodu o datech. |
| 6 | `06_ZALOHOVANI_A_OBNOVA.md` | Zálohování dat a nastavení, ověřená obnova a dohodnuté chování při výpadku. Navazuje na konkrétní funkční řešení. |
| 7 | `07_ZKOUSKA_A_PREDANI.md` | Zkouška průběhu závodu a všech grafik v prostředí režie, kontrola TV i velkoplošného výstupu, opravy, finální soubory a schválení zadavatelem. Rozsah návodu se ještě dohodne. |

Nejbližší navazující práce: připravit zadání vizuálního systému a grafických částí. Získání technických informací od režie a časomíry může probíhat souběžně; jejich kontaktování není tímto dokumentem automaticky zadáno.

### Orientační harmonogram — návrh, nikoliv potvrzené dílčí termíny

- Září–říjen 2026: doplnění zadání, vizuální směr a získání technických vstupů.
- Říjen–listopad 2026: návrhy jednotlivých částí a funkční prototyp s ukázkovými daty.
- Listopad–prosinec 2026: napojení časomíry a režie, zálohování a společná zkouška.
- Začátek ledna 2027: cílové dokončení a předání. Později dodané logo partnera, datum nebo startovní listina se doplní do připravených šablon; termín finálního naplnění obsahem se dohodne samostatně.

## Záznam rozhodnutí

- 8. 9. 2026: zapracovány odpovědi zadavatele k bodům 1–15. Potvrzeny TV a velkoplošné výstupy, části G01–G07, údaje o jezdcích, postupné dodávání log, zálohování, soubory a funkční řešení, schvalování zadavatelem a preferované dokončení na začátku ledna 2027. G08 zůstává volitelná.
- 8. 9. 2026: ověřen web, pravidla 2026 a poskytnutá výsledková stránka. Pravidla dalšího ročníku, výpočet výsledků, limit jezdců, živé datové propojení a technické řešení zůstávají otevřené.

- 9. 9. 2026: G01 implementována podle studie 04 ve složce karta-vysledky. Potvrzeno 10 výsledků vlevo, menší loga vpravo ve stejné tabulce bez nadpisu Partneři, celý reliéf na pravém horním kraji. Při tvorbě živé HTML vrstvy vytvořit editor rozmístění log. Externí výsledkový server se napojí později. Detailní datová smlouva, současný stav a zbývající kroky jsou v karta-vysledky/ZADANI_KARTA_VYSLEDKU.md.
