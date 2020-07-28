import React from "react";

import { Link } from "react-router-dom";

export default function Artwork(props) {
  return (
    <div class="card">
      <img src={props.imageUrl} class="img-fluid" alt={props.title} />

      <div class="card-body">
        <h4 class="card-title">
          {props.title} ({props.date})
        </h4>
        {props.museum === null || props.museum === undefined ? null : (
          <h5>
            Location:{" "}
            <Link to={`/museums/${props.museum.id}`}>{props.museum.name}</Link>
          </h5>
        )}
        {props.artist === null || props.artist === undefined ? null : (
          <h5>
            Created by{" "}
            <Link to={`/artists/${props.artist.id}`}>
              {props.artist.knownAs
                ? props.artist.knownAs
                : `${props.artist.firstName} ${props.artist.lastName}`}
            </Link>
          </h5>
        )}
        <p class="card-text">{props.description}</p>
      </div>
    </div>
  );
}
