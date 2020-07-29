import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { fetchArtists } from "../../store/artists/actions";
import { selectArtists } from "../../store/artists/selectors";
import { selectUser } from "../../store/user/selectors";
import Artist from "../../components/Artist";
import { Link } from "react-router-dom";

export default function Artists() {
  const dispatch = useDispatch();
  const artists = useSelector(selectArtists);
  const user = useSelector(selectUser);

  console.log("Who is this??", user);

  const [sorting, set_sorting] = useState("chronologically");
  const [filter, set_filter] = useState("");
  const [displayedArtists, set_displayedArtists] = useState(artists); //[]

  const filterByCountry = (e) => {
    set_filter(e.target.value);
    if (e.target.value === "All") {
      set_displayedArtists(artists);
    } else {
      const artistsByCountry = artists.filter(
        (artist) => artist.nationality === e.target.value
      );
      set_displayedArtists(artistsByCountry);
    }
  };

  console.log("DISPLAYED:", displayedArtists);
  console.log("FETCHED:", artists);

  useEffect(() => {
    dispatch(fetchArtists());
    // set_displayedArtists();s
  }, [dispatch]);

  useEffect(() => {
    set_displayedArtists(artists);
  }, [artists]);

  const artistsSortedChronologically = [...displayedArtists].sort(
    (a, b) => a.bornOn - b.bornOn
  );

  const artistsSortedAlphabetically = [...displayedArtists].sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );

  const sortedArtists =
    sorting === "alphabetically"
      ? artistsSortedAlphabetically
      : artistsSortedChronologically;

  const changeSorting = (e) => set_sorting(e.target.value);
  // set_displayedArtists(sortedArtists);

  return (
    <>
      <Jumbotron>
        <h1>All Artists</h1>

        {!user.isAdmin ? null : (
          <Link to={"create_new"}>
            <Button>Add new artist...</Button>
          </Link>
        )}
        <label>Sort:</label>
        <select onChange={changeSorting}>
          <option value="chronologically">Chronologically</option>
          <option value="alphabetically">Alphabetically</option>
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
        {!sortedArtists
          ? null
          : sortedArtists.map((a) => {
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
