import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistById } from "../../store/artistDetails/actions";
import { selectArtistDetails } from "../../store/artistDetails/selectors";
import ArtistDetailsCard from "../../components/ArtistDetailsCard";

export default function ArtistDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchArtistById(id));
  }, [dispatch, id]);

  const artist = useSelector(selectArtistDetails).artist;
  console.log("Yoooo, artist??", artist);
  return (
    <div>
      <h2>Artist details number {id} </h2>
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
    </div>
  );
}
