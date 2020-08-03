import React from "react";
import Card from "react-bootstrap/Card";

import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearMuseumDetails } from "../../store/museumDetails/actions";

export default function Museum(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const onLinkClick = () => {
    dispatch(clearMuseumDetails());
    history.push(`/museums/${props.id}`);
  };

  return (
    <div className="bg-light mb-4 text-left border rounded">
      <div className="card-body">
        <div class="row">
          <div class="col-2">
            <img src={props.imageUrl} alt="new" width="150" />
          </div>

          <div class="col-7">
            {" "}
            <h3 onClick={onLinkClick}>{props.name}</h3>
            <p>
              📍 {props.city}, {props.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
