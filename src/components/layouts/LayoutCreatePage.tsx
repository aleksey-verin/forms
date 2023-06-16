import { FC, ReactNode } from 'react';
import s from './LayoutCreatePage.module.scss';

interface LayoutCreatePageProps {
  children: ReactNode;
}

const LayoutCreatePage: FC<LayoutCreatePageProps> = ({ children }) => {
  return <main className={s.createPage}>{children}</main>;
};

export default LayoutCreatePage;
