import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AppDispatch, IRootState } from '../../store';
import {
  FormStep,
  MyFormData,
  ResponseFormData,
  SexType,
  StepOneData,
  StepThreeData,
  StepTwoData,
  StepZeroData
} from './types';
import { sendFormData } from '@/api/sendFormData';
import { stepNames } from '@/utils/constants/constants';

interface initialStateTypes {
  formData: {
    stepZero: StepZeroData;
    stepOne: StepOneData;
    stepTwo: StepTwoData;
    stepThree: StepThreeData;
  };
  formCurrentStep: FormStep;
  sendData: {
    message: ResponseFormData | null;
    isLoading: boolean;
    isSuccess: boolean;
    isError: boolean;
  };
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
      sex: SexType.none
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
  formCurrentStep: stepNames.initial,
  sendData: {
    message: null,
    isLoading: false,
    isSuccess: false,
    isError: false
  }
};

export const sendData = createAsyncThunk<
  ResponseFormData,
  MyFormData,
  {
    dispatch: AppDispatch;
    state: IRootState;
  }
>('sendData', async (formData, thunkAPI) => {
  try {
    const response = await sendFormData(formData);
    const data = (await response.json()) as ResponseFormData;
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

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
      state.formData.stepOne.sex = payload.sex;
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
      state.formData = initialState.formData;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(sendData.pending, (state) => {
      state.sendData.isLoading = true;
      state.sendData.isSuccess = false;
      state.sendData.isError = false;
    });
    builder.addCase(sendData.fulfilled, (state, { payload }: PayloadAction<ResponseFormData>) => {
      state.sendData.message = payload;
      state.sendData.isLoading = false;
      state.sendData.isSuccess = true;
    });
    builder.addCase(sendData.rejected, (state) => {
      state.sendData.isLoading = false;
      state.sendData.isError = true;
    });
  }
});

export const selectorForm = (state: IRootState) => state.formSlice;
export const {
  setStepOneData,
  setStepZeroData,
  setStepTwoData,
  setStepThreeData,
  setCurrentStep,
  resetFormData
} = formSlice.actions;
export default formSlice.reducer;
