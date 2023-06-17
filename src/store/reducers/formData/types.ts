export interface StepZeroData {
  phone: string | null;
  email: string | null;
}

export interface StepOneData {
  nickname: string | null;
  name: string | null;
  surname: string | null;
  sex: SexType;
}

// export type Gender = 'male' | 'female' | '';
export enum SexType {
  man = 'man',
  woman = 'woman',
  none = ''
}

export interface StepTwoData {
  advantage: string[];
  checkbox: string[];
  radio: string;
}

export interface StepThreeData {
  about: string;
}

export interface MyFormData extends StepZeroData, StepOneData, StepTwoData, StepThreeData {}

export type FormStep = 'initial' | 1 | 2 | 3;

export interface ResponseFormData {
  status: string;
  message: string;
}
