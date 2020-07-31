import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMuseumById } from "../../store/museumDetails/actions";
import { selectMuseumDetails } from "../../store/museumDetails/selectors";
import { Map } from "../../components/Map";

import Artwork from "../../components/Artwork";

export default function MuseumDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMuseumById(id));
  }, [dispatch, id]);

  const museum = useSelector(selectMuseumDetails).museum;

  console.log("Museum??", museum);

  console.log(
    `location of ${museum.name}: ${museum.latitude}, ${museum.longitude}`
  );

  return (
    <div>
      <h1>{museum.name}</h1>

      {!museum.name ? (
        <h1>WAIT!!</h1>
      ) : (
        <Map
          location={{
            address: museum.name,
            lat: parseFloat(museum.latitude),
            lng: parseFloat(museum.longitude),
          }}
          zoomLevel={15}
        />
      )}

      <div>
        <h2>Some artworks you can see at the {museum.name}...</h2>
        {!museum.artworks ? null : (
          <div class="card-columns">
            {" "}
            {museum.artworks.map((aw) => (
              <Artwork
                key={aw.id}
                title={aw.title}
                date={aw.date}
                imageUrl={aw.imageUrl}
                description={aw.description}
                museum={aw.location}
                artist={aw.artist}
              />
            ))}{" "}
          </div>
        )}
      </div>
    </div>
  );
}
