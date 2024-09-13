import { AUTH_TOKEN } from "../config";

export const getUserTokenLocal = () => {
  const data = JSON.parse(localStorage.getItem(AUTH_TOKEN));
  if (data?.token) {
    return data.token
  } else {
    return ''
  }
};
