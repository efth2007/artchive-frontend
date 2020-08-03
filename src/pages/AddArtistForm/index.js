import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { addArtist } from "../../store/artists/actions";
import { selectIsAdmin } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Jumbotron } from "react-bootstrap";

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
    <Jumbotron>
      <Container>
        <h1>Add a new artist:</h1>
        <div
          class="form text-left"
          // onSubmit={submitForm}
          // className="justify-content-md-center"
        >
          <div class="row">
            <div class="col-sm">
              <div class="form-group ">
                <div class="form-label">First name</div>
                <input
                  class="form-control"
                  value={firstName}
                  onChange={(event) => set_firstName(event.target.value)}
                  type="text"
                  placeholder="Enter the artist's first name"
                />
              </div>
            </div>
            <div class="col-sm">
              <div class="form-group">
                <div class="form-label">Last name</div>
                <input
                  class="form-control"
                  value={lastName}
                  onChange={(event) => set_lastName(event.target.value)}
                  type="text"
                  placeholder="Enter the artist's last name"
                  required
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm-3">
              <div class="form-group">
                <div class="form-label">Known as... (optional)</div>
                <input
                  class="form-control"
                  value={knownAs}
                  onChange={(event) => set_knownAs(event.target.value)}
                  type="text"
                  placeholder="Enter the name the artist is mostly known as (optional)"
                />
              </div>
            </div>

            <div class="col-sm">
              <div class="form-group">
                <div class="form-label">Wikipedia page</div>
                <input
                  class="form-control"
                  value={wikiUrl}
                  onChange={(event) => set_wikiUrl(event.target.value)}
                  type="text"
                  placeholder="Enter the artist's wikipedia page"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm">
              <div class="form-group">
                <div class="form-label">Birth year</div>
                <input
                  class="form-control"
                  value={bornOn}
                  onChange={(event) => set_bornOn(event.target.value)}
                  type="number"
                  min="0"
                  max="2020"
                  step="1"
                  placeholder="Enter the year the artist was born"
                />
              </div>
            </div>

            <div class="col-sm">
              <div class="form-group">
                <div class="form-label">Year of death</div>
                <input
                  class="form-control"
                  value={diedOn}
                  onChange={(event) => set_diedOn(event.target.value)}
                  type="number"
                  min="0"
                  max="2020"
                  step="1"
                  placeholder="Enter the year the artist died"
                />
              </div>
            </div>

            <div class="col-sm">
              <div class="form-label">Select gender</div>

              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="male"
                  value="male"
                  onChange={(event) => set_gender(event.target.value)}
                ></input>
                <label class="form-check-label" for="male">
                  male
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="female"
                  value="female"
                  onChange={(event) => set_gender(event.target.value)}
                ></input>
                <label class="form-check-label" for="female">
                  female
                </label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  name="inlineRadioOptions"
                  id="other"
                  value="other"
                  onChange={(event) => set_gender(event.target.value)}
                ></input>
                <label class="form-check-label" for="other">
                  other
                </label>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-sm">
              <div class="form-group">
                <div class="form-label">Nationality</div>
                <input
                  class="form-control"
                  value={nationality}
                  onChange={(event) => set_nationality(event.target.value)}
                  type="text"
                  placeholder="Enter the artist's nationality"
                />
              </div>
            </div>

            <div class="col-sm">
              <div class="form-group">
                <div class="form-label">Place of birth</div>
                <input
                  class="form-control"
                  value={placeOfBirth}
                  onChange={(event) => set_placeOfBirth(event.target.value)}
                  type="text"
                  placeholder="Enter the city where the artist was born"
                />
              </div>
            </div>

            <div class="col-sm">
              <div class="form-group">
                <div class="form-label">Place of death</div>
                <input
                  class="form-control"
                  value={placeOfDeath}
                  onChange={(event) => set_placeOfDeath(event.target.value)}
                  type="text"
                  placeholder="Enter the city where the artist died"
                />
              </div>
            </div>
          </div>

          {/*             
            <div class="row mb-5 text-center">
              <div class="col-4 ml-2">
                <div class="form-label" for="male">
                  Male
                </div>
                <input
                  class="form-control"
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={(event) => set_gender(event.target.value)}
                />
              </div>

              <div class="col-3 ml-2">
                <div class="form-label" for="female">
                  Female
                </div>
                <input
                  class="form-control"
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={(event) => set_gender(event.target.value)}
                />
              </div>

              <div class="col-3 ml-2">
                <div class="form-label" for="other">
                  Other
                </div>
                <input
                  class="form-control"
                  type="radio"
                  id="other"
                  name="gender"
                  value="other"
                  onChange={(event) => set_gender(event.target.value)}
                />
              </div>
            </div>{" "} */}

          <div class="form-group">
            <button
              className="btn btn-primary"
              variant="primary"
              type="submit"
              onClick={submitForm}
            >
              Submit new artist
            </button>{" "}
          </div>
        </div>
      </Container>
    </Jumbotron>
  );
}
