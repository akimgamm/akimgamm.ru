import React from 'react';
import { Button as AntButton } from 'antd';

import './button.css';

export interface ButtonProps {
  type: "primary" | "dashed" | "text" | "link"
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'middle' | 'large';
  /** Button contents */
  text: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
  type,
  size = 'middle',
  text,
  onClick,
}: ButtonProps) => {
  return (
    <AntButton onClick={onClick} type={type} size={size}>
      {text}
    </AntButton>

  );
};
