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

//Modal
const modalEl = document.querySelector('.modal');


async function openModal(id){
    const resp = await fetch(API_URL_MOVIE_DETAILS + id, {
       headers :{
        "Content-Type":"application/json" , 
        "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();

    modalEl.classList.add("modal--show")

    modalEl.innerHTML = `
<div class="modal_card">
<img class="modal_movie-backdrop" src="${respData.posterUrl}" alt "">
<h2>
<span class="modal_movie-title">Название - ${respData.nameRu}</span>
<span class="modal_movie-release-year">Год - ${respData.year}</span>
</h2>
<ul class="modal_movie-info">
<div class="loader"></div>
<li class="modal_movie-genre">Жанр - ${respData.genres.map((el) => `<span>${el.genre}</span>`)}</li>
 ${respData.filmLength ? `<li class="modal_movie-runtime">Время - ${respData.filmLength} минут</li>` : ''}
<li>Сайт:<a class=modal_movie-site" href="${respData.webUrl}">${respData.webUrl}</a></li>
<li class="modal_movie-overview">Описание - ${respData.description}</li>
</ul>
<button type="button" class="modal_button-close">Закрыть</button>
</div>
`
 const btnClose = document.querySelector(".modal_button-close")
 btnClose.addEventListener("click",() => closeModal())
}

