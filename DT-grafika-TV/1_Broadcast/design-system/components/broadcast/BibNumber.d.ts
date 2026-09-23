/** Startovní číslo — akcentní červená #FF1A1A, tabulární číslice, popiska nad číslem. */
export interface BibNumberProps {
  /** Startovní číslo jako text. Chybějící číslo kartu potlačí — nikdy nenahrazovat nulou. */
  number: string | number;
  /** Popiska nad číslem. Výchozí "ČÍSLO". */
  label?: string;
}
export function BibNumber(props: BibNumberProps): JSX.Element | null;
