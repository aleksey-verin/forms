import { FC } from 'react';
import Button from '../components/common/buttons/Button';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import { object, string } from 'yup';
// import { Yup } from 'yup';

// import { useNavigate } from 'react-router-dom';

interface CreatePageProps {}

const stepOneSchema = object().shape({
  nickname: string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  name: string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  surname: string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  gender: string().required('Required!')

  // email: string().email('Invalid email').required('Required')
});

const CreatePage: FC<CreatePageProps> = () => {
  const navigate = useNavigate();

  // const handleChange = () => {
  //   console.log(1);
  // };

  return (
    <main className="create">
      <Formik
        initialValues={{
          nickname: '',
          name: '',
          surname: '',
          gender: ''
        }}
        validationSchema={stepOneSchema}
        validateOnBlur
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
        }}>
        {({
          values,
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
              Nickname
              <Field
                className={errors.nickname && touched.nickname ? 'error' : ''}
                type={'text'}
                name={'nickname'}
                onChange={handleChange}
                onBlur={handleBlur}
                // value={values.nickname}
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
                // className={s.inputSteps}
                className={errors.name && touched.name ? 'error' : ''}
                type={'text'}
                name={'name'}
                onChange={handleChange}
                onBlur={handleBlur}
                // value={values.name}
                placeholder={'Name'}
              />
              {errors.name && touched.name ? (
                <div className="field-error">{errors.name}</div>
              ) : null}
            </label>
            <label>
              Surname
              <Field
                className={errors.surname && touched.surname ? 'error' : ''}
                type={'text'}
                name={'surname'}
                onChange={handleChange}
                onBlur={handleBlur}
                // value={values.surname}
                placeholder={'Surname'}
              />
              {errors.name && touched.surname ? (
                <div className="field-error">{errors.surname}</div>
              ) : null}
            </label>
            <label>
              Gender
              <Field
                as={'select'}
                // className={s.selectInput}
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
            </label>
            <div className="create-form__buttons">
              <Button
                handleClick={() => navigate(ROUTES.mainPage)}
                type="button"
                text="Назад"
                transparent={true}
              />
              <Button type="submit" text="Далее" />
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default CreatePage;
