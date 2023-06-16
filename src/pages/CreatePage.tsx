import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FormStepOne from './formSteps/FormStepOne';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import FormStepTwo from './formSteps/FormStepTwo';
import FormStepTree from './formSteps/FormStepTree';
import { stepperData } from '../utils/constants/constants';
import Stepper from '../components/common/stepper/Stepper';
import { selectorForm } from '../store/reducers/formData/formSlice';

const CreatePage: FC = () => {
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
      <Stepper stepperData={stepperData} currentStep={formCurrentStep} />
      {formCurrentStep === 1 && <FormStepOne />}
      {formCurrentStep === 2 && <FormStepTwo />}
      {formCurrentStep === 3 && <FormStepTree />}
    </main>
  );
};

export default CreatePage;
