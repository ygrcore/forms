import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms?: boolean;
  userImage?: FileList | null;
  country: string;
}

interface FormsData {
  form: FormData[];
}

const initialState: FormsData = {
  form: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState: initialState,
  reducers: {
    addToForm: (state, action: PayloadAction<FormData>) => {
      return {
        ...state,
        form: [...state.form, action.payload],
      };
    },
  },
});

export const { addToForm } = formSlice.actions;
export default formSlice.reducer;
