export const checkPasswordStrength = (password: string) => {
  const uniqueCategories = [
    /\d/.test(password),
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[!@#$%^&*(),.?":{}|<>]/.test(password),
  ].filter(Boolean).length;

  if (uniqueCategories === 4) {
    return '100%';
  } else if (uniqueCategories === 3) {
    return '75%';
  } else if (uniqueCategories === 2) {
    return '50%';
  } else if (uniqueCategories === 1) {
    return '25%';
  } else {
    return '0%';
  }
};
