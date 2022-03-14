const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;

// parse json using express

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/api", (req, res) => {
  res.json({ message: "Hey there welcome to this API service" });
});

app.post("/api/posts", verifyToken, (req, res) => {
  res.json({ message: "Posts created..." });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    username: "John",
    email: "john@gmail.com",
  };
  jwt.sign({ user: user }, "secretkey", (err, token) => {
    res.json({
      token,
    });
  });
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  // console.log(req.headers);
  if (typeof bearerHeader !== "undefined") {
    //   console.log(bearerHeader)
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(401);
  }
}

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
app.delete("/movie/:id", (req, res) => {
  const id = req.params.id;
  movies = movies.filter((movie) => movie.id !== id);
  res.status(200).send(movies);
});

// set the server to listen
app.listen(port, () => console.log(`server is listening at port ${port}`));
