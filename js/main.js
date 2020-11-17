let topMovies = ['tt1375666', 'tt1136608', 'tt2015381'];
let movies_result = [];

    for(i = 0; i < topMovies.length; i++)
    {
        fetch('https://www.omdbapi.com/?apikey=d595964e&i=' + topMovies[i])
            .then((response) => response.json())
            .then((data) => {
                movies_result.push(data);
                let overviewDesktop=""; 
                let detailDesktop=""; 
                for(let movie of movies_result){ 
                    overviewDesktop +=`
                    <article>
                        <a onclick="showDetail(${movie.imdbID})" ><img src="${movie.Poster}" alt=""></a>
                        <h2>${movie.Title}</h2>
                    </article>
                    `;

                    detailDesktop +=`
                    <article id="${movie.imdbID}" class="detailWindow">
                        <img src="${movie.Poster}" alt="">
                        <h2>${movie.Title}</h2>
                        <p>Released: ${movie.Released}</p>
                        <p>Director: ${movie.Director}</p>
                        <iframe src="https://www.youtube.com/embed/${trailer(movie.imdbID)}"></iframe>
                        <p>Plot: ${movie.Plot}</p>
                        <a onclick="hideDetail(${movie.imdbID})" ><b>ClOSE</b></a>
                    </article>
                    `;

                  }
                  document.querySelector("#content").innerHTML = overviewDesktop;
                  document.querySelector("#detail").innerHTML = detailDesktop;
                  document.querySelector(".detailWindow").style.display = "none";
                  
            })
            .catch((error) =>{
                console.log(error);
            });
    }
    
    function showDetail(test){
        test.style.display = "block";
    }

    function hideDetail(test){
        test.style.display = "none";
    }

    const OMDB_YouTubeID = {tt1375666: 'YoHD9XEInc0', tt1136608: 'DyLUwOcR5pk', tt2015381: 'd96cjJhvlMA'};
    function trailer(ID){
    for (const [key, value] of Object.entries(OMDB_YouTubeID)) {
        if (ID == key)
            {
                return value;
            }
        }
    }




    // https://www.youtube.com/embed/YoHD9XEInc0