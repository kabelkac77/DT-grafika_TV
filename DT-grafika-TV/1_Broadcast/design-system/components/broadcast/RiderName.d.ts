/** Jméno a příjmení na jednom řádku; příjmení verzálkami a weight 900, jméno regular. */
export interface RiderNameProps {
  /** Jméno. Zachovat diakritiku. */
  first?: string;
  /** Příjmení — výraznější úroveň. */
  last?: string;
}
export function RiderName(props: RiderNameProps): JSX.Element;
