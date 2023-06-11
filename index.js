const API_KEY = "03a1714d-e9bd-48b7-9c93-f38529f92aca"
const API_URL_POPULAR =
 "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1"
const API_URL_SEARCH =
"https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword="
const API_URL_MOVIE_DETAILS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/"


getMovies(API_URL_POPULAR)

async function getMovies(url){
    const resp = await fetch(url , {
        headers :{
        "Content-Type":"application/json" , 
        "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    showMovies(respData)
}



function showMovies(data){
    const moviesEl = document.querySelector(".movies");


//очищяю предыдущие фильмы


    data.films.forEach((movie) => {
        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")
        movieEl.innerHTML = `
        <div class="movie_cover-inner">
        <img src="${movie.posterUrlPreview}" 
        class="movie_cover"
        alt="${movie.nameRu}"
        />
    <div class="movie_cover-darkened"></div>
    </div>
    <div class="movie-info">
        <div class="movie_title">${movie.nameRu}</div>
        <div class="movie_category">${movie.genres.map((genre) => `${genre.genre}`)}
             </div>
        <div class="movie_average movie_average--green">${movie.rating}</div>
    </div>
        `;
    movieEl.addEventListener("click", () => openModal(movie.filmId))
    moviesEl.appendChild(movieEl);
    });
}

const form = document.querySelector('form');
const search = document.querySelector('.header-search');

form.addEventListener('submit' , (e) =>{
    e.preventDefault();

    const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
    if(search.value){
        getMovies(apiSearchUrl)

        search.value='';
    }
})

