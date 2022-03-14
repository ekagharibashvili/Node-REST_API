const express = require("express");

const app = express();
const port = 3000;

// parse json using express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let movies = [
  {
    id: "1",
    title: "inception",
    director: "Christopher Nolan",
    release_date: "2010-07-16",
  },
  {
    id: "2",
    title: "The Irishman",
    director: "Martin scorsese",
    release_date: "2019-09-27",
  },
];

// get the movie list in  the form of json

app.get("/movies", (req, res) => {
  res.json(movies);
});

// ad movie to the list
app.post("/movie", (req, res) => {
  const movie = req.body;
  console.log(movie);
  movies.push(movie);
  res.send("Movie is added to the list");
});

// search movie in database
app.get("/movie/:id", (req, res) => {
  const id = req.params.id;
  for (let movie of movies) {
    if (movie.id === id) {
      res.json(movie);
      return;
    }
  }
  res.status(404).send("Movie not found");
});

// remove movie from the list
app.delete('/movie/:id', (req, res) => {
    const id = req.params.id;
    movies= movies.filter(movie => movie.id !== id)
    res.status(200).send(movies)
})

// set the server to listen
app.listen(port, () => console.log(`server is listening at port ${port}`));
