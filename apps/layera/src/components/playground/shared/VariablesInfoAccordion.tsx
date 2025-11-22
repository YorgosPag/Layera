import React, { useState } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { EyeIcon, EyeOffIcon } from '@layera/icons';

// Types για το reusable component
export interface VariableInfo {
  category: string;
  cssVariable: string;
  selector: string;
  htmlAttribute: string;
  currentValue: string;
  borderColor?: 'info' | 'success' | 'warning' | 'danger' | 'primary' | 'secondary';
}

export interface CategoryInfo {
  id: string;
  title: string;
  icon?: React.ReactNode;
  variableCount: number;
  variables: VariableInfo[];
}

export interface VariablesInfoAccordionProps {
  categories: CategoryInfo[];
  defaultExpandedCategory?: string;
}

export const VariablesInfoAccordion: React.FC<VariablesInfoAccordionProps> = ({
  categories,
  defaultExpandedCategory
}) => {
  // Dynamic accordion state based on provided categories
  const initialState = categories.reduce((acc, category) => {
    acc[category.id] = category.id === defaultExpandedCategory;
    return acc;
  }, {} as Record<string, boolean>);

  const [expandedCategories, setExpandedCategories] = useState(initialState);

  // Toggle individual category
  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  };

  // Toggle all accordions
  const toggleAllAccordions = () => {
    const allExpanded = Object.values(expandedCategories).every(expanded => expanded);

    const newState = categories.reduce((acc, category) => {
      acc[category.id] = !allExpanded;
      return acc;
    }, {} as Record<string, boolean>);

    setExpandedCategories(newState);
  };

  return (
    <Box className="layera-space-y--md">
      {/* Toggle All Button */}
      <Box className="layera-display--flex layera-justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleAllAccordions}
          className="layera-transition--all layera-duration--200"
        >
          {Object.values(expandedCategories).every(expanded => expanded) ? (
            <><EyeOffIcon size="sm" /> Κλείσιμο όλων των ακορντεόν</>
          ) : (
            <><EyeIcon size="sm" /> Άνοιγμα όλων των ακορντεόν</>
          )}
        </Button>
      </Box>

      {/* Accordion Sections */}
      {categories.map((category) => (
        <Box key={category.id} className="layera-border--solid layera-border-width--1 layera-border-color--primary layera-border-radius--md">
          <Box
            className="layera-padding--md layera-cursor--pointer layera-bg--surface-primary layera-border-bottom--dashed layera-border-width--1 layera-border-color--primary"
            onClick={() => toggleCategory(category.id)}
          >
            <Box className="layera-display--flex layera-items-center layera-justify-between">
              <Text className="layera-typography" data-size="md" data-weight="bold" data-color="primary">
                {category.icon} {category.title} ({category.variableCount} μεταβλητές)
              </Text>
              <Text className="layera-typography" data-size="lg" data-color="primary">
                {expandedCategories[category.id] ? '▼' : '▶'}
              </Text>
            </Box>
          </Box>

          {expandedCategories[category.id] && (
            <Box className="layera-padding--md">
              <Box className="layera-overflow--auto">
                <table className="layera-width--full layera-border-collapse--collapse">
                  <thead>
                    <tr className={`layera-border-bottom--dashed layera-border-width--1 layera-border-color--${category.variables[0]?.borderColor || 'primary'}`}>
                      <th className={`layera-padding--sm layera-text-align--left layera-border-right--dashed layera-border-width--1 layera-border-color--${category.variables[0]?.borderColor || 'primary'}`}>
                        <Text className="layera-typography" data-size="xs" data-weight="bold" data-color="primary">Κατηγορία</Text>
                      </th>
                      <th className={`layera-padding--sm layera-text-align--left layera-border-right--dashed layera-border-width--1 layera-border-color--${category.variables[0]?.borderColor || 'primary'}`}>
                        <Text className="layera-typography" data-size="xs" data-weight="bold" data-color="primary">CSS Variable</Text>
                      </th>
                      <th className={`layera-padding--sm layera-text-align--left layera-border-right--dashed layera-border-width--1 layera-border-color--${category.variables[0]?.borderColor || 'primary'}`}>
                        <Text className="layera-typography" data-size="xs" data-weight="bold" data-color="primary">Selector</Text>
                      </th>
                      <th className={`layera-padding--sm layera-text-align--left layera-border-right--dashed layera-border-width--1 layera-border-color--${category.variables[0]?.borderColor || 'primary'}`}>
                        <Text className="layera-typography" data-size="xs" data-weight="bold" data-color="primary">HTML Attribute</Text>
                      </th>
                      <th className="layera-padding--sm layera-text-align--left">
                        <Text className="layera-typography" data-size="xs" data-weight="bold" data-color="primary">Τρέχουσα Τιμή</Text>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.variables.map((variable, index) => (
                      <tr key={index} className={`layera-border-bottom--dashed layera-border-width--1 layera-border-color--${variable.borderColor || 'primary'}`}>
                        <td className={`layera-padding--sm layera-border-right--dashed layera-border-width--1 layera-border-color--${variable.borderColor || 'primary'}`}>
                          <Text className="layera-typography" data-size="xs" data-weight="bold" data-color="primary">{variable.category}</Text>
                        </td>
                        <td className={`layera-padding--sm layera-border-right--dashed layera-border-width--1 layera-border-color--${variable.borderColor || 'primary'}`}>
                          <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="info">{variable.cssVariable}</Text>
                        </td>
                        <td className={`layera-padding--sm layera-border-right--dashed layera-border-width--1 layera-border-color--${variable.borderColor || 'primary'}`}>
                          <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">{variable.selector}</Text>
                        </td>
                        <td className={`layera-padding--sm layera-border-right--dashed layera-border-width--1 layera-border-color--${variable.borderColor || 'primary'}`}>
                          <Text className="layera-typography" data-size="xs" data-weight="mono" data-color="secondary">{variable.htmlAttribute}</Text>
                        </td>
                        <td className="layera-padding--sm">
                          <Text className="layera-typography" data-size="xs" data-weight="bold" data-color="success">{variable.currentValue}</Text>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Box>
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};