const express = require("express");
const app = express();

// Middleware to handle JSON requests
app.use(express.json());

// Port number
const PORT = 3000;

// Sample movies data
const movies = [
    { id: 1, title: "Inception", year: 2010 },
    { id: 2, title: "Interstellar", year: 2014 },
    { id: 3, title: "The Dark Knight", year: 2008 }
];

// Home route
app.get("/", (req, res) => {
    res.send("Welcome to 99Movies Backend API!");
});

// Get all movies
app.get("/movies", (req, res) => {
    res.json(movies);
});

// Get a specific movie by ID
app.get("/movies/:id", (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) return res.status(404).send("Movie not found");
    res.json(movie);
});

// Search movie by title
app.get('/movies/search', (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.json({ error: "Query parameter 'q' is required" });
    }

    const results = movies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
    );
    res.json(results);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});