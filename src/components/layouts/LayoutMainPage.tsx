import { FC, ReactNode } from 'react';
import s from './LayoutMainPage.module.scss';

interface LayoutMainPageProps {
  children: ReactNode;
}

const LayoutMainPage: FC<LayoutMainPageProps> = ({ children }) => {
  return <main className={s.mainPage}>{children}</main>;
};

export default LayoutMainPage;
