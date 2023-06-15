import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectorForm } from '../store/reducers/formSlice';
import FormStepOne from './formSteps/FormStepOne';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import FormStepTwo from './formSteps/FormStepTwo';
import FormStepTree from './formSteps/FormStepTree';

interface CreatePageProps {}

const CreatePage: FC<CreatePageProps> = () => {
  const { formCurrentStep } = useSelector(selectorForm);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect');
    if (formCurrentStep === 'initial') {
      navigate(ROUTES.mainPage);
    }
  }, [formCurrentStep, navigate]);

  return (
    <main className="create">
      <div>{`Current step: ${formCurrentStep}`}</div>
      {formCurrentStep === 1 && <FormStepOne />}
      {formCurrentStep === 2 && <FormStepTwo />}
      {formCurrentStep === 3 && <FormStepTree />}
    </main>
  );
};

export default CreatePage;
