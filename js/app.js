let url = "http://www.omdbapi.com/?apikey=7d1c1e6c";
let page;
const noPic = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";
$("#searchBtn").click(() => {
        page = 1;
        newUrl = url + "&s=" + $("#searchInput").val() + "&page=" + page;
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
                        <img id="poster-img" src="${movie.Poster == 'N/A' ?   noPic : movie.Poster }" alt="Poster">
                    </div>
                    <div class="movie-info">
                        <h5 class="title">${movie.Title}</h5>
                        <h6 class="year">${movie.Year}</h6>
                        <h6 class="type">${movie.Type}</h6>
                        <a href="" class="movie-details btn btn-outline-warning">More details</a>
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
        newUrl = url + "&s=" + $("#searchInput").val() + "&page=" + page;
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
                        <img id="poster-img" src="${movie.Poster == 'N/A' ?   noPic : movie.Poster }" alt="Poster">
                    </div>
                    <div class="movie-info">
                        <h5 class="title">${movie.Title}</h5>
                        <h6 class="year">${movie.Year}</h6>
                        <h6 class="type">${movie.Type}</h6>
                        <a href="" class="movie-details btn btn-outline-warning">More details</a>
                    </div>
                </div>
                `
                );
            })
            page++;
        })
    }
});

$("#searchOpBtn").on("click", () => {
    $(".searchOptions").toggleClass("optionsActive");
})