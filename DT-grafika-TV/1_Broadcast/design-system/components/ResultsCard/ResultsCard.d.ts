/**
 * G01 — tabulka deseti výsledků kategorie a jízdy se společným panelem log vpravo.
 * Absolutně pozicovaná na plátně 1920 × 1080 (96 px zleva, 190 px shora, šířka 1728 px).
 */
export interface ResultRow {
  /** Startovní číslo; v jedné tabulce jedinečné. */
  number: string | number;
  firstName: string;
  /** Příjmení — vysází se verzálkami a weight 900. */
  lastName: string;
  /** Kód země, tři velká písmena, např. "CZE". */
  country: string;
  /** Čas v celých milisekundách. Řádky musí být seřazené od nejrychlejšího. */
  timeMs: number;
}
export interface ResultsCardProps {
  /** Kategorie, např. "ELITE". Bez ní se karta nevykreslí. */
  category?: string;
  /** Typ jízdy, např. "KVALIFIKACE". Bez něj se karta nevykreslí. */
  runType?: string;
  /** Nejvýše 10 řádků; první je lídr s časem, ostatní se ztrátou "+0.250 s". */
  results?: ResultRow[];
  /** Nejvýše 5 log ve společném panelu. */
  logos?: { src: string; alt: string }[];
  /** Ukázat rezervy "LOGO" v prázdných místech (jen náhled, nikdy ve vysílání). */
  showPlaceholders?: boolean;
  /** Fáze animace: "in" nástup, "out" odchod, "idle" staticky viditelná. Čeká na schválení. */
  phase?: 'idle' | 'in' | 'out';
  /** Nápis akce na reliéfu; výchozí je vložený originál. */
  wordmarkSrc?: string;
  style?: React.CSSProperties;
}
export function ResultsCard(props: ResultsCardProps): JSX.Element | null;
