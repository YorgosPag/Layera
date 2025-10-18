import React from 'react';
import './FormActions.css';

export interface FormActionsProps {
  children: React.ReactNode;
  align?: 'left' | 'center' | 'right' | 'space-between';
  className?: string;
  sticky?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({
  children,
  align = 'right',
  className = '',
  sticky = false
}) => {
  const actionsClasses = [
    'layera-form-actions',
    `layera-form-actions--${align}`,
    sticky && 'layera-form-actions--sticky',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={actionsClasses}>
      <div className="layera-form-actions__content">
        {children}
      </div>
    </div>
  );
};