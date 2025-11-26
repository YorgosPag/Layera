import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Heading } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * 🎯 PrimaryTableTab Component
 * 100% ARXES COMPLIANT
 *
 * ZERO inline styles | ZERO σκληρές τιμές | ZERO div elements
 * ΜΟΝΟ @layera/* imports με semantic props | ΜΟΝΟ tokens
 */

export const PrimaryTableTab: React.FC = () => {
  return (
    <Box>
      {/* Section Title για Primary Tables */}
      <Heading data-size="lg" data-weight="semibold" className="layera-primary-tables-title">
        📋 Primary Tables
      </Heading>

      {/* Primary Table Card - ΜΟΝΟ PRIMARY */}
      <Box className="layera-table-section">
        <Box className="layera-table-controls">
          <Flex className="layera-table-actions">
            <input
              type="search"
              placeholder="🔍 Search users..."
              className="layera-table-search layera-table-search--primary"
            />
            <select className="layera-table-select layera-table-select--primary">
              <option>📊 All Status</option>
              <option>✅ Active</option>
              <option>⏳ Pending</option>
              <option>❌ Inactive</option>
            </select>
            <input
              type="date"
              className="layera-table-date layera-table-date--primary"
            />
            <Button
              variant="primary"
              size="sm"
              className="layera-table-button layera-table-button--primary"
            >
              ➕ Add User
            </Button>
          </Flex>
        </Box>

        <table className="layera-simple-table layera-simple-table--primary">
          <thead>
            <tr className="layera-table-header-row layera-table-header-row--primary">
              <th className="layera-table-th">
                <input type="checkbox" /> Όνομα
              </th>
              <th className="layera-table-th">Email</th>
              <th className="layera-table-th">Status</th>
              <th className="layera-table-th">Date Added</th>
              <th className="layera-table-th">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="layera-table-row">
              <td className="layera-table-cell">
                <input type="checkbox" className="layera-table-checkbox" /> Γιάννης Παπαδόπουλος
              </td>
              <td className="layera-table-cell">
                <input type="email" defaultValue="yannis@example.com" className="layera-table-cell-input" />
              </td>
              <td className="layera-table-cell">
                <select className="layera-table-cell-select">
                  <option selected>✅ Active</option>
                  <option>⏳ Pending</option>
                  <option>❌ Inactive</option>
                </select>
              </td>
              <td className="layera-table-cell">
                <input type="date" defaultValue="2024-01-15" className="layera-table-cell-input" />
              </td>
              <td className="layera-table-cell">
                <Button variant="primary" size="xs">✏️ Edit</Button>
                <Button variant="outline" size="xs">🗑️</Button>
              </td>
            </tr>
            <tr className="layera-table-row">
              <td className="layera-table-cell">
                <input type="checkbox" className="layera-table-checkbox" /> Μαρία Δημητρίου
              </td>
              <td className="layera-table-cell">
                <input type="email" defaultValue="maria@example.com" className="layera-table-cell-input" />
              </td>
              <td className="layera-table-cell">
                <select className="layera-table-cell-select">
                  <option>✅ Active</option>
                  <option selected>⏳ Pending</option>
                  <option>❌ Inactive</option>
                </select>
              </td>
              <td className="layera-table-cell">
                <input type="date" defaultValue="2024-01-20" className="layera-table-cell-input" />
              </td>
              <td className="layera-table-cell">
                <Button variant="primary" size="xs">✏️ Edit</Button>
                <Button variant="outline" size="xs">🗑️</Button>
              </td>
            </tr>
            <tr className="layera-table-row">
              <td className="layera-table-cell">
                <input type="checkbox" className="layera-table-checkbox" /> Κώστας Αντωνίου
              </td>
              <td className="layera-table-cell">
                <input type="email" defaultValue="kostas@example.com" className="layera-table-cell-input" />
              </td>
              <td className="layera-table-cell">
                <select className="layera-table-cell-select">
                  <option>✅ Active</option>
                  <option>⏳ Pending</option>
                  <option selected>❌ Inactive</option>
                </select>
              </td>
              <td className="layera-table-cell">
                <input type="date" defaultValue="2024-01-10" className="layera-table-cell-input" />
              </td>
              <td className="layera-table-cell">
                <Button variant="primary" size="xs">✏️ Edit</Button>
                <Button variant="outline" size="xs">🗑️</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
    </Box>
  );
};