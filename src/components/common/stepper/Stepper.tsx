import { CSSProperties, FC } from 'react';
import { FormStep } from '../../../store/reducers/formData/types';

interface StepperProps {
  currentStep: FormStep;
  stepperData: string[];
}

const Stepper: FC<StepperProps> = ({ currentStep, stepperData }) => {
  const classForStep = (indexOfItem: number, currentStep: FormStep): string => {
    if (currentStep === 'initial') return '';
    if (typeof currentStep === 'number') {
      if (currentStep === indexOfItem + 1) return 'active';
      if (currentStep > indexOfItem + 1) return 'checked';
    }
    return '';
  };

  const classForTitle = (indexOfItem: number, currentStep: FormStep): string => {
    if (currentStep === 'initial') return '';
    if (typeof currentStep === 'number') {
      if (currentStep === indexOfItem + 1 || currentStep > indexOfItem + 1) return 'active';
    }
    return '';
  };

  const styleForEdgedText = (index: number, array: string[]): CSSProperties | undefined => {
    const numbersOfParts = array.length - 1;
    const widthOfItem = 100 / numbersOfParts / 2;
    if (index === 0 || index === numbersOfParts) {
      return { flexBasis: `${widthOfItem}%` };
    }
  };
  return (
    <div className="stepper">
      <div className="stepper-grey-line"></div>
      <div className="stepper-items">
        {stepperData.map((_, index) => (
          <div key={index} className={`stepper-items-item ${classForStep(index, currentStep)}`}>
            <div className="item-block"></div>
          </div>
        ))}
      </div>
      <div className="stepper-title">
        {stepperData.map((item, index, array) => (
          <div
            key={index}
            style={styleForEdgedText(index, array)}
            className={`stepper-title__item ${classForTitle(index, currentStep)}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
