import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModifiedFormData, FormsData } from '../types/common';

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
