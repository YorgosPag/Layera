import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import { BaseCard } from '@layera/cards';

/**
 * ARXES COMPLIANT Main Content Component
 *
 * Αντιστοιχεί στο main content area του FullAppPreview_Mockup.html:
 * - 4 Tabs: Layout Themes, Cards, Modals, Tables
 * - Demo content για κάθε tab
 * - Responsive layout
 * - Dynamic theming support
 *
 * Χρησιμοποιεί υπάρχοντα @layera/* components και tokens
 */

interface MainContentProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

const CONTENT_TABS = [
  { id: 'themes', label: '🎨 Layout Themes', icon: '🎨' },
  { id: 'cards', label: '📄 Cards', icon: '📄' },
  { id: 'modals', label: '📦 Modals', icon: '📦' },
  { id: 'tables', label: '📊 Tables', icon: '📊' }
] as const;

const SAMPLE_CARDS_DATA = [
  { id: 1, title: 'Sample Card 1', description: 'This is a demo card component showcasing the layera design system.' },
  { id: 2, title: 'Sample Card 2', description: 'Another example card with different content to demonstrate variety.' },
  { id: 3, title: 'Sample Card 3', description: 'Third card example with dynamic theming support built-in.' },
  { id: 4, title: 'Sample Card 4', description: 'Final demo card showing consistent styling across all components.' }
] as const;

