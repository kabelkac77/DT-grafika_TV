export interface PartnerWallProps {
  tier?: 'general' | 'main' | 'support' | 'media';
  label: string;
  sublabel?: string;
  /** Partner names/logos — inside a tier, order alphabetically, never by contract value. */
  partners: string[];
}
