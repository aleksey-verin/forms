import { FC, ReactNode } from 'react';
import s from './LayoutContainer.module.scss';

interface LayoutContainerProps {
  children: ReactNode;
}

const LayoutContainer: FC<LayoutContainerProps> = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};

export default LayoutContainer;
