import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMuseumById } from "../../store/museumDetails/actions";
import { selectMuseumDetails } from "../../store/museumDetails/selectors";
import { Map } from "../../components/Map";
import GoogleMapReact from "google-map-react";
import Artwork from "../../components/Artwork";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

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

  const location = {
    address: museum.name,
    lat: museum.latitude,
    lng: museum.longitude,
  };

  const zoomLevel = 15;

  const location2 = {
    lat: 52.359997,
    lng: 4.885219,
    address: "BLA",
  };

  console.log(
    `location of ${museum.name}: ${museum.latitude}, ${museum.longitude}`
  );

  //////////
  const defaultProps = {
    center: {
      lat: museum.latitude,
      lng: museum.longitude,
    },
    zoom: 11,
  };

  /////////////

  return (
    <div>
      <h2>Museum details number {id} </h2>

      <h1>{museum.name}</h1>
      {/* 
      {location.lat === undefined || location.lat === null ? (
        <h1>WAIT!!</h1>
      ) : ( 

      
      <Map
        location={{
          address: museum.name,
          lat: museum.latitude,
          lng: museum.longitude,
        }}
        zoomLevel={15}
      />
       )} */}

      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCq7OIj4xIJv_2CFRJkcfA38sIaFep0LUQ" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={museum.latitude}
            lng={museum.longitude}
            text="My Marker"
          />
        </GoogleMapReact>
        <h2>Some artworks you can see at {museum.name}...</h2>
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
