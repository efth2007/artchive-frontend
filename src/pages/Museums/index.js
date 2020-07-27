import React, { useState, useEffect } from "react";
//import { useDispatch, useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";

export default function Museums() {
  //const dispatch = useDispatch();
  //const artists = useSelector(selectArtists);

  //  useEffect(() => {
  //    dispatch(fetchArtists());

  //  }, [dispatch]);

  return (
    <>
      <Jumbotron>
        <h1>All Museums!</h1>
      </Jumbotron>
      <Container>
        <h1>MUSEUMS!!</h1>
      </Container>
    </>
  );
}
