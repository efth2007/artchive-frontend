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
        <h1>Welcome to Ar(t)chive</h1>
        <h3>BLABALBLABLAB</h3>
      </div>
      <div class="card">
        <h4>Today's featured artist: </h4>
        {!featuredArtist ? null : (
          <div>
            {featuredArtist.knownAs ? (
              <h3>{featuredArtist.knownAs}</h3>
            ) : (
              <h3>
                {featuredArtist.firstName} {featuredArtist.lastName}{" "}
              </h3>
            )}

            <p>
              {featuredArtist.placeOfBirth}, {featuredArtist.bornOn} -{" "}
              {featuredArtist.placeOfDeath}, {featuredArtist.diedOn}
            </p>
            <p>
              Tags:{" "}
              {!featuredArtist.tags
                ? null
                : featuredArtist.tags.map((t, index) => (
                    <span key={t.id}>{(index ? ", " : "") + t.tagName}</span>
                  ))}
            </p>

            <p>
              <a href={featuredArtist.wikiUrl}>View wiki page...</a>
              <br />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
