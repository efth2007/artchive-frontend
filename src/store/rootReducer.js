import { combineReducers } from "redux";
import appState from "./appState/reducer";
import user from "./user/reducer";
import artists from "./artists/reducer";
import artistDetails from "./artistDetails/reducer";
import featuredArtist from "./featuredArtist/reducer";
import museums from "./museums/reducer";
import museumDetails from "./museumDetails/reducer";

export default combineReducers({
  appState,
  user,
  artists,
  artistDetails,
  featuredArtist,
  museums,
  museumDetails,
});
