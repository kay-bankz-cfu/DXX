const favmovies = document.getElementById('favorites-movies')

function displayFilm(film) {
  let fav = "";

  film.map((value) => {
    fav += `
      <div class="container">
        <div class="product">
          <img src=https://image.tmdb.org/t/p/original${
            value.poster_path
          }  alt="${value.title}">
          
          <div class="original text-light">${value.original_title}</div>
          <div class="second-film-disc">${value.overview.slice(0, 40)}...</div>
          <button class="fav">Remove from Favorites
            ${
              isInFavorites(value)
                ? '<i class="fas fa-heart" style="color: red;" onclick="removeFromFavorites(' +
                  JSON.stringify(value) +
                  ')"></i>'
                : '<i class="far fa-heart" onclick="addToFavorites(' +
                  JSON.stringify(value) +
                  ')"></i>'
            }
          </button>
        </div>
      </div>
    `;
  });

  favmovies.innerHTML = fav;
}

// Function to remove a movie from favorites
function removeFromFavorites(movie) {
  favorites = favorites.filter((fav) => fav.id !== movie.id);
  saveFavoritesToLocalStorage(); // Save favorites to local storage
  updateUI(); // Update the UI to reflect the changes
}

// Function to check if a movie is in favorites
function isInFavorites(movie) {
  return favorites.some((fav) => fav.id === movie.id);
}

// Function to load favorites from local storage
function loadFavoritesFromLocalStorage() {
  const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = storedFavorites;
  updateUI(); // Update the UI to reflect the stored favorites
}
