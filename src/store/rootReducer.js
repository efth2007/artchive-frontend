import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import artists from "./artists/reducer";
import artistDetails from "./artistDetails/reducer";

export default combineReducers({
  appState,
  user,
  artists,
  artistDetails,
});
