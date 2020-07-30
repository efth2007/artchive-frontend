import React from "react";

//import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Artist(props) {
  return (
    <div className="bg-light mb-4 text-left border rounded">
      <div className="card-body p-4">
        {" "}
        <Link to={`/artists/${props.id}`}>
          {props.knownAs ? (
            <h3>{props.knownAs}</h3>
          ) : (
            <h3>
              {props.firstName} {props.lastName}{" "}
            </h3>
          )}
        </Link>
        {props.bornOn} - {props.diedOn}
      </div>
    </div>
  );
}
