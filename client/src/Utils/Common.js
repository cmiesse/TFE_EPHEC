import jwt_decode from "jwt-decode";
// return the usertoken from the local storage
export const getToken = () => {
  return localStorage.getItem("usertoken") || null;
};

export const isAdmin = (token) => {
  const Admin = jwt_decode(token).Admin;
  return Admin === 1;
};
