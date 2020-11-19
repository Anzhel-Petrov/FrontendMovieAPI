let topMovies = [];
let youtube_ids = [];
let movies_result = [];
    fetch("movies.json")
    .then(function(response){ 
        return response.json();
    })
    .then(function(json){
        for (const [key, value] of Object.entries(json)) {
            topMovies.push(value.title);
            youtube_ids.push(value.youtube_id);
            
         }
         fetch_info(topMovies);
        // trailer(youtube_ids);
     }
    )

function fetch_info(){    

    for(i = 0; i < topMovies.length; i++)
    {
        
        fetch('https://www.omdbapi.com/?apikey=d595964e&t=' + topMovies[i])
            .then((response) => response.json())
            .then((data) => {
            // console.log(data);   
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
                <div class="detailContent">
                <div class="poster">
                    <img src="${movie.Poster}" alt="">
                </div>
                <div class="info">
                    <h2>${movie.Title}</h2>
                    <br>
                    <p><b>Years since release:</b> ${yearDiff(movie.Released)}</p>
                    <p><b>Director:</b> ${movie.Director}</p>
                    <p><b>Runtime:</b> ${movie.Runtime}</p>
                    <p><b>Metascore:</b> ${movie.Metascore}</p>
                    <p><b>imdbRating:</b> ${movie.imdbRating}</p>
                    <br>
                    <div class="plot">
                    <h3>Plot</h3>
                    <p>${movie.Plot}</p>

                </div>
                </div>
                <div class="trailer">
                    <iframe src="https://www.youtube.com/embed/${trailer(movie.imdbID)}"></iframe>
                </div>
                
                <a onclick="hideDetail(${movie.imdbID})" class="close">&times;</a>
                </div>
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
         
    }}

    
    function youtube(test){
        let frames = document.getElementsByClassName("iframe");
        //console.log(frames);
        for(i = 0; i < frames.length; i++){
            
        }
     }
     youtube();

    function showDetail(test){
        test.style.display = "block";
    }

    function hideDetail(test){
        test.style.display = "none";
    }

    const OMDB_YouTubeID = {tt1375666: 'YoHD9XEInc0', tt0087182: 'WHh8dzxTSNw', tt2015381: 'd96cjJhvlMA', tt0816692: 'zSWdZVtXT7E', tt0499549: '6ziBFh3V1aM', 
    tt0848228: 'eOrNdBpGMv8', tt0076759: 'vZ734NWnAHA', tt0133093: 'vKQi3bBA1y8', tt6723592: 'L3pk_TBkihU', tt0371724: 'eLdiWe_HJv4'};
    function trailer(ID){
    for (const [key, value] of Object.entries(OMDB_YouTubeID)) {
        if (ID == key)
            {
                return value;
            }
        }
    }

    function yearDiff(year) {
        let strip_year = year.substring(year.length - 4)
        let b = parseInt(strip_year, 10)
        let todaysDate = new Date().getFullYear();
        let c = parseInt(todaysDate, 10)
        let result = c - b;
        return result;
     }

     console.log(yearDiff("16 Jul 2008"));


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });