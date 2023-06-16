import { FC } from 'react';
import ImgFolder from '../components/images/ImgFolder';
import Button from '../components/common/buttons/Button';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import { useAppDispatch } from '../utils/hooks/useAppDispatch';
import { Field, Form, Formik } from 'formik';
import { selectorForm, setCurrentStep, setStepZeroData } from '../store/reducers/form/formSlice';
import { useSelector } from 'react-redux';
import { stepZeroSchema } from '../utils/validation/validation';
import InputMask from 'react-input-mask';

const MainPage: FC = () => {
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
            <a target="_blank" href="http://t.me/verevaa">
              <ImgFolder />
              Telegram
            </a>
            <a target="_blank" href="https://github.com/aleksey-verin">
              <ImgFolder />
              GitHub
            </a>
            <a target="_blank" href="./Aleksey Verin - Frontend - CV.pdf">
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
          dispatch(setCurrentStep(1));
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
              <Button type="submit">Начать</Button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default MainPage;
