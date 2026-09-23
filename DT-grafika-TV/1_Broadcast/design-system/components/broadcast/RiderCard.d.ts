/**
 * Karta jezdce před startem, verze 06.5 — překryv živého obrazu v TV přenosu, s nápisem akce na reliéfu.
 * Absolutně pozicovaná na plátně 1920 × 1080 (96 px zleva, 80 px zdola).
 */
export interface RiderCardProps {
  /** "A" = vodorovná spodní lišta, "B" = kompaktní rohový blok. Výchozí "A". */
  variant?: 'A' | 'B';
  /** Jméno. */
  first?: string;
  /** Příjmení — výraznější úroveň. */
  last?: string;
  /** Startovní číslo. Chybí-li jméno nebo číslo, karta se nevykreslí (není připravena k vysílání). */
  number?: string | number;
  /** Tým. Prázdné pole se skryje. */
  team?: string;
  /** Kód země, např. "CZE". */
  country?: string;
  /** Kategorie. */
  category?: string;
  /** Zobrazit vlajku vedle kódu země. Výchozí true. */
  showFlag?: boolean;
  /** Cesta k portrétu. Bez zdroje nebo při neplatném obrázku se karta přeskládá do podoby bez portrétu. */
  portraitSrc?: string;
  /** Jednoduché přepnutí viditelnosti bez fázované animace. Výchozí true. */
  visible?: boolean;
  /**
   * Fáze animace: "in" spustí fázovaný nástup (760 ms), "out" odchod (380 ms),
   * "idle" nechá kartu staticky viditelnou (náhledy, exporty). Výchozí "idle".
   */
  phase?: 'idle' | 'in' | 'out';
  /** Nápis akce na reliéfu. Výchozí je vložený originál z design-system/brand/event-wordmark.svg; přepis jen pro jinou mutaci nápisu. */
  wordmarkSrc?: string;
  /** Přepis pozice na plátně. */
  style?: React.CSSProperties;
}
export function RiderCard(props: RiderCardProps): JSX.Element | null;
