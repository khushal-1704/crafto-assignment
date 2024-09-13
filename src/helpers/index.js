export const getUserTokenLocal = () => {
  const data = JSON.parse(localStorage.getItem("craft-user"));
  if (data) {
    return data.token;
  } else {
      return ''
  }
};
