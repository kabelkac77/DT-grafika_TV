/**
 * G08 — jezdec a lídr, dva mezičasy od startu a cíl s pořadím. Karta jezdce je varianta A zmenšená na 60 %.
 * Vyplňuje celé plátno 1920 × 1080; vrstvy leží podél spodní hrany.
 */
export interface SplitTimeProps {
  /** Údaje pro RiderCard (first, last, number, team, country, category, portraitSrc…). Varianta je vždy "A". */
  rider?: Record<string, unknown>;
  /** Jméno lídra, např. "Jan Svoboda"; poslední slovo verzálkami. Bez lídra se vrstva mezičasů nevykreslí. */
  leader?: string;
  /** Kód země lídra; "CZE" ukáže vlajku, jiné jen kód. */
  leaderCountry?: string;
  /** Mezičasy od startu ve tvaru "0:31.700". */
  time1?: string; time2?: string;
  /** Rozdíl vůči lídrovi "+0.447" / "-0.144"; záporný = rychlejší (zelená), kladný = pomalejší (červená). */
  delta1?: string; delta2?: string;
  /** Cílový čas a rozdíl. Prázdné hodnoty se zobrazí jako pomlčka. */
  finishTime?: string; finishDelta?: string;
  /** Pořadí v cíli. */
  rank?: string;
  /** Fáze animace pro kartu jezdce i vrstvu mezičasů. Čeká na schválení. */
  phase?: 'idle' | 'in' | 'out';
  style?: React.CSSProperties;
}
export function SplitTime(props: SplitTimeProps): JSX.Element;
