import { FC, ReactNode } from 'react';
import s from './Button.module.scss';

interface ButtonProps {
  type: 'submit' | 'button';
  // text?: string;
  transparent?: boolean;
  // image?: ReactNode;
  handleClick?: () => void;
  children: ReactNode;
}

const Button: FC<ButtonProps> = ({ type, transparent = false, handleClick, children }) => {
  return (
    <button
      onClick={handleClick}
      // className={`buttonMain ${transparent ? 'transparent' : ''}`}
      className={`${s.buttonMain} ${transparent ? s.transparent : ''}`}
      type={type}>
      {children}
    </button>
  );
};

export default Button;
