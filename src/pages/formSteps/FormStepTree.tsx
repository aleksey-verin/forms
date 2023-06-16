import { Formik, Field, Form } from 'formik';
import { FC, useState } from 'react';
import * as yup from 'yup';
import Button from '../../components/common/buttons/Button';
import { selectorForm, setCurrentStep, setStepThreeData } from '../../store/reducers/formSlice';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
// import { useNavigate } from 'react-router-dom';
import { countCharactersWithoutSpaces } from '../../utils/helpers';
import { useSelector } from 'react-redux';
import { createPortal } from 'react-dom';
import ModalWindow from '../../components/modal-window/ModalWindow';

const stepOneSchema = yup.object().shape({
  about: yup
    .string()
    .test(
      'maxCharacters',
      'Длина сообщения не должна превышать 200 символов без пробелов',
      (value) => {
        if (value) {
          const stringWithoutSpaces = value.replace(/\s/g, '');
          return stringWithoutSpaces.length <= 20;
        }
        return true; // Разрешаем пустое значение (необязательное поле)
      }
    )
    .required('Required!')
});

const FormStepTree: FC = () => {
  const dispatch = useAppDispatch();
  const {
    formData: {
      stepThree: { about }
    }
  } = useSelector(selectorForm);

  const [showModal, setShowModal] = useState(false);

  // const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        about: about
      }}
      validationSchema={stepOneSchema}
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
            <div className="field-tip">{`Characters without spaces: ${countCharactersWithoutSpaces(
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
              text="Назад"
              transparent={true}
            />
            <Button type="submit" text="Отправить" />
          </div>
          <button style={{ backgroundColor: 'white' }} onClick={() => setShowModal(true)}>
            Show modal using a portal
          </button>
          {showModal &&
            createPortal(<ModalWindow onClose={() => setShowModal(false)} />, document.body)}
        </Form>
      )}
    </Formik>
  );
};

export default FormStepTree;
