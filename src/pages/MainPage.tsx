import { FC } from 'react';
import ImgFolder from '../components/images/ImgFolder';
import Button from '../components/common/buttons/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import { useAppDispatch } from '../utils/hooks/useAppDispatch';
import { Field, Form, Formik } from 'formik';
import * as yup from 'yup';
import { selectorForm, setCurrentStep, setStepZeroData } from '../store/reducers/formSlice';
import { useSelector } from 'react-redux';
import { emailRegExp, phoneRegex } from '../utils/constants/validation';
import InputMask from 'react-input-mask';

const stepZeroSchema = yup.object().shape({
  phone: yup
    .string()
    // .trim('')
    // // .max(40, 'Too Long!')
    .matches(phoneRegex, 'Enter the phone in the format "+7 (XXX) XXX-XX-XX"')
    .required('Enter the phone in the format "+7 (XXX) XXX-XX-XX"'),
  // email: yup.string().email('Invalid email').required('Required')
  email: yup
    .string()
    .trim('')
    // .max(validationMacLength.nickname, 'Too Long!')
    .matches(emailRegExp, 'Enter the email in the format "example@domain.com"')
    .required('Enter the email in the format "example@domain.com"')
});

interface MainPageProps {}

const MainPage: FC<MainPageProps> = () => {
  const dispatch = useAppDispatch();
  const {
    formData: {
      stepZero: { email, phone }
    }
    // formStep
  } = useSelector(selectorForm);

  const navigate = useNavigate();

  return (
    <main className="main">
      {/* <div>{`Current step: ${formStep}`}</div> */}
      <div className="main-title">
        <div className="main-title__avatar">
          <div>А</div>
          <div>В</div>
        </div>
        <div className="main-info">
          <div className="main-info__name">Алексей Верин</div>
          <div className="main-info__links">
            <a href="http://">
              <ImgFolder />
              Telegram
            </a>
            <a href="http://">
              <ImgFolder />
              GitHub
            </a>
            <a href="http://">
              <ImgFolder />
              Resume
            </a>
          </div>
        </div>
      </div>
      <Formik
        initialValues={{
          phone: phone ?? '',
          email: email ?? '',
          phoneNum: ''
        }}
        validationSchema={stepZeroSchema}
        validateOnBlur
        onSubmit={(values) => {
          dispatch(setStepZeroData(values));
          dispatch(setCurrentStep(1)); // подумать нужно ли
          navigate(ROUTES.createPage);
        }}>
        {({ errors, touched, handleChange, handleBlur }) => (
          <Form className="create-form">
            <label>
              Номер телефона
              <InputMask
                className={errors.phone && touched.phone ? 'error' : ''}
                type={'text'}
                mask="+7 (999) 999-99-99"
                name="phone"
                placeholder={'+7 999 999-99-99'}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.phone && touched.phone ? (
                <div className="field-error">{errors.phone}</div>
              ) : null}
            </label>
            <label>
              Email
              <Field
                // className={s.inputSteps}
                className={errors.email && touched.email ? 'error' : ''}
                type={'text'}
                name={'email'}
                onChange={handleChange}
                onBlur={handleBlur}
                // value={email ? email : ''}
                placeholder={'verevaa@yandex.ru'}
              />
              {errors.email && touched.email ? (
                <div className="field-error">{errors.email}</div>
              ) : null}
            </label>
            <div className="create-form__buttons">
              <Button type="submit" text="Начать" />
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default MainPage;
