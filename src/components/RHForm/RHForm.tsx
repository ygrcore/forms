import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { countryList } from '../../utils/counryList';
import { useAppDispatch } from '../../store/hooks';
import { addToForm } from '../../store/formSlice';
import { convert2base64 } from '../../utils/convert2base64';
import { useNavigate } from 'react-router-dom';
import { FormData } from '../../types/common';
import { validationSchema } from '../../utils/validationSchema';
import './RHForm.scss';

const RHForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver<FormData>(validationSchema),
    defaultValues: {
      acceptTerms: false,
      name: '',
      age: 0,
      email: '',
      password: '',
      confirmPassword: '',
      gender: '',
      userImage: null,
      country: '',
    },
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const converted = (await convert2base64(data.userImage![0])) as string;

    if (converted) {
      const newData = { ...data, userImage: converted };
      dispatch(addToForm(newData));
      navigate('/');
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input
        {...register('name')}
        id="name"
        placeholder="Enter your name"
        autoComplete="on"
      />
      <p>{errors.name && errors.name.message}</p>

      <label htmlFor="age">Age</label>
      <input
        {...register('age')}
        id="age"
        type="number"
        placeholder="Enter your age"
        autoComplete="on"
      />
      <p>{errors.age && errors.age.message}</p>

      <label htmlFor="email">Email</label>
      <input
        {...register('email')}
        id="email"
        type="email"
        placeholder="example@email.com"
        autoComplete="on"
      />
      <p>{errors.email && errors.email.message}</p>

      <label htmlFor="password">Password</label>
      <input
        {...register('password')}
        id="password"
        type="password"
        autoComplete="on"
      />
      <p>{errors.password && errors.password.message}</p>

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        {...register('confirmPassword')}
        id="confirmPassword"
        type="password"
        autoComplete="on"
      />
      <p>{errors.confirmPassword && errors.confirmPassword.message}</p>

      <label htmlFor="gender">Gender</label>
      <select {...register('gender')} id="gender">
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <p>{errors.gender && errors.gender.message}</p>

      <div className="checkbox__input">
        <label htmlFor="acceptTerms">Accept Terms & Conditions</label>
        <input {...register('acceptTerms')} id="acceptTerms" type="checkbox" />
        <p>{errors.acceptTerms && errors.acceptTerms.message}</p>
      </div>

      <label htmlFor="image">Upload Image</label>
      <input
        {...register('userImage')}
        type="file"
        id="image"
        accept=".jpg, .jpeg, .png"
      />
      <p>{errors.userImage && errors.userImage.message}</p>

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
      <p>{errors.country && errors.country.message}</p>

      <button type="submit">Submit</button>
    </form>
  );
};

export default RHForm;
