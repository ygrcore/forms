import * as yup from 'yup';

export const validationSchema = yup.object<FormData>().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(/[A-Z][a-z]*/, 'Should start with a capital letter'),
  age: yup
    .number()
    .positive('Should be a positive number')
    .integer('Should be an integer')
    .required('Age is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .matches(/[a-z]/, 'At least one lowercase character')
    .matches(/[A-Z]/, 'At least one uppercase character')
    .matches(/\d/, 'At least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'At least one special character')
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
  gender: yup.string().required('Gender is required'),
  acceptTerms: yup
    .bool()
    .oneOf([true], 'Accept Terms & Conditions is required'),
  userImage: yup
    .mixed<FileList>()
    .nullable()
    .test('fileSize', 'File size is too large', (value) => {
      if (!value || value.length === 0 || !value[0]) {
        return true;
      }
      const file = value[0];
      return file.size <= 1024000;
    })
    .required('Image is required'),
  country: yup.string().required('Country is required'),
});
