import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Heading } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * 🎯 SecondaryTableTab Component
 * 100% ARXES COMPLIANT
 *
 * ZERO inline styles | ZERO σκληρές τιμές | ZERO div elements
 * ΜΟΝΟ @layera/* imports με semantic props | ΜΟΝΟ tokens
 */

export const SecondaryTableTab: React.FC = () => {
  return (
    <Box>
      {/* Section Title για Secondary Tables */}
      <Heading data-size="lg" data-weight="semibold" className="layera-secondary-tables-title">
        🗂️ Secondary Tables
      </Heading>

      {/* Table Controls */}
      <Box className="layera-table-controls">
        <Flex className="layera-table-actions">
          <input
            type="search"
            placeholder="🔍 Search departments..."
            className="layera-table-search layera-table-search--secondary"
          />
          <select className="layera-table-select layera-table-select--secondary">
            <option>🏢 All Departments</option>
            <option>💼 Sales</option>
            <option>🔧 Engineering</option>
            <option>📊 Marketing</option>
          </select>
          <input
            type="number"
            placeholder="Budget"
            className="layera-table-number layera-table-number--secondary"
          />
          <Button
            variant="outline"
            size="sm"
            className="layera-table-button layera-table-button--secondary"
          >
            ➕ Add Department
          </Button>
        </Flex>
      </Box>

      {/* Secondary Table */}
      <Box className="layera-table-container">
        <table className="layera-table layera-table--secondary">
          <thead className="layera-table-header">
            <tr>
              <th className="layera-table-th layera-table-th--secondary">
                <input type="checkbox" /> Department
              </th>
              <th className="layera-table-th layera-table-th--secondary">Manager</th>
              <th className="layera-table-th layera-table-th--secondary">Budget</th>
              <th className="layera-table-th layera-table-th--secondary">Team Size</th>
              <th className="layera-table-th layera-table-th--secondary">Actions</th>
            </tr>
          </thead>
          <tbody className="layera-table-body">
            <tr className="layera-table-row">
              <td className="layera-table-cell">
                <input type="checkbox" className="layera-table-checkbox" /> 💼 Sales
              </td>
              <td className="layera-table-cell">
                <input type="text" defaultValue="Αντώνης Μαυρίδης" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <input type="number" defaultValue="150000" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <input type="number" defaultValue="12" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <Flex className="layera-table-cell-actions">
                  <Button variant="outline" size="xs" className="layera-table-cell-button">
                    ✏️ Edit
                  </Button>
                  <Button variant="outline" size="xs" className="layera-table-cell-button layera-table-cell-button--danger">
                    🗑️
                  </Button>
                </Flex>
              </td>
            </tr>
            <tr className="layera-table-row">
              <td className="layera-table-cell">
                <input type="checkbox" className="layera-table-checkbox" /> 🔧 Engineering
              </td>
              <td className="layera-table-cell">
                <input type="text" defaultValue="Σοφία Κωνσταντίνου" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <input type="number" defaultValue="200000" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <input type="number" defaultValue="18" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <Flex className="layera-table-cell-actions">
                  <Button variant="outline" size="xs" className="layera-table-cell-button">
                    ✏️ Edit
                  </Button>
                  <Button variant="outline" size="xs" className="layera-table-cell-button layera-table-cell-button--danger">
                    🗑️
                  </Button>
                </Flex>
              </td>
            </tr>
            <tr className="layera-table-row">
              <td className="layera-table-cell">
                <input type="checkbox" className="layera-table-checkbox" /> 📊 Marketing
              </td>
              <td className="layera-table-cell">
                <input type="text" defaultValue="Δημήτρης Παπαγεωργίου" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <input type="number" defaultValue="80000" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <input type="number" defaultValue="6" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <Flex className="layera-table-cell-actions">
                  <Button variant="outline" size="xs" className="layera-table-cell-button">
                    ✏️ Edit
                  </Button>
                  <Button variant="outline" size="xs" className="layera-table-cell-button layera-table-cell-button--danger">
                    🗑️
                  </Button>
                </Flex>
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Box>
  );
};