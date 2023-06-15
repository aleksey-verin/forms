import { Formik, Field, Form, FormikHelpers, FieldProps } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';
import Button from '../../components/common/buttons/Button';
import { ROUTES } from '../../routes/routes';
import { setCurrentStep, setStepThreeData } from '../../store/reducers/formSlice';
import {
  validationMacLength,
  onlyLettersAndDigitsRegExp,
  onlyLettersRegExp
} from '../../utils/constants/validation';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import { useNavigate } from 'react-router-dom';
import { countCharactersWithoutSpaces } from '../../utils/helpers';

const stepOneSchema = yup.object().shape({
  // nickname: yup
  //   .string()
  //   .trim('')
  //   .max(validationMacLength.nickname, 'Too Long!')
  //   .matches(onlyLettersAndDigitsRegExp)
  //   .required('Required'),
  // name: yup
  //   .string()
  //   .trim('')
  //   .max(validationMacLength.name, 'Too Long!')
  //   .matches(onlyLettersRegExp)
  //   .required('Required'),
  // surname: yup
  //   .string()
  //   .trim('')
  //   .max(validationMacLength.surname, 'Too Long!')
  //   .matches(onlyLettersRegExp)
  //   .required('Required'),
  about: yup.string().required('Required!')
});

const FormStepTree: FC = () => {
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
        about: ''
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
        touched,
        handleChange,
        handleBlur
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
