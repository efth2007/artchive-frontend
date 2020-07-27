import axios from "axios";
import { selectToken } from "../user/selectors";
import { apiUrl } from "../../config/constants";

export function museumByIdFetched(museum) {
  return {
    type: "MUSEUM_BY_ID_FETCHED",
    payload: museum,
  };
}

export const fetchMuseumById = (id) => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/locations/${id}`);

    console.log("Museum is here:", response.data.location);

    dispatch(museumByIdFetched(response.data.location));
  };
};
