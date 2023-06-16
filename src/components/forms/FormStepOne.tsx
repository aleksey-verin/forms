import { Formik, Field, Form } from 'formik';
import { FC } from 'react';
import Button from '../common/buttons/Button';
import { ROUTES } from '../../routes/routes';
import {
  selectorForm,
  setCurrentStep,
  setStepOneData
} from '../../store/reducers/formData/formSlice';
import { stepOneSchema } from '../../utils/validation/validation';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from './formsStyles.module.scss';

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
        <Form className={s.form}>
          <label>
            Nickname
            <Field
              className={errors.nickname && touched.nickname ? s.error : ''}
              type={'text'}
              name={'nickname'}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={'Nickname'}
            />
            {errors.nickname && touched.nickname ? (
              <div className={s.fieldError}>{errors.nickname}</div>
            ) : null}
            <div className={s.fieldTip}>Tip is here</div>
          </label>
          <label>
            Name
            <Field
              className={errors.name && touched.name ? s.error : ''}
              type={'text'}
              name={'name'}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={'Name'}
            />
            {errors.name && touched.name ? <div className={s.fieldError}>{errors.name}</div> : null}
            <div className={s.fieldTip}>Tip is here</div>
          </label>
          <label>
            Surname
            <Field
              className={errors.surname && touched.surname ? s.error : ''}
              type={'text'}
              name={'surname'}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={'Surname'}
            />
            {errors.surname && touched.surname ? (
              <div className={s.fieldError}>{errors.surname}</div>
            ) : null}
            <div className={s.fieldTip}>Tip is here</div>
          </label>
          <label>
            Gender
            <Field
              as={'select'}
              className={`${errors.gender && touched.gender ? s.error : ''} ${
                !values.gender.length ? s.empty : ''
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
              <div className={s.fieldError}>{errors.gender}</div>
            ) : null}
            <div className={s.fieldTip}>Tip is here</div>
          </label>
          <div className={s.buttons}>
            <Button
              handleClick={() => {
                dispatch(setStepOneData(values));
                dispatch(setCurrentStep('initial')); // проверить надо ли
                navigate(ROUTES.mainPage);
              }}
              type="button"
              transparent={true}>
              Назад
            </Button>
            <Button type="submit">Далее</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormStepOne;
