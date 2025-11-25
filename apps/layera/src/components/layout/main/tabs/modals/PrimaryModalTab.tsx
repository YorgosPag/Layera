import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Heading } from '@layera/typography';
import { Button } from '@layera/buttons';

/**
 * 🎯 PrimaryModalTab Component
 * 100% ARXES COMPLIANT
 *
 * ZERO inline styles | ZERO σκληρές τιμές | ZERO div elements
 * ΜΟΝΟ @layera/* imports με semantic props | ΜΟΝΟ tokens
 *
 * Ακριβώς όπως το HTML mockup: 6 modal items μαζί σε grid layout
 */

export const PrimaryModalTab: React.FC = () => {
  return (
    <Box>
      {/* Section Title για Primary Modals */}
      <Heading data-size="lg" data-weight="semibold" className="layera-primary-modals-title">
        📋 Primary Modals
      </Heading>

      {/* Modal Items Grid - 6 modal items όπως στο HTML mockup */}
      <Box className="layera-components-grid">

        {/* Primary Modal Item */}
        <Box className="layera-modal-item layera-modal-item--primary">
          <Heading data-size="md" data-weight="medium" className="layera-modal-item-title">
            Primary Modal
          </Heading>
          <input
            type="text"
            placeholder="👤 Full Name"
            className="layera-modal-input layera-modal-input--primary"
          />
          <input
            type="email"
            placeholder="📧 Email"
            className="layera-modal-input layera-modal-input--primary"
          />
          <Flex className="layera-modal-actions">
            <Button variant="primary" size="sm" className="layera-modal-button">
              ✓ Create Account
            </Button>
            <Button variant="outline" size="sm" className="layera-modal-button">
              ✕ Cancel
            </Button>
          </Flex>
        </Box>

        {/* Secondary Modal Item */}
        <Box className="layera-modal-item layera-modal-item--secondary">
          <Heading data-size="md" data-weight="medium" className="layera-modal-item-title">
            Secondary Modal
          </Heading>
          <select className="layera-modal-select layera-modal-select--secondary">
            <option>🏢 Select Department</option>
            <option>💼 Sales</option>
            <option>🔧 Engineering</option>
            <option>📊 Marketing</option>
          </select>
          <input
            type="range"
            min="1"
            max="10"
            className="layera-modal-range"
          />
          <Flex className="layera-modal-actions">
            <Button variant="secondary" size="sm" className="layera-modal-button">
              ✓ Assign
            </Button>
            <Button variant="outline" size="sm" className="layera-modal-button">
              ✕ Cancel
            </Button>
          </Flex>
        </Box>

        {/* Success Modal Item */}
        <Box className="layera-modal-item layera-modal-item--success">
          <Heading data-size="md" data-weight="medium" className="layera-modal-item-title">
            Success Modal
          </Heading>
          <input
            type="number"
            placeholder="💸 Payment Amount"
            className="layera-modal-input layera-modal-input--success"
          />
          <input
            type="text"
            placeholder="💳 Card Number"
            className="layera-modal-input layera-modal-input--success"
          />
          <Flex className="layera-modal-actions">
            <Button variant="primary" size="sm" className="layera-modal-button layera-modal-button--success">
              ✓ Process Payment
            </Button>
            <Button variant="outline" size="sm" className="layera-modal-button">
              ✕ Cancel
            </Button>
          </Flex>
        </Box>

        {/* Warning Modal Item */}
        <Box className="layera-modal-item layera-modal-item--warning">
          <Heading data-size="md" data-weight="medium" className="layera-modal-item-title">
            Warning Modal
          </Heading>
          <textarea
            placeholder="⚠️ Describe the issue..."
            rows={3}
            className="layera-modal-textarea layera-modal-textarea--warning"
          />
          <label className="layera-modal-checkbox-label">
            <input type="checkbox" className="layera-modal-checkbox" />
            Mark as urgent
          </label>
          <Flex className="layera-modal-actions">
            <Button variant="primary" size="sm" className="layera-modal-button layera-modal-button--warning">
              ⚠ Submit Report
            </Button>
            <Button variant="outline" size="sm" className="layera-modal-button">
              ✕ Cancel
            </Button>
          </Flex>
        </Box>

        {/* Danger Modal Item */}
        <Box className="layera-modal-item layera-modal-item--danger">
          <Heading data-size="md" data-weight="medium" className="layera-modal-item-title">
            Danger Modal
          </Heading>
          <p className="layera-modal-warning-text">⚠️ This action cannot be undone!</p>
          <input
            type="text"
            placeholder="Type 'DELETE' to confirm"
            className="layera-modal-input layera-modal-input--danger"
          />
          <label className="layera-modal-checkbox-label">
            <input type="checkbox" className="layera-modal-checkbox" />
            I understand the consequences
          </label>
          <Flex className="layera-modal-actions">
            <Button variant="primary" size="sm" className="layera-modal-button layera-modal-button--danger">
              🗑 Permanently Delete
            </Button>
            <Button variant="outline" size="sm" className="layera-modal-button">
              ✕ Cancel
            </Button>
          </Flex>
        </Box>

        {/* Info Modal Item */}
        <Box className="layera-modal-item layera-modal-item--info">
          <Heading data-size="md" data-weight="medium" className="layera-modal-item-title">
            Info Modal
          </Heading>
          <input
            type="search"
            placeholder="🔍 Search knowledge base..."
            className="layera-modal-input layera-modal-input--info"
          />
          <select className="layera-modal-select layera-modal-select--info">
            <option>📚 Help Topic</option>
            <option>🔧 Technical Support</option>
            <option>💡 Feature Request</option>
          </select>
          <Flex className="layera-modal-actions">
            <Button variant="primary" size="sm" className="layera-modal-button layera-modal-button--info">
              ℹ Get Help
            </Button>
            <Button variant="outline" size="sm" className="layera-modal-button">
              ✕ Close
            </Button>
          </Flex>
        </Box>

      </Box>
    </Box>
  );
};