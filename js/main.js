let topMovies = ['tt1375666', 'tt0076759', 'tt2015381']
let movies_result = [];

for(i = 0; i < topMovies.length; i++)
{
    fetch('https://www.omdbapi.com/?apikey=d595964e&i=' + topMovies[i])
        .then((response) => response.json())
        .then((data) => {
            doStuff(data);
            movies_result.push(data);
            let templateDesktop=""; 
            for(let movie of movies_result){
                templateDesktop +=`
                <article>
                    <img src="${movie.Poster}" alt="">
                    <h2>${movie.Title}</h2>
                </article>
                `;
              }
              document.querySelector("#content").innerHTML = templateDesktop;
        })
        .catch((error) =>{
            console.log(error);
        });
}

function doStuff(data)
{
    console.log(data.Director);
}
