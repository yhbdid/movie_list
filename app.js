// require packages used in the project
const express = require("express");
const app = express();
const port = 3000;

// app.js
// require packages used in the project
// ...
const exphbs = require("express-handlebars");
const movieList = require("./movies.json");

// setting template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// setting static files
app.use(express.static("public"));

// routes setting
app.get("/", (req, res) => {
  // past the movie data into 'index' partial template
  res.render("index", { movies: movieList.results });
});

app.get("/movies/:movie_id", (req, res) => {
  const movie = movieList.results.find(
    movie => movie.id.toString() === req.params.movie_id
  );
  res.render("show", { movie: movie });
});

app.get("/search", (req, res) => {
  const keyword = req.query.keyword;
  const movies = movieList.results.filter(movie => {
    // 大小寫都搜得到
    return movie.title.toLowerCase().includes(keyword.toLowerCase());
  });
  res.render("index", { movies: movies, keyword: keyword });
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
