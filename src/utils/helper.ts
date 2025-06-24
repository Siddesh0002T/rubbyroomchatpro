// src/utils/helper.ts

export const setUsername = (username: string) => {
  localStorage.setItem('rubby_username', username);
};

export const getUsername = (): string | null => {
  return localStorage.getItem('rubby_username');
};

export const removeUsername = () => {
  localStorage.removeItem('rubby_username');
};
