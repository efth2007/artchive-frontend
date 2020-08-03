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
      <div class="jumbotron">
        <div class="row mb-5 text-left">
          <div class="col-4">
            <img src={museum.imageUrl} alt="new" height="300" />
          </div>
          <div class="col-7">
            {" "}
            <h1>{museum.name}</h1>
            <h5>
              {museum.city}, {museum.country}
            </h5>
            <p>{museum.description}</p>
            <br />
            <h5>
              <a href={museum.website} target="_blank">
                Visit the {museum.name}...
              </a>
            </h5>
          </div>
        </div>

        {!museum.name ? null : (
          <Map
            location={{
              address: museum.name,
              lat: parseFloat(museum.latitude),
              lng: parseFloat(museum.longitude),
            }}
            zoomLevel={15}
          />
        )}
      </div>

      <div>
        {!museum.artworks ? null : (
          <div>
            <h2 class="mb-5">Discover the {museum.name} collection...</h2>
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
          </div>
        )}
      </div>
    </div>
  );
}
