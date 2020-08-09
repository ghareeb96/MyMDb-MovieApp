let url = "https://www.omdbapi.com/?apikey=7d1c1e6c";
let page;
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
    // console.log(scrollPosition);
    // console.log(divTotalHeight);
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
    $.get(`https://www.omdbapi.com/?apikey=7d1c1e6c&i=${e.target.id}&plot=full`).then(response => {
        let movie = response;
        $(".my-modal").append(
            `<div class="my-modal-content">
                <div class ="left-modal">   
                    <div class="poster-container">
                        <img src="${movie.Poster}" alt="">
                    </div>
                    <div class ="modal-btns">
                        <button id ="modal-watched"><i class="material-icons">check_box</i> &nbsp; Watched</button>
                        <button id ="modal-watchlist"><i class="material-icons">playlist_add</i>&nbsp; Add to Watchlist</button>
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