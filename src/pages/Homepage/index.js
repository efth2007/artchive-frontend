import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeaturedArtist } from "../../store/featuredArtist/actions";
import { selectFeaturedArtist } from "../../store/featuredArtist/selectors";

//import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function Homepage() {
  const id = 5;
  const featuredArtist = useSelector(selectFeaturedArtist);
  const dispatch = useDispatch();

  // One random number is generated every day, and it is used to make a request for an artist
  const seedrandom = require("seedrandom");

  const year = new Date().getFullYear();
  const month = new Date().getMonth();
  const day = new Date().getDate();

  const todayRandomNumber = day * month * year;

  const rng = seedrandom(todayRandomNumber);
  const artistOfTheDayId = Math.floor(rng() * 100) + 1;

  console.log("we will look for the artist with id:", artistOfTheDayId);

  // For demo purposes, here is a random number generated every minute:
  const minutes = new Date().getMinutes();
  const rngMinutes = seedrandom(minutes);
  const artistOfThisMinuteId = Math.floor(rngMinutes() * 100) + 1;

  console.log("For this minute, artist with id:", artistOfThisMinuteId);
  console.log("FEATURED TODAY:", featuredArtist);

  ////////////////////////////////////////////////

  useEffect(() => {
    //    dispatch(fetchFeaturedArtist(artistOfTheDayId));
    //}, [dispatch, artistOfTheDayId]);
    dispatch(fetchFeaturedArtist(artistOfThisMinuteId));
  }, [dispatch, artistOfThisMinuteId]);

  return (
    <div>
      <div class="jumbotron">
        <div class="container">
          {" "}
          <div class="text-center mb-4">
            <h1>Welcome to Ar(t)chive</h1>
          </div>
          <h4 class="mt-3">
            <i> Discover your new favorite artist</i>
          </h4>
          <p> </p>
        </div>
      </div>
      <div class="container">
        <div class="card mb-5 text-left border rounded">
          {!featuredArtist ? null : (
            <div>
              <div class="card-header">Featured artist of the day: </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-4">
                    <img
                      src={
                        featuredArtist.imageUrl ||
                        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                      }
                      alt="new"
                      height="300"
                    />
                  </div>
                  <div class="col-7">
                    <Link to={`/artists/${featuredArtist.id}`}>
                      {" "}
                      {featuredArtist.knownAs ? (
                        <h3>{featuredArtist.knownAs}</h3>
                      ) : (
                        <h3>
                          {featuredArtist.firstName} {featuredArtist.lastName}{" "}
                        </h3>
                      )}
                    </Link>

                    <p>
                      * {featuredArtist.placeOfBirth}, {featuredArtist.bornOn}
                      <br />
                      {!featuredArtist.diedOn
                        ? null
                        : `† ${featuredArtist.placeOfDeath}, 
                    ${featuredArtist.diedOn}`}
                    </p>
                    <p>Nationality: {featuredArtist.nationality}</p>
                    {!featuredArtist.tags ? null : (
                      <p>
                        {" "}
                        Tags:{" "}
                        {featuredArtist.painter ? (
                          <span class="badge badge-dark">painter</span>
                        ) : null}{" "}
                        {featuredArtist.sculptor ? (
                          <span class="badge badge-dark">sculptor</span>
                        ) : null}{" "}
                        {featuredArtist.tags.map((t, index) => (
                          <span class="badge badge-secondary" key={t.id}>
                            {t.tagName}
                          </span>
                        ))}{" "}
                      </p>
                    )}

                    <p>{featuredArtist.bio}</p>
                    <p>
                      <a href={featuredArtist.wikiUrl} target="_blank">
                        View wiki page...
                      </a>
                      <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
