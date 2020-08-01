import { LOG_OUT, LOGIN_SUCCESS, TOKEN_STILL_VALID } from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  artists: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case "ARTIST_ADDED_TO_FAVORITES":
      return { ...state, artists: [...state.artists, action.payload] };

    case "ARTIST_REMOVED_FROM_FAVORITES":
      const artistToRemoveId = action.payload.id;
      const newFavorites = state.artists.filter(
        (a) => a.id !== artistToRemoveId
      );

      return { ...state, artists: newFavorites };

    default:
      return state;
  }
};
