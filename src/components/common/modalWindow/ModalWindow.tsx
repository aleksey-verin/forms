import { FC } from 'react';
import Button from '../buttons/Button';
import ImgSuccessRequest from '../../images/ImgSuccessRequest';
import ImgRejectedRequest from '../../images/ImgRejectedRequest';
import s from './ModalWindow.module.scss';
import { useAppDispatch } from '@/utils/hooks/useAppDispatch';
import { resetFormData } from '@/store/reducers/formData/formSlice';
import { clearLocalStorageData, storage } from '@/utils/storage/storage';

interface ModalWindowProps {
  onClose: () => void;
  isSuccess: boolean;
}

const ModalWindow: FC<ModalWindowProps> = ({ onClose, isSuccess }) => {
  const dispatch = useAppDispatch();

  const handleClickSuccess = async () => {
    dispatch(resetFormData());
    await clearLocalStorageData(storage);
    onClose();
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
