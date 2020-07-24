import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
//import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Artist(props) {
  return (
    <Jumbotron>
      <Link to={`/artists/${props.id}`}>
        {props.knownAs ? (
          <h3>{props.knownAs}</h3>
        ) : (
          <h3>
            {props.firstName} {props.lastName}{" "}
          </h3>
        )}
      </Link>
      <p>
        {props.bornOn} - {props.diedOn}
      </p>
    </Jumbotron>
  );
}
