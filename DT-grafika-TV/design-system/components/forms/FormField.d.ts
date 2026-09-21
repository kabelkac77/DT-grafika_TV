export interface FormFieldProps {
  label: string;
  required?: boolean;
  type?: 'text' | 'email' | 'number' | 'select' | 'textarea';
  placeholder?: string;
  value?: string;
  /** Options for type="select". */
  options?: string[];
  hint?: string;
  /** Error text — always paired with the icon, never colour alone. */
  error?: string;
  id?: string;
}
