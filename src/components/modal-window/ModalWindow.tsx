import { FC } from 'react';
import Button from '../common/buttons/Button';
import ImgSuccessRequest from '../images/ImgSuccessRequest';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/routes';
import ImgRejectedRequest from '../images/ImgRejectedRequest';

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
    <div className="modal">
      <div className="modal-content">
        {isSuccess ? (
          <>
            <div className="modal-content__title">Форма успешно отправлена</div>
            <div className="modal-content__image">
              <ImgSuccessRequest />
            </div>
            <Button type="button" handleClick={handleClickSuccess}>
              На главную
            </Button>
          </>
        ) : (
          <>
            <div className="modal-content__title">Ошибка</div>
            <div className="modal-content__image">
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
