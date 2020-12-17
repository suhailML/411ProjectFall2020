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
        var main = document.getElementById("main");
        main.appendChild(trending_results);

    } else {
        console.log("already grabbed");
    }
    
}

function trending(){
    fetchTrendingMovies(config.apiKey);
}

// Search functionality

async function fetchSearchedMovie(id, title) 
{
    
    let data = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${id}&query=${title}`).then(response => response.json()).catch(handleErr);
    if (data.code && data.code == 400) 
    {
        console.log(data);
        return [];
    }
    else
    {
        console.log(data);
        display_search_results(data);
    }    
}

function display_search_results(object){
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

    var search_results = document.createElement('div');
    search_results.setAttribute("id", "search-results");

    console.log(movieTitles);
    console.log(moviePosterUrls);

    for (var i = 0; i < movieTitles.length; i++){
        
        var search_result = document.createElement("div");
        search_result.setAttribute('class', 'result');

        if (moviePosterUrls[i] != null){
            var poster = document.createElement("img");
            poster.src = "https://image.tmdb.org/t/p/w200" + moviePosterUrls[i];
            search_result.appendChild(poster);
        }

        var title = document.createElement("h4");
        title.textContent = movieTitles[i];
        search_result.appendChild(title);
        search_results.appendChild(search_result);
    }
    var main = document.getElementById("main");
    main.insertBefore(search_results, main.childNodes[0]);
    //document.body.appendChild(search_results);
}

function search(){
    var search_term = document.getElementById("inputbox").value;
    fetchSearchedMovie(config.apiKey, search_term);
}