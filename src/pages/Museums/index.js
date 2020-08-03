import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import { fetchMuseums } from "../../store/museums/actions";
import { selectMuseums } from "../../store/museums/selectors";
import Museum from "../../components/Museum";
import GoogleMapReact from "google-map-react";
import { LocationPin } from "../../components/Map/index.js";
import "../../components/Map/index.css";

export default function Museums() {
  const dispatch = useDispatch();
  const museums = useSelector(selectMuseums);

  console.log("your museums here:", museums);

  useEffect(() => {
    dispatch(fetchMuseums());
  }, [dispatch]);

  return (
    <>
      <Jumbotron>
        <h1>Discover your favorite museum</h1>
        <div className="map">
          <div className="google-map">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: "AIzaSyCq7OIj4xIJv_2CFRJkcfA38sIaFep0LUQ",
              }}
              defaultCenter={{ lat: 0, lng: 0 }}
              defaultZoom={1}
            >
              {!museums
                ? null
                : museums.map((m) => (
                    <LocationPin
                      lat={m.latitude}
                      lng={m.longitude}
                      text={m.name}
                    />
                  ))}
            </GoogleMapReact>{" "}
          </div>
        </div>
      </Jumbotron>
      <Container>
        {museums.map((m) => (
          <Museum
            key={m.id}
            id={m.id}
            name={m.name}
            city={m.city}
            country={m.country}
            imageUrl={m.imageUrl}
            description={m.description}
          />
        ))}
      </Container>
    </>
  );
}
