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
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'var(--layera-color-surface-primary)',
        zIndex: 9999,
        overflow: 'auto'
      }}
    >
      {/* Header με κουμπί κλεισίματος */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'var(--layera-global-spacing-4)',
          borderBottom: '1px solid var(--layera-color-border-default)',
          backgroundColor: 'var(--layera-color-surface-secondary)',
          position: 'sticky',
          top: '0',
          zIndex: 1001
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
            cursor: 'pointer'
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
          margin: '0 auto',
          minHeight: 'calc(100vh - 100px)'
        }}
      >
        {/* TEST - Θα δεις αυτό το κείμενο */}
        <h2 style={{ color: 'var(--layera-color-text-primary)', fontSize: 'var(--layera-fontSize-2xl)', fontWeight: 'var(--layera-fontWeight-bold)', margin: '0 0 var(--layera-global-spacing-5) 0' }}>
          ✅ ΠΕΡΙΕΧΟΜΕΝΟ ΦΟΡΤΩΝΕΙ!
        </h2>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
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
                display: 'flex',
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
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
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
                    display: 'flex',
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
                    display: 'flex',
                    gap: '8px'
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
                    width: '100%',
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    fontSize: '14px',
                    marginBottom: '8px'
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
                padding: '16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontFamily: 'monospace',
                fontSize: '14px'
              }}
            >
              <h4 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#333',
                margin: '0 0 8px 0'
              }}>
                📝 Τρέχουσες Ρυθμίσεις:
              </h4>
              <pre style={{
                color: '#333',
                margin: '0',
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
              padding: '60px',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <h2 style={{
              fontSize: '32px',
              color: '#666',
              margin: '0 0 16px 0'
            }}>
              🚧 Colors Playground
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              margin: '0'
            }}>
              Σύντομα διαθέσιμο - Live color theme testing
            </p>
          </div>
        )}

        {activeSection === 'tokens' && (
          <div
            style={{
              textAlign: 'center',
              padding: '60px',
              minHeight: '400px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <h2 style={{
              fontSize: '32px',
              color: '#666',
              margin: '0 0 16px 0'
            }}>
              🚧 Tokens Playground
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#666',
              margin: '0'
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