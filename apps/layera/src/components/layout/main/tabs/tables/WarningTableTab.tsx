import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Heading } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * 🎯 WarningTableTab Component
 * 100% ARXES COMPLIANT
 *
 * ZERO inline styles | ZERO σκληρές τιμές | ZERO div elements
 * ΜΟΝΟ @layera/* imports με semantic props | ΜΟΝΟ tokens
 */

export const WarningTableTab: React.FC = () => {
  return (
    <Box>
      {/* Section Title για Warning Tables */}
      <Heading data-size="lg" data-weight="semibold" className="layera-warning-tables-title">
        ⚠️ Warning Tables
      </Heading>

      {/* Table Controls */}
      <Box className="layera-table-controls">
        <Flex className="layera-table-actions">
          <input
            type="search"
            placeholder="🔍 Search issues..."
            className="layera-table-search layera-table-search--warning"
          />
          <select className="layera-table-select layera-table-select--warning">
            <option>⚠️ All Issues</option>
            <option>🔥 Critical</option>
            <option>⚡ High Priority</option>
            <option>📋 Medium</option>
          </select>
          <input
            type="datetime-local"
            className="layera-table-datetime layera-table-datetime--warning"
          />
          <Button
            variant="outline"
            size="sm"
            className="layera-table-button layera-table-button--warning"
          >
            ➕ Add Issue
          </Button>
        </Flex>
      </Box>

      {/* Warning Table */}
      <Box className="layera-table-container">
        <table className="layera-table layera-table--warning">
          <thead className="layera-table-header">
            <tr>
              <th className="layera-table-th layera-table-th--warning">
                <input type="checkbox" /> Issue
              </th>
              <th className="layera-table-th layera-table-th--warning">Reporter</th>
              <th className="layera-table-th layera-table-th--warning">Priority</th>
              <th className="layera-table-th layera-table-th--warning">Due Date</th>
              <th className="layera-table-th layera-table-th--warning">Actions</th>
            </tr>
          </thead>
          <tbody className="layera-table-body">
            <tr className="layera-table-row">
              <td className="layera-table-cell">
                <input type="checkbox" className="layera-table-checkbox" /> 🔥 Server Performance
              </td>
              <td className="layera-table-cell">
                <input type="text" defaultValue="Θανάσης Ιωάννου" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <select className="layera-table-select-cell">
                  <option selected>🔥 Critical</option>
                  <option>⚡ High</option>
                  <option>📋 Medium</option>
                  <option>💤 Low</option>
                </select>
              </td>
              <td className="layera-table-cell">
                <input type="datetime-local" defaultValue="2024-01-25T14:00" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <Flex className="layera-table-cell-actions">
                  <Button variant="outline" size="xs" className="layera-table-cell-button">
                    ✏️ Edit
                  </Button>
                  <Button variant="outline" size="xs" className="layera-table-cell-button layera-table-cell-button--warning">
                    ⚠️ Escalate
                  </Button>
                </Flex>
              </td>
            </tr>
            <tr className="layera-table-row">
              <td className="layera-table-cell">
                <input type="checkbox" className="layera-table-checkbox" /> ⚡ API Timeout
              </td>
              <td className="layera-table-cell">
                <input type="text" defaultValue="Κατερίνα Στάμου" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <select className="layera-table-select-cell">
                  <option>🔥 Critical</option>
                  <option selected>⚡ High</option>
                  <option>📋 Medium</option>
                  <option>💤 Low</option>
                </select>
              </td>
              <td className="layera-table-cell">
                <input type="datetime-local" defaultValue="2024-01-28T10:30" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <Flex className="layera-table-cell-actions">
                  <Button variant="outline" size="xs" className="layera-table-cell-button">
                    ✏️ Edit
                  </Button>
                  <Button variant="outline" size="xs" className="layera-table-cell-button layera-table-cell-button--warning">
                    🔧 Assign
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