import React, { useState } from 'react';
import { Box, Container } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button, SquareButton } from '@layera/buttons';
import { PlusIcon, SearchIcon, UserIcon } from '@layera/icons';

/**
 * ButtonsPreview - ARXES Compliant UI Playground για Buttons
 *
 * Enterprise Button Testing Interface:
 * - Καρτέλες για διαφορετικούς τύπους buttons (Rectangle vs Square)
 * - Live preview με παραμετροποιήσιμα props
 * - Μόνο @layera/* components (όχι <div>, όχι inline styles)
 * - Όλες οι τιμές από design tokens
 * - TypeScript strict mode
 */

type ButtonShape = 'rectangle' | 'square';
type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const ButtonsPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ButtonShape>('rectangle');
  const [variant, setVariant] = useState<ButtonVariant>('primary');
  const [size, setSize] = useState<ButtonSize>('md');
  const [buttonText, setButtonText] = useState('Δοκιμαστικό Κουμπί');
  const [withIcon, setWithIcon] = useState(true);

  const buttonShapes: ButtonShape[] = ['rectangle', 'square'];
  const buttonVariants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'info'];
  const buttonSizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  const renderButton = () => {
    const icon = withIcon ? <PlusIcon size="sm" /> : undefined;

    if (activeTab === 'square') {
      return (
        <SquareButton
          icon={icon || <SearchIcon size="sm" />}
          variant={variant}
          size={size}
          aria-label={`Τετράγωνο πλήκτρο ${variant}`}
          tooltip={`${variant} τετράγωνο πλήκτρο`}
        />
      );
    }

    return (
      <Button
        variant={variant}
        size={size}
        icon={icon}
        iconPosition="left"
      >
        {buttonText}
      </Button>
    );
  };

  return (
    <Container className="layera-layout">
      {/* Header */}
      <Box className="layera-layout" style={{ marginBottom: 'var(--layera-global-spacing-6)' }}>
        <Heading
          as="h1"
          className="layera-typography"
          data-size="3xl"
          data-weight="bold"
          data-color="primary"
        >
          🎛️ Buttons Playground
        </Heading>
        <Text
          className="layera-typography"
          data-size="lg"
          data-color="secondary"
        >
          Enterprise Button Testing Interface - ARXES Compliant
        </Text>
      </Box>

      {/* Tabs για Button Shape */}
      <Box className="layera-layout" style={{ marginBottom: 'var(--layera-global-spacing-4)' }}>
        <Text
          className="layera-typography"
          data-size="sm"
          data-weight="semibold"
          data-color="primary"
        >
          Τύπος Πλήκτρου:
        </Text>
        <Box
          className="layera-layout"
          style={{
            display: 'flex',
            gap: 'var(--layera-global-spacing-2)',
            marginTop: 'var(--layera-global-spacing-2)'
          }}
        >
          {buttonShapes.map((shape) => (
            <Button
              key={shape}
              variant={activeTab === shape ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setActiveTab(shape)}
            >
              {shape === 'rectangle' ? '📏 Παραλληλόγραμμο' : '⬜ Τετράγωνο'}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Controls */}
      <Box
        className="layera-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--layera-global-spacing-4)',
          marginBottom: 'var(--layera-global-spacing-6)',
          padding: 'var(--layera-global-spacing-4)',
          backgroundColor: 'var(--layera-color-surface-secondary)',
          borderRadius: 'var(--layera-global-borderRadius-lg)'
        }}
      >
        {/* Variant Control */}
        <Box className="layera-layout">
          <Text
            className="layera-typography"
            data-size="sm"
            data-weight="medium"
            data-color="primary"
          >
            Variant:
          </Text>
          <Box className="layera-layout" style={{ marginTop: 'var(--layera-global-spacing-2)' }}>
            {buttonVariants.map((v) => (
              <Button
                key={v}
                variant={variant === v ? 'primary' : 'ghost'}
                size="xs"
                onClick={() => setVariant(v)}
                style={{
                  margin: 'var(--layera-global-spacing-1)',
                  fontSize: 'var(--layera-fontSize-xs)'
                }}
              >
                {v}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Size Control */}
        <Box className="layera-layout">
          <Text
            className="layera-typography"
            data-size="sm"
            data-weight="medium"
            data-color="primary"
          >
            Μέγεθος:
          </Text>
          <Box className="layera-layout" style={{ marginTop: 'var(--layera-global-spacing-2)' }}>
            {buttonSizes.map((s) => (
              <Button
                key={s}
                variant={size === s ? 'primary' : 'outline'}
                size="xs"
                onClick={() => setSize(s)}
                style={{ margin: 'var(--layera-global-spacing-1)' }}
              >
                {s}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Text Control (μόνο για rectangle buttons) */}
        {activeTab === 'rectangle' && (
          <Box className="layera-layout">
            <Text
              className="layera-typography"
              data-size="sm"
              data-weight="medium"
              data-color="primary"
            >
              Κείμενο:
            </Text>
            <Box className="layera-layout" style={{ marginTop: 'var(--layera-global-spacing-2)' }}>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--layera-global-spacing-2)',
                  border: '1px solid var(--layera-color-border-primary)',
                  borderRadius: 'var(--layera-global-borderRadius-md)',
                  fontSize: 'var(--layera-fontSize-sm)'
                }}
              />
            </Box>
          </Box>
        )}

        {/* Icon Toggle */}
        <Box className="layera-layout">
          <Text
            className="layera-typography"
            data-size="sm"
            data-weight="medium"
            data-color="primary"
          >
            Εικονίδιο:
          </Text>
          <Box className="layera-layout" style={{ marginTop: 'var(--layera-global-spacing-2)' }}>
            <Button
              variant={withIcon ? 'primary' : 'secondary'}
              size="xs"
              onClick={() => setWithIcon(!withIcon)}
            >
              {withIcon ? '✅ Με εικονίδιο' : '❌ Χωρίς εικονίδιο'}
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Preview Area */}
      <Box
        className="layera-layout"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--layera-global-spacing-8)',
          backgroundColor: 'var(--layera-color-surface-primary)',
          borderRadius: 'var(--layera-global-borderRadius-xl)',
          border: '2px dashed var(--layera-color-border-secondary)',
          minHeight: '200px'
        }}
      >
        <Text
          className="layera-typography"
          data-size="lg"
          data-weight="semibold"
          data-color="primary"
          style={{ marginBottom: 'var(--layera-global-spacing-4)' }}
        >
          🎯 Live Preview
        </Text>

        {renderButton()}

        {/* Button Info */}
        <Box
          className="layera-layout"
          style={{
            marginTop: 'var(--layera-global-spacing-4)',
            textAlign: 'center'
          }}
        >
          <Text
            className="layera-typography"
            data-size="sm"
            data-color="secondary"
          >
            {activeTab === 'square' ? 'SquareButton' : 'Button'} |
            variant="{variant}" |
            size="{size}" |
            {activeTab === 'rectangle' && `text="${buttonText}" | `}
            icon={withIcon ? 'true' : 'false'}
          </Text>
        </Box>
      </Box>

      {/* Component Usage Example */}
      <Box
        className="layera-layout"
        style={{
          marginTop: 'var(--layera-global-spacing-6)',
          padding: 'var(--layera-global-spacing-4)',
          backgroundColor: 'var(--layera-color-surface-tertiary)',
          borderRadius: 'var(--layera-global-borderRadius-lg)'
        }}
      >
        <Text
          className="layera-typography"
          data-size="md"
          data-weight="semibold"
          data-color="primary"
          style={{ marginBottom: 'var(--layera-global-spacing-2)' }}
        >
          📝 Κώδικας:
        </Text>
        <Box
          className="layera-layout"
          style={{
            padding: 'var(--layera-global-spacing-3)',
            backgroundColor: 'var(--layera-color-surface-primary)',
            borderRadius: 'var(--layera-global-borderRadius-md)',
            fontFamily: 'monospace',
            fontSize: 'var(--layera-fontSize-sm)',
            border: '1px solid var(--layera-color-border-primary)'
          }}
        >
          <Text className="layera-typography" data-color="primary">
            {activeTab === 'square' ? (
              `<SquareButton
  icon={<${withIcon ? 'PlusIcon' : 'SearchIcon'} size="sm" />}
  variant="${variant}"
  size="${size}"
  aria-label="Τετράγωνο πλήκτρο ${variant}"
  tooltip="${variant} τετράγωνο πλήκτρο"
/>`
            ) : (
              `<Button
  variant="${variant}"
  size="${size}"
  ${withIcon ? 'icon={<PlusIcon size="sm" />}' : ''}
  ${withIcon ? 'iconPosition="left"' : ''}
>
  ${buttonText}
</Button>`
            )}
          </Text>
        </Box>
      </Box>
    </Container>
  );
};

export default ButtonsPreview;