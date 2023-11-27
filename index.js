const hero = document.getElementById("herro");
const keyy2 = document.getElementById("key2");

const apiKey = "3b559e0bc42676586bae4a8920208baa";

let favorites = [  ];

                                                // async function getJSON(url){
                                                // try {
                                                //     const res  = await fetch(`https://api.themoviedb.org/3/movie/${url}]?api_key=${apiKey}`)

                                                //     const data = res.json()

                                                //     return data;
                                                // } catch (error) {
                                                //     console.log(error)
                                                // }
                                                // }
    let isPending =false

document.addEventListener("DOMContentLoaded", function () {
    isPending = true;
    if (isPending === true) {
      document.getElementById("herro").innerHTML = `
      <div class="d-flex justify-content-center mt-5 pt-5 text-light mb-5">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
`
        ; }

    setTimeout(() => {

      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // isPending = false

          const film = data.results;

          if (film.length > 0) {
            const movie = film[18];
            const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

            const showinner = `
        <div class="film-div d-flex w-100 px-0 my-4">

            <div class="onee bg-dark p-4 text-justify text-light">
                <h1 class="title ps-3 pt-4">${movie.original_title}</h1>
                <div class="overview" style="font-size:15px;" >${movie.overview.slice(
              0,
              400
            )}...</div>
                <div class="language"><img src="https://images.unsplash.com/photo-1628510118714-d2124aea4b8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzYSUyMGZsYWd8ZW58MHx8MHx8fDA%3D" alt="" style="width:5%; height:5%;">${movie.original_language
              }glish</div>
                <div class="date">Release on: ${movie.release_date}</div>

                <span id="sp">
                
                    <div>
                        <button id="watch">
                            Watch
                        </button>
                    </div>

                    <div id="wat">
                        <div id="wat0"></div>
                        <div id="wat1"></div>
                        <div id="wat2"></div>
                    </div>
                </span>
            </div>

            <div class="movie-img">
                <img src="${image}" alt="${movie.original_title
              }" height="400" width="100%">
            </div>

        </div>
        
        `;

            hero.innerHTML = showinner;
          } else {
            hero.innerHTML = "no movie found.";
          }
        })
        .catch((error) => {
          console.error("error"), error;
        });
    }, 1000);
  

});

// SECTION 2

const image2 = document.getElementById("key2");

fetch(
  `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&&api_key=3b559e0bc42676586bae4a8920208baa`
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results)

    allfilm = data.results;
    displayFilm(data.results);
  });


// function displayFilm(film) {
//   let tv = "";

//   film.map((value) => {
//     tv += `
       
//         <div class=" container">
//         <div class="product">
//                <img src=https://image.tmdb.org/t/p/original${
//                  value.poster_path
//                }  alt="${value.title}">
             
             
//              <div class="original text-light"><h4>${
//                value.original_title
//              }</h4></div>
//                 <div class="second-film-disc">${value.overview.slice(
//                   0,
//                   40
//                 )}...</div>
//                 <div class="fav">Add To Favourite <i class="fas fa-heart" tabindex="0"></i></div>
//             </div>
            
//         </div>
//         `;
//   });
//   image2.innerHTML = tv;
// }

// ... (Your existing code)

function displayFilm(film) {
  let tv = "";

  film.map((value) => {
    tv += `
      <div class=" container">
        <div class="product">
          <img src=https://image.tmdb.org/t/p/original${
            value.poster_path
          }  alt="${value.title}">
          
          <div class="original text-light"><h4>${
            value.original_title
          }</h4></div>
          <div class="second-film-disc">${value.overview.slice(0, 40)}...</div>
          <div class="fav">
            <button onclick="addToFavorites(${JSON.stringify(value)})">
              Add To Favourite <i class="fas fa-heart" tabindex="0"></i>
            </button>
          </div>
        </div>
      </div>
    `;
  });

  image2.innerHTML = tv;
}


// FAVORITE

// Function to add a movie to favorites
function addToFavorites(movie) {
  favorites.push(movie)
  saveFavoritesToLocalStorage()
  updateUI()
}


// Function to save favorites to local storage
function saveFavoritesToLocalStorage() {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}




// SEARCH

const searchdiv = document.getElementById("search");
const prolist = document.getElementsByClassName("product-list");
const wrongg = document.getElementsByClassName("wrong");

// const filteredfilmlist =(searchValue) =>

function filteredfilmlist(searchValue) {
  return allfilm.filter((film) =>
    film.title.toLowerCase().includes(searchValue.toLowerCase())
  );
}

searchdiv.addEventListener("input", (e) => {
  const searchValue = e.target.value;
  const filteredArrey = filteredfilmlist(searchValue);
  prolist.innerHTML = "";
  wrongg.innerHTML = "";

  if (searchValue.length > 0 && filteredArrey.length > 0) {
    wrongg.textcontent = `Showing ${filteredArrey.length} results for ${searchValue}`;
    displayFilm(filteredArrey);
  } else if (searchValue && filteredArrey.length === 0) {
    wrongg.textcontent = `No result "${searchValue}"`;
  } else {
    displayFilm(allfilm);
  }
});

// Add to favorites


            





// const hero = document.getElementById("herro");
// const keyy2 = document.getElementById("key2");

// const apiKey = "3b559e0bc42676586bae4a8920208baa";
// let favorites = []; // Array to store favorite movies

// // ... (Rest of your code)

// // Function to add a movie to favorites
// function addToFavorites(movie) {
//   favorites.push(movie);
//   saveFavoritesToLocalStorage(); // Save favorites to local storage
//   updateUI(); // Update the UI to reflect the changes
// }

// // Function to remove a movie from favorites
// function removeFromFavorites(movie) {
//   favorites = favorites.filter((fav) => fav.id !== movie.id);
//   saveFavoritesToLocalStorage(); // Save favorites to local storage
//   updateUI(); // Update the UI to reflect the changes
// }

// // Function to check if a movie is in favorites
// function isInFavorites(movie) {
//   return favorites.some((fav) => fav.id === movie.id);
// }

// // Function to save favorites to local storage
// function saveFavoritesToLocalStorage() {
//   localStorage.setItem("favorites", JSON.stringify(favorites));
// }

// // Function to load favorites from local storage
// function loadFavoritesFromLocalStorage() {
//   const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
//   favorites = storedFavorites;
//   updateUI(); // Update the UI to reflect the stored favorites
// }

// // Function to update the UI based on the favorites
// function updateUI() {
//   // Add logic to update the UI based on the favorites array
//   // For example, you can add a heart icon next to each movie in the UI if it's in favorites
// }

// // ... (Rest of your code)

// // Call loadFavoritesFromLocalStorage on page load to load favorites from local storage
// window.onload = loadFavoritesFromLocalStorage;
