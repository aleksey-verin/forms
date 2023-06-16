import { FC } from 'react';
import Button from '../common/buttons/Button';
import ImgSuccessRequest from '../images/ImgSuccessRequest';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import ImgRejectedRequest from '../images/ImgRejectedRequest';
import s from './ModalWindow.module.scss';

interface ModalWindowProps {
  onClose: () => void;
  isSuccess: boolean;
}

const ModalWindow: FC<ModalWindowProps> = ({ onClose, isSuccess }) => {
  const navigate = useNavigate();

  const handleClickSuccess = () => {
    onClose();
    navigate(ROUTES.mainPage);
  };

  return (
    <div className={s.modal}>
      <div className={s.content}>
        {isSuccess ? (
          <>
            <div className={s.title}>Форма успешно отправлена</div>
            <div>
              <ImgSuccessRequest />
            </div>
            <Button type="button" handleClick={handleClickSuccess}>
              На главную
            </Button>
          </>
        ) : (
          <>
            <div className={s.title}>Ошибка</div>
            <div>
              <ImgRejectedRequest />
            </div>
            <Button type="button" handleClick={onClose}>
              Закрыть
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalWindow;
