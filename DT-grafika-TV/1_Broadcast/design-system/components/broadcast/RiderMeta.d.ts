/** Druhá informační úroveň karty — země s vlajkou, tým, kategorie, oddělené hairline separátory. */
export interface RiderMetaProps {
  /** Kód země (např. "CZE"). Prázdné pole se skryje bez prázdného oddělovače. */
  country?: string;
  /** Tým — sekundární informace, může zabrat více řádků. */
  team?: string;
  /** Kategorie (např. "Elite", "Ženy", "Masters"). */
  category?: string;
  /** Zobrazit dostupnou vlajku vedle kódu země. Výchozí true. */
  showFlag?: boolean;
  /** Pořadí údajů. Varianta A: country, team, category. Varianta B: country, category, team. */
  order?: Array<'country' | 'team' | 'category'>;
}
export function RiderMeta(props: RiderMetaProps): JSX.Element | null;
