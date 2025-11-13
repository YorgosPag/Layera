/**
 * TestPanel.tsx - George's Design System Control Panel
 *
 * Πλήρης έλεγχος Design System με Single Source of Truth
 */

import React, { useState, useRef } from 'react';
import { Box } from '@layera/layout';
import { Modal, ModalHeader, ModalContent } from '@layera/modals';
import { Text, Heading } from '@layera/typography';

interface TestPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

// Design System Structure με Single Source of Truth paths
// Θα φτιάξω dynamic structure που διαβάζει τις τρέχουσες τιμές
const getDesignSystemStructure = () => ({
  surfaces: {
    title: "🎨 Φόντα (Surfaces)",
    description: "Φόντα καρτών, modal, header",
    items: {
      primary: {
        name: "Primary Surface",
        description: "Κάρτες, Modal, Header φόντο",
        currentValue: "#482323", // Θα την κάνω dynamic
        sourceOfTruth: "packages/tokens/src/domains/theme-colors.json → color.light.surface.primary",
        variable: "--layera-color-light-surface-primary"
      }
    }
  },
  texts: {
    title: "📝 Κείμενα (Text Colors)",
    description: "Χρώματα κειμένων",
    items: {
      primary: {
        name: "Primary Text",
        description: "Κύρια κείμενα",
        currentValue: "#e718ba",
        sourceOfTruth: "packages/tokens/src/domains/color-core.json → text.primary",
        variable: "--layera-color-text-primary"
      },
      secondary: {
        name: "Secondary Text",
        description: "Δευτερεύοντα κείμενα",
        currentValue: "#0eb419",
        sourceOfTruth: "packages/tokens/src/domains/color-core.json → text.secondary",
        variable: "--layera-color-text-secondary"
      }
    }
  },
  icons: {
    title: "🎯 Εικονίδια (Icons)",
    description: "Χρώματα όλων των εικονιδίων (7-8 εικονίδια σε επικεφαλίδα + κάρτες)",
    items: {
      primary: {
        name: "Primary Icons",
        description: "Όλα τα εικονίδια (επικεφαλίδα + κάρτες)",
        currentValue: "#fbbf24", // Θα την κάνω dynamic
        sourceOfTruth: "packages/tokens/src/domains/icons-core.json → icon.colorPrimary",
        variable: "--layera-icon-colorPrimary"
      }
    }
  }
});

