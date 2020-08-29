import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistById } from "../../store/artistDetails/actions";
import {
  addArtistToFavorites,
  removeArtistFromFavorites,
} from "../../store/user/actions";
import { selectArtistDetails } from "../../store/artistDetails/selectors";
import {
  selectToken,
  selectId,
  selectFavorites,
} from "../../store/user/selectors";
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
  const favorites = useSelector(selectFavorites);

  const isFavorite = favorites
    ? favorites.filter((f) => f.id === parseInt(artistId)).length > 0
    : null;

  useEffect(() => {
    dispatch(fetchArtistById(artistId));
  }, [dispatch, artistId]);

  const faveButtonClicked = (e) => {
    e.preventDefault();

    isFavorite
      ? dispatch(removeArtistFromFavorites(userId, artistId))
      : dispatch(addArtistToFavorites(userId, artistId));
  };

  console.log("Yoooo, artist??", artist);
  console.log("favorites:...", favorites);

  return (
    <div>
      {/* <h2>Artist details number {artistId} </h2> */}

      {/* 
      Random map from bootstrap...
      
      <div
        id="map-container-google-1"
        class="z-depth-1-half map-container"
        style={{ height: 500 }}
      >
        <iframe
          src="https://maps.google.com/maps?q=manhatan&t=&z=13&ie=UTF8&iwloc=&output=embed"
          frameborder="0"
          style={{y}}
          allowfullscreen
        ></iframe>
      </div> */}

      <Jumbotron>
        {!artist ? null : (
          <div>
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
              imageUrl={artist.imageUrl}
              bio={artist.bio}
              nationality={artist.nationality}
              painter={artist.painter}
              sculptor={artist.sculptor}
            />
            {!token ? null : (
              <Button onClick={faveButtonClicked}>
                {isFavorite ? "Added to favorites!" : "Add to favorites"}
              </Button>
            )}
          </div>
        )}
      </Jumbotron>
      {!artist.artworks ? null : (
        <div>
          <h2 class="mb-5">
            Some works by{" "}
            {artist.knownAs || `${artist.firstName} ${artist.lastName}`}...
          </h2>

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
        </div>
      )}
    </div>
  );
}
