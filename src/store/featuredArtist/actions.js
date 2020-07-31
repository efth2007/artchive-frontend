import axios from "axios";
import { selectToken } from "../user/selectors";
import { apiUrl } from "../../config/constants";

export function featuredArtistFetched(artist) {
  return {
    type: "FEATURED_ARTIST_FETCHED",
    payload: artist,
  };
}

export const fetchFeaturedArtist = (id) => {
  return async (dispatch, getState) => {
    const response = await axios.get(`${apiUrl}/artists/${id}`);
    console.log("Artist is here:", response.data.artist);
    dispatch(featuredArtistFetched(response.data.artist));
  };
};
