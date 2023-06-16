import { ROUTES } from '@/routes/routes';
import { setStepZeroData, setCurrentStep, selectorForm } from '@/store/reducers/formData/formSlice';
import { stepZeroSchema } from '@/utils/validation/validation';
import { Formik, Field, Form } from 'formik';
import { FC } from 'react';
import Button from '../common/buttons/Button';
import { useAppDispatch } from '@/utils/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import s from './formsStyles.module.scss';

const FormStepInitial: FC = () => {
  const dispatch = useAppDispatch();
  const {
    formData: {
      stepZero: { email, phone }
    }
  } = useSelector(selectorForm);

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        phone: phone ?? '',
        email: email ?? ''
      }}
      validationSchema={stepZeroSchema}
      validateOnBlur
      onSubmit={(values) => {
        dispatch(setStepZeroData(values));
        dispatch(setCurrentStep(1));
        navigate(ROUTES.createPage);
      }}>
      {({ errors, touched, handleChange, handleBlur }) => (
        <Form className={s.form}>
          <label>
            Номер телефона
            <InputMask
              className={errors.phone && touched.phone ? s.error : ''}
              type={'text'}
              mask="+7 (999) 999-99-99"
              name={'phone'}
              placeholder={'+7 (999) 999-99-99'}
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={phone ?? ''}
            />
            {errors.phone && touched.phone ? (
              <div className="field-error">{errors.phone}</div>
            ) : null}
          </label>
          <label>
            Email
            <Field
              className={errors.email && touched.email ? s.error : ''}
              type={'text'}
              name={'email'}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder={'verevaa@yandex.ru'}
            />
            {errors.email && touched.email ? (
              <div className={s.fieldError}>{errors.email}</div>
            ) : null}
          </label>
          <div className={s.buttons}>
            <Button type="submit">Начать</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormStepInitial;
