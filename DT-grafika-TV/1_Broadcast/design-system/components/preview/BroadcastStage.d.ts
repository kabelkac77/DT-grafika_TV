/**
 * Pracovní plátno 1920 × 1080, škálované jako celek do šířky kontejneru. Obsahuje pozadí náhledu,
 * kontrolu bezpečných okrajů a samotnou grafiku. Plátno ani ovládání nejsou součástí vysílaného obrazu.
 */
export interface BroadcastStageProps {
  /** Pozadí náhledu: závodní záběr, neutrální plocha pro vstupy, světlá, tmavá nebo průhledné okolí. Výchozí "race". */
  background?: 'race' | 'neutral' | 'light' | 'dark' | 'transparent';
  /** Vykreslit vodicí bezpečné okraje (54 px / 96 px). Výchozí false. */
  safeArea?: boolean;
  /** Grafika na plátně — typicky <RiderCard />. */
  children?: React.ReactNode;
}
export function BroadcastStage(props: BroadcastStageProps): JSX.Element;
