export type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms?: boolean;
  userImage?: FileList | null;
  country: string;
};

export interface ModifiedFormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword?: string;
  gender: string;
  acceptTerms?: boolean;
  userImage?: string;
  country: string;
}

export interface FormsData {
  form: ModifiedFormData[];
}
