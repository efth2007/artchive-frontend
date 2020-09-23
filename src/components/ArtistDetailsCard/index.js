import React from "react";
import Jumbotron from "react-bootstrap/Jumbotron";
//import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Artist(props) {
  return (
    <div>
      <div class="row mb-5 text-left">
        <div class="col-3 ml-4">
          <img
            src={
              props.imageUrl ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }
            class="img-fluid"
            alt="new"
            width="350"
          />
        </div>

        <div class="col-7">
          {" "}
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
          {!props.tags ? null : (
            <p>
              {props.painter ? (
                <span class="badge badge-dark">painter</span>
              ) : null}{" "}
              {props.sculptor ? (
                <span class="badge badge-dark">sculptor</span>
              ) : null}{" "}
              {props.tags.map((t, index) => (
                <span class="badge badge-secondary" key={t.id}>
                  {(index ? ", " : "") + t.tagName}
                </span>
              ))}{" "}
            </p>
          )}
          <p>
            * {props.placeOfBirth}, {props.bornOn}
            <br />
            {!props.diedOn
              ? null
              : `† ${props.placeOfDeath}, 
                    ${props.diedOn}`}
          </p>
          <p>Nationality: {props.nationality}</p>
          <p>
            {props.bio ||
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}
          </p>
          <p>
            <a href={props.wikiUrl} target="_blank">
              View wiki page...
            </a>
            <br />
          </p>
          {/* <h1>{museum.name}</h1>
          <h5>
            {museum.city}, {museum.country}
          </h5>
          <p>{museum.description}</p>
          <br />
          <h5>
            <a href={museum.website} target="_blank">
              Visit the {museum.name}...
            </a>
          </h5> */}
        </div>
      </div>
    </div>
  );
}
