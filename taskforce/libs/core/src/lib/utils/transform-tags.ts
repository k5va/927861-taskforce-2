/**
 * Transforms task's tags by converting to lowecase and removing dublicates
 */
export const transformTags = ({ value, obj, key }) => {
  obj[key] = [...new Set(value.map((tag: string) => tag.toLowerCase()))];
  return obj[key];
};
