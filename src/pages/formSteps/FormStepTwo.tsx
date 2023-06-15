import { Formik, Field, Form, FieldArray, getIn } from 'formik';
import { FC } from 'react';
import * as yup from 'yup';
import Button from '../../components/common/buttons/Button';
import { selectorForm, setCurrentStep, setStepTwoData } from '../../store/reducers/formSlice';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import ImgPlus from '../../components/images/ImgPlus';
import ImgBin from '../../components/images/ImgBin';
import { useSelector } from 'react-redux';
import { validationMacLength } from '../../utils/constants/validation';

const stepTwoSchema = yup.object().shape({
  advantage: yup
    .array()
    .of(
      yup
        .string()
        .max(validationMacLength.advantage, 'Too Long!')
        .required('Please write something!')
    ),
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
      {({ values, errors, touched }) => (
        <Form className="create-form">
          <label>
            Advantage
            <FieldArray
              name="advantage"
              render={(arrayHelpers) => (
                <div className="advantage">
                  <div className="advantage-items">
                    {values.advantage.map((_, index) => (
                      <div className="advantage-items__field" key={index}>
                        <Field
                          className={
                            getIn(arrayHelpers.form.errors, `advantage.${index}`) &&
                            getIn(arrayHelpers.form.touched, `advantage.${index}`)
                              ? 'error'
                              : ''
                          }
                          name={`advantage.${index}`}
                          placeholder={'advantage'}
                        />
                        <button
                          className="button-remove"
                          onClick={() => arrayHelpers.remove(index)}>
                          <ImgBin />
                        </button>
                        {/* <ErrorMessage name={`advantage.${index}`} /> */}
                        {getIn(arrayHelpers.form.errors, `advantage.${index}`) &&
                        getIn(arrayHelpers.form.touched, `advantage.${index}`) ? (
                          <div className="advantage-error">
                            {getIn(arrayHelpers.form.errors, `advantage.${index}`)}
                          </div>
                        ) : null}
                        <div className="field-tip">{`Max - ${validationMacLength.advantage} chars`}</div>
                      </div>
                    ))}
                  </div>
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
                dispatch(setCurrentStep(1));
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
