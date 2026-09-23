/** Obslužný panel náhledu — přepínače rozložení, dat, pozadí a viditelnosti karty. Nikdy se nevysílá. */
export interface PreviewSelectField {
  id: string;
  label: string;
  value: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
}
export interface PreviewToggle {
  id: string;
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}
export interface PreviewControlsProps {
  /** Rozbalovací přepínače (rozložení, ukázková data, pozadí). */
  fields?: PreviewSelectField[];
  /** Zaškrtávací přepínače (portrét, bezpečné okraje, vlajka). */
  toggles?: PreviewToggle[];
  /** Hlavní akce panelu — typicky skrytí a zobrazení karty. */
  action?: { label: string; onClick: () => void };
  /** Vlastní doplňková pole. */
  children?: React.ReactNode;
}
export function PreviewControls(props: PreviewControlsProps): JSX.Element;
