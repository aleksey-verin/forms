import { FC, ReactNode } from 'react';
import s from './Button.module.scss';

interface ButtonProps {
  type: 'submit' | 'button';
  disabled?: boolean;
  transparent?: boolean;
  handleClick?: () => void;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({
  type,
  transparent = false,
  handleClick,
  disabled = false,
  children
}) => {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className={`${s.buttonMain} ${transparent ? s.transparent : ''}`}
      type={type}>
      {children}
    </button>
  );
};

export default Button;
