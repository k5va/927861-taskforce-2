const EPOCH_YEAR = 1970;

export const calculateAge = (birthDate: Date): number => {
  const diffMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(diffMs);

  return Math.abs(ageDate.getUTCFullYear() - EPOCH_YEAR);
};
