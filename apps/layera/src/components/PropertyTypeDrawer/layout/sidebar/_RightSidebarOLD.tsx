import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';

export interface RightSidebarProps {
  rightSidebarOpen: boolean;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({ rightSidebarOpen }) => {
  return (
    <>
      {/* Right Secondary Sidebar - ΠΛΗΡΗΣ HTML MOCKUP */}
      {rightSidebarOpen && (
        <Box
          as="aside"
          className="layera-sidebar-secondary layera-sidebar-secondary--open layera-sidebar-secondary--right layera-sidebar-scrollable"
        >
          <Box className="layera-sidebar-content">
            <Heading data-size="md" data-weight="semibold">
              🎨 Style Controls
            </Heading>

          {/* 1. Complete 6-Color System */}
          <Box className="layera-control-group">
            <Heading data-size="sm" data-weight="medium" className="layera-control-group-title">
              🌈 6-Color System
            </Heading>

            <Box className="layera-color-control">
              <Text data-size="xs" className="layera-color-label">🔵 Primary</Text>
              <Flex className="layera-color-input-group">
                <input type="color" defaultValue="#4A90E2" className="layera-color-picker" />
                <input type="text" defaultValue="#4A90E2" className="layera-color-hex-input" />
              </Flex>
            </Box>

            <Box className="layera-color-control">
              <Text data-size="xs" className="layera-color-label">🟣 Secondary</Text>
              <Flex className="layera-color-input-group">
                <input type="color" defaultValue="#9013FE" className="layera-color-picker" />
                <input type="text" defaultValue="#9013FE" className="layera-color-hex-input" />
              </Flex>
            </Box>

            <Box className="layera-color-control">
              <Text data-size="xs" className="layera-color-label">🟢 Success</Text>
              <Flex className="layera-color-input-group">
                <input type="color" defaultValue="#4CAF50" className="layera-color-picker" />
                <input type="text" defaultValue="#4CAF50" className="layera-color-hex-input" />
              </Flex>
            </Box>

            <Box className="layera-color-control">
              <Text data-size="xs" className="layera-color-label">🟡 Warning</Text>
              <Flex className="layera-color-input-group">
                <input type="color" defaultValue="#FF9800" className="layera-color-picker" />
                <input type="text" defaultValue="#FF9800" className="layera-color-hex-input" />
              </Flex>
            </Box>

            <Box className="layera-color-control">
              <Text data-size="xs" className="layera-color-label">🔴 Danger</Text>
              <Flex className="layera-color-input-group">
                <input type="color" defaultValue="#F44336" className="layera-color-picker" />
                <input type="text" defaultValue="#F44336" className="layera-color-hex-input" />
              </Flex>
            </Box>

            <Box className="layera-color-control">
              <Text data-size="xs" className="layera-color-label">🔵 Info</Text>
              <Flex className="layera-color-input-group">
                <input type="color" defaultValue="#2196F3" className="layera-color-picker" />
                <input type="text" defaultValue="#2196F3" className="layera-color-hex-input" />
              </Flex>
            </Box>

            <Box className="layera-target-selector">
              <Text data-size="xs" className="layera-color-label">🎯 Apply To:</Text>
              <Flex className="layera-target-grid">
                <Button size="xs" variant="ghost" className="layera-target-btn layera-target-btn--active">🌍 All</Button>
                <Button size="xs" variant="ghost" className="layera-target-btn">🃏 Cards</Button>
                <Button size="xs" variant="ghost" className="layera-target-btn">🔘 Buttons</Button>
                <Button size="xs" variant="ghost" className="layera-target-btn">🪟 Modals</Button>
                <Button size="xs" variant="ghost" className="layera-target-btn">📊 Tables</Button>
                <Button size="xs" variant="ghost" className="layera-target-btn">📋 Header</Button>
              </Flex>
            </Box>
          </Box>

          {/* 2. Advanced Typography Controls */}
          <Box className="layera-control-group">
            <Heading data-size="sm" data-weight="medium">📝 Typography</Heading>

            <Box className="layera-typography-control">
              <Text data-size="xs" className="layera-color-label">Font Family</Text>
              <select className="layera-typography-select">
                <option value="Arial, sans-serif">Arial</option>
                <option value="'Segoe UI', sans-serif">Segoe UI</option>
                <option value="'Roboto', sans-serif">Roboto</option>
                <option value="'Inter', sans-serif">Inter</option>
                <option value="'Georgia', serif">Georgia</option>
                <option value="'Courier New', monospace">Courier New</option>
              </select>
            </Box>

            <Box className="layera-typography-control">
              <Text data-size="xs" className="layera-color-label">Base Font Size</Text>
              <Flex className="layera-range-group">
                <input type="range" min="12" max="24" defaultValue="16" className="layera-range-input" />
                <Text data-size="xs" className="layera-range-value">16px</Text>
              </Flex>
            </Box>

            <Box className="layera-typography-control">
              <Text data-size="xs" className="layera-color-label">Header Size</Text>
              <Flex className="layera-range-group">
                <input type="range" min="18" max="36" defaultValue="24" className="layera-range-input" />
                <Text data-size="xs" className="layera-range-value">24px</Text>
              </Flex>
            </Box>

            <Box className="layera-typography-control">
              <Text data-size="xs" className="layera-color-label">Font Weight</Text>
              <select className="layera-typography-select">
                <option value="300">Light (300)</option>
                <option value="400">Normal (400)</option>
                <option value="500">Medium (500)</option>
                <option value="600">SemiBold (600)</option>
                <option value="700">Bold (700)</option>
              </select>
            </Box>

            <Box className="layera-typography-control">
              <Text data-size="xs" className="layera-color-label">Line Height</Text>
              <Flex className="layera-range-group">
                <input type="range" min="1" max="2" step="0.1" defaultValue="1.5" className="layera-range-input" />
                <Text data-size="xs" className="layera-range-value">1.5</Text>
              </Flex>
            </Box>

            <Box className="layera-typography-control">
              <Text data-size="xs" className="layera-color-label">Text Color</Text>
              <Flex className="layera-color-input-group">
                <input type="color" defaultValue="#2c3e50" className="layera-color-picker" />
                <input type="text" defaultValue="#2c3e50" className="layera-color-hex-input" />
              </Flex>
            </Box>
          </Box>

          {/* 3. Component Sizes Controls */}
          <Box className="layera-control-group">
            <Heading data-size="sm" data-weight="medium">📏 Component Sizes</Heading>

            <Box className="layera-typography-control">
              <Text data-size="xs" className="layera-color-label">Button Size</Text>
              <Flex className="layera-range-group">
                <input type="range" min="24" max="56" defaultValue="36" className="layera-range-input" />
                <Text data-size="xs" className="layera-range-value">36px</Text>
              </Flex>
            </Box>

            <Box className="layera-typography-control">
              <Text data-size="xs" className="layera-color-label">Button Padding</Text>
              <Flex className="layera-range-group">
                <input type="range" min="8" max="32" defaultValue="16" className="layera-range-input" />
                <Text data-size="xs" className="layera-range-value">16px</Text>
              </Flex>
            </Box>

            <Box className="layera-typography-control">
              <Text data-size="xs" className="layera-color-label">Button Font Size</Text>
              <Flex className="layera-range-group">
                <input type="range" min="10" max="20" defaultValue="14" className="layera-range-input" />
                <Text data-size="xs" className="layera-range-value">14px</Text>
              </Flex>
            </Box>

            <Box className="layera-typography-control">
              <Text data-size="xs" className="layera-color-label">Card Min Height</Text>
              <Flex className="layera-range-group">
                <input type="range" min="80" max="200" defaultValue="120" className="layera-range-input" />
                <Text data-size="xs" className="layera-range-value">120px</Text>
              </Flex>
            </Box>

            <Box className="layera-typography-control">
              <Text data-size="xs" className="layera-color-label">Modal Width</Text>
              <Flex className="layera-range-group">
                <input type="range" min="300" max="600" defaultValue="400" className="layera-range-input" />
                <Text data-size="xs" className="layera-range-value">400px</Text>
              </Flex>
            </Box>
          </Box>

          {/* 4. Border Radius per Component */}
          <Box className="layera-control-group">
            <Heading data-size="sm" data-weight="medium">🔄 Border Radius per Component</Heading>

            <Box className="layera-typography-control">
              <Text data-size="xs" className="layera-color-label">🃏 Cards Radius</Text>
              <Flex className="layera-range-group">
                <input type="range" min="0" max="32" defaultValue="8" className="layera-range-input" />
                <Text data-size="xs" className="layera-range-value">8px</Text>
              </Flex>
            </Box>
          </Box>
          </Box>
        </Box>
      )}
    </>
  );
};