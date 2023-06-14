import { FC } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import CreatePage from '../pages/CreatePage';
import { ROUTES } from '../routes/routes';

const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainPage />} path={ROUTES.mainPage} />
        <Route element={<CreatePage />} path={ROUTES.createPage} />
        <Route path="*" element={<Navigate replace to={ROUTES.mainPage} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
