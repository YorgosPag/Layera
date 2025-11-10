declare module '@layera/forms' {
  import { ReactNode } from 'react';

  export interface FormFieldProps {
    label?: string;
    description?: string;
    required?: boolean;
    error?: string;
    children: ReactNode;
    className?: string;
  }

  export interface InputProps {
    type?: string;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'solid' | 'outline' | 'ghost';
    className?: string;
    style?: React.CSSProperties;
    onFocus?: () => void;
    disabled?: boolean;
  }

  export interface TextAreaProps {
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'solid' | 'outline' | 'ghost';
    className?: string;
    style?: React.CSSProperties;
    rows?: number;
  }

  export interface FormActionsProps {
    children: ReactNode;
    className?: string;
  }

  export interface FormSectionProps {
    title?: string;
    description?: string;
    children: ReactNode;
    className?: string;
    style?: React.CSSProperties;
  }

  export const FormField: React.FC<FormFieldProps>;
  export const Input: React.FC<InputProps>;
  export const TextArea: React.FC<TextAreaProps>;
  export const FormActions: React.FC<FormActionsProps>;
  export const FormSection: React.FC<FormSectionProps>;
}