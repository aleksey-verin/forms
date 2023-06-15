import { Formik, Field, Form, FieldArray } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';
import Button from '../../components/common/buttons/Button';
import { selectorForm, setCurrentStep, setStepTwoData } from '../../store/reducers/formSlice';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import ImgPlus from '../../components/images/ImgPlus';
import ImgBin from '../../components/images/ImgBin';
import { useSelector } from 'react-redux';

const stepTwoSchema = yup.object().shape({
  advantage: yup.array().of(
    yup.string().required('Required!')
    // yup.object().shape({
    //   name: yup.string().min(4, 'too short').required('Required'), // these constraints take precedence
    //   salary: yup.string().min(3, 'cmon').required('Required') // these constraints take precedence
    // })
  ),
  // .required('Must have friends') // these constraints are shown if and only if inner constraints are satisfied
  // .min(3, 'Minimum of 3 friends'),
  checkbox: yup.array().min(1).of(yup.string().required()).required('Required'),
  radio: yup.string().required('Required!')
});

const FormStepTwo: FC = () => {
  const dispatch = useAppDispatch();
  const {
    formData: {
      stepTwo: { advantage, checkbox, radio }
    }
  } = useSelector(selectorForm);

  // const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        advantage: advantage,
        checkbox: checkbox,
        radio: radio
      }}
      validationSchema={stepTwoSchema}
      validateOnBlur
      onSubmit={(values) => {
        dispatch(setStepTwoData(values));
        dispatch(setCurrentStep(3));
        console.log(values);
      }}>
      {({
        values,
        errors,
        touched
        // handleChange,
        // handleBlur
        // isValid,
        // dirty,
        // handleSubmit
      }) => (
        <Form className="create-form">
          <label>
            Advantage
            <FieldArray
              name="advantage"
              // onChange={handleChange}
              // onBlur={handleBlur}
              // placeholder={'advantage'}
              render={(arrayHelpers) => (
                <div className="advantage">
                  {values.advantage.map((_, index) => (
                    <div className="advantage-field" key={index}>
                      <Field name={`advantage.${index}`} placeholder={'advantage'} />
                      <button className="button-remove" onClick={() => arrayHelpers.remove(index)}>
                        <ImgBin />
                      </button>
                    </div>
                  ))}
                  {errors.advantage && touched.advantage ? (
                    <div className="field-error">{errors.advantage}</div>
                  ) : null}
                  <Button
                    handleClick={() => {
                      arrayHelpers.push('');
                    }}
                    type="button"
                    image={<ImgPlus />}
                    transparent={true}
                  />
                </div>
              )}
            />
            {/* {advantageArray.map((item, index) => (
              <Field
                key={index}
                className={errors.advantage && touched.advantage ? 'error' : ''}
                type={'text'}
                name={'advantage'}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={'advantage'}
              />
            ))} */}
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
                dispatch(setStepTwoData(values));
                dispatch(setCurrentStep(1)); // проверить надо ли
                // navigate(ROUTES.mainPage);
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
