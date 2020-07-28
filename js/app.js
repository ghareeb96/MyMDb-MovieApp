const url = "http://www.omdbapi.com";
const apiKey = "7d1c1e6c";
const noPic = "https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg";
$("#searchBtn").click(() => {
        $.get(url + "/?apikey=" + apiKey + "&s=" + $("#searchInput").val()).then(response => {

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

    }

)