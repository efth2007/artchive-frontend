import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchMuseumById } from "../../store/museumDetails/actions";
import { selectMuseumDetails } from "../../store/museumDetails/selectors";
import { Map } from "../../components/Map";

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
    address: "blaaaa",
  };

  console.log(
    `location of ${museum.name}: ${museum.latitude}, ${museum.longitude}`
  );

  return (
    <div>
      <h2>Museum details number {id} </h2>

      <h1>{museum.name}</h1>

      {location.lat === undefined || location.lat === null ? (
        <h1>WAIT!!</h1>
      ) : (
        <Map location={location2} zoomLevel={15} />
      )}
    </div>
  );
}
