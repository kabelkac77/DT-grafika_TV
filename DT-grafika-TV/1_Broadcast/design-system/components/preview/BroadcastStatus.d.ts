/** Stavová věta pro obsluhu pod náhledem — označuje ukázková data i neúplnou kartu. */
export interface BroadcastStatusProps {
  /** "error" pro stav NEPŘIPRAVENO K VYSÍLÁNÍ, jinak "info". Výchozí "info". */
  tone?: 'info' | 'error';
  /** Text stavu. Popisuje, co obsluha má udělat. */
  children?: React.ReactNode;
}
export function BroadcastStatus(props: BroadcastStatusProps): JSX.Element;
