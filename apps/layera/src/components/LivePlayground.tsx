import React, { useState, useEffect } from 'react';
import { Box, PageContainer } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button, SquareButton } from '@layera/buttons';
import { PlusIcon, SearchIcon, UserIcon, SettingsIcon, CloseIcon } from '@layera/icons';

/**
 * Live Playground - Ζωντανή δοκιμή components σε πραγματικό χρόνο
 *
 * ARXES Compliant Live Testing Interface:
 * - Άμεση προεπισκόπηση αλλαγών στα buttons της εφαρμογής
 * - Live ρυθμίσεις που επηρεάζουν τα πραγματικά components
 * - Πλήρης συμμόρφωση με enterprise standards
 * - Fullscreen interface με καρτέλες
 */

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning' | 'info';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface LivePlaygroundProps {
  onClose: () => void;
}

export const LivePlayground: React.FC<LivePlaygroundProps> = ({ onClose }) => {
  console.log('🔍 LivePlayground component rendered!');

  // Debug CSS tokens
  useEffect(() => {
    console.log('🎨 Checking CSS tokens...');

    // Ελέγχω αν τα CSS custom properties λειτουργούν
    const testElement = document.createElement('div');
    testElement.style.color = 'var(--layera-color-text-primary)';
    document.body.appendChild(testElement);
    const computedColor = getComputedStyle(testElement).color;
    document.body.removeChild(testElement);

    if (computedColor !== 'var(--layera-color-text-primary)' && computedColor !== '') {
      console.log('🎯 CSS tokens are working! Test color:', computedColor);
    } else {
      console.warn('⚠️ CSS tokens not working yet...');
    }
  }, []);
  const [activeSection, setActiveSection] = useState<'buttons' | 'colors' | 'tokens'>('buttons');

  // Button Settings
  const [buttonVariant, setButtonVariant] = useState<ButtonVariant>('secondary');
  const [buttonSize, setButtonSize] = useState<ButtonSize>('md');
  const [buttonText, setButtonText] = useState('Live Button');
  const [withIcon, setWithIcon] = useState(true);

  console.log('🎛️ Current states:', { activeSection, buttonVariant, buttonSize, buttonText, withIcon });

  const variants: ButtonVariant[] = ['primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'info'];
  const sizes: ButtonSize[] = ['xs', 'sm', 'md', 'lg', 'xl'];

  const applyToApp = () => {
    console.log('🚀 Applied settings:', { buttonVariant, buttonSize, buttonText, withIcon });
    window.dispatchEvent(new CustomEvent('playgroundUpdate', {
      detail: { buttonVariant, buttonSize, buttonText, withIcon }
    }));
  };

  return (
    <div
      data-layera-playground="true"
      style={{
        position: 'var(--layera-global-position-fixed)',
        top: 'var(--layera-global-spacing-0)',
        left: 'var(--layera-global-spacing-0)',
        width: 'var(--layera-spacing-viewport-full-width)',
        height: 'var(--layera-spacing-viewport-full-height)',
        backgroundColor: 'var(--layera-color-surface-primary)',
        zIndex: 'var(--layera-z-index-overlay)',
        overflow: 'var(--layera-global-overflow-auto)'
      }}
    >
      {/* Header με κουμπί κλεισίματος */}
      <div
        style={{
          display: 'var(--layera-global-display-flex)',
          justifyContent: 'var(--layera-global-justifyContent-space-between)',
          alignItems: 'var(--layera-global-alignItems-center)',
          padding: 'var(--layera-global-spacing-4)',
          borderBottom: '1px solid var(--layera-color-border-default)',
          backgroundColor: 'var(--layera-color-surface-secondary)',
          position: 'sticky',
          top: 'var(--layera-global-spacing-0)',
          zIndex: 'var(--layera-z-index-overlay)'
        }}
      >
        <h1 style={{ fontSize: 'var(--layera-fontSize-xl)', fontWeight: 'var(--layera-fontWeight-bold)', color: 'var(--layera-color-text-primary)' }}>
          🎛️ Live Playground - Ζωντανές Ρυθμίσεις
        </h1>
        <button
          onClick={onClose}
          style={{
            padding: 'var(--layera-global-spacing-2) var(--layera-global-spacing-4)',
            border: '1px solid var(--layera-color-border-default)',
            backgroundColor: 'var(--layera-color-semantic-neutral-light)',
            cursor: 'var(--layera-global-cursor-pointer)'
          }}
        >
          ✕ Κλείσιμο
        </button>
      </div>

      {/* Main Content */}
      <div
        style={{
          backgroundColor: 'var(--layera-color-surface-secondary)',
          color: 'var(--layera-color-text-primary)',
          padding: 'var(--layera-global-spacing-6)',
          maxWidth: 'var(--layera-spacing-container-xl)',
          margin: 'var(--layera-global-spacing-0) auto',
          minHeight: 'calc(var(--layera-spacing-viewport-full-height) - var(--layera-global-spacing-10))'
        }}
      >
        {/* TEST - Θα δεις αυτό το κείμενο */}
        <h2 style={{ color: 'var(--layera-color-text-primary)', fontSize: 'var(--layera-fontSize-2xl)', fontWeight: 'var(--layera-fontWeight-bold)', margin: '0 0 var(--layera-global-spacing-5) 0' }}>
          ✅ ΠΕΡΙΕΧΟΜΕΝΟ ΦΟΡΤΩΝΕΙ!
        </h2>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'var(--layera-global-display-flex)',
            gap: 'var(--layera-global-spacing-2)',
            marginBottom: 'var(--layera-global-spacing-4)',
            padding: 'var(--layera-global-spacing-3)',
            backgroundColor: 'var(--layera-color-semantic-neutral-light)',
            borderRadius: 'var(--layera-radius-md)'
          }}
        >
          <Button
            variant={activeSection === 'buttons' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('buttons')}
          >
            🔘 Buttons
          </Button>
          <Button
            variant={activeSection === 'colors' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('colors')}
          >
            🎨 Colors
          </Button>
          <Button
            variant={activeSection === 'tokens' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setActiveSection('tokens')}
          >
            ⚙️ Tokens
          </Button>
        </div>

        {/* Buttons Section */}
        {activeSection === 'buttons' && (
          <div>
            {/* Live Preview Area */}
            <div
              style={{
                textAlign: 'center',
                padding: 'var(--layera-global-spacing-8)',
                backgroundColor: 'var(--layera-color-surface-primary)',
                borderRadius: 'var(--layera-radius-lg)',
                border: '2px dashed var(--layera-color-semantic-info-primary)',
                marginBottom: 'var(--layera-global-spacing-5)'
              }}
            >
              <h3 style={{
                fontSize: 'var(--layera-fontSize-lg)',
                fontWeight: 'var(--layera-fontWeight-bold)',
                color: 'var(--layera-color-text-primary)',
                marginBottom: 'var(--layera-global-spacing-5)',
                margin: '0 0 var(--layera-global-spacing-5) 0'
              }}>
                🎯 Live Preview
              </h3>

              <div style={{
                display: 'var(--layera-global-display-flex)',
                justifyContent: 'center',
                gap: 'var(--layera-global-spacing-5)',
                flexWrap: 'wrap'
              }}>
                {/* Rectangle Button */}
                <Button
                  variant={buttonVariant}
                  size={buttonSize}
                  icon={withIcon ? <PlusIcon size="sm" /> : undefined}
                  iconPosition="left"
                >
                  {buttonText}
                </Button>

                {/* Square Button */}
                <SquareButton
                  icon={<SearchIcon size="sm" />}
                  variant={buttonVariant}
                  size={buttonSize}
                  aria-label={`Τετράγωνο ${buttonVariant} πλήκτρο`}
                  tooltip={`Live ${buttonVariant} τετράγωνο`}
                />
              </div>
            </div>

            {/* Controls Grid */}
            <div
              style={{
                display: 'var(--layera-global-layout-display-grid)',
                gridTemplateColumns: 'repeat(auto-fit, minmax(var(--layera-spacing-component-card-width), 1fr))',
                gap: 'var(--layera-global-spacing-5)',
                marginBottom: 'var(--layera-global-spacing-5)'
              }}
            >
              {/* Variant Control */}
              <div
                style={{
                  padding: 'var(--layera-global-spacing-4)',
                  backgroundColor: 'var(--layera-color-surface-primary)',
                  borderRadius: 'var(--layera-radius-md)',
                  border: '1px solid var(--layera-color-border-default)'
                }}
              >
                <h4 style={{
                  fontSize: 'var(--layera-fontSize-base)',
                  fontWeight: 'var(--layera-fontWeight-semibold)',
                  color: 'var(--layera-color-text-primary)',
                  margin: '0 0 var(--layera-global-spacing-3) 0'
                }}>
                  Variant
                </h4>
                <div
                  style={{
                    display: 'var(--layera-global-display-flex)',
                    flexWrap: 'wrap',
                    gap: 'var(--layera-global-spacing-2)'
                  }}
                >
                  {variants.map((variant) => (
                    <Button
                      key={variant}
                      variant={buttonVariant === variant ? 'primary' : 'outline'}
                      size="sm"
                      onClick={() => setButtonVariant(variant)}
                    >
                      {variant}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Size Control */}
              <div
                style={{
                  padding: 'var(--layera-global-spacing-4)',
                  backgroundColor: 'var(--layera-color-surface-primary)',
                  borderRadius: 'var(--layera-radius-md)',
                  border: '1px solid var(--layera-color-border-default)'
                }}
              >
                <h4 style={{
                  fontSize: 'var(--layera-fontSize-base)',
                  fontWeight: 'var(--layera-fontWeight-semibold)',
                  color: 'var(--layera-color-text-primary)',
                  margin: '0 0 var(--layera-global-spacing-3) 0'
                }}>
                  Size
                </h4>
                <div
                  style={{
                    display: 'var(--layera-global-display-flex)',
                    gap: 'var(--layera-global-spacing-2)'
                  }}
                >
                  {sizes.map((size) => (
                    <Button
                      key={size}
                      variant={buttonSize === size ? 'primary' : 'secondary'}
                      size="sm"
                      onClick={() => setButtonSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Text & Icon Control */}
              <div
                style={{
                  padding: 'var(--layera-global-spacing-4)',
                  backgroundColor: 'var(--layera-color-surface-primary)',
                  borderRadius: 'var(--layera-radius-md)',
                  border: '1px solid var(--layera-color-border-default)'
                }}
              >
                <h4 style={{
                  fontSize: 'var(--layera-fontSize-base)',
                  fontWeight: 'var(--layera-fontWeight-semibold)',
                  color: 'var(--layera-color-text-primary)',
                  margin: '0 0 var(--layera-global-spacing-3) 0'
                }}>
                  Κείμενο & Εικονίδιο
                </h4>
                <input
                  type="text"
                  value={buttonText}
                  onChange={(e) => setButtonText(e.target.value)}
                  style={{
                    width: 'var(--layera-spacing-viewport-full-width)',
                    padding: 'var(--layera-global-spacing-2)',
                    border: '1px solid var(--layera-color-semantic-neutral-medium)',
                    borderRadius: 'var(--layera-border-radius-sm)',
                    fontSize: 'var(--layera-fontSize-sm)',
                    marginBottom: 'var(--layera-global-spacing-2)'
                  }}
                />
                <Button
                  variant={withIcon ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setWithIcon(!withIcon)}
                >
                  {withIcon ? '✅ Με εικονίδιο' : '❌ Χωρίς εικονίδιο'}
                </Button>
              </div>
            </div>


            {/* Current Settings Display */}
            <div
              style={{
                padding: 'var(--layera-global-spacing-4)',
                backgroundColor: 'var(--layera-color-semantic-neutral-light)',
                borderRadius: 'var(--layera-border-radius-md)',
                border: '1px solid var(--layera-color-semantic-neutral-light)',
                fontFamily: 'monospace',
                fontSize: 'var(--layera-fontSize-sm)'
              }}
            >
              <h4 style={{
                fontSize: 'var(--layera-fontSize-base)',
                fontWeight: '600',
                color: 'var(--layera-color-semantic-neutral-dark)',
                margin: '0 0 var(--layera-global-spacing-2) 0'
              }}>
                📝 Τρέχουσες Ρυθμίσεις:
              </h4>
              <pre style={{
                color: 'var(--layera-color-semantic-neutral-dark)',
                margin: 'var(--layera-global-spacing-0)',
                fontFamily: 'monospace'
              }}>
{`{
  variant: "${buttonVariant}",
  size: "${buttonSize}",
  text: "${buttonText}",
  withIcon: ${withIcon}
}`}
              </pre>
            </div>
          </div>
        )}

        {/* Coming Soon Sections */}
        {activeSection === 'colors' && (
          <div
            style={{
              textAlign: 'center',
              padding: 'var(--layera-global-spacing-12)',
              minHeight: 'var(--layera-spacing-component-card-height)',
              display: 'var(--layera-global-display-flex)',
              flexDirection: 'var(--layera-global-flexDirection-column)',
              justifyContent: 'center'
            }}
          >
            <h2 style={{
              fontSize: 'var(--layera-global-spacing-8)',
              color: 'var(--layera-color-semantic-neutral-medium)',
              margin: '0 0 var(--layera-global-spacing-4) 0'
            }}>
              🚧 Colors Playground
            </h2>
            <p style={{
              fontSize: 'var(--layera-fontSize-lg)',
              color: 'var(--layera-color-semantic-neutral-medium)',
              margin: 'var(--layera-global-spacing-0)'
            }}>
              Σύντομα διαθέσιμο - Live color theme testing
            </p>
          </div>
        )}

        {activeSection === 'tokens' && (
          <div
            style={{
              textAlign: 'center',
              padding: 'var(--layera-global-spacing-12)',
              minHeight: 'var(--layera-spacing-component-card-height)',
              display: 'var(--layera-global-display-flex)',
              flexDirection: 'var(--layera-global-flexDirection-column)',
              justifyContent: 'center'
            }}
          >
            <h2 style={{
              fontSize: 'var(--layera-global-spacing-8)',
              color: 'var(--layera-color-semantic-neutral-medium)',
              margin: '0 0 var(--layera-global-spacing-4) 0'
            }}>
              🚧 Tokens Playground
            </h2>
            <p style={{
              fontSize: 'var(--layera-fontSize-lg)',
              color: 'var(--layera-color-semantic-neutral-medium)',
              margin: 'var(--layera-global-spacing-0)'
            }}>
              Σύντομα διαθέσιμο - Live design token editing
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePlayground;