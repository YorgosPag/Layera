import React from 'react';
import { Box } from '@layera/layout';
import { useLayeraTranslation } from '@layera/tolgee';
import './FormSection.css';

export interface FormSectionProps {
  children: React.ReactNode;
  title?: string;
  titleKey?: string;
  description?: string;
  descriptionKey?: string;
  icon?: React.ReactNode;
  className?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
  children,
  title,
  titleKey,
  description,
  descriptionKey,
  icon,
  className = '',
  collapsible = false,
  defaultCollapsed = false
}) => {
  const { t } = useLayeraTranslation();
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  const resolvedTitle = titleKey ? t(titleKey) : title;
  const resolvedDescription = descriptionKey ? t(descriptionKey) : description;

  const sectionClasses = [
    'layera-form-section',
    collapsible && 'layera-form-section--collapsible',
    isCollapsed && 'layera-form-section--collapsed',
    className
  ].filter(Boolean).join(' ');

  const handleToggle = (): void => {
    if (collapsible) {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <Box className={sectionClasses}>
      {(resolvedTitle || icon) && (
        <Box
          className="layera-form-section__header"
          onClick={handleToggle}
          role={collapsible ? 'button' : undefined}
          tabIndex={collapsible ? 0 : undefined}
          aria-expanded={collapsible ? !isCollapsed : undefined}
        >
          {icon && (
            <Box className="layera-form-section__icon">
              {icon}
            </Box>
          )}

          <Box className="layera-form-section__header-content">
            {resolvedTitle && (
              <h3 className="layera-form-section__title">
                {resolvedTitle}
              </h3>
            )}

            {resolvedDescription && (
              <p className="layera-form-section__description">
                {resolvedDescription}
              </p>
            )}
          </Box>

          {collapsible && (
            <Box className="layera-form-section__toggle">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="layera-form-section__chevron"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Box>
          )}
        </Box>
      )}

      <Box className="layera-form-section__content">
        {children}
      </Box>
    </Box>
  );
};