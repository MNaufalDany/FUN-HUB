require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/api/games", async (req, res) => {
  try {
    const { search = "", genre = "" } = req.query;
    const apiKey = process.env.RAWG_API_KEY;

    let url = `https://api.rawg.io/api/games?key=${apiKey}&page_size=12`;

    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    if (genre) {
      url += `&genres=${encodeURIComponent(genre)}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Error fetching RAWG API:", error);
    res.status(500).json({
      message: "Failed to fetch data from RAWG API"
    });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});