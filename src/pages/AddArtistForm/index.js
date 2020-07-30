import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { addArtist } from "../../store/artists/actions";
import { selectIsAdmin } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

export default function AddArtistForm() {
  const [firstName, set_firstName] = useState("");
  const [lastName, set_lastName] = useState("");
  const [knownAs, set_knownAs] = useState("");
  const [placeOfBirth, set_placeOfBirth] = useState("");
  const [placeOfDeath, set_placeOfDeath] = useState("");
  const [bornOn, set_bornOn] = useState("");
  const [diedOn, set_diedOn] = useState("");
  const [gender, set_gender] = useState("");
  const [nationality, set_nationality] = useState("");
  const [wikiUrl, set_wikiUrl] = useState("");

  const dispatch = useDispatch();
  const isAdmin = useSelector(selectIsAdmin);
  const history = useHistory();

  useEffect(() => {
    if (isAdmin !== null && isAdmin === false) {
      history.push("/");
    }
  }, [isAdmin, history]);

  function submitForm(event) {
    event.preventDefault();
    console.log(`first: ${firstName}
    last: ${lastName}
    knownAs: ${knownAs}
    bornOn: ${bornOn}
    diedOn: ${diedOn}
    placeOfBirth: ${placeOfBirth}
    placeOfDeath: ${placeOfDeath}
    nationality: ${nationality}
    wiki: ${wikiUrl}
    gender: ${gender}
    `);
    dispatch(
      addArtist(
        firstName,
        lastName,
        knownAs,
        bornOn,
        diedOn,
        placeOfBirth,
        placeOfDeath,
        nationality,
        wikiUrl,
        gender
      )
    );

    set_firstName("");
    set_lastName("");
    set_knownAs("");
    set_placeOfBirth("");
    set_placeOfDeath("");
    set_bornOn("");
    set_diedOn("");
    set_gender("");
    set_nationality("");
    set_wikiUrl("");
  }

  return (
    <Container>
      <h1>Add a new artist:</h1>
      <Form onSubmit={submitForm} className="justify-content-md-center">
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control
            value={firstName}
            onChange={(event) => set_firstName(event.target.value)}
            type="text"
            placeholder="Enter the artist's first name"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            value={lastName}
            onChange={(event) => set_lastName(event.target.value)}
            type="text"
            placeholder="Enter the artist's last name"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Known as...</Form.Label>
          <Form.Control
            value={knownAs}
            onChange={(event) => set_knownAs(event.target.value)}
            type="text"
            placeholder="Enter the name the artist is mostly known as (optional)"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Place of birth</Form.Label>
          <Form.Control
            value={placeOfBirth}
            onChange={(event) => set_placeOfBirth(event.target.value)}
            type="text"
            placeholder="Enter the city where the artist was born"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Birth year</Form.Label>
          <Form.Control
            value={bornOn}
            onChange={(event) => set_bornOn(event.target.value)}
            type="number"
            min="0"
            max="2020"
            step="1"
            placeholder="Enter the year when the artist was born"
          />
        </Form.Group>

        {/* ////////////DEAD???  /////////////    */}
        <Form.Group>
          <Form.Label>Place of death</Form.Label>
          <Form.Control
            value={placeOfDeath}
            onChange={(event) => set_placeOfDeath(event.target.value)}
            type="text"
            placeholder="Enter the city where the artist died"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Year of death</Form.Label>
          <Form.Control
            value={diedOn}
            onChange={(event) => set_diedOn(event.target.value)}
            type="number"
            min="0"
            max="2020"
            step="1"
            placeholder="Enter the year when the artist died"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Nationality</Form.Label>
          <Form.Control
            value={nationality}
            onChange={(event) => set_nationality(event.target.value)}
            type="text"
            placeholder="Enter the artist's nationality"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Wikipedia page</Form.Label>
          <Form.Control
            value={wikiUrl}
            onChange={(event) => set_wikiUrl(event.target.value)}
            type="text"
            placeholder="Enter the artist's wikipedia page"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Select gender</Form.Label>
          <br />

          <label for="male">Male</label>
          <Form.Control
            type="radio"
            id="male"
            name="gender"
            value="male"
            onChange={(event) => set_gender(event.target.value)}
          />
          <label for="female">Female</label>
          <Form.Control
            type="radio"
            id="female"
            name="gender"
            value="female"
            onChange={(event) => set_gender(event.target.value)}
          />
          <label for="male">Other</label>
          <Form.Control
            type="radio"
            id="other"
            name="gender"
            value="other"
            onChange={(event) => set_gender(event.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Button className="col-md-2" variant="primary" type="submit">
            Submit new artist
          </Button>{" "}
        </Form.Group>
      </Form>
    </Container>
  );
}
