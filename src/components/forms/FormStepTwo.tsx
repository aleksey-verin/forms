import { Formik, Field, Form, FieldArray, getIn } from 'formik';
import { FC } from 'react';
import Button from '../common/buttons/Button';
import {
  selectorForm,
  setCurrentStep,
  setStepTwoData
} from '../../store/reducers/formData/formSlice';
import { useAppDispatch } from '../../utils/hooks/useAppDispatch';
import ImgPlus from '../images/ImgPlus';
import ImgBin from '../images/ImgBin';
import { useSelector } from 'react-redux';
import { lengthOfFields, stepTwoSchema } from '../../utils/validation/validation';
import s from './formsStyles.module.scss';

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
        <Form className={s.form}>
          <label>
            Advantage
            <FieldArray
              name="advantage"
              render={(arrayHelpers) => (
                <div className={s.advantage}>
                  <div className={s.advantageItems}>
                    {values.advantage.map((_, index) => (
                      <div className={s.advantageField} key={index}>
                        <Field
                          className={
                            getIn(arrayHelpers.form.errors, `advantage.${index}`) &&
                            getIn(arrayHelpers.form.touched, `advantage.${index}`)
                              ? s.error
                              : ''
                          }
                          name={`advantage.${index}`}
                          placeholder={'advantage'}
                        />
                        <button
                          className={s.buttonRemove}
                          onClick={() => arrayHelpers.remove(index)}>
                          <ImgBin />
                        </button>
                        {/* <ErrorMessage name={`advantage.${index}`} /> */}
                        {getIn(arrayHelpers.form.errors, `advantage.${index}`) &&
                        getIn(arrayHelpers.form.touched, `advantage.${index}`) ? (
                          <div className={s.advantageError}>
                            {getIn(arrayHelpers.form.errors, `advantage.${index}`)}
                          </div>
                        ) : null}
                        <div
                          className={s.fieldTip}>{`Max - ${lengthOfFields.advantage} chars`}</div>
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
          <div className={s.checkbox} role="group" aria-labelledby="checkbox-group">
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
              <div className={s.fieldError}>{errors.checkbox}</div>
            ) : null}
          </div>
          <div className={s.radio} role="group" aria-labelledby="checkbox-group">
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
              <div className={s.fieldError}>{errors.radio}</div>
            ) : null}
          </div>
          <div className={s.buttons}>
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
