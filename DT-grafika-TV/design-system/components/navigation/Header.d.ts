export interface HeaderNavItem { label: string; href: string; }
export interface HeaderProps {
  items: HeaderNavItem[];
  activeHref?: string;
  ctaLabel?: string;
  ctaHref?: string;
  lang?: string;
}
