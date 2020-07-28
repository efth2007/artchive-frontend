import React from "react";
import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";

export default function Museum(props) {
  return (
    <Card>
      <Link to={`/museums/${props.id}`}>
        <h3>{props.name}</h3>
      </Link>
    </Card>
  );
}
