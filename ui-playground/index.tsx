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
        <Box className="layera-layout layera-padding--2xl layera-text-center">
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
        <Box className="layera-layout layera-padding--2xl layera-text-center">
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
        <Box className="layera-layout layera-padding--2xl layera-text-center">
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
        <Box className="layera-layout layera-padding--2xl layera-text-center">
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
      <Box className="layera-layout layera-text-center layera-padding--xl layera-border-bottom layera-margin-bottom--xl">
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
          className="layera-typography layera-margin-top--sm"
          data-size="lg"
          data-color="secondary"
        >
          Enterprise Component Testing & Development Interface
        </Text>
        <Text
          className="layera-typography layera-margin-top--xs"
          data-size="sm"
          data-color="secondary"
        >
          ARXES Compliant | 100% @layera/* Components | Design Token Powered
        </Text>
      </Box>

      {/* Navigation Tabs */}
      <Box className="layera-layout layera-flex layera-flex--wrap layera-flex--gap-sm layera-margin-bottom--xl layera-padding--md layera-bg-surface--secondary layera-border-radius--lg layera-border">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'secondary'}
            size="md"
            onClick={() => setActiveTab(tab.id)}
            disabled={!tab.available}
            className={tab.available ? 'layera-opacity--full layera-cursor--pointer' : 'layera-opacity--half layera-cursor--not-allowed'}
          >
            {tab.emoji} {tab.label}
            {!tab.available && ' (Σύντομα)'}
          </Button>
        ))}
      </Box>

      {/* Tab Content Area */}
      <Box className="layera-layout layera-min-height--600 layera-bg-surface--primary layera-border-radius--xl layera-border layera-overflow--hidden">
        {currentTab?.component}
      </Box>

      {/* Footer Info */}
      <Box className="layera-layout layera-text-center layera-padding--lg layera-margin-top--xl layera-border-top">
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
          className="layera-margin-top--xs"
        >
          🎨 Όλα τα χρώματα, spacing και typography προέρχονται από @layera/tokens
        </Text>
      </Box>
    </Container>
  );
};

export default UIPlayground;