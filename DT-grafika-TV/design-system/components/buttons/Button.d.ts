export interface ButtonProps {
  /** Pill family (header/hero): primary, secondary, ghost, quiet. Block family (section CTAs, sharp corners): block, block-outline. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'quiet' | 'block' | 'block-outline';
  size?: 'sm' | 'default' | 'lg';
  disabled?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  /** Renders an <a> instead of a <button> when provided. */
  href?: string;
}
