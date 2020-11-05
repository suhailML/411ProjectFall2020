function parseMovieNamesFromObject(object)
{
    var movieNames = [];
    console.log(object);
    var returnList;
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
        return parseMovieNamesFromObject(data);
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

var movieNames = fetchTrendingMovies('47322dcc9d879f3ee5918387a549f5c4').then(function(result) {
    console.log(result);
});




