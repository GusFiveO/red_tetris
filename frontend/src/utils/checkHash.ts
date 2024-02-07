export const checkHash = (hash: string) => {
  const regex = /^#(.+)\[(.+)\]$/;

  return regex.test(hash);
};
