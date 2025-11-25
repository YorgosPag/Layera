import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Heading } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * 🎯 InfoTableTab Component
 * 100% ARXES COMPLIANT
 *
 * ZERO inline styles | ZERO σκληρές τιμές | ZERO div elements
 * ΜΟΝΟ @layera/* imports με semantic props | ΜΟΝΟ tokens
 */

export const InfoTableTab: React.FC = () => {
  return (
    <Box>
      {/* Section Title για Info Tables */}
      <Heading data-size="lg" data-weight="semibold" className="layera-info-tables-title">
        ℹ️ Info Tables
      </Heading>

      {/* Table Controls */}
      <Box className="layera-table-controls">
        <Flex className="layera-table-actions">
          <input
            type="search"
            placeholder="🔍 Search documentation..."
            className="layera-table-search layera-table-search--info"
          />
          <select className="layera-table-select layera-table-select--info">
            <option>📚 All Categories</option>
            <option>🚀 Getting Started</option>
            <option>🔧 API Reference</option>
            <option>🐛 Troubleshooting</option>
          </select>
          <input
            type="url"
            placeholder="🌐 External URL"
            className="layera-table-url layera-table-url--info"
          />
          <Button
            variant="outline"
            size="sm"
            className="layera-table-button layera-table-button--info"
          >
            ➕ Add Resource
          </Button>
        </Flex>
      </Box>

      {/* Info Table */}
      <Box className="layera-table-container">
        <table className="layera-table layera-table--info">
          <thead className="layera-table-header">
            <tr>
              <th className="layera-table-th layera-table-th--info">
                <input type="checkbox" /> Document
              </th>
              <th className="layera-table-th layera-table-th--info">Category</th>
              <th className="layera-table-th layera-table-th--info">Author</th>
              <th className="layera-table-th layera-table-th--info">Last Updated</th>
              <th className="layera-table-th layera-table-th--info">Actions</th>
            </tr>
          </thead>
          <tbody className="layera-table-body">
            <tr className="layera-table-row">
              <td className="layera-table-cell">
                <input type="checkbox" className="layera-table-checkbox" /> 📖 API Documentation
              </td>
              <td className="layera-table-cell">
                <select className="layera-table-select-cell">
                  <option>🚀 Getting Started</option>
                  <option selected>🔧 API Reference</option>
                  <option>🐛 Troubleshooting</option>
                  <option>💡 Best Practices</option>
                </select>
              </td>
              <td className="layera-table-cell">
                <input type="text" defaultValue="Χρήστος Αλεξάνδρου" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <input type="date" defaultValue="2024-01-22" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <Flex className="layera-table-cell-actions">
                  <Button variant="outline" size="xs" className="layera-table-cell-button">
                    ✏️ Edit
                  </Button>
                  <Button variant="outline" size="xs" className="layera-table-cell-button layera-table-cell-button--info">
                    📖 View
                  </Button>
                </Flex>
              </td>
            </tr>
            <tr className="layera-table-row">
              <td className="layera-table-cell">
                <input type="checkbox" className="layera-table-checkbox" /> 🚀 Quick Start Guide
              </td>
              <td className="layera-table-cell">
                <select className="layera-table-select-cell">
                  <option selected>🚀 Getting Started</option>
                  <option>🔧 API Reference</option>
                  <option>🐛 Troubleshooting</option>
                  <option>💡 Best Practices</option>
                </select>
              </td>
              <td className="layera-table-cell">
                <input type="text" defaultValue="Μαρία Θεοδώρου" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <input type="date" defaultValue="2024-01-18" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <Flex className="layera-table-cell-actions">
                  <Button variant="outline" size="xs" className="layera-table-cell-button">
                    ✏️ Edit
                  </Button>
                  <Button variant="outline" size="xs" className="layera-table-cell-button layera-table-cell-button--info">
                    🌐 Open
                  </Button>
                </Flex>
              </td>
            </tr>
            <tr className="layera-table-row">
              <td className="layera-table-cell">
                <input type="checkbox" className="layera-table-checkbox" /> 🐛 Common Issues
              </td>
              <td className="layera-table-cell">
                <select className="layera-table-select-cell">
                  <option>🚀 Getting Started</option>
                  <option>🔧 API Reference</option>
                  <option selected>🐛 Troubleshooting</option>
                  <option>💡 Best Practices</option>
                </select>
              </td>
              <td className="layera-table-cell">
                <input type="text" defaultValue="Παναγιώτης Δημητρακόπουλος" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <input type="date" defaultValue="2024-01-20" className="layera-table-input" />
              </td>
              <td className="layera-table-cell">
                <Flex className="layera-table-cell-actions">
                  <Button variant="outline" size="xs" className="layera-table-cell-button">
                    ✏️ Edit
                  </Button>
                  <Button variant="outline" size="xs" className="layera-table-cell-button layera-table-cell-button--info">
                    💬 Discuss
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