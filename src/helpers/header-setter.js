export const headerSetter = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