export const MainContent: React.FC<MainContentProps> = ({
  activeTab = 'themes',
  onTabChange
}) => {
  const handleTabClick = React.useCallback((tabId: string) => {
    onTabChange?.(tabId);
  }, [onTabChange]);

  return (
    <Box
      className="layera-main-content layera-padding--lg main-content-container"
    >
      {/* Tab Navigation */}
      <Flex className="layera-flex--gap-xs layera-margin-bottom--lg layera-tab-navigation">
        {CONTENT_TABS.map(({ id, label, icon }) => (
          <Button
            key={id}
            variant={activeTab === id ? 'primary' : 'outline'}
            size="md"
            onClick={() => handleTabClick(id)}
            className="layera-button layera-tab-button"
            style={{
              background: activeTab === id ? 'var(--live-primary-color)' : '#ffffff',
              color: activeTab === id ? 'white' : 'var(--layera-color-neutral-800)',
              border: `1px solid ${activeTab === id ? 'var(--live-primary-color)' : '#e1e5e9'}`,
              borderRadius: 'var(--live-border-radius)'
            }}
          >
            {icon} {label}
          </Button>
        ))}
      </Flex>

      {/* Tab Content */}
      <Box className="layera-tab-content">
        {activeTab === 'themes' && (
          <Box className="layera-themes-content">
            <Heading
              className="layera-typography layera-margin-bottom--md"
              data-size="lg"
              data-weight="semibold"
            >
              🎨 Layout Themes Showcase
            </Heading>
            <Text className="layera-typography layera-margin-bottom--lg" data-size="md">
              This section demonstrates the dynamic theming capabilities of the Layera Design System.
              Use the controls in the right sidebar to modify colors, spacing, and layout properties in real-time.
            </Text>

            {/* Theme Preview Grid */}
            <Box
              className="layera-themes-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--live-component-gap)',
                marginTop: 'var(--layera-space-4)'
              }}
            >
              {['Ocean', 'Nature', 'Sunset', 'Royal'].map((themeName) => (
                <BaseCard
                  key={themeName}
                  className="layera-card layera-theme-preview-card"
                >
                  <Heading
                    className="layera-typography layera-margin-bottom--sm"
                    data-size="md"
                    data-weight="semibold"
                  >
                    {themeName} Theme
                  </Heading>
                  <Text className="layera-typography" data-size="sm">
                    Preview of {themeName.toLowerCase()} theme styling
                  </Text>
                </BaseCard>
              ))}
            </Box>
          </Box>
        )}

        {activeTab === 'cards' && (
          <Box className="layera-cards-content">
            <Heading
              className="layera-typography layera-margin-bottom--md"
              data-size="lg"
              data-weight="semibold"
            >
              📄 Cards Gallery
            </Heading>
            <Text className="layera-typography layera-margin-bottom--lg" data-size="md">
              Explore different card layouts and styles powered by the Layera token system.
            </Text>

            {/* Cards Grid */}
            <Box
              className="layera-cards-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--live-component-gap)'
              }}
            >
              {SAMPLE_CARDS_DATA.map(({ id, title, description }) => (
                <BaseCard
                  key={id}
                  className="layera-card layera-demo-card"
                >
                  <Heading
                    className="layera-typography layera-margin-bottom--sm"
                    data-size="md"
                    data-weight="semibold"
                  >
                    {title}
                  </Heading>
                  <Text className="layera-typography layera-margin-bottom--md" data-size="sm">
                    {description}
                  </Text>
                  <Button
                    variant="outline"
                    size="sm"
                    className="layera-button"
                    style={{
                      borderColor: 'var(--live-primary-color)',
                      color: 'var(--live-primary-color)'
                    }}
                  >
                    Learn More
                  </Button>
                </BaseCard>
              ))}
            </Box>
          </Box>
        )}

        {activeTab === 'modals' && (
          <Box className="layera-modals-content">
            <Heading
              className="layera-typography layera-margin-bottom--md"
              data-size="lg"
              data-weight="semibold"
            >
              📦 Modal Components
            </Heading>
            <Text className="layera-typography layera-margin-bottom--lg" data-size="md">
              Interactive modal components with dynamic theming and responsive behavior.
            </Text>

            {/* Modal Triggers */}
            <Flex className="layera-flex--gap-md layera-flex--wrap">
              <Button
                variant="primary"
                size="md"
                className="layera-button"
                style={{
                  background: 'var(--live-primary-color)',
                  border: 'none'
                }}
              >
                📝 Info Modal
              </Button>
              <Button
                variant="secondary"
                size="md"
                className="layera-button"
                style={{
                  background: 'var(--live-secondary-color)',
                  border: 'none'
                }}
              >
                ⚠️ Warning Modal
              </Button>
              <Button
                variant="success"
                size="md"
                className="layera-button"
                style={{
                  background: 'var(--live-success-color)',
                  border: 'none'
                }}
              >
                ✅ Success Modal
              </Button>
              <Button
                variant="danger"
                size="md"
                className="layera-button"
                style={{
                  background: 'var(--live-danger-color)',
                  border: 'none'
                }}
              >
                🚨 Error Modal
              </Button>
            </Flex>

            {/* Modal Preview Area */}
            <Box
              className="layera-modal-preview"
              style={{
                marginTop: 'var(--layera-space-6)',
                padding: 'var(--layera-space-4)',
                border: '2px dashed var(--layera-color-neutral-300)',
                borderRadius: 'var(--live-border-radius)',
                textAlign: 'center'
              }}
            >
              <Text className="layera-typography" data-size="lg">
                🎭 Modal Preview Area
              </Text>
              <Text className="layera-typography" data-size="sm">
                Click buttons above to preview modal variants
              </Text>
            </Box>
          </Box>
        )}

        {activeTab === 'tables' && (
          <Box className="layera-tables-content">
            <Heading
              className="layera-typography layera-margin-bottom--md"
              data-size="lg"
              data-weight="semibold"
            >
              📊 Data Tables
            </Heading>
            <Text className="layera-typography layera-margin-bottom--lg" data-size="md">
              Responsive table components with sorting, filtering, and theming capabilities.
            </Text>

            {/* Sample Table */}
            <Box
              className="layera-table-container"
              style={{
                border: '1px solid var(--layera-color-neutral-200)',
                borderRadius: 'var(--live-border-radius)',
                overflow: 'hidden',
                background: 'white'
              }}
            >
              <table
                className="layera-table"
                style={{
                  width: '100%',
                  borderCollapse: 'collapse'
                }}
              >
                <thead style={{ background: 'var(--live-primary-color)', color: 'white' }}>
                  <tr>
                    <th className="layera-table-header" style={{ padding: 'var(--layera-space-3)', textAlign: 'left' }}>
                      📋 Component
                    </th>
                    <th className="layera-table-header" style={{ padding: 'var(--layera-space-3)', textAlign: 'left' }}>
                      🎨 Theme Support
                    </th>
                    <th className="layera-table-header" style={{ padding: 'var(--layera-space-3)', textAlign: 'left' }}>
                      📱 Responsive
                    </th>
                    <th className="layera-table-header" style={{ padding: 'var(--layera-space-3)', textAlign: 'left' }}>
                      ✅ Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { component: 'Cards', themeSupport: 'Yes', responsive: 'Yes', status: 'Ready' },
                    { component: 'Buttons', themeSupport: 'Yes', responsive: 'Yes', status: 'Ready' },
                    { component: 'Modals', themeSupport: 'Yes', responsive: 'Yes', status: 'Ready' },
                    { component: 'Tables', themeSupport: 'Yes', responsive: 'Yes', status: 'Ready' }
                  ].map((row, index) => (
                    <tr
                      key={index}
                      className="layera-table-row"
                      style={{
                        background: index % 2 === 0 ? '#f8f9fa' : 'white',
                        borderBottom: '1px solid var(--layera-color-neutral-200)'
                      }}
                    >
                      <td className="layera-table-cell" style={{ padding: 'var(--layera-space-3)' }}>
                        {row.component}
                      </td>
                      <td className="layera-table-cell" style={{ padding: 'var(--layera-space-3)' }}>
                        {row.themeSupport}
                      </td>
                      <td className="layera-table-cell" style={{ padding: 'var(--layera-space-3)' }}>
                        {row.responsive}
                      </td>
                      <td className="layera-table-cell" style={{ padding: 'var(--layera-space-3)' }}>
                        <Text
                          className="layera-typography"
                          data-size="sm"
                          style={{
                            color: 'var(--live-success-color)',
                            fontWeight: 'var(--layera-fontWeight-semibold)'
                          }}
                        >
                          {row.status}
                        </Text>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};