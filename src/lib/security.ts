export const PASSWORD_RULES = {
  minLength: 12,
  maxLength: 128,
};

export const validatePasswordStrength = (password: string): string[] => {
  const errors: string[] = [];
  if (password.length < PASSWORD_RULES.minLength) errors.push('Debe tener al menos 12 caracteres.');
  if (password.length > PASSWORD_RULES.maxLength) errors.push('Debe tener máximo 128 caracteres.');
  if (!/[A-Z]/.test(password)) errors.push('Debe incluir al menos una mayúscula.');
  if (!/[a-z]/.test(password)) errors.push('Debe incluir al menos una minúscula.');
  if (!/[0-9]/.test(password)) errors.push('Debe incluir al menos un número.');
  if (!/[^A-Za-z0-9]/.test(password)) errors.push('Debe incluir al menos un símbolo.');
  return errors;
};

export const sanitizeTextInput = (value: string, max = 120) => value.replace(/[<>]/g, '').trim().slice(0, max);
