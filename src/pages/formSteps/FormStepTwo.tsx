import { Formik, Field, Form, FieldArray, getIn } from 'formik';
import { FC } from 'react';
import Button from '../../components/common/buttons/Button';
import {
  selectorForm,
  setCurrentStep,
  setStepTwoData
} from '../../store/reducers/formData/formSlice';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import ImgPlus from '../../components/images/ImgPlus';
import ImgBin from '../../components/images/ImgBin';
import { useSelector } from 'react-redux';
import { lengthOfFields, stepTwoSchema } from '../../utils/validation/validation';

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
                        <div className="field-tip">{`Max - ${lengthOfFields.advantage} chars`}</div>
                      </div>
                    ))}
                  </div>
                  <Button
                    handleClick={() => {
                      arrayHelpers.push('');
                    }}
                    type="button"
                    transparent={true}>
                    <ImgPlus />
                  </Button>
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
              transparent={true}>
              Назад
            </Button>
            <Button type="submit">Далее</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default FormStepTwo;
