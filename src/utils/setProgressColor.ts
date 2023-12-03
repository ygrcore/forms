import { checkPasswordStrength } from './checkPasswordStrength';

export const setProgressColor = (password: string) => {
  const strength = checkPasswordStrength(password);
  switch (strength) {
    case '0%':
      return '#828282';
    case '25%':
      return '#EA1111';
    case '50%':
      return '#FFAD00';
    case '75%':
      return '#9BC158';
    case '100%':
      return '#00B500';
    default:
      return 'none';
  }
};