export const TestPanel: React.FC<TestPanelProps> = ({ isOpen, onClose }) => {
  const [showCommand, setShowCommand] = useState(false);
  const [currentCommand, setCurrentCommand] = useState('');
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [colorValues, setColorValues] = useState({
    'surfaces.primary': '#482323',
    'texts.primary': '#e718ba',
    'texts.secondary': '#0eb419',
    'icons.primary': '#fbbf24'
  });
  const commandRef = useRef<HTMLTextAreaElement>(null);

  // Get current structure with updated values
  const designSystemStructure = getDesignSystemStructure();

  const handleColorChange = (itemKey: string, color: string) => {
    // Ενημέρωση local state για άμεση προεπισκόπηση
    setColorValues(prev => ({
      ...prev,
      [itemKey]: color
    }));

    // Μετάφραση του itemKey σε target type για το script
    let targetType = '';
    if (itemKey === 'surfaces.primary') {
      targetType = 'surface';
    } else if (itemKey === 'texts.primary') {
      targetType = 'text.primary';
    } else if (itemKey === 'texts.secondary') {
      targetType = 'text.secondary';
    } else if (itemKey === 'icons.primary') {
      targetType = 'icons.primary';
    }

    // Δημιουργία του command για αυτό το συγκεκριμένο item
    const command = `node "C:\\layera\\tests-george\\change-color.js" ${targetType} "${color}"`;
    setCurrentCommand(command);
    setEditingItem(itemKey);
    setShowCommand(true);
  };

  const copyCommand = () => {
    if (commandRef.current) {
      commandRef.current.select();
      document.execCommand('copy');
      alert('✅ Command copied to clipboard!');
    }
  };

  const resetTestMode = () => {
    const confirmed = confirm('Θέλετε να απενεργοποιήσετε το Test Mode και να επιστρέψετε στα κανονικά χρώματα;');
    if (confirmed) {
      // Command για απενεργοποίηση test mode
      const command = `sed -i 's/"testMode": true/"testMode": false/g' "C:\\layera\\tests-george\\theme-test-george.json" && cd "C:\\layera\\packages\\tokens" && pnpm build`;
      alert(`Copy αυτό το command για reset:\n\n${command}`);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      size="lg"
      draggable={true}
      aria-labelledby="design-system-control-panel"
    >
      <ModalHeader title="🎛️ Design System Control Panel - George's Testing Hub" />
      <ModalContent>
        <Box style={{ padding: '24px', maxHeight: '80vh', overflowY: 'auto' }}>

          {/* Command Area */}
          {showCommand ? (
            <Box style={{
              backgroundColor: '#fff3cd',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #ffeaa7',
              marginBottom: '24px'
            }}>
              <Heading as="h4" size="md" weight="semibold" color="primary" style={{ marginBottom: '12px' }}>
                🧪 Copy και τρέξτε αυτό το command:
              </Heading>

              <textarea
                ref={commandRef}
                value={currentCommand}
                readOnly
                style={{
                  width: '100%',
                  height: '60px',
                  padding: '12px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: '#f8f9fa',
                  resize: 'none'
                }}
                onClick={(e) => e.currentTarget.select()}
              />

              <Box style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <Box
                  as="button"
                  onClick={copyCommand}
                  style={{
                    backgroundColor: '#28a745',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  📋 Copy Command
                </Box>

                <Box
                  as="button"
                  onClick={() => setShowCommand(false)}
                  style={{
                    backgroundColor: '#6c757d',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: '500'
                  }}
                >
                  ← Επιστροφή στον Πίνακα
                </Box>
              </Box>

              <Text size="sm" color="secondary" style={{ marginTop: '12px', fontStyle: 'italic' }}>
                Βήμα 1: Copy το command • Βήμα 2: Paste στο terminal • Βήμα 3: Refresh τη σελίδα (F5)
              </Text>
            </Box>
          ) : (
            <>
              {/* Header με controls */}
              <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e9ecef', paddingBottom: '16px' }}>
                <Box>
                  <Heading as="h3" size="lg" weight="bold" color="primary">
                    🎨 Design System Control Panel
                  </Heading>
                  <Text size="sm" color="secondary" style={{ marginTop: '4px' }}>
                    Πλήρης έλεγχος του Design System με Single Source of Truth
                  </Text>
                </Box>

                <Box
                  as="button"
                  onClick={resetTestMode}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '12px'
                  }}
                >
                  🔄 Reset Test Mode
                </Box>
              </Box>

              {/* Design System Categories */}
              {Object.entries(designSystemStructure).map(([categoryKey, category]) => (
                <Box key={categoryKey} style={{ marginBottom: '32px' }}>

                  {/* Category Header */}
                  <Box style={{
                    backgroundColor: '#f8f9fa',
                    padding: '16px',
                    borderRadius: '8px 8px 0 0',
                    border: '1px solid #dee2e6',
                    borderBottom: 'none'
                  }}>
                    <Heading as="h4" size="md" weight="semibold" color="primary">
                      {category.title}
                    </Heading>
                    <Text size="sm" color="secondary" style={{ marginTop: '4px' }}>
                      {category.description}
                    </Text>
                  </Box>

                  {/* Category Items */}
                  <Box style={{
                    border: '1px solid #dee2e6',
                    borderRadius: '0 0 8px 8px',
                    backgroundColor: 'white'
                  }}>
                    {Object.entries(category.items).map(([itemKey, item]) => (
                      <Box key={itemKey} style={{
                        padding: '20px',
                        borderBottom: '1px solid #f1f3f4',
                        display: 'grid',
                        gridTemplateColumns: '1fr auto auto',
                        gap: '16px',
                        alignItems: 'center'
                      }}>

                        {/* Item Info */}
                        <Box>
                          <Text size="md" weight="semibold" color="primary" style={{ marginBottom: '4px' }}>
                            {item.name}
                          </Text>
                          <Text size="sm" color="secondary" style={{ marginBottom: '8px' }}>
                            {item.description}
                          </Text>

                          {/* Source of Truth */}
                          <Box style={{
                            backgroundColor: '#e3f2fd',
                            padding: '8px 12px',
                            borderRadius: '4px',
                            marginBottom: '8px'
                          }}>
                            <Text size="xs" weight="medium" style={{ color: '#1565c0', marginBottom: '2px' }}>
                              📁 Single Source of Truth:
                            </Text>
                            <Text size="xs" style={{ fontFamily: 'monospace', color: '#1565c0' }}>
                              {item.sourceOfTruth}
                            </Text>
                          </Box>

                          {/* CSS Variable */}
                          <Box style={{
                            backgroundColor: '#f3e5f5',
                            padding: '8px 12px',
                            borderRadius: '4px'
                          }}>
                            <Text size="xs" weight="medium" style={{ color: '#7b1fa2', marginBottom: '2px' }}>
                              🎯 CSS Variable:
                            </Text>
                            <Text size="xs" style={{ fontFamily: 'monospace', color: '#7b1fa2' }}>
                              {item.variable}
                            </Text>
                          </Box>
                        </Box>

                        {/* Current Color Display */}
                        <Box style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <Box style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: colorValues[`${categoryKey}.${itemKey}`] || item.currentValue,
                            border: '2px solid #dee2e6',
                            borderRadius: '8px'
                          }} />
                          <Text size="xs" style={{ fontFamily: 'monospace', color: '#666' }}>
                            {colorValues[`${categoryKey}.${itemKey}`] || item.currentValue}
                          </Text>
                        </Box>

                        {/* Color Picker */}
                        <Box style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          <input
                            type="color"
                            value={colorValues[`${categoryKey}.${itemKey}`] || item.currentValue}
                            onChange={(e) => handleColorChange(`${categoryKey}.${itemKey}`, e.target.value)}
                            style={{
                              width: '50px',
                              height: '40px',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer'
                            }}
                            title="Κάντε κλικ για επιλογή χρώματος"
                          />
                        </Box>

                      </Box>
                    ))}
                  </Box>

                </Box>
              ))}

              {/* Footer Info */}
              <Box style={{
                backgroundColor: '#e8f5e8',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #c3e6c3',
                marginTop: '24px'
              }}>
                <Text size="sm" weight="medium" style={{ color: '#2e7d32', marginBottom: '8px' }}>
                  ℹ️ Πληροφορίες Test Mode
                </Text>
                <Text size="xs" style={{ color: '#388e3c', lineHeight: '1.4' }}>
                  • Όλες οι αλλαγές είναι προσωρινές και δεν επηρεάζουν την παραγωγή<br/>
                  • Test Mode: Ενεργό (testMode: true στο theme-test-george.json)<br/>
                  • Για επαναφορά: Κάντε κλικ στο "Reset Test Mode" ή διαγράψτε τον φάκελο tests-george
                </Text>
              </Box>
            </>
          )}

        </Box>
      </ModalContent>
    </Modal>
  );
};