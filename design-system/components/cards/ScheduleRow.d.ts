export interface ScheduleRowProps {
  time: string;
  title: string;
  detail?: string;
  status?: 'live' | 'soon' | 'done';
  /** Adds the left red accent bar for the currently-running item. */
  now?: boolean;
}
