import React, { useState } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { EyeIcon, EyeOffIcon, CopyIcon } from '@layera/icons';

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

  // Copy All Tables function
  const copyAllTables = async () => {
    try {
      // Συλλογή όλων των δεδομένων από όλες τις κατηγορίες
      let allTablesText = '';

      categories.forEach((category) => {
        allTablesText += `\n=== ${category.title} ===\n`;
        allTablesText += 'Category\tCSS Variable\tSelector\tHTML Attribute\tCurrent Value\n';

        category.variables.forEach((variable) => {
          allTablesText += `${variable.category}\t${variable.cssVariable}\t${variable.selector}\t${variable.htmlAttribute}\t${variable.currentValue}\n`;
        });
        allTablesText += '\n';
      });

      await navigator.clipboard.writeText(allTablesText);
      console.log('✅ Αντιγραφή όλων των πινάκων ολοκληρώθηκε επιτυχώς!');
    } catch (err) {
      console.error('Αποτυχία αντιγραφής πινάκων:', err);
    }
  };

  return (
    <>
      {/* CSS Styles για το compact table */}
      <style>{`
        .layera-width--80 { width: var(--layera-spacing-80); }
        .layera-table-compact {
          line-height: 0.9;
        }

        .layera-table-compact th,
        .layera-table-compact td {
          vertical-align: middle;
          padding-top: 0px !important;
          padding-bottom: 0px !important;
          height: 20px;
        }

        .layera-table-compact .layera-typography {
          line-height: 0.9;
          margin: 0 !important;
        }
      `}</style>

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
                <table className="layera-table layera-table-compact layera-width--full layera-border--solid layera-border-width--1 layera-border-color--secondary layera-border-radius--md">
                  <colgroup>
                    <col className="layera-width--80" />
                    <col className="layera-width--80" />
                    <col className="layera-width--80" />
                    <col className="layera-width--80" />
                    <col className="layera-width--80" />
                  </colgroup>
                  <thead className="layera-bg--surface-secondary">
                    <tr className="layera-bg--surface-secondary">
                      <th className="layera-padding--sm layera-text-align--left layera-border--solid layera-border-width--1 layera-border-color--primary">
                        <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">Category</Text>
                      </th>
                      <th className="layera-padding--sm layera-text-align--left layera-border--solid layera-border-width--1 layera-border-color--primary">
                        <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">CSS Variable</Text>
                      </th>
                      <th className="layera-padding--sm layera-text-align--left layera-border--solid layera-border-width--1 layera-border-color--primary">
                        <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">Selector</Text>
                      </th>
                      <th className="layera-padding--sm layera-text-align--left layera-border--solid layera-border-width--1 layera-border-color--primary">
                        <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">HTML Attribute</Text>
                      </th>
                      <th className="layera-padding--sm layera-text-align--left layera-border--solid layera-border-width--1 layera-border-color--primary">
                        <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="primary">Current Value</Text>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.variables.map((variable, index) => (
                      <tr key={index}>
                        <td className="layera-padding--sm layera-border--solid layera-border-width--1 layera-border-color--primary">
                          <Text className="layera-typography" data-size="sm" data-color="secondary">{variable.category}</Text>
                        </td>
                        <td className="layera-padding--sm layera-border--solid layera-border-width--1 layera-border-color--primary">
                          <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">{variable.cssVariable}</Text>
                        </td>
                        <td className="layera-padding--sm layera-border--solid layera-border-width--1 layera-border-color--primary">
                          <Text className="layera-typography" data-size="sm" data-color="secondary">{variable.selector}</Text>
                        </td>
                        <td className="layera-padding--sm layera-border--solid layera-border-width--1 layera-border-color--primary">
                          <Text className="layera-typography" data-size="sm" data-color="secondary">{variable.htmlAttribute}</Text>
                        </td>
                        <td className="layera-padding--sm layera-border--solid layera-border-width--1 layera-border-color--primary">
                          <Text className="layera-typography" data-size="sm" data-weight="bold" data-color="success">{variable.currentValue}</Text>
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

      {/* Copy All Tables Button */}
      <Box className="layera-margin-top--lg layera-text-center layera-padding--lg">
        <Text className="layera-typography layera-margin-bottom--md" data-size="sm" data-color="secondary">
          💡 Αυτές είναι όλες οι CSS μεταβλητές που επηρεάζουν το component
        </Text>
        <Button
          variant="primary"
          size="lg"
          icon={<CopyIcon size="md" />}
          onClick={copyAllTables}
          className="layera-button layera-button--lg layera-button--primary layera-shadow--md"
        >
          📋 Αντιγραφή όλων των πινάκων
        </Button>
      </Box>
    </Box>
    </>
  );
};