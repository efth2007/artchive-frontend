import axios from "axios";
import { selectToken } from "../user/selectors";
import { apiUrl } from "../../config/constants";

export function artistByIdFetched(artist) {
  return {
    type: "ARTIST_BY_ID_FETCHED",
    payload: artist,
  };
}

export const fetchArtistById = (id) => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/artists/${id}`);

    console.log("Artist is here:", response.data.artist);

    dispatch(artistByIdFetched(response.data.artist));
  };
};
