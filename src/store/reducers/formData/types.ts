export interface StepZeroData {
  phone: string | null;
  email: string | null;
}

export interface StepOneData {
  nickname: string | null;
  name: string | null;
  surname: string | null;
  gender: Gender;
}

export type Gender = 'male' | 'female' | '';

export interface StepTwoData {
  advantage: string[];
  checkbox: string[];
  radio: string;
}

export interface StepThreeData {
  about: string;
}

export interface FormData extends StepZeroData, StepOneData, StepTwoData, StepThreeData {}

export type FormStep = 'initial' | 1 | 2 | 3;
