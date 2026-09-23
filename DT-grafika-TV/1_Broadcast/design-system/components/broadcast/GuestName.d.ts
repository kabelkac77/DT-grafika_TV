/** Jméno hosta na jednom řádku — poslední slovo se sází verzálkami a weight 900 jako příjmení. */
export interface GuestNameProps {
  /** Celé jméno, např. "Jan Novák". Zachovat diakritiku. Prázdné jméno nevykreslí nic. */
  name?: string;
}
export function GuestName(props: GuestNameProps): JSX.Element | null;
