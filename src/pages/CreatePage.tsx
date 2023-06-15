import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectorForm } from '../store/reducers/formSlice';
import FormStepOne from './formSteps/FormStepOne';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import FormStepTwo from './formSteps/FormStepTwo';

interface CreatePageProps {}

const CreatePage: FC<CreatePageProps> = () => {
  const { formStep } = useSelector(selectorForm);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect');
    if (formStep === 'initial') {
      navigate(ROUTES.mainPage);
    }
  }, [formStep, navigate]);

  return (
    <main className="create">
      <div>{`Current step: ${formStep}`}</div>
      {formStep === 1 && <FormStepOne />}
      {formStep === 2 && <FormStepTwo />}
    </main>
  );
};

export default CreatePage;
