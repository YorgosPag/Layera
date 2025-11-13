import React, { useState } from 'react';
import { Box, Container } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import { ButtonsPreview } from './Buttons/ButtonsPreview';

/**
 * UI Playground - ARXES Compliant Component Testing Interface
 *
 * Enterprise UI Development Tool:
 * - Καρτέλες για διαφορετικούς τύπους components
 * - Live preview και παραμετροποίηση
 * - Πλήρης συμμόρφωση με ARXES standards
 * - Μόνο @layera/* components και design tokens
 */

type PlaygroundTab = 'buttons' | 'cards' | 'modals' | 'layout' | 'typography';

interface TabConfig {
  id: PlaygroundTab;
  label: string;
  emoji: string;
  component: React.ReactNode;
  available: boolean;
}

export const UIPlayground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>('buttons');

  const tabs: TabConfig[] = [
    {
      id: 'buttons',
      label: 'Buttons',
      emoji: '🔘',
      component: <ButtonsPreview />,
      available: true
    },
    {
      id: 'cards',
      label: 'Cards',
      emoji: '🗃️',
      component: (
        <Box className="layera-layout" style={{ padding: 'var(--layera-global-spacing-8)', textAlign: 'center' }}>
          <Text className="layera-typography" data-size="xl" data-color="secondary">
            🚧 Cards Playground - Σύντομα διαθέσιμο
          </Text>
        </Box>
      ),
      available: false
    },
    {
      id: 'modals',
      label: 'Modals',
      emoji: '🪟',
      component: (
        <Box className="layera-layout" style={{ padding: 'var(--layera-global-spacing-8)', textAlign: 'center' }}>
          <Text className="layera-typography" data-size="xl" data-color="secondary">
            🚧 Modals Playground - Σύντομα διαθέσιμο
          </Text>
        </Box>
      ),
      available: false
    },
    {
      id: 'layout',
      label: 'Layout',
      emoji: '📐',
      component: (
        <Box className="layera-layout" style={{ padding: 'var(--layera-global-spacing-8)', textAlign: 'center' }}>
          <Text className="layera-typography" data-size="xl" data-color="secondary">
            🚧 Layout Playground - Σύντομα διαθέσιμο
          </Text>
        </Box>
      ),
      available: false
    },
    {
      id: 'typography',
      label: 'Typography',
      emoji: '🔤',
      component: (
        <Box className="layera-layout" style={{ padding: 'var(--layera-global-spacing-8)', textAlign: 'center' }}>
          <Text className="layera-typography" data-size="xl" data-color="secondary">
            🚧 Typography Playground - Σύντομα διαθέσιμο
          </Text>
        </Box>
      ),
      available: false
    }
  ];

  const currentTab = tabs.find(tab => tab.id === activeTab);

  return (
    <Container className="layera-layout">
      {/* Main Header */}
      <Box
        className="layera-layout"
        style={{
          textAlign: 'center',
          padding: 'var(--layera-global-spacing-6)',
          borderBottom: '1px solid var(--layera-color-border-primary)',
          marginBottom: 'var(--layera-global-spacing-6)'
        }}
      >
        <Heading
          as="h1"
          className="layera-typography"
          data-size="4xl"
          data-weight="bold"
          data-color="primary"
        >
          🎛️ Layera UI Playground
        </Heading>
        <Text
          className="layera-typography"
          data-size="lg"
          data-color="secondary"
          style={{ marginTop: 'var(--layera-global-spacing-2)' }}
        >
          Enterprise Component Testing & Development Interface
        </Text>
        <Text
          className="layera-typography"
          data-size="sm"
          data-color="secondary"
          style={{ marginTop: 'var(--layera-global-spacing-1)' }}
        >
          ARXES Compliant | 100% @layera/* Components | Design Token Powered
        </Text>
      </Box>

      {/* Navigation Tabs */}
      <Box
        className="layera-layout"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--layera-global-spacing-2)',
          marginBottom: 'var(--layera-global-spacing-6)',
          padding: 'var(--layera-global-spacing-3)',
          backgroundColor: 'var(--layera-color-surface-secondary)',
          borderRadius: 'var(--layera-global-borderRadius-lg)',
          border: '1px solid var(--layera-color-border-primary)'
        }}
      >
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'secondary'}
            size="md"
            onClick={() => setActiveTab(tab.id)}
            disabled={!tab.available}
            style={{
              opacity: tab.available ? '1' : '0.5',
              cursor: tab.available ? 'pointer' : 'not-allowed'
            }}
          >
            {tab.emoji} {tab.label}
            {!tab.available && ' (Σύντομα)'}
          </Button>
        ))}
      </Box>

      {/* Tab Content Area */}
      <Box
        className="layera-layout"
        style={{
          minHeight: '600px',
          backgroundColor: 'var(--layera-color-surface-primary)',
          borderRadius: 'var(--layera-global-borderRadius-xl)',
          border: '1px solid var(--layera-color-border-primary)',
          overflow: 'hidden'
        }}
      >
        {currentTab?.component}
      </Box>

      {/* Footer Info */}
      <Box
        className="layera-layout"
        style={{
          textAlign: 'center',
          padding: 'var(--layera-global-spacing-4)',
          marginTop: 'var(--layera-global-spacing-6)',
          borderTop: '1px solid var(--layera-color-border-primary)'
        }}
      >
        <Text
          className="layera-typography"
          data-size="xs"
          data-color="secondary"
        >
          💡 Tip: Αυτό το playground χρησιμοποιεί αποκλειστικά τα enterprise @layera/* components
        </Text>
        <Text
          className="layera-typography"
          data-size="xs"
          data-color="secondary"
          style={{ marginTop: 'var(--layera-global-spacing-1)' }}
        >
          🎨 Όλα τα χρώματα, spacing και typography προέρχονται από @layera/tokens
        </Text>
      </Box>
    </Container>
  );
};

export default UIPlayground;