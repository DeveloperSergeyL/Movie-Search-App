const apiKey = '9d8db7a3'
const CLASS_ERROR = 'error';
const CLASS_SHAKE = 'shake';
const types = [{ type: 'movie', name: 'Фильм' }, { type: 'series', name: 'Сериал' }];

const movieList = document.querySelector('.movie-list');
const movieItem = document.querySelector('.movie-list__item');
const movieInputNode = document.querySelector('.movie-search__input');
const movieBtnSearch = document.querySelector('.movie-search__button');

let searchMovie = '';

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

function search() {
    const urlImg = `http://www.omdbapi.com/?s=${searchMovie}&apikey=9d8db7a3`
    fetch(urlImg)
        .then(response => response.json())
        .then((res) => {
            const movies = res.Search
            renderMovie(movies);
        })
}

function renderMovie(movies) {
    let moviesHTML = '';
    movies.forEach(e => {
        let title = e.Title;
        let year = e.Year;
        let poster = e.Poster;
        let type = '';
        types.forEach(el => {
            if (e.Type = el.type) {
                return type = el.name;
            }
        })
        moviesHTML += `
            <li class="movie-list__item">
                    <a href="html/film.html" class="movie-list__item-link">
                        <div class="movie-list__item-body">
                            <img src="${poster}" alt="img" class="movie-list__item-img">
                            <div class="movie-list__item-content">
                                <h3 class="movie-list__item-title">${title}</h3>
                                <p class="movie-list__item-year">${year}</p>
                                <p class="movie-list__item-genre">${type}</p>
                            </div>
                        </div>
                    </a>
                </li>
            `
    });
    movieList.innerHTML = moviesHTML;
}

movieBtnSearch.addEventListener("click", function () {
    if (!movieInputNode.value) {
        chackingError(movieInputNode);
        return null;
    };
    removeClassError(movieInputNode);
    searchMovie = movieInputNode.value;
    search();
    clearInput(movieInputNode);
})

document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        movieBtnSearch.click();
    }
});

