import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from '../../store';
import { FormStep, Gender, StepOneData, StepThreeData, StepTwoData, StepZeroData } from './types';

interface initialStateTypes {
  formData: {
    stepZero: StepZeroData;
    stepOne: StepOneData;
    stepTwo: StepTwoData;
    stepThree: StepThreeData;
  };
  formCurrentStep: FormStep;
}

const initialState = {
  formData: {
    stepZero: {
      phone: null,
      email: null
    },
    stepOne: {
      nickname: '',
      name: '',
      surname: '',
      gender: ''
    },
    stepTwo: {
      advantage: [''],
      checkbox: [],
      radio: ''
    },
    stepThree: {
      about: ''
    }
  },
  formCurrentStep: 3
};

export const formSlice = createSlice({
  name: 'formSlice',
  initialState: initialState as initialStateTypes,
  reducers: {
    setStepZeroData: (state, { payload }: PayloadAction<StepZeroData>) => {
      state.formData.stepZero.phone = payload.phone;
      state.formData.stepZero.email = payload.email;
    },
    setStepOneData: (state, { payload }: PayloadAction<StepOneData>) => {
      state.formData.stepOne.nickname = payload.nickname;
      state.formData.stepOne.name = payload.name;
      state.formData.stepOne.surname = payload.surname;
      state.formData.stepOne.gender = payload.gender;
    },
    setStepTwoData: (state, { payload }: PayloadAction<StepTwoData>) => {
      state.formData.stepTwo.advantage = payload.advantage;
      state.formData.stepTwo.checkbox = payload.checkbox;
      state.formData.stepTwo.radio = payload.radio;
    },
    setStepThreeData: (state, { payload }: PayloadAction<StepThreeData>) => {
      state.formData.stepThree.about = payload.about;
    },
    setCurrentStep: (state, { payload }: PayloadAction<FormStep>) => {
      state.formCurrentStep = payload;
    },
    resetFormData: (state) => {
      state.formData.stepOne.gender = initialState.formData.stepOne.gender as Gender;
    }
  }
});

export const selectorForm = (state: IRootState) => state.formSlice;
export const { setStepOneData, setStepZeroData, setStepTwoData, setStepThreeData, setCurrentStep } =
  formSlice.actions;
export default formSlice.reducer;
