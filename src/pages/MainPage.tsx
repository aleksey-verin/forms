import { FC } from 'react';
import ImgFolder from '../components/images/ImgFolder';
import Button from '../components/common/buttons/Button';

interface MainPageProps {}

const MainPage: FC<MainPageProps> = () => {
  return (
    <main className="main">
      <div className="main-title">
        <div className="main-title__avatar">
          <div>А</div>
          <div>В</div>
        </div>
        <div className="main-info">
          <div className="main-info__name">Алексей Верин</div>
          <div className="main-info__links">
            <a href="http://">
              <ImgFolder />
              Telegram
            </a>
            <a href="http://">
              <ImgFolder />
              GitHub
            </a>
            <a href="http://">
              <ImgFolder />
              Resume
            </a>
          </div>
        </div>
      </div>
      <form className="main-form">
        <label htmlFor="phone">Номер телефона</label>
        <input type="text" id="phone" placeholder="+7 999 999-99-99" />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" placeholder="verevaa@yandex.ru" />
        <Button type="submit" text="Начать" />
      </form>
    </main>
  );
};

export default MainPage;
