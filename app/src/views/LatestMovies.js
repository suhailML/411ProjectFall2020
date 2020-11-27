import React from 'react';
import Movie from '../component/Movie';

//TODO: modularize this
class LatestMovies extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoaded: false,
            trnd_movies: [],
        }
    }

    displaytrending(movie_list) {
        //returning object in js = wrap in parenthesis
        console.log(movie_list)
        return movie_list.map(e => 
            ({
                title: e.original_name || e.original_title,
                poster: 'https://image.tmdb.org/t/p/w200' + e.poster_path,
            })
        )
    }

    handleErr(err) {
        console.warn(err);
        let resp = new Response(
          JSON.stringify({
            code: 400,
            message: "Bad Request"
          })
        );
        return resp;
    }

    componentDidMount() {
        /*THIS IS NOT PRODUCTION SAFE CODE -- THE ONLY SAFE WAY TO HIDE API KEY IS 
        TO CALL IT FROM A BACKEND SERVER; but since this local, it'll do*/
         fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    trnd_movies: this.displaytrending(json.results)
                })
                
            })
            .catch(this.handleErr);


    }

    render() {
        var { isLoaded, trnd_movies } = this.state;

        if( !isLoaded ) {
            return (
                <div>
                    loading...
                </div>
            )
            
        } else {
            return (
                <div className="feature">
                {/* once you get the trend movies as an array from compDidMount
                create a Movie Component */}
                {trnd_movies.map(movie => (
                    <Movie name={movie.title} poster={movie.poster} type="trending" />
                ))}
                </div>
            )
        }
        
    }

}

export default LatestMovies