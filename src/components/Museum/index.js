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
    <Card>
      <h3 onClick={onLinkClick}>{props.name}</h3>
    </Card>
  );
}
