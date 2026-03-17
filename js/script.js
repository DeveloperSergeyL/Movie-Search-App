const apiKey = '9d8db7a3'
const CLASS_ERROR = 'error';
const CLASS_SHAKE = 'shake';
const OPENED_CLASSNAME = 'open';
const CLOSE_CLASSNAME = 'close';
const types = [
    { type: 'movie', name: 'Фильм' },
    { type: 'series', name: 'Сериал' },
    { type: 'episode', name: 'Эпизод' }
];

const bodyNode = document.querySelector('body');
const movieList = document.querySelector('.movie-list');
const movieItem = document.querySelector('.movie-list__item');
const movieSearch = document.querySelector('.movie-search');
const movieInputNode = document.querySelector('.movie-search__input');
const movieBtnSearch = document.querySelector('.movie-search__button');
const movieBackToSerch = document.querySelector('.movie__back-to-search');
const movie = document.querySelector('.movie');
const movieBody = document.querySelector('.movie-body');
let movieHTML = '';

function addClassError(name) {
    name.classList.add(CLASS_ERROR);
    name.classList.add(CLASS_SHAKE);
    setTimeout(() => name.classList.remove(CLASS_SHAKE), 1000);
}

function removeClassError(name) {
    name.classList.remove(CLASS_ERROR);
}

function clearInput(name) {
    name.value = '';
}

function chackingError(name) {
    if (!name.value) {
        addClassError(name)
        return;
    } else {
        removeClassError(name);
    };
}

function search(searchMovie) {
    const urlImg = `https://www.omdbapi.com/?s=${searchMovie}&apikey=${apiKey}`
    fetch(urlImg)
        .then(response => response.json())
        .then((res) => {
            const movies = res.Search
            renderMovies(movies);
        })
}

function open(id) {
    const urlMovie = `https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`
    fetch(urlMovie)
        .then(response => response.json())
        .then((res) => {
            renderMovie(res);
        })
}

function renderMovies(movies) {
    let moviesHTML = '';
    movies.forEach(e => {
        let title = e.Title;
        let year = e.Year;
        let poster = e.Poster;
        let type = '';
        let id = e.imdbID;
        types.forEach(el => {
            if (e.Type = el.type) {
                return type = el.name;
            }
        })
        moviesHTML += `
            <li class="movie-list__item" data-id="${id}">
                    <div class="movie-list__item-link">
                        <div class="movie-list__item-body">
                            <img src="${poster}" alt="img" class="movie-list__item-img">
                            <div class="movie-list__item-content">
                                <h3 class="movie-list__item-title">${title}</h3>
                                <p class="movie-list__item-year">${year}</p>
                                <p class="movie-list__item-genre">${type}</p>
                            </div>
                        </div>
                    </div>
                </li>
            `
    });
    movieList.innerHTML = moviesHTML;
}

function renderMovie(movie) {
    console.log(movie);
    let title = movie.Title;
    let year = movie.Year;
    let rated = movie.Rated;
    let released = movie.Released;
    let runtime = movie.Runtime;
    let genre = movie.Genre;
    let director = movie.Director;
    let writer = movie.Writer;
    let actors = movie.Actors;
    let plot = movie.Plot;
    let poster = movie.Poster;
    let type = '';
    let id = movie.imdbID;
    movieHTML = `
        <div class="movie-body__info">
            <div class="movie-body__info-img">
                <img src="${poster}" alt="">
            </div>
            <div class="movie-body__info-content">
                <h3 class="movie-body__info-title">${title}</h3>
                <ol class="movie-body__info-list">
                    <li class="movie-body__info-year">Год: <span>${year}</span></li>
                    <li class="movie-body__info-rating">Рейтинг: <span>${rated}</span></li>
                    <li class="movie-body__info-date">Дата выхода: <span>${released}</span></li>
                    <li class="movie-body__info-time">Продолжительность: <span>${runtime}</span></li>
                    <li class="movie-body__info-genre">Жанр: <span>${genre}</span></li>
                    <li class="movie-body__info-director">Режиссер: <span>${director}</span></li>
                    <li class="movie-body__info-screenwriters">Сценарий: <span>${writer}</span></li>
                    <li class="movie-body__info-actors">Актеры: <span>${actors}</span></li>
                </ol>
            </div>
        </div>
        <p class="movie-body__text">${plot}</p>
        `
    movieBody.innerHTML = movieHTML;
}


movieBtnSearch.addEventListener("click", function () {
    if (!movieInputNode.value) {
        chackingError(movieInputNode);
        return null;
    };
    removeClassError(movieInputNode);
    let searchMovie = movieInputNode.value;
    search(searchMovie);
    clearInput(movieInputNode);
})

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        movieBtnSearch.click();
    }
});

function movieOpenClose() {
    movie.classList.toggle(OPENED_CLASSNAME);
    movieSearch.classList.toggle(CLOSE_CLASSNAME);
}

document.addEventListener("click", function (e) {
    const movieItem = e.target.closest('.movie-list__item');
    if (!movieItem) return;
    const id = movieItem.dataset.id;
    open(id);
    movieOpenClose();
});

function movieBodyClean() {
    movieHTML = '';
    movieBody.innerHTML = movieHTML;
}

movieBackToSerch.addEventListener("click", function () {
    movieOpenClose();
    movieBodyClean();
});
