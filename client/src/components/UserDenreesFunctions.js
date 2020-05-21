import axios from "axios";

export const userDenrees = (userDenree) => {
  return axios.post("api/userDenrees", {
    User: userDenree.User,
    Denree: userDenree.Denree,
  });
};
