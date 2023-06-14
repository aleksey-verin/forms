import { FC, ReactNode } from 'react';

interface ButtonProps {
  type: 'submit' | 'button';
  text?: string;
  transparent?: boolean;
  image?: ReactNode;
  handleClick?: () => void;
}

const Button: FC<ButtonProps> = ({ type, text, transparent = false, image, handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className={`buttonMain ${transparent ? 'transparent' : ''}`}
      type={type}>
      {image}
      {text}
    </button>
  );
};

export default Button;
