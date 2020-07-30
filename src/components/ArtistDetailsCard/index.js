import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
//import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Artist(props) {
  return (
    <div>
      {props.knownAs ? (
        <div>
          <h1>{props.knownAs}</h1>
          <h4>
            ({props.firstName} {props.lastName})
          </h4>
        </div>
      ) : (
        <h1>
          {props.firstName} {props.lastName}{" "}
        </h1>
      )}
      <p>
        {props.placeOfBirth}, {props.bornOn} - {props.placeOfDeath},{" "}
        {props.diedOn}
      </p>
      <p>
        Tags:{" "}
        {!props.tags
          ? null
          : props.tags.map((t, index) => (
              <span key={t.id}>{(index ? ", " : "") + t.tagName}</span>
            ))}
      </p>

      <p>
        <a href={props.wikiUrl}>View wiki page...</a>
        <br />
      </p>
    </div>
  );
}
