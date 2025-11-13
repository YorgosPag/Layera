import React, { useState } from 'react';
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
  const [activeSection, setActiveSection] = useState<'buttons' | 'colors' | 'tokens'>('buttons');

  // Button Settings
  const [buttonVariant, setButtonVariant] = useState<ButtonVariant>('secondary');
  const [buttonSize, setButtonSize] = useState<ButtonSize>('md');
  const [buttonText, setButtonText] = useState('Live Button');
  const [withIcon, setWithIcon] = useState(true);

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
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff',
        zIndex: '9999',
        overflow: 'auto',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      {/* Header με κουμπί κλεισίματος */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px',
          borderBottom: '1px solid #ccc',
          backgroundColor: '#f8f9fa',
          position: 'sticky',
          top: '0',
          zIndex: '1001'
        }}
      >
        <h1
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#333',
            margin: '0'
          }}
        >
          🎛️ Live Playground - Ζωντανές Ρυθμίσεις
        </h1>
        <button
          onClick={onClose}
          style={{
            background: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ✕ Κλείσιμο
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        padding: '20px',
        height: 'calc(100vh - 80px)',
        overflow: 'auto'
      }}>
        {/* TEST - Θα δεις αυτό το κείμενο */}
        <h2 style={{color: '#333', fontSize: '24px'}}>
          ✅ ΠΕΡΙΕΧΟΜΕΝΟ ΦΟΡΤΩΝΕΙ!
        </h2>

        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            marginBottom: '16px',
            padding: '12px',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px'
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
                padding: '30px',
                backgroundColor: '#fff',
                borderRadius: '12px',
                border: '2px dashed #007bff',
                marginBottom: '20px'
              }}
            >
              <h3 style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#333',
                marginBottom: '20px',
                margin: '0 0 20px 0'
              }}>
                🎯 Live Preview
              </h3>

              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
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
                gap: '20px',
                marginBottom: '20px'
              }}
            >
              {/* Variant Control */}
              <div
                style={{
                  padding: '16px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }}
              >
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#333',
                  margin: '0 0 12px 0'
                }}>
                  Variant
                </h4>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px'
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
                  padding: '16px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }}
              >
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#333',
                  margin: '0 0 12px 0'
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
                  padding: '16px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  border: '1px solid #ddd'
                }}
              >
                <h4 style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: '#333',
                  margin: '0 0 12px 0'
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