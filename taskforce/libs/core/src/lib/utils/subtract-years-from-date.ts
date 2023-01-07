export const subtractYearsFromDate = (
  years: number,
  date = new Date()
): Date => {
  const newDate = new Date(date);
  newDate.setFullYear(date.getUTCFullYear() - years);
  return newDate;
};
