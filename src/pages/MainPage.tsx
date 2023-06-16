import { FC } from 'react';
import UserInfo from '@/components/userInfo/UserInfo';
import FormStepInitial from '@/components/forms/FormStepInitial';
import LayoutMainPage from '@/components/layouts/LayoutMainPage';

const MainPage: FC = () => {
  return (
    <LayoutMainPage>
      <UserInfo />
      <FormStepInitial />
    </LayoutMainPage>
  );
};

export default MainPage;
