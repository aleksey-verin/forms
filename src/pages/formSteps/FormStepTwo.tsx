import { Formik, Field, Form } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';
import Button from '../../components/common/buttons/Button';
import { ROUTES } from '../../routes/routes';
import { setCurrentStep } from '../../store/reducers/formSlice';
import {
  validationMacLength,
  onlyLettersAndDigitsRegExp
  // onlyLettersRegExp
} from '../../utils/constants/validation';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const stepTwoSchema = yup.object().shape({
  nickname: yup
    .string()
    .trim('')
    .max(validationMacLength.nickname, 'Too Long!')
    .matches(onlyLettersAndDigitsRegExp)
    .required('Required'),
  checkbox: yup.array().min(1).of(yup.string().required()).required('Required'),
  radio: yup.string().required('Required!')
});

const FormStepTwo: FC = () => {
  const dispatch = useAppDispatch();
  // const {
  //   formData: {
  //     stepOne: { nickname, name, surname, gender }
  //   }
  // } = useSelector(selectorForm);

  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        advantage: '',
        checkbox: [],
        radio: ''
      }}
      validationSchema={stepTwoSchema}
      validateOnBlur
      onSubmit={(values) => {
        // dispatch(setStepOneData(values));
        // dispatch(setCurrentStep(3));
        console.log(values);
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
            Advantage
            <Field
              className={errors.advantage && touched.advantage ? 'error' : ''}
              type={'text'}
              name={'advantage'}
              onChange={handleChange}
              onBlur={handleBlur}
              // value={values.nickname}
              placeholder={'advantage'}
            />
            {errors.advantage && touched.advantage ? (
              <div className="field-error">{errors.advantage}</div>
            ) : null}
            {/* <div className="field-tip">Tip is here</div> */}
          </label>
          <div className="checkbox" role="group" aria-labelledby="checkbox-group">
            <div>Checkbox group</div>
            <label>
              <Field type="checkbox" name="checkbox" value="1" />
              One
            </label>
            <label>
              <Field type="checkbox" name="checkbox" value="2" />
              Two
            </label>
            <label>
              <Field type="checkbox" name="checkbox" value="3" />
              Three
            </label>
            {errors.checkbox && touched.checkbox ? (
              <div className="field-error">{errors.checkbox}</div>
            ) : null}
          </div>
          <div className="radio" role="group" aria-labelledby="checkbox-group">
            <div>Ratio group</div>
            <label>
              <Field type="radio" name="radio" value="1" />
              One
            </label>
            <label>
              <Field type="radio" name="radio" value="2" />
              Two
            </label>
            <label>
              <Field type="radio" name="radio" value="3" />
              Three
            </label>
            {errors.radio && touched.radio ? (
              <div className="field-error">{errors.radio}</div>
            ) : null}
          </div>
          <div className="create-form__buttons">
            <Button
              handleClick={() => {
                dispatch(setCurrentStep(1)); // проверить надо ли
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

export default FormStepTwo;
