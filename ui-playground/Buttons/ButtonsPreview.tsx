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
      <Box className="layera-layout layera-spacing" data-type="margin" data-direction="bottom" data-size="lg">
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
      <Box className="layera-layout layera-spacing" data-type="margin" data-direction="bottom" data-size="md">
        <Text
          className="layera-typography"
          data-size="sm"
          data-weight="semibold"
          data-color="primary"
        >
          Τύπος Πλήκτρου:
        </Text>
        <Box
          className="layera-flex layera-flex--gap-sm layera-spacing"
          data-type="margin"
          data-direction="top"
          data-size="sm"
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
        className="layera-grid--auto-fit layera-spacing"
        data-size="md"
        data-type="padding"
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
          <Box className="layera-layout layera-spacing" data-type="margin" data-direction="top" data-size="sm">
            {buttonVariants.map((v) => (
              <Button
                key={v}
                variant={variant === v ? 'primary' : 'ghost'}
                size="xs"
                onClick={() => setVariant(v)}
                className="layera-spacing"
                data-type="margin"
                data-size="xs"
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
          <Box className="layera-layout layera-spacing" data-type="margin" data-direction="top" data-size="sm">
            {buttonSizes.map((s) => (
              <Button
                key={s}
                variant={size === s ? 'primary' : 'outline'}
                size="xs"
                onClick={() => setSize(s)}
                className="layera-spacing"
                data-type="margin"
                data-size="xs"
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
            <Box className="layera-layout layera-spacing" data-type="margin" data-direction="top" data-size="sm">
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="layera-spacing" data-type="padding" data-size="sm"
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
          <Box className="layera-layout layera-spacing" data-type="margin" data-direction="top" data-size="sm">
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
        className="layera-flex layera-flex--align-center layera-flex--justify-center layera-spacing"
        data-size="xxl"
        data-type="padding"
      >
        <Text
          className="layera-typography layera-spacing"
          data-size="lg"
          data-weight="semibold"
          data-color="primary"
          data-type="margin"
          data-direction="bottom"
        >
          🎯 Live Preview
        </Text>

        {renderButton()}

        {/* Button Info */}
        <Box
          className="layera-text--align-center layera-spacing"
          data-type="margin"
          data-direction="top"
          data-size="md"
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
        className="layera-layout layera-spacing"
        data-type="padding"
        data-size="md"
      >
        <Text
          className="layera-typography layera-spacing"
          data-size="md"
          data-weight="semibold"
          data-color="primary"
          data-type="margin"
          data-direction="bottom"
          data-size="sm"
        >
          📝 Κώδικας:
        </Text>
        <Box
          className="layera-layout layera-spacing layera-border-default"
          data-type="padding"
          data-size="sm"
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