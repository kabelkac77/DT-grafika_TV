/**
 * G04 — kompaktní čas jízdy vpravo dole. Tichý trvalý překryv, rovná levá hrana, bez reliéfu.
 * Absolutně pozicovaná na plátně 1920 × 1080 (96 px zprava, 80 px zdola, 344 × 112 px).
 */
export interface TimerCardProps {
  /** Čas ve tvaru "1:23.456" (nejvýše "99:59.999"). Neplatný zápis kartu skryje. Čas sám neběží. */
  time?: string;
  /** Popisek nad časem. Výchozí "ČAS JÍZDY". */
  label?: string;
  /** Fáze animace: čas se jen prolne, nikdy neposune. Čeká na schválení. */
  phase?: 'idle' | 'in' | 'out';
  style?: React.CSSProperties;
}
export function TimerCard(props: TimerCardProps): JSX.Element | null;
