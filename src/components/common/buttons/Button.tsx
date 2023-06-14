import { FC, ReactNode } from 'react';

interface ButtonProps {
  type: 'submit' | 'button';
  text?: string;
  transparent?: boolean;
  image?: ReactNode;
}

const Button: FC<ButtonProps> = ({ type, text, transparent = false, image }) => {
  return (
    <button className={`buttonMain ${transparent ? 'transparent' : ''}`} type={type}>
      {image}
      {text}
    </button>
  );
};

export default Button;
