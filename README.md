## The ar(t)chive

### Purpose

This project was made to help me exercise my freshly learned coding skills and apply them in a meaningful and useful way.

The main function of the ar(t)chive app is to showcase a list of important artists, some information about them, some of their artworks and the museums where these can be found. The database used was created from scratch and will be getting expanded with frequent updates to include more artists, artworks and museums.

### Features:

- The homepage displays the ‘featured artist of the day’, an artist that randomly changes every day. This uses a random number generator that receives a different seed every day. NOTE: For demo purposes, the seed (and therefore the artist) changes every minute.

- The ‘Artists’ page displays all the artists currently in the database. They can be sorted alphabetically (according to their last name) or chronologically (according to their date of birth). A logged in user can also filter the list to only show the artists they have added as their favorites.

- By clicking on an artist’s name on the list, the user gets redirected to the artist’s detail page, where they can see some more information about the artist, as well as some of his/her artworks. If the user is logged in, they can add the artist as a favorite.

- The ‘Museums’ page displays the museums currently in the database, along with their pinned locations on a world map.

- On a museum’s details page there is some extra information about the museum, along with artworks that can be found in its collection.

### Technologies and libraries used:

- react
- redux
- axios
- express
- react-bootstrap
- [google-map-react](https://github.com/google-map-react/google-map-react)
- [seedrandom](https://github.com/google-map-react/google-map-react)

### Links

[Datamodel](https://dbdiagram.io/d/5f15b5a174ca2227330d95de)

[Frontend repository](https://github.com/efth2007/artchive-frontend)

[Backend repository](https://github.com/efth2007/artchive-backend)

[Taskboard](https://github.com/efth2007/artchive-frontend/projects/1)

[Wireframe](https://wireframepro.mockflow.com/view/M9af9a3f9764db424a3c6d7f6e33bd9bb1595326380785#/page/ceab4dc4215d40c2b87ae4bcff725fb1)
