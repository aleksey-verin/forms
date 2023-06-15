import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IRootState } from '../store';

interface StepZeroData {
  phone: string | null;
  email: string | null;
}

interface StepOneData {
  nickname: string | null;
  name: string | null;
  surname: string | null;
  gender: 'male' | 'female' | '';
}

type FormStep = 'initial' | 1 | 2 | 3;

interface initialStateTypes {
  formData: {
    stepZero: StepZeroData;
    stepOne: StepOneData;
    // advantages: string[];
    // radio: number | null;
    // checkbox: number[];
    // about: string | null;
  };
  formStep: FormStep;
}

const initialState = {
  formData: {
    stepZero: {
      phone: null,
      email: null
    },
    stepOne: {
      nickname: null,
      name: null,
      surname: null,
      gender: ''
    }
  },
  formStep: 2
  // about: null,
  // radio: 1,
  // advantages: [],
  // checkbox: [1]
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
    setCurrentStep: (state, { payload }: PayloadAction<FormStep>) => {
      state.formStep = payload;
    }
  }
});

export const selectorForm = (state: IRootState) => state.formSlice;
export const { setStepOneData, setStepZeroData, setCurrentStep } = formSlice.actions;
export default formSlice.reducer;
