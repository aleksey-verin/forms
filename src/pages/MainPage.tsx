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

const stepZeroSchema = yup.object().shape({
  phone: yup
    .string()
    .trim('')
    .max(40, 'Too Long!')
    // .matches(onlyLettersRegExp)
    .required('Required'),
  email: yup.string().email('Invalid email').required('Required')
});

interface MainPageProps {}

const MainPage: FC<MainPageProps> = () => {
  const dispatch = useAppDispatch();
  const {
    formData: {
      stepZero: { email, phone }
    },
    formStep
  } = useSelector(selectorForm);

  const navigate = useNavigate();

  return (
    <main className="main">
      <div>{`Current step: ${formStep}`}</div>
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
          email: email ?? ''
        }}
        validationSchema={stepZeroSchema}
        validateOnBlur
        onSubmit={(values) => {
          dispatch(setStepZeroData(values));
          dispatch(setCurrentStep(1)); // подумать нужно ли
          navigate(ROUTES.createPage);
        }}>
        {({
          // values,
          errors,
          touched,
          handleChange,
          handleBlur
          // isValid,
          // dirty,
          // handleSubmit
        }) => (
          <Form className="create-form">
            <label>
              Номер телефона
              <Field
                className={errors.phone && touched.phone ? 'error' : ''}
                type={'text'}
                name={'phone'}
                onChange={handleChange}
                onBlur={handleBlur}
                // value={phone ? phone : ''}
                placeholder={'+7 999 999-99-99'}
              />
              {errors.phone && touched.phone ? (
                <div className="field-error">{errors.phone}</div>
              ) : null}
              <div className="field-tip">Tip is here</div>
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
      {/* <form onSubmit={handleSubmit} className="main-form">
        <label htmlFor="phone">Номер телефона</label>
        <input type="text" id="phone" placeholder="+7 999 999-99-99" />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" placeholder="verevaa@yandex.ru" />
        <Button type="submit" text="Начать" />
      </form> */}
    </main>
  );
};

export default MainPage;
