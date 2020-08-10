let url = "https://www.omdbapi.com/?apikey=7d1c1e6c";
let page;
let movieID;

class Movie {
    constructor(id, watched, watchlist) {
        this.id = id;
        this.watched = watched;
        this.watchlist = watchlist;
    }
}

const noPic = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";
$("#search-btn").click(() => {
        page = 1;
        newUrl = url + "&s=" + $("#search-input").val() + "&page=" + page;
        if ($(".searchOptions").hasClass("optionsActive")) {
            if ($("#type").val() != "any") {
                newUrl += "&type=" + $("#type").val();
            }
            if ($("#year").val() != "") {
                newUrl += "&y=" + $("#year").val();
            }
        }

        $.get(newUrl).then(response => {
            $(".moviesContainer").html("");
            let movies = response.Search;
            $.each(movies, (index, movie) => {

                $(".moviesContainer").append(
                    `
                <div class="movieContainer">
                    <div class="movie-img">
                        <img src="${movie.Poster == 'N/A' ?   noPic : movie.Poster }" alt="Poster">
                    </div>
                    <div class="movie-info">
                        <h5 class="title">${movie.Title}</h5>
                        <h6 class="year">${movie.Year}</h6>
                        <h6 class="type">${movie.Type}</h6>
                        <button id="${movie.imdbID}" class="movie-details">More details</button>
                    </div>
                </div>
                `
                );
            })
        })


        page++;



    }

)



$(window).on('scroll', function () {
    var scrollPosition = $(window).scrollTop() + $(window).outerHeight();
    var divTotalHeight = $(".moviesContainer")[0].scrollHeight + $(".moviesContainer")[0].offsetTop + parseInt($(".moviesContainer").css("margin-bottom"));

    if (scrollPosition >= divTotalHeight) {
        newUrl = url + "&s=" + $("#search-input").val() + "&page=" + page;
        if ($(".searchOptions").hasClass("optionsActive")) {
            if ($("#type").val() != "any") {
                newUrl += "&type=" + $("#type").val();
            }
            if ($("#year").val() != "" && $("#year").val() >= 1950 && $("#year").val() <= 2020) {
                newUrl += "&y=" + $("#year").val();
            }
        }
        $.get(newUrl).then(response => {
            let movies = response.Search;
            $.each(movies, (index, movie) => {
                $(".moviesContainer").append(
                    `
                <div class="movieContainer">
                    <div class="movie-img">
                        <img  src="${movie.Poster == 'N/A' ?   noPic : movie.Poster }" alt="Poster">
                    </div>
                    <div class="movie-info">
                        <h5 class="title">${movie.Title}</h5>
                        <h6 class="year">${movie.Year}</h6>
                        <h6 class="type">${movie.Type}</h6>
                        <button id="${movie.imdbID}" class="movie-details">More details</button>
                    </div>
                </div>
                `
                );
            })
        })
        page++;
    }
});

$("#searchOpBtn").on("click", () => {
    $(".searchOptions").toggleClass("optionsActive");
})

$(document).on("click", ".movie-details", function (e) {

    /* ${checkMovie(movieID, watchedMovies)? "class =watched" : "" } */

    $.get(`https://www.omdbapi.com/?apikey=7d1c1e6c&i=${e.target.id}&plot=full`).then(response => {
        movieID = e.target.id;
        let watchedClass = "",
            watchlistClass = "",
            watchedText = "Add to Watched",
            watchlistText = "Add to Watchlist";
        let watchedMovies, watchlist;

        if (localStorage.getItem("watched-movies") === null) {
            watchedMovies = [];
        } else {
            watchedMovies = JSON.parse(localStorage.getItem("watched-movies"));
        }

        if (localStorage.getItem("watchlist") === null) {
            watchlist = [];
        } else {
            watchlist = JSON.parse(localStorage.getItem("watchlist"));
        }
        watchedMovies.forEach((movieItem) => {
            if (movieItem === movieID) {
                watchedClass = "watched";
                watchedText = "Watched";
            }
        })
        watchlist.forEach((movieItem) => {
            if (movieItem === movieID) {
                watchlistClass = "watchlist";
                watchlistText = "In Your Watchlist";
            }
        })


        let movie = response;
        $(".my-modal").append(
            `<div class="my-modal-content">
                <div class ="left-modal">   
                    <div class="poster-container">
                        <img src="${movie.Poster}" alt="">
                    </div>
                    <div class ="modal-btns">
                        <button 
                       
                        id ="modal-watched" class ="${watchedClass}" ><i class="material-icons">check_box</i> &nbsp; ${watchedText}</button>
                        <button id ="modal-watchlist" class ="${watchlistClass}"><i class="material-icons">playlist_add</i>&nbsp; ${watchlistText} </button>
                    </div>
                </div>
                <div class="info">
                    <div class="title">
                        <h1>${movie.Title} <span>(${movie.Year})<span/></h1>
                        <h3>${movie.Type}</h3>
                    </div>
                    <div class="actors">
                        <h2>Actors : <span>${movie.Actors}<span/></h2>
                    </div>
                    <div class="director">
                        <h2>Director : <span>${movie.Director}<span/></h2>
                    </div>
                    <div class="genre">
                        <h2>Genre : <span>${movie.Genre}<span/></h2>
                    </div>
                    <div class="rated">
                        <h2>Rated : <span>${movie.Rated}<span/></h2>
                    </div>
                    <div class="imdb-rate">
                        <h2>IMDb Rating : <span>${movie.imdbRating}<span/></h2>
                    </div>
                    
                    <fieldset class="plot">
                        <h4>Plot</h4>
                        <p>${movie.Plot}</p>
                    </fieldset>
                </div>
            </div>`
        );
        $(".my-modal").addClass("modal-open");
    })
})

$(document).on("click", ".my-modal", (e) => {
    if (e.target.classList.contains("my-modal")) {
        $(".my-modal").removeClass("modal-open");
        $(".my-modal").html('');
    }

})

$(document).on("click", "#modal-watched", () => {
    let watchedMovies;
    if (localStorage.getItem("watched-movies") === null) {
        watchedMovies = [];
    } else {
        watchedMovies = JSON.parse(localStorage.getItem("watched-movies"));
    }

    if ($.inArray(movieID, watchedMovies) == -1) {
        watchedMovies.push(movieID);
        $("#modal-watched").addClass("watched");
        $("#modal-watched").html("<i class='material-icons'>check_box</i> &nbsp;Watched")
    } else {
        watchedMovies.splice($.inArray(movieID, watchedMovies));
        $("#modal-watched").removeClass("watched");
        $("#modal-watched").html("<i class='material-icons'>check_box</i> &nbsp;Add to Watched")

    }

    localStorage.setItem("watched-movies", JSON.stringify(watchedMovies));

})
$(document).on("click", "#modal-watchlist", () => {
    let watchlist;
    if (localStorage.getItem("watchlist") === null) {
        watchlist = [];
    } else {
        watchlist = JSON.parse(localStorage.getItem("watchlist"));
    }

    if ($.inArray(movieID, watchlist) == -1) {
        watchlist.push(movieID);
        $("#modal-watchlist").addClass("watchlist");
        $("#modal-watchlist").html("<i class='material-icons'>playlist_add</i>&nbsp; In Your Watchlist");


    } else {
        watchlist.splice($.inArray(movieID, watchlist));
        $("#modal-watchlist").removeClass("watchlist");
        $("#modal-watchlist").html("<i class='material-icons'>playlist_add</i>&nbsp; Add to Watchlist");

    }


    localStorage.setItem("watchlist", JSON.stringify(watchlist));

})