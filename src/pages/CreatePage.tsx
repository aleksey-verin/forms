import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FormStepOne from '../components/forms/FormStepOne';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../routes/routes';
import FormStepTwo from '../components/forms/FormStepTwo';
import FormStepTree from '../components/forms/FormStepTree';
import { stepNames, stepperData } from '../utils/constants/constants';
import Stepper from '../components/common/stepper/Stepper';
import { selectorForm } from '../store/reducers/formData/formSlice';
import LayoutCreatePage from '@/components/layouts/LayoutCreatePage';

const CreatePage: FC = () => {
  const { formCurrentStep } = useSelector(selectorForm);
  const navigate = useNavigate();

  useEffect(() => {
    if (formCurrentStep === stepNames.initial) {
      navigate(ROUTES.mainPage);
    }
  }, [formCurrentStep, navigate]);

  return (
    <LayoutCreatePage>
      <Stepper stepperData={stepperData} currentStep={formCurrentStep} />
      {formCurrentStep === stepNames.one && <FormStepOne />}
      {formCurrentStep === stepNames.two && <FormStepTwo />}
      {formCurrentStep === stepNames.three && <FormStepTree />}
    </LayoutCreatePage>
  );
};

export default CreatePage;
