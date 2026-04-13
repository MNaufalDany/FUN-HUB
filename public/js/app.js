const gameList = document.getElementById("gameList");
const featuredSlider = document.getElementById("featuredSlider");
const loading = document.getElementById("loading");
const statusText = document.getElementById("statusText");
const searchInput = document.getElementById("searchInput");
const genreSelect = document.getElementById("genreSelect");
const searchBtn = document.getElementById("searchBtn");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");

async function fetchGames(search = "", genre = "") {
  try {
    loading.classList.remove("hidden");
    gameList.innerHTML = "";
    featuredSlider.innerHTML = "";

    let url = "/api/games";
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (genre) params.append("genre", genre);

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    loading.classList.add("hidden");

    if (!data.results || data.results.length === 0) {
      statusText.textContent = "No games found.";
      gameList.innerHTML = `<div class="empty-card">No game data matched your search.</div>`;
      featuredSlider.innerHTML = "";
      return;
    }

    statusText.textContent = `Found ${data.results.length} games`;
    renderFeaturedGames(data.results.slice(0, 6));
    renderGames(data.results);
  } catch (error) {
    loading.classList.add("hidden");
    statusText.textContent = "Failed to load data.";
    featuredSlider.innerHTML = "";
    gameList.innerHTML = `<div class="empty-card">Error loading game data. Please try again.</div>`;
    console.error(error);
  }
}

function renderFeaturedGames(games) {
  featuredSlider.innerHTML = games.map((game) => {
    const image = game.background_image || "https://via.placeholder.com/600x800?text=No+Image";
    const rating = game.rating ? game.rating.toFixed(1) : "N/A";
    const released = game.released || "Unknown";
    const genres = (game.genres || []).slice(0, 3);

    return `
      <article class="featured-card">
        <img src="${image}" alt="${game.name}" class="featured-image">
        <div class="featured-overlay"></div>
        <div class="featured-content">
          <h3 class="featured-title">${game.name}</h3>
          <div class="featured-meta">
            <span>⭐ ${rating}</span>
            <span>${released}</span>
          </div>
          <div class="badges">
            ${genres.map((genre) => `<span class="genre-badge">${genre.name}</span>`).join("")}
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function renderGames(games) {
  gameList.innerHTML = games.map((game) => {
    const image = game.background_image || "https://via.placeholder.com/400x220?text=No+Image";
    const rating = game.rating ? game.rating.toFixed(1) : "N/A";
    const released = game.released || "Unknown";
    const genres = (game.genres || []).slice(0, 2);

    return `
      <article class="game-card">
        <img src="${image}" alt="${game.name}" class="game-thumb">
        <div class="game-body">
          <h3 class="game-title">${game.name}</h3>
          <div class="meta-row">
            <span>⭐ ${rating}</span>
            <span>${released}</span>
          </div>
          <div class="badges">
            ${genres.map((genre) => `<span class="genre-badge">${genre.name}</span>`).join("")}
          </div>
        </div>
      </article>
    `;
  }).join("");
}

searchBtn.addEventListener("click", () => {
  const search = searchInput.value.trim();
  const genre = genreSelect.value;
  fetchGames(search, genre);
});

searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const search = searchInput.value.trim();
    const genre = genreSelect.value;
    fetchGames(search, genre);
  }
});

prevSlide.addEventListener("click", () => {
  featuredSlider.scrollBy({ left: -360, behavior: "smooth" });
});

nextSlide.addEventListener("click", () => {
  featuredSlider.scrollBy({ left: 360, behavior: "smooth" });
});

window.addEventListener("DOMContentLoaded", () => {
  fetchGames();
});