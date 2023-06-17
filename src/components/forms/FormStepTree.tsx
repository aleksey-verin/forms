import { Formik, Field, Form } from 'formik';
import { FC, useState } from 'react';
import Button from '../common/buttons/Button';
import {
  selectorForm,
  sendData,
  setCurrentStep,
  setStepThreeData
} from '../../store/reducers/formData/formSlice';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { countCharactersWithoutSpaces } from '../../utils/helpers';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import ModalWindow from '../common/modalWindow/ModalWindow';
import { stepThreeSchema } from '../../utils/validation/validation';
import s from './formsStyles.module.scss';
import Loader from '../common/loader/Loader';

const FormStepTree: FC = () => {
  const dispatch = useAppDispatch();
  const {
    formData: { stepZero, stepOne, stepTwo, stepThree },
    sendData: { isLoading, isSuccess }
  } = useSelector(selectorForm);

  const [showModal, setShowModal] = useState(false);

  // const navigate = useNavigate();
  // const isSuccess = true;

  return (
    <Formik
      initialValues={{
        about: stepThree.about
      }}
      validationSchema={stepThreeSchema}
      validateOnBlur
      onSubmit={async (values) => {
        dispatch(setStepThreeData(values));
        await dispatch(sendData({ ...stepZero, ...stepOne, ...stepTwo, ...values }));
        setShowModal(true);
      }}>
      {({ values, errors, touched }) => (
        <Form className={s.form}>
          <label className={s.aboutField}>
            About
            <Field
              as={'textarea'}
              className={errors.about && touched.about ? s.error : ''}
              type={'text'}
              name={'about'}
              placeholder={'about'}
            />
            {errors.about && touched.about ? (
              <div className={s.fieldError}>{errors.about}</div>
            ) : null}
            <div
              className={
                s.fieldTip
              }>{`Characters without spaces (max - 200): ${countCharactersWithoutSpaces(
              values.about
            )}`}</div>
          </label>

          <div className={s.buttons}>
            <Button
              disabled={isLoading}
              handleClick={() => {
                dispatch(setStepThreeData(values));
                dispatch(setCurrentStep(2));
              }}
              type="button"
              transparent={true}>
              Назад
            </Button>
            <Button type="submit" disabled={isLoading}>
              Отправить
              {isLoading && <Loader />}
            </Button>
          </div>
          {showModal &&
            createPortal(
              <ModalWindow onClose={() => setShowModal(false)} isSuccess={isSuccess} />,
              document.body
            )}
        </Form>
      )}
    </Formik>
  );
};

export default FormStepTree;
