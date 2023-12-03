import React, { useState } from 'react';
import * as yup from 'yup';
import { countryList } from '../../utils/counryList';
import { useAppDispatch } from '../../store/hooks';
import { addToForm } from '../../store/formSlice';
import { convert2base64 } from '../../utils/convert2base64';
import { useNavigate } from 'react-router-dom';
import { FormData } from '../../types/common';
import { validationSchema } from '../../utils/validationSchema';

const UctrlForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<FormData>({
    acceptTerms: false,
    name: '',
    age: 0,
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    userImage: null,
    country: '',
  });
  const [formErrors, setFormErrors] = useState<
    Record<keyof FormData, string> | undefined
  >(undefined);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await validationSchema.validate(formData, { abortEarly: false });
      const converted = (await convert2base64(
        formData.userImage![0]
      )) as string;

      if (converted) {
        const newData = { ...formData, userImage: converted };
        dispatch(addToForm(newData));
        navigate('/');
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const newErrors: Record<keyof FormData, string> = {
          name: '',
          age: '',
          email: '',
          password: '',
          confirmPassword: '',
          gender: '',
          acceptTerms: '',
          userImage: '',
          country: '',
        };
        error.inner.forEach((validationError) => {
          if (validationError.path) {
            newErrors[validationError.path as keyof FormData] =
              validationError.message;
          }
        });
        setFormErrors(newErrors);
      }
    }
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Enter your name"
        autoComplete="on"
        value={formData.name}
        onChange={handleChange}
      />
      <p>{formErrors && formErrors.name && formErrors.name}</p>

      <label htmlFor="age">Age</label>
      <input
        id="age"
        name="age"
        type="number"
        placeholder="Enter your age"
        autoComplete="on"
        value={formData.age}
        onChange={handleChange}
      />
      <p>{formErrors && formErrors.age && formErrors.age}</p>

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        autoComplete="on"
        value={formData.email}
        onChange={handleChange}
      />
      <p>{formErrors && formErrors.email && formErrors.email}</p>

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Enter your password"
        autoComplete="on"
        value={formData.password}
        onChange={handleChange}
      />
      <p>{formErrors && formErrors.password && formErrors.password}</p>

      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        placeholder="Enter your confirmPassword"
        autoComplete="on"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      <p>
        {formErrors && formErrors.confirmPassword && formErrors.confirmPassword}
      </p>

      <label htmlFor="gender">Gender</label>
      <select
        id="gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        autoComplete="on"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <p>{formErrors && formErrors.gender && formErrors.gender}</p>

      <label htmlFor="acceptTerms">Accept Terms & Conditions</label>
      <input
        id="acceptTerms"
        name="acceptTerms"
        type="checkbox"
        placeholder="Enter your acceptTerms"
        autoComplete="on"
        value="false"
        onChange={handleChange}
      />
      <p>{formErrors && formErrors.acceptTerms && formErrors.acceptTerms}</p>

      <label htmlFor="userImage">Upload Image</label>
      <input
        name="userImage"
        id="userImage"
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={handleFileChange}
      />
      <p>{formErrors && formErrors.userImage && formErrors.userImage}</p>

      <label htmlFor="country">Country</label>
      <select
        id="country"
        name="country"
        value={formData.gender}
        onChange={handleChange}
        autoComplete="on"
      >
        <option value="">Select Country</option>
        {countryList.map((country) => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
      <p>{formErrors && formErrors.country && formErrors.country}</p>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UctrlForm;
