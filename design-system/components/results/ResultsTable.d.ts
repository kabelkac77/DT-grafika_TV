export interface ResultRow {
  bib: number | string;
  name: string;
  team?: string;
  category: string;
  time?: string;
  gap?: string;
  dnf?: boolean;
}
export interface ResultsTableProps {
  /** e.g. "Elite muži, finále, SVDT 2026" — screen readers rely on this to identify the data. */
  caption?: string;
  rows: ResultRow[];
}
