import { Formik, Field, Form } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';
import Button from '../../components/common/buttons/Button';
import { selectorForm, setCurrentStep, setStepThreeData } from '../../store/reducers/formSlice';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
// import { useNavigate } from 'react-router-dom';
import { countCharactersWithoutSpaces } from '../../utils/helpers';
import { useSelector } from 'react-redux';

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
      {({
        values,
        errors,
        touched
        // handleChange,
        // handleBlur
        // isValid,
        // dirty,
        // handleSubmit
      }) => (
        <Form className="create-form">
          <label className="about-field">
            About
            {/* <Field name="about">
              {({
                field // { name, value, onChange, onBlur }
              }: // form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
              // meta
              FieldProps) => <textarea placeholder="about" {...field} />}
            </Field> */}
            <Field
              as={'textarea'}
              className={errors.about && touched.about ? 'error' : ''}
              type={'text'}
              name={'about'}
              // onChange={handleChange}
              // onBlur={handleBlur}
              // value={values.nickname}
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
        </Form>
      )}
    </Formik>
  );
};

export default FormStepTree;
