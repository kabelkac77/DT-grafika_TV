/**
 * Karta hosta 01 — decentní jmenovka mluvící osoby ve vstupech mezi jízdami (moderátor, starosta, host).
 * Pouze jméno a funkce: bez čísla, portrétu, vlajky, země, týmu ani kategorie; na reliéfu nápis akce jako u karty jezdce.
 * Absolutně pozicovaná na plátně 1920 × 1080 (96 px zleva, 80 px zdola), šířka 620 px.
 */
export interface GuestCardProps {
  /** Celé jméno. Bez jména se karta nevykreslí — není připravena k vysílání. */
  name?: string;
  /** Funkce nebo pozice, např. "moderátor". Prázdná funkce druhý řádek úplně vypustí, nezanechá prázdné místo. */
  role?: string;
  /** Fáze animace převzatá od karty jezdce: "in" nástup, "out" odchod, "idle" staticky viditelná. Výchozí "idle". */
  phase?: 'idle' | 'in' | 'out';
  /** Nápis akce na reliéfu. Výchozí je vložený originál; přepis jen pro jinou mutaci nápisu. */
  wordmarkSrc?: string;
  /** Přepis pozice na plátně. */
  style?: React.CSSProperties;
}
export function GuestCard(props: GuestCardProps): JSX.Element | null;
