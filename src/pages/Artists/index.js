import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { fetchArtists } from "../../store/artists/actions";
import { selectArtists } from "../../store/artists/selectors";
import Artist from "../../components/Artist";

export default function Artists() {
  const [displayed, set_displayed] = useState("chronologically");

  const dispatch = useDispatch();
  const artists = useSelector(selectArtists);

  const alphabetically = () => set_displayed("alphabetically");
  const chronologically = () => set_displayed("chronologically");

  console.log("Are artists here already?", artists);
  const artistsStoredChronologically = [...artists].sort(
    (a, b) => a.bornOn - b.bornOn
  );

  const artistsStoredAlphabetically = [...artists].sort((a, b) =>
    a.lastName.localeCompare(b.lastName)
  );

  const displayedArtists =
    displayed === "alphabetically"
      ? artistsStoredAlphabetically
      : displayed === "chronologically"
      ? artistsStoredChronologically
      : null;

  //displayedArtists ?
  console.log(`Artists sorted ${displayed}, (i hope)......:`, displayedArtists);
  //   : console.log("ONE MOMENT PLEASE");

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <>
      <Jumbotron>
        <h1>All Artists</h1>

        <Button onClick={alphabetically}>Alphabetically</Button>
        <Button onClick={chronologically}>Chronologically</Button>
      </Jumbotron>
      <Container>
        {displayedArtists.map((a) => {
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
