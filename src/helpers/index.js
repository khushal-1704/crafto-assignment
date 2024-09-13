import { AUTH_TOKEN } from "../config";

export const getUserTokenLocal = () => {
  return JSON.parse(localStorage.getItem(AUTH_TOKEN));
};
