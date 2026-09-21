export interface CardProps {
  variant?: 'basic' | 'media' | 'spot';
  /** Eyebrow label, basic variant only. */
  label?: string;
  title: string;
  children: React.ReactNode;
  /** Pill badge over the media variant's image area. */
  tag?: string;
  /** Number shown in the spot variant's numbered badge. */
  number?: number | string;
  href?: string;
  onClick?: () => void;
}
