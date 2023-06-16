import { FC } from 'react';
import ImgFolder from '../images/ImgFolder';
import s from './UserInfo.module.scss';

const UserInfo: FC = () => {
  return (
    <div className={s.container}>
      <div className={s.avatar}>
        <div>А</div>
        <div>В</div>
      </div>
      <div className={s.info}>
        <div className={s.name}>Алексей Верин</div>
        <div className={s.links}>
          <a target="_blank" href="http://t.me/verevaa">
            <ImgFolder />
            Telegram
          </a>
          <a target="_blank" href="https://github.com/aleksey-verin">
            <ImgFolder />
            GitHub
          </a>
          <a target="_blank" href="./Aleksey Verin - Frontend - CV.pdf">
            <ImgFolder />
            Resume
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
