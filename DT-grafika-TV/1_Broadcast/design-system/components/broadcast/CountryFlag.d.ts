/** Česká vlajka jako čistá CSS geometrie — jiné země používají pouze textový kód. */
export interface CountryFlagProps {
  /** Kód země. Vlajka se vykreslí pouze pro "CZE"; ostatní vrací null. */
  code?: string;
}
export function CountryFlag(props: CountryFlagProps): JSX.Element | null;
