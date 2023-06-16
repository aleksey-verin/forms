import { CSSProperties, FC } from 'react';
import { FormStep } from '../../../store/reducers/formData/types';
import s from './Stepper.module.scss';

interface StepperProps {
  currentStep: FormStep;
  stepperData: string[];
}

const Stepper: FC<StepperProps> = ({ currentStep, stepperData }) => {
  const classForStep = (indexOfItem: number, currentStep: FormStep): string => {
    if (currentStep === 'initial') return '';
    if (typeof currentStep === 'number') {
      if (currentStep === indexOfItem + 1) return s.active;
      if (currentStep > indexOfItem + 1) return s.checked;
    }
    return '';
  };

  const classForTitle = (indexOfItem: number, currentStep: FormStep): string => {
    if (currentStep === 'initial') return '';
    if (typeof currentStep === 'number') {
      if (currentStep === indexOfItem + 1 || currentStep > indexOfItem + 1) return s.active;
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
    <div className={s.stepper}>
      <div className={s.greyLine}></div>
      <div className={s.items}>
        {stepperData.map((_, index) => (
          <div key={index} className={`${s.item} ${classForStep(index, currentStep)}`}>
            <div className={s.itemBlock}></div>
          </div>
        ))}
      </div>
      <div className={s.title}>
        {stepperData.map((item, index, array) => (
          <div
            key={index}
            style={styleForEdgedText(index, array)}
            className={`${s.itemText} ${classForTitle(index, currentStep)}`}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
