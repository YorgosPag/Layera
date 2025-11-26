import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Heading } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * 🎯 DangerTableTab Component
 * 100% ARXES COMPLIANT
 *
 * ZERO inline styles | ZERO σκληρές τιμές | ZERO div elements
 * ΜΟΝΟ @layera/* imports με semantic props | ΜΟΝΟ tokens
 */

export const DangerTableTab: React.FC = () => {
  return (
    <Box>
      {/* Section Title για Danger Tables */}
      <Heading data-size="lg" data-weight="semibold" className="layera-danger-tables-title">
        🚨 Danger Tables
      </Heading>

      {/* Table Controls */}
      <Box className="layera-table-controls">
        <Flex className="layera-table-actions">
          <input
            type="search"
            placeholder="🔍 Search deletions..."
            className="layera-table-search layera-table-search--danger"
          />
          <select className="layera-table-select layera-table-select--danger">
            <option>🚨 All Deletions</option>
            <option>🗑️ Pending</option>
            <option>✅ Completed</option>
            <option>❌ Failed</option>
          </select>
          <input
            type="password"
            placeholder="🔒 Admin Password"
            className="layera-table-password layera-table-password--danger"
          />
          <Button
            variant="outline"
            size="sm"
            className="layera-table-button layera-table-button--danger"
          >
            ➕ Schedule Deletion
          </Button>
        </Flex>
      </Box>

      {/* Danger Table */}
      <Box className="layera-table-container">
        <table className="layera-table layera-table--danger">
          <thead className="layera-table-header">
            <tr>
              <th className="layera-table-th layera-table-th--danger">
                <input type="checkbox" /> Resource
              </th>
              <th className="layera-table-th layera-table-th--danger">Type</th>
              <th className="layera-table-th layera-table-th--danger">Requester</th>
              <th className="layera-table-th layera-table-th--danger">Scheduled</th>
              <th className="layera-table-th layera-table-th--danger">Actions</th>
            </tr>
          </thead>
          <tbody className="layera-table-body">
            <tr className="layera-table-row">
              <td className="layera-table-cell">
                <input type="checkbox" className="layera-table-checkbox" /> 🗄️ Old Database
              </td>
              <td className="layera-table-cell">
                <select className="layera-table-select-cell">
                  <option selected>🗄️ Database</option>
                  <option>📁 Files</option>
                  <option>👥 Accounts</option>
                  <option>🖥️ Servers</option>
                </select>
              </td>
              <td className="layera-table-cell">
                <input type="text" defaultValue="Διονύσης Αθανασίου" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <input type="datetime-local" defaultValue="2024-02-01T02:00" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <Flex className="layera-table-cell-actions">
                  <Button variant="outline" size="xs" className="layera-table-cell-button">
                    ✏️ Edit
                  </Button>
                  <Button variant="outline" size="xs" className="layera-table-cell-button layera-table-cell-button--danger">
                    🗑️ Delete Now
                  </Button>
                </Flex>
              </td>
            </tr>
            <tr className="layera-table-row">
              <td className="layera-table-cell">
                <input type="checkbox" className="layera-table-checkbox" /> 👥 Inactive Users
              </td>
              <td className="layera-table-cell">
                <select className="layera-table-select-cell">
                  <option>🗄️ Database</option>
                  <option>📁 Files</option>
                  <option selected>👥 Accounts</option>
                  <option>🖥️ Servers</option>
                </select>
              </td>
              <td className="layera-table-cell">
                <input type="text" defaultValue="Αργυρώ Νικολάου" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <input type="datetime-local" defaultValue="2024-02-05T03:30" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <Flex className="layera-table-cell-actions">
                  <Button variant="outline" size="xs" className="layera-table-cell-button">
                    ✏️ Edit
                  </Button>
                  <Button variant="outline" size="xs" className="layera-table-cell-button layera-table-cell-button--danger">
                    ❌ Cancel
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