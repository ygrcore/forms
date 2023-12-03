import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ModifiedFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms?: boolean;
  userImage?: string;
  country: string;
}

interface FormsData {
  form: ModifiedFormData[];
}

const initialState: FormsData = {
  form: [],
};

export const formSlice = createSlice({
  name: 'form',
  initialState: initialState,
  reducers: {
    addToForm: (state, action: PayloadAction<ModifiedFormData>) => {
      return {
        ...state,
        form: [...state.form, action.payload],
      };
    },
  },
});

export const { addToForm } = formSlice.actions;
export default formSlice.reducer;
