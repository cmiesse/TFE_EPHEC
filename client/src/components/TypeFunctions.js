import axios from "axios";

export const addType = (type) => {
  return axios
    .post("api/types", {
      TypeNom: type.TypeNom,
    })
    .then((response) => {
      console.log("Type ajouté");
    });
};
