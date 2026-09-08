export interface FooterColumn { title: string; links: { label: string; href: string }[]; }
export interface FooterProps {
  columns: FooterColumn[];
  bottomLeft?: string;
  bottomRight?: string;
}
