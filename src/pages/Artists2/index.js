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
import { Link, useParams } from "react-router-dom";

export default function Artists() {
  const dispatch = useDispatch();
  const allArtists = useSelector(selectArtists);
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const favoriteArtists = useSelector(selectFavorites);
  const { faveOrAll } = useParams();

  const artists =
    faveOrAll === "all"
      ? allArtists
      : faveOrAll === "favorites"
      ? favoriteArtists
      : null;

  console.log("Favorites or all??", faveOrAll);
  //const [artistsToManage, set_artistsToManage] = useState(artists);
  const [sorting, set_sorting] = useState("alphabetically");

  const [filteredArtists, set_filteredArtists] = useState("");

  //   const filterFaves = (e) => {
  //     if (e.target.value === "view-all") {
  //       console.log("View all!!!!");
  //       set_artistsToManage(artists);
  //     } else {
  //       console.log("FAVORITES ONLY");
  //       set_artistsToManage(favoriteArtists);
  //     }
  //   };

  const filterByCountry = (e) => {
    if (e.target.value === "All") {
      set_filteredArtists(artists); //     set_filteredArtists(artistsToManage);
    } else {
      const artistsByCountry = artists.filter(
        //artistsToManage.filter(
        (artist) => artist.nationality === e.target.value
      );
      set_filteredArtists(artistsByCountry);
    }
  };

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  //   useEffect(() => {
  //     set_artistsToManage(artists);
  //   }, [artists]);

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
      : sorting === "chronologically"
      ? artistsSortedChronologically
      : [...filteredArtists];

  const changeSorting = (e) => set_sorting(e.target.value);

  return (
    <>
      22222222222222222222222222
      <Container>
        <ul class="nav justify-content-left">
          <li class="nav-item">
            <a class="nav-link active" href="all">
              All
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="favorites">
              My favorites
            </a>
          </li>

          <li class="nav-item">
            <a class="nav-link disabled" href="#">
              Disabled
            </a>
          </li>
        </ul>
      </Container>
      <Jumbotron>
        <h1>All Artists</h1>

        {!user.isAdmin ? null : (
          <div class="text-center mb-3">
            <Link to={"create_new"}>
              <Button>Add new artist...</Button>
            </Link>
          </div>
        )}

        <div class="container">
          <div class="row">
            {/*               
            {!token ? null : (
              // <Button onClick={filterFaves}>View my favorites</Button>
              <div class="col-sm">
                <div class="input-group mb-3">
                  <div class="input-group-prepend">
                    <label class="input-group-text" for="favoritesOrAll">
                      View...
                    </label>
                  </div>

                  <select
                    class="custom-select"
                    id="favoritesOrAll"
                    onChange={filterFaves}
                    style={{ width: "10%" }}
                  >
                    <option value="view-all" selected>
                      All artists
                    </option>
                    <option value="view-favorites">My favorite artists</option>
                  </select>
                </div>
              </div>
            )}
 */}

            <div class="col-sm">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="sortingMethod">
                    Sort by
                  </label>
                </div>
                <select
                  class="custom-select"
                  id="sortingMethod"
                  onChange={changeSorting}
                  style={{ width: "10%" }}
                >
                  <option selected>Choose...</option>
                  <option value="alphabetically">Name</option>
                  <option value="chronologically">Period</option>
                </select>
              </div>
            </div>
            <div class="col-sm">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="countrySelect">
                    Country
                  </label>
                </div>
                <select
                  class="custom-select"
                  id="countrySelect"
                  onChange={filterByCountry}
                  style={{ width: "10%" }}
                >
                  <option selected>Choose...</option>

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
              </div>

              {/* 

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
        </select> */}
            </div>
          </div>
        </div>

        {/* 
        <label>Sort:</label>
        <select onChange={changeSorting}>
          <option value="alphabetically">Alphabetically</option>
          <option value="chronologically">Chronologically</option>
        </select>
        <br />

 */}
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
