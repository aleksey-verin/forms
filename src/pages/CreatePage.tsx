import { FC } from 'react';
import Button from '../components/common/buttons/Button';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
// import { useNavigate } from 'react-router-dom';

interface CreatePageProps {}

const CreatePage: FC<CreatePageProps> = () => {
  const navigate = useNavigate();
  return (
    <main className="create">
      {/* <form className="main-form">
        <label htmlFor="phone">Номер телефона</label>
        <input type="text" id="phone" placeholder="+7 999 999-99-99" />
        <label htmlFor="email">Email</label>
        <input type="text" id="email" placeholder="verevaa@yandex.ru" />
        <Button type="submit" text="Начать" />
      </form> */}
      <Formik
        initialValues={{
          nickname: '',
          name: '',
          surname: '',
          gender: ''
        }}
        validateOnBlur
        onSubmit={() => console.log('sub')}>
        {({
          values,
          // errors,
          // touched,
          handleChange,
          handleBlur
          // isValid,
          // dirty,
          // handleSubmit
        }) => (
          <Form className="create-form">
            <label>Nickname</label>
            <Field
              // className={s.inputSteps}
              type={'text'}
              name={'nickname'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.nickname}
              placeholder={'Nickname'}
            />
            <label>Name</label>
            <Field
              // className={s.inputSteps}
              type={'text'}
              name={'name'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              placeholder={'Name'}
            />
            <label>Surname</label>
            <Field
              // className={s.inputSteps}
              type={'text'}
              name={'surname'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.surname}
              placeholder={'Surname'}
            />
            <label>Gender</label>
            <Field
              as={'select'}
              // className={s.selectInput}
              type={'text'}
              name={'gender'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.gender}
              placeholder={'Gender'}>
              <option
                // className={s.selectItem}
                value={'male'}>
                Male
              </option>
              <option
                // className={s.selectItem}
                // defaultChecked={true}
                value={'female'}>
                Female
              </option>
            </Field>
            <div className="create-form__buttons">
              <Button
                handleClick={() => navigate(ROUTES.mainPage)}
                type="button"
                text="Назад"
                transparent={true}
              />
              <Button type="submit" text="Далее" />

              {/* <button
                type={'submit'}
                className={s.backButton}
                onClick={() => handleSubmit()}>
                Назад
              </button>
              <button type={'submit'} onClick={() => handleSubmit()}>
                Далее
              </button> */}
            </div>
          </Form>
        )}
      </Formik>
    </main>
  );
};

export default CreatePage;
