// utils/auth.ts
export const getToken = () => {
  return localStorage.getItem("token");
};
