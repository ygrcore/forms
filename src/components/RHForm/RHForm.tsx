import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import { useDispatch } from 'react-redux';
import { countryList } from '../../utils/counryList';
import { SubmitHandler } from 'react-hook-form';

import './RHForm.scss';

type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms?: boolean;
  // image?: FileList;
  country: string;
};

const validationSchema = yup.object({
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
    .boolean()
    .oneOf([true], 'Accept Terms & Conditions is required'),
  // image: yup.mixed().test('fileSize', 'File size is too large', (value) => value && value[0].size <= 1024000).required('Image is required'),
  country: yup.string().required('Country is required'),
});

const RHForm = () => {
  // const dispatch = useDispatch(); // todo dispatch
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    // todo: сохранить в redux
    // dispatch({ type: 'SAVE_RHFORM_DATA', payload: data });
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input {...register('name')} id="name" autoComplete="on" />
      {errors.name && <p>{errors.name.message}</p>}

      <label htmlFor="age">Age</label>
      <input {...register('age')} id="age" type="number" autoComplete="on" />
      {errors.age && <p>{errors.age.message}</p>}

      <label htmlFor="email">Email</label>
      <input {...register('email')} id="email" type="email" autoComplete="on" />
      {errors.email && <p>{errors.email.message}</p>}

      <label htmlFor="password">Password</label>
      <input {...register('password')} id="password" type="password" autoComplete="on" />
      {errors.password && <p>{errors.password.message}</p>}

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        {...register('confirmPassword')}
        id="confirmPassword"
        type="password"
        autoComplete="on"
      />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <label htmlFor="gender">Gender</label>
      <select {...register('gender')} id="gender">
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      {errors.gender && <p>{errors.gender.message}</p>}

      <div className="checkbox__input">
        <label htmlFor="acceptTerms">Accept Terms & Conditions</label>
        <input {...register('acceptTerms')} id="acceptTerms" type="checkbox" />
        {errors.acceptTerms && <p>{errors.acceptTerms.message}</p>}
      </div>

      {/* <label htmlFor="image">Image</label>
      <input {...register('image')} type="file" />
      {errors.image && <p>{errors.image.message}</p>} */}

      <label htmlFor="country">Country</label>
      <Controller
        name="country"
        control={control}
        render={({ field }) => (
          <select {...field} id="country" autoComplete="on">
            <option value="">Select Country</option>
            {countryList.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
        )}
      />
      {errors.country && <p>{errors.country.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default RHForm;
