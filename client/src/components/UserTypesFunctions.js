import axios from "axios";

export const addUserTypes = (userType) => {
  return axios.post("api/userTypes", {
    User: userType.User,
    Type: userType.Type,
  });
};
