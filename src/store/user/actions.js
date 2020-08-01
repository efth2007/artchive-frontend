import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

export const signUp = (name, email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());

    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      //     console.log(error.response.message);

      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export function artistAddedToFavorites(newFavorite) {
  return {
    type: "ARTIST_ADDED_TO_FAVORITES",
    payload: newFavorite,
  };
}

export const addArtistToFavorites = (userId, artistId) => {
  return async (dispatch, getState) => {
    console.log("I WILL ADD TO FAVORITES THESE:", userId, artistId);

    try {
      console.log(`userId:${userId}, artistId: ${artistId}`);
      const response = await axios.post(`${apiUrl}/artists/add_to_favorites`, {
        userId,
        artistId,
      });

      console.log("Added to favorites:", response.data.favedArtist);

      dispatch(artistAddedToFavorites(response.data.favedArtist));
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
      } else {
        console.log(error.message);
      }
    }
  };
};

export function artistRemovedFromFavorites(artistToRemove) {
  return {
    type: "ARTIST_REMOVED_FROM_FAVORITES",
    payload: artistToRemove,
  };
}

export const removeArtistFromFavorites = (userId, artistId) => {
  return async (dispatch, getState) => {
    console.log("I WILL REMOVE THE ARITST:", userId, artistId);

    try {
      console.log(`userId:${userId}, artistId: ${artistId}`);

      const response = await axios.delete(
        `${apiUrl}/artists/remove_from_favorites/${userId}/${artistId}`
        //`${apiUrl}/artists/remove_from_favorites`,

        // {
        //   userId,
        //   artistId,

        // }
      );

      console.log("Favorite removed?", response.data.artistRemoved);
      dispatch(artistRemovedFromFavorites(response.data.artistRemoved));
    } catch (e) {
      console.error(e);
    }
  };
};
