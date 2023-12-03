import { checkPasswordStrength } from './checkPasswordStrength';

export const setProgressLabel = (password: string) => {
  const strength = checkPasswordStrength(password);
  switch (strength) {
    case '0%':
      return 'Very Weak';
    case '25%':
      return 'Weak';
    case '50%':
      return 'Medium';
    case '75%':
      return 'Good';
    case '100%':
      return 'Strong';
    default:
      return '';
  }
};
