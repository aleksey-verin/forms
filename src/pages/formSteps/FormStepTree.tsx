import { Formik, Field, Form } from 'formik';
import { FC, useState } from 'react';
import Button from '../../components/common/buttons/Button';
import {
  selectorForm,
  setCurrentStep,
  setStepThreeData
} from '../../store/reducers/formData/formSlice';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { countCharactersWithoutSpaces } from '../../utils/helpers';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import ModalWindow from '../../components/modal-window/ModalWindow';
import { stepThreeSchema } from '../../utils/validation/validation';

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
        <Form className="create-form">
          <label className="about-field">
            About
            <Field
              as={'textarea'}
              className={errors.about && touched.about ? 'error' : ''}
              type={'text'}
              name={'about'}
              placeholder={'about'}
            />
            {errors.about && touched.about ? (
              <div className="field-error">{errors.about}</div>
            ) : null}
            <div className="field-tip">{`Characters without spaces (max - 200): ${countCharactersWithoutSpaces(
              values.about
            )}`}</div>
          </label>

          <div className="create-form__buttons">
            <Button
              handleClick={() => {
                dispatch(setStepThreeData(values));
                dispatch(setCurrentStep(2));
              }}
              type="button"
              transparent={true}>
              Назад
            </Button>
            <Button type="submit">Отправить</Button>
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
