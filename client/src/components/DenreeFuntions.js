import axios from "axios";

export const addDenree = (denree) => {
  return axios
    .post("api/denrees", {
      DenreeNom: denree.DenreeNom,
      TypeID: denree.TypeID,
    })
    .then((response) => {
      console.log("Denrée ajoutée");
    });
};
