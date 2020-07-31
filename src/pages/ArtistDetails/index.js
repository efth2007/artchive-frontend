import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistById } from "../../store/artistDetails/actions";
import { addArtistToFavorites } from "../../store/user/actions";
import { selectArtistDetails } from "../../store/artistDetails/selectors";
import { selectToken, selectId } from "../../store/user/selectors";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import ArtistDetailsCard from "../../components/ArtistDetailsCard";
import Artwork from "../../components/Artwork";

export default function ArtistDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const artistId = id;
  const userId = useSelector(selectId);
  const token = useSelector(selectToken);
  const artist = useSelector(selectArtistDetails).artist;

  useEffect(() => {
    dispatch(fetchArtistById(artistId));
  }, [dispatch, artistId]);

  const faveButtonClicked = (e) => {
    e.preventDefault();
    dispatch(addArtistToFavorites(userId, artistId));
  };

  console.log("Yoooo, artist??", artist);
  return (
    <div>
      <h2>Artist details number {artistId} </h2>
      <Jumbotron>
        <ArtistDetailsCard
          key={artist.id}
          knownAs={artist.knownAs}
          firstName={artist.firstName}
          lastName={artist.lastName}
          bornOn={artist.bornOn}
          diedOn={artist.diedOn}
          placeOfBirth={artist.placeOfBirth}
          placeOfDeath={artist.placeOfDeath}
          wikiUrl={artist.wikiUrl}
          tags={artist.tags}
        />
        {!token ? null : <Button onClick={faveButtonClicked}>Fave!</Button>}
      </Jumbotron>
      {!artist.artworks ? null : (
        <div class="card-columns">
          {" "}
          {artist.artworks.map((aw) => (
            <Artwork
              key={aw.id}
              title={aw.title}
              date={aw.date}
              imageUrl={aw.imageUrl}
              description={aw.description}
              museum={aw.location}
            />
          ))}{" "}
        </div>
      )}
    </div>
  );
}
