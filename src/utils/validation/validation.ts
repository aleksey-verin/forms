import * as yup from 'yup';

const emailRegExp = /.+@.+\..+/i;
const phoneRegex = /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;
const onlyLettersAndDigitsRegExp = /^[а-яА-ЯёЁa-zA-Z0-9]+$/;
const onlyLettersRegExp = /^[а-яА-ЯёЁa-zA-Z]+$/;

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
    .matches(phoneRegex, 'Enter the phone in the format "+7 (XXX) XXX-XX-XX"')
    .required('Enter the phone in the format "+7 (XXX) XXX-XX-XX"'),
  email: yup
    .string()
    .trim('')
    .matches(emailRegExp, 'Enter the email in the format "example@domain.com"')
    .required('Enter the email in the format "example@domain.com"')
});

export const stepOneSchema = yup.object().shape({
  nickname: yup
    .string()
    .trim('')
    .max(lengthOfFields.nickname, 'Too Long!')
    .matches(onlyLettersAndDigitsRegExp)
    .required('Required'),
  name: yup
    .string()
    .trim('')
    .max(lengthOfFields.name, 'Too Long!')
    .matches(onlyLettersRegExp)
    .required('Required'),
  surname: yup
    .string()
    .trim('')
    .max(lengthOfFields.surname, 'Too Long!')
    .matches(onlyLettersRegExp)
    .required('Required'),
  gender: yup.string().required('Required!')
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
