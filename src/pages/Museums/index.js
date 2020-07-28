import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Jumbotron from "react-bootstrap/Jumbotron";
import Container from "react-bootstrap/Container";
import { fetchMuseums } from "../../store/museums/actions";
import { selectMuseums } from "../../store/museums/selectors";
import Museum from "../../components/Museum";

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
        <h1>All Museums!</h1>
      </Jumbotron>
      <Container>
        <h1>MUSEUMS!!</h1>
        {museums.map((m) => (
          <Museum key={m.id} id={m.id} name={m.name} />
        ))}
      </Container>
    </>
  );
}
