export const dateToString = (date: Date | string | number) => {
  return new Date(date).toISOString();
};
