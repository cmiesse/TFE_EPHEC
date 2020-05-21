import axios from "axios";

export const userTypes = (userType) => {
  return axios.post("api/userTypes", {
    User: userType.User,
    Type: userType.Type,
  });
};
