const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors()); // CORS enable karega
app.use(express.json()); // JSON data handle karega

// Sample Movies Data
const movies = [
  { id: 1, title: "Inception", year: 2010 },
  { id: 2, title: "Interstellar", year: 2014 },
  { id: 3, title: "The Dark Knight", year: 2008 }
];

// ✅ Home Route
app.get("/", (req, res) => {
  res.send("Welcome to 99Movies API!");
});

// ✅ Get All Movies
app.get("/movies", (req, res) => {
  res.json(movies);
});

// ✅ Get Movie by ID
app.get("/movies/:id", (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).json({ error: "Movie not found" });
  res.json(movie);
});

// ✅ Server Start
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});