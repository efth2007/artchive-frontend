import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import { fetchArtists } from "../../store/artists/actions";
import { selectArtists } from "../../store/artists/selectors";
import Artist from "../../components/Artist";

export default function Artists() {
  const dispatch = useDispatch();
  const artists = useSelector(selectArtists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <>
      <Jumbotron>
        <h1>All Artists</h1>
      </Jumbotron>
      <Container>
        {artists.map((a) => {
          return (
            <Artist
              key={a.id}
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
