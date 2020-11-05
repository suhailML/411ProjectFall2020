/*function parseMovieNamesFromObject(object)
{
    var movieNames = [];
    console.log(object);

    for (const property in object.results) {
        if (object.results[property].original_name != null)
        {
            movieNames.push(object.results[property].original_name);
        }
        else
        {
            movieNames.push(object.results[property].title);
        }
    }
    return movieNames;
}
*/

async function fetchTrendingMovies(id) 
{
    
    let data = await fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${id}`).then(response => response.json()).catch(handleErr);
    if (data.code && data.code == 400) 
    {
        console.log(data);
        return [];
    }
    else
    {
        console.log(data);
        return display_trending(data);
    }    
}

function handleErr(err) {
    console.warn(err);
    let resp = new Response(
      JSON.stringify({
        code: 400,
        message: "Bad Request"
      })
    );
    return resp;
  }

function display_trending(object)
{
    var trending_results = document.getElementById("trending-results");

    if (trending_results === null) {
        var movieTitles = [];
        var moviePosterUrls = [];
    
        console.log(object);
    
        for (const property in object.results) {
            if (object.results[property].original_name != null)
            {
                movieTitles.push(object.results[property].original_name);
                moviePosterUrls.push(object.results[property].poster_path);
            }
            else
            {
                movieTitles.push(object.results[property].title);
                moviePosterUrls.push(object.results[property].poster_path);
            }
        }
    
        trending_results = document.createElement('div');
        trending_results.setAttribute("id", "trending-results");
    
        console.log(movieTitles);
        console.log(moviePosterUrls);
    
        for (var i = 0; i < movieTitles.length; i++){
            
            var trending_movie = document.createElement("div");
            trending_movie.setAttribute('class', 'trending');
    
            var poster = document.createElement("img");
            poster.src = "https://image.tmdb.org/t/p/w200" + moviePosterUrls[i];
            trending_movie.appendChild(poster);
    
            var title = document.createElement("h4");
            title.textContent = movieTitles[i];
            trending_movie.appendChild(title);
    
            trending_results.appendChild(trending_movie);
        }
        document.body.appendChild(trending_results);

    } else {
        console.log("already grabbed");
    }
    
}

function trending(){
    fetchTrendingMovies(config.apiKey);
}


