import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const FETCH_ARTISTS_SUCCESS = "FETCH_ARTISTS_SUCCESS";

export const fetchArtistsSuccess = (artists) => ({
  type: FETCH_ARTISTS_SUCCESS,
  payload: artists,
});

export const fetchArtists = () => {
  return async (dispatch, getState) => {
    // dispatch(appLoading());

    const artistsCount = getState().artists.length;
    const response = await axios.get(
      // `${apiUrl}/artists?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${artistsCount}`
      `${apiUrl}/artists`
    );

    console.log("Your artists:", response.data);
    dispatch(fetchArtistsSuccess(response.data.allArtists));
    // dispatch(appDoneLoading());
  };
};

export const addArtist = (
  firstName,
  lastName,
  knownAs,
  bornOn,
  diedOn,
  placeOfBirth,
  placeOfDeath,
  nationality,
  wikiUrl,
  gender
) => {
  return async (dispatch, getState) => {
    console.log(
      "I WILL DISPATCH ALL OF THESE:",
      firstName,
      lastName,
      knownAs,
      bornOn,
      diedOn,
      placeOfBirth,
      placeOfDeath,
      nationality,
      wikiUrl,
      gender
    );

    try {
      const response = await axios.post(`${apiUrl}/artists/create_new`, {
        firstName,
        lastName,
        knownAs,
        bornOn,
        diedOn,
        placeOfBirth,
        placeOfDeath,
        nationality,
        wikiUrl,
        gender,
      });

      // dispatch(
      //   showMessageWithTimeout(
      //     "success",
      //     false,
      //     "Artist successfully added!",
      //     1500
      //   )
      // );
      // dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        //      dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        //      dispatch(setMessage("danger", true, error.message));
      }
      //    dispatch(appDoneLoading());
    }
  };
};
