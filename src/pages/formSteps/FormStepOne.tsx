import { Formik, Field, Form } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';
import Button from '../../components/common/buttons/Button';
import { ROUTES } from '../../routes/routes';
import { setStepOneData, setCurrentStep, selectorForm } from '../../store/reducers/formSlice';
import {
  validationMacLength,
  onlyLettersAndDigitsRegExp,
  onlyLettersRegExp
} from '../../utils/constants/validation';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const stepOneSchema = yup.object().shape({
  nickname: yup
    .string()
    .trim('')
    .max(validationMacLength.nickname, 'Too Long!')
    .matches(onlyLettersAndDigitsRegExp)
    .required('Required'),
  name: yup
    .string()
    .trim('')
    .max(validationMacLength.name, 'Too Long!')
    .matches(onlyLettersRegExp)
    .required('Required'),
  surname: yup
    .string()
    .trim('')
    .max(validationMacLength.surname, 'Too Long!')
    .matches(onlyLettersRegExp)
    .required('Required'),
  gender: yup.string().required('Required!')
});

const FormStepOne: FC = () => {
  const dispatch = useAppDispatch();
  const {
    formData: {
      stepOne: { nickname, name, surname, gender }
    }
  } = useSelector(selectorForm);

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        nickname: nickname,
        name: name,
        surname: surname,
        gender: gender
      }}
      validationSchema={stepOneSchema}
      validateOnBlur
      onSubmit={(values) => {
        dispatch(setStepOneData(values));
        dispatch(setCurrentStep(2));
        console.log(values);
      }}>
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form className="create-form">
          <label>
            Nickname
            <Field
              className={errors.nickname && touched.nickname ? 'error' : ''}
              type={'text'}
              name={'nickname'}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={'Nickname'}
            />
            {errors.nickname && touched.nickname ? (
              <div className="field-error">{errors.nickname}</div>
            ) : null}
            <div className="field-tip">Tip is here</div>
          </label>
          <label>
            Name
            <Field
              className={errors.name && touched.name ? 'error' : ''}
              type={'text'}
              name={'name'}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={'Name'}
            />
            {errors.name && touched.name ? <div className="field-error">{errors.name}</div> : null}
            <div className="field-tip">Tip is here</div>
          </label>
          <label>
            Surname
            <Field
              className={errors.surname && touched.surname ? 'error' : ''}
              type={'text'}
              name={'surname'}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={'Surname'}
            />
            {errors.surname && touched.surname ? (
              <div className="field-error">{errors.surname}</div>
            ) : null}
            <div className="field-tip">Tip is here</div>
          </label>
          <label>
            Gender
            <Field
              as={'select'}
              className={`${errors.gender && touched.gender ? 'error' : ''} ${
                !values.gender.length ? 'empty' : ''
              }`}
              type={'text'}
              name={'gender'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.gender}
              placeholder={'Gender'}>
              <option value="">Не выбрано</option>
              <option value={'male'}>Male</option>
              <option value={'female'}>Female</option>
            </Field>
            {errors.gender && touched.gender ? (
              <div className="field-error">{errors.gender}</div>
            ) : null}
            <div className="field-tip">Tip is here</div>
          </label>
          <div className="create-form__buttons">
            <Button
              handleClick={() => {
                dispatch(setStepOneData(values));
                dispatch(setCurrentStep('initial')); // проверить надо ли
                navigate(ROUTES.mainPage);
              }}
              type="button"
              text="Назад"
              transparent={true}
            />
            <Button type="submit" text="Далее" />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormStepOne;
