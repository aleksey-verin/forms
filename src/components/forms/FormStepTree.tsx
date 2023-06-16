import { Formik, Field, Form } from 'formik';
import { FC, useState } from 'react';
import Button from '../common/buttons/Button';
import {
  selectorForm,
  setCurrentStep,
  setStepThreeData
} from '../../store/reducers/formData/formSlice';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { countCharactersWithoutSpaces } from '../../utils/helpers';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import ModalWindow from '../modalWindow/ModalWindow';
import { stepThreeSchema } from '../../utils/validation/validation';
import s from './formsStyles.module.scss';
import Loader from '../common/loader/Loader';

const FormStepTree: FC = () => {
  const dispatch = useAppDispatch();
  const {
    formData: {
      stepThree: { about }
    }
  } = useSelector(selectorForm);

  const [showModal, setShowModal] = useState(false);

  // const navigate = useNavigate();
  const isSuccess = true;

  return (
    <Formik
      initialValues={{
        about: about
      }}
      validationSchema={stepThreeSchema}
      validateOnBlur
      onSubmit={(values) => {
        dispatch(setStepThreeData(values));
        // dispatch(setCurrentStep(2));
        console.log(values);
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
              handleClick={() => {
                dispatch(setStepThreeData(values));
                dispatch(setCurrentStep(2));
              }}
              type="button"
              transparent={true}>
              Назад
            </Button>
            <Button type="submit">
              Отправить
              <Loader />
            </Button>
          </div>
          <button style={{ backgroundColor: 'white' }} onClick={() => setShowModal(true)}>
            Show modal using a portal
          </button>
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
