const hero = document.getElementById("herro");
const keyy2 = document.getElementById("key2");

const apiKey = "3b559e0bc42676586bae4a8920208baa";

let favorites = [];

// async function getJSON(url){
// try {
//     const res  = await fetch(`https://api.themoviedb.org/3/movie/${url}]?api_key=${apiKey}`)

//     const data = res.json()

//     return data;
// } catch (error) {
//     console.log(error)
// }
// }
let isPending = false;

document.addEventListener("DOMContentLoaded", function () {
  isPending = true;
  if (isPending === true) {
    document.getElementById("herro").innerHTML = `
      <div class="d-flex justify-content-center mt-5 pt-5 text-light mb-5">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>
`;
  }

  setTimeout(() => {
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // isPending = false

        const film = data.results;

        if (film.length > 0) {
          const movie = film[10];
          const image = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

          const showinner = `
        <div class="film-div d-flex w-100 px-0 my-4">

            <div class="onee bg-dark p-4 text-justify text-light">
                <h1 class="title ps-3 pt-4">${movie.original_title}</h1>
                <div class="overview" style="font-size:15px;" >${movie.overview.slice(
                  0,
                  400
                )}...</div>
                <div class="language"><img src="https://images.unsplash.com/photo-1628510118714-d2124aea4b8a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHVzYSUyMGZsYWd8ZW58MHx8MHx8fDA%3D" alt="" style="width:5%; height:5%;">${
                  movie.original_language
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
                <img src="${image}" alt="${
            movie.original_title
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

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

// SECTION 2
const image2 = document.getElementById("key2");

// fetch(
//   `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&&api_key=3b559e0bc42676586bae4a8920208baa`
// )
//   .then((response) => response.json())
//   .then((data) => {
//     // console.log(data.results)

//     allfilm = data.results;
//     displayFilm(data.results);
//   });

const API_KEY = "3b559e0bc42676586bae4a8920208baa";

async function getFilms() {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&&api_key=${API_KEY}`
    );

    const data = await res.json();
    // console.log(data);

    return data.results;
  } catch (error) {
    console.log(error);
  }
}

async function displayFilm() {
  const movies = await getFilms();

  movies.map((movie) => {
    const markup = `
     <div class="container">
      <div class="product">
        <img src="https://image.tmdb.org/t/p/original${
          movie.backdrop_path
        }" alt="${movie.title}"/>

        <div class="original text-light">
          <h4>${movie.original_title}</h4>
        </div>
        <div class="second-film-disc">${movie.overview.slice(0, 40)}...</div>
        <button class="fav" data-favicon="${movie.id}">
          Add To Favourite <i class="fas fa-heart" tabindex="0"></i>
        </button>
      </div>
    </div>
    `;

    image2.insertAdjacentHTML("afterbegin", markup);
  });
}

displayFilm();

// SEARCH
const searchBox = document.getElementById("search")

const showError = document.getElementsByClassName(".error")

const filterMovieList = (searchValue) =>
  movies.filter((markup) =>
    markup.title.toLowerCase().includes(searchValue.toLowerCase())
  );

searchBox.oninput = (e) => {
  let searchValue = e.target.value
  console.log(searchValue)
  const filterArrey = filterMovieList(searchValue)
  console.log(filterArrey)
  markup.innerHTML = ""
  showError.textContent = ""
  
  if (searchValue.length > 0 && filterArrey.length > 0) {
    console.log("show filtered movie")
    showError.textContent = `Showing ${filterArrey.length} result for ${searchValue}`
    
  } else {
    
  }
  
}

// FAVOURITE

image2.addEventListener("click", function (e) {
  if (!e.target.classList.contains("fav")) return;

  const dataset = e.target.dataset.favicon;

  // need to get from localstorage first
  const data1 = JSON.parse(localStorage.getItem("tmdbMovie"));

  let favouriteData;
  if (data1 === null) {
    favouriteData = [];
  } else {
    favouriteData = data1;
  }

  if (favouriteData.includes(dataset)) {
    const filteredData = data1.filter((data) => data !== dataset);
    console.log(filteredData);
    localStorage.setItem("tmdbMovie", JSON.stringify(filteredData));
    e.target.innerHTML =`Add to favourite <i class="fas fa-heart" tabindex="0"></i>`;

    return;
  }

  localStorage.setItem(
    "tmdbMovie",
    JSON.stringify([...favouriteData, dataset])
  );

  e.target.innerHTML = `Remove from favourite <i class="fas fa-heart" tabindex="0"></i>`;
});

// console.log(btns);

// image2.addEventListener("click", function (e) {
//   // console.log(e.target);

//   if (e.target.classList.contains("fav")) {
//     // console.log("Hello");

//     const dataId = e.target.dataset.fav;

//     console.log(movies);

//     const movie = movies.find((movie) => movie.id === dataId);

//     console.log(movie);
//   }
// });
