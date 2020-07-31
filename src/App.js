import React, { useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Artists from "./pages/Artists";
import ArtistDetails from "./pages/ArtistDetails";
import Museums from "./pages/Museums";
import MuseumDetails from "./pages/MuseumDetails";
import AddArtistForm from "./pages/AddArtistForm";
import Homepage from "./pages/Homepage";

import { useDispatch, useSelector } from "react-redux";
import { appLoading } from "./store/appState/selectors";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      <Switch>
        {isLoading ? <Loading /> : null}
        <Route exact path="/" component={Homepage} />
        <Route exact path="/artists" component={Artists} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/artists/:id" component={ArtistDetails} />
        <Route exact path="/museums" component={Museums} />
        <Route path="/museums/:id" component={MuseumDetails} />
        <Route path="/create_new" component={AddArtistForm} />
      </Switch>
    </div>
  );
}

export default App;
