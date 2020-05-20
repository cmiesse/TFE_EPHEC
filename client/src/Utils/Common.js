// return the usertoken from the local storage
export const getToken = () => {
  return localStorage.getItem("usertoken") || null;
};
