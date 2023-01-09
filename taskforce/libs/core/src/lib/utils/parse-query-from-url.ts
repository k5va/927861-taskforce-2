export const parseQueryFromUrl = (url: string) => {
  const [, query] = url.split('?');
  return query;
};
