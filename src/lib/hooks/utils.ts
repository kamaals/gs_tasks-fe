export const buildQueryString = (data: string | undefined, key: string) => {
  console.log(data !== undefined);
  console.log(typeof data);
  return data !== undefined ? `${key}=${data}` : undefined;
};
