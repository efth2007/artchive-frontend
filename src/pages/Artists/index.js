import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { fetchArtists } from "../../store/artists/actions";
import { selectArtists } from "../../store/artists/selectors";
import {
  selectUser,
  selectToken,
  selectFavorites,
} from "../../store/user/selectors";
import Artist from "../../components/Artist";
import { Link } from "react-router-dom";

export default function Artists() {
  const dispatch = useDispatch();
  const artists = useSelector(selectArtists);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const favoriteArtists = useSelector(selectFavorites);

  console.log("Who is this??", user);
  console.log("My favorites are:", favoriteArtists);

  const [artistsToManage, set_artistsToManage] = useState(artists);
  const [sorting, set_sorting] = useState("alphabetically");
  //const [countryFilter, set_countryFilter] = useState("");
  //const [faveOrAllArtists, set_faveOrAllArtists] = useState("");
  //const [aaaaaa, set_aaaaaa] = useState(artists)

  //const [artistsToEdit, set_artistsToEdit] = useState(artists);

  const [filteredArtists, set_filteredArtists] = useState("");

  //const favoriteArtists = [];
  const filterFaves = (e) => {
    if (e.target.value === "view-all") {
      console.log("View all!!!!");
      set_artistsToManage(artists);
    } else {
      console.log("FAVORITES ONLY");
      set_artistsToManage(favoriteArtists);
    }
  };

  // const filterFaves = (e) => {
  //   set_faveOrAllArtists(e.target.value)
  //   if (e.target.value === "onlyFaves"){
  //     set
  //   }
  // }

  const filterByCountry = (e) => {
    //  set_countryFilter(e.target.value);
    if (e.target.value === "All") {
      set_filteredArtists(artistsToManage);
    } else {
      const artistsByCountry = artistsToManage.filter(
        (artist) => artist.nationality === e.target.value
      );
      set_filteredArtists(artistsByCountry);
    }
  };

  //console.log("DISPLAYED:", filteredArtists);
  //console.log("FETCHED:", artists);

  useEffect(() => {
    dispatch(fetchArtists());
    // set_filteredArtists();
  }, [dispatch]);

  useEffect(() => {
    set_artistsToManage(artists);
  }, [artists]);

  useEffect(() => {
    set_filteredArtists(artists);
  }, [artists]);

  const artistsSortedChronologically = [...filteredArtists].sort(
    (a, b) => a.bornOn - b.bornOn
  );

  const artistsSortedAlphabetically = [...filteredArtists].sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );

  const displayedArtists =
    sorting === "alphabetically"
      ? artistsSortedAlphabetically
      : artistsSortedChronologically;

  const changeSorting = (e) => set_sorting(e.target.value);
  // set_filteredArtists(displayedArtists);

  return (
    <>
      <Jumbotron>
        <h1>All Artists</h1>

        {!user.isAdmin ? null : (
          <Link to={"create_new"}>
            <Button>Add new artist...</Button>
          </Link>
        )}
        {!token ? null : (
          // <Button onClick={filterFaves}>View my favorites</Button>
          <div>
            <label>View:</label>
            <select onChange={filterFaves}>
              <option value="view-all">All artists</option>
              <option value="view-favorites">My favorite artists</option>
            </select>
          </div>
        )}
        <br />
        <label>Sort:</label>
        <select onChange={changeSorting}>
          <option value="alphabetically">Alphabetically</option>
          <option value="chronologically">Chronologically</option>
        </select>
        <br />
        <label>Country:</label>
        <select onChange={filterByCountry}>
          <option value="All">View All</option>
          <option value="Austrian">Austria</option>
          <option value="Flemish">Belgium</option>
          <option value="French">France</option>
          <option value="German">Germany</option>
          <option value="Italian">Italy</option>
          <option value="Dutch">Netherlands</option>
          <option value="Russian">Russia</option>
          <option value="Spanish">Spain</option>
          <option value="English">United Kingdom</option>
          <option value="American">United States</option>
        </select>
      </Jumbotron>
      <Container>
        {!displayedArtists
          ? null
          : displayedArtists.map((a) => {
              return (
                <Artist
                  key={a.id}
                  id={a.id}
                  knownAs={a.knownAs}
                  firstName={a.firstName}
                  lastName={a.lastName}
                  bornOn={a.bornOn}
                  diedOn={a.diedOn}
                />
              );
            })}
      </Container>
    </>
  );
}
