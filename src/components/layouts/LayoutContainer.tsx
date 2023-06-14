import { FC, ReactNode } from 'react';

interface LayoutContainerProps {
  children: ReactNode;
}

const LayoutContainer: FC<LayoutContainerProps> = ({ children }) => {
  return (
    <div className="container">
      <div className="wrapper">{children}</div>
    </div>
  );
};

export default LayoutContainer;
