/** Portrét jezdce s měkkým lokálním přechodem do grafitové plochy; číslo leží mimo rameno. */
export interface RiderPortraitProps {
  /** Cesta k portrétu. Bez zdroje se nevykreslí nic — karta pak používá podobu bez portrétu. */
  src?: string;
  /** Alternativní text. */
  alt?: string;
  /** Zavolá se při neplatném obrázku — přepněte kartu do podoby bez portrétu, nikdy nezobrazujte ikonu rozbitého obrázku. */
  onInvalid?: () => void;
}
export function RiderPortrait(props: RiderPortraitProps): JSX.Element | null;
