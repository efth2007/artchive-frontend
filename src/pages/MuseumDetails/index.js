import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMuseumById } from "../../store/museumDetails/actions";
import { selectMuseumDetails } from "../../store/museumDetails/selectors";
//import ArtistDetailsCard from "../../components/ArtistDetailsCard";
//import Artwork from "../../components/Artwork";

export default function MuseumDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMuseumById(id));
  }, [dispatch, id]);

  const museum = useSelector(selectMuseumDetails).museum;
  console.log("Museum??", museum);
  return (
    <div>
      <h2>Museum details number {id} </h2>

      {/*     
    
      <ArtistDetailsCard
        key={artist.id}
       
        placeOfDeath={artist.placeOfDeath}
        wikiUrl={artist.wikiUrl}
        tags={artist.tags}
      />
 */}

      {/* {!artist.artworks ? null : (
        <div class="card-columns">
          {" "}
          {artist.artworks.map((aw) => (
            <Artwork
              key={aw.id}
              title={aw.title}
              date={aw.date}
              imageUrl={aw.imageUrl}
              description={aw.description}
            />
          ))}{" "}
        </div>
      )} */}
    </div>
  );
}
