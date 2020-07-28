const url = "http://www.omdbapi.com/?apikey=7d1c1e6c";
const noPic = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";
let page = 1;
$("#searchBtn").click(() => {
        page = 1;
        $.get(url + "&s=" + $("#searchInput").val() + "&page=" +
            page).then(response => {
            console.log(response);
            $(".moviesContainer").html("");
            let movies = response.Search;
            $.each(movies, (index, movie) => {

                console.log(movie);
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
        console.log($(".moviesContainer"));
        console.log(page);

    }

)




$(window).on('scroll', function () {
    var scrollPosition = $(window).scrollTop() + $(window).outerHeight();
    var divTotalHeight = $(".moviesContainer")[0].scrollHeight + $(".moviesContainer")[0].offsetTop + parseInt($(".moviesContainer").css("margin-bottom"));
    // console.log(scrollPosition);
    // console.log(divTotalHeight);
    if (scrollPosition >= divTotalHeight) {
        $.get(url + "&s=" + $("#searchInput").val() + "&page=" +
            page).then(response => {
            let movies = response.Search;
            $.each(movies, (index, movie) => {

                console.log(movie);
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
        console.log($(".moviesContainer"));
        console.log(page);


    }
});