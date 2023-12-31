import * as yup from 'yup';

const emailRegEx = /.+@.+\..+/i;
const phoneRegEx = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
const onlyLettersAndDigitsRegEx = /^[а-яА-ЯёЁa-zA-Z0-9]+$/;
const onlyLettersRegEx = /^[а-яА-ЯёЁa-zA-Z]+$/;

export const lengthOfFields = {
  nickname: 30,
  name: 50,
  surname: 50,
  advantage: 30,
  about: 200
};

export const stepZeroSchema = yup.object().shape({
  phone: yup
    .string()
    .matches(phoneRegEx, 'Enter the phone in the format "+7 (XXX) XXX-XX-XX"')
    .required('Enter the phone in the format "+7 (XXX) XXX-XX-XX"'),
  email: yup
    .string()
    .trim('')
    .matches(emailRegEx, 'Enter the email in the format "example@domain.com"')
    .required('Enter the email in the format "example@domain.com"')
});

export const stepOneSchema = yup.object().shape({
  nickname: yup
    .string()
    .trim('')
    .max(lengthOfFields.nickname, 'Too Long!')
    .matches(onlyLettersAndDigitsRegEx)
    .required('Required'),
  name: yup
    .string()
    .trim('')
    .max(lengthOfFields.name, 'Too Long!')
    .matches(onlyLettersRegEx)
    .required('Required'),
  surname: yup
    .string()
    .trim('')
    .max(lengthOfFields.surname, 'Too Long!')
    .matches(onlyLettersRegEx)
    .required('Required'),
  sex: yup.string().required('Required!')
});

export const stepTwoSchema = yup.object().shape({
  advantage: yup
    .array()
    .of(
      yup.string().max(lengthOfFields.advantage, 'Too Long!').required('Please write something!')
    ),
  checkbox: yup.array().min(1).of(yup.string().required()).required('Required'),
  radio: yup.string().required('Required!')
});

export const stepThreeSchema = yup.object().shape({
  about: yup
    .string()
    .test(
      'maxCharacters',
      'Длина сообщения не должна превышать 200 символов без пробелов',
      (value) => {
        if (value) {
          const stringWithoutSpaces = value.replace(/\s/g, '');
          return stringWithoutSpaces.length <= 200;
        }
      }
    )
    .required('Required!')
});
