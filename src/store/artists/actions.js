import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";

export const FETCH_ARTISTS_SUCCESS = "FETCH_ARTISTS_SUCCESS";

export const fetchArtistsSuccess = (artists) => ({
  type: FETCH_ARTISTS_SUCCESS,
  payload: artists,
});

export const fetchArtists = () => {
  return async (dispatch, getState) => {
    const artistsCount = getState().artists.length;
    const response = await axios.get(
      `${apiUrl}/artists?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${artistsCount}`
      // `${apiUrl}/artists`
    );

    console.log("Your artists:", response.data);
    dispatch(fetchArtistsSuccess(response.data.allArtists));
  };
};
