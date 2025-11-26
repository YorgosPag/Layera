import React from 'react';
import { Flex } from '@layera/layout';
import { Button } from '@layera/buttons';

export interface ColorButtonGroupProps {
  activeColor: string;
  onColorChange: (color: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info') => void;
}

export const ColorButtonGroup: React.FC<ColorButtonGroupProps> = ({
  activeColor,
  onColorChange
}) => {
  return (
    <Flex className="layera-color-btn-group">
      {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map((color) => (
        <Button
          key={color}
          variant="ghost"
          size="sm"
          className={`layera-color-btn layera-color-btn--${color} ${activeColor === color ? 'layera-color-btn--active' : ''}`}
          onClick={() => onColorChange(color)}
        >
          {color === 'primary' ? 'P' : color === 'secondary' ? 'S' : color === 'success' ? 'Su' : color === 'warning' ? 'W' : color === 'danger' ? 'D' : 'I'}
        </Button>
      ))}
    </Flex>
  );
};