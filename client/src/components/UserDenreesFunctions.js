import axios from "axios";

export const addUserDenrees = (userDenree) => {
  return axios.post("api/userDenrees", {
    User: userDenree.User,
    Denree: userDenree.Denree,
  });
};
