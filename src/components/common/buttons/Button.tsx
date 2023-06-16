import { FC, ReactNode } from 'react';

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
      className={`buttonMain ${transparent ? 'transparent' : ''}`}
      type={type}>
      {children}
    </button>
  );
};

export default Button;
