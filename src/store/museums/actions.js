import { apiUrl, DEFAULT_PAGINATION_LIMIT } from "../../config/constants";
import axios from "axios";

export const FETCH_MUSEUMS_SUCCESS = "FETCH_MUSEUMS_SUCCESS";

export const fetchMuseumsSuccess = (museums) => ({
  type: FETCH_MUSEUMS_SUCCESS,
  payload: museums,
});

export const fetchMuseums = () => {
  return async (dispatch, getState) => {
    const museumsCount = getState().museums.length;
    const response = await axios.get(
      // `${apiUrl}/locations?limit=${DEFAULT_PAGINATION_LIMIT}&offset=${museumsCount}`
      `${apiUrl}/locations`
    );

    console.log("Your museums!! Here:", response.data);
    dispatch(fetchMuseumsSuccess(response.data.allLocations));
  };
};
