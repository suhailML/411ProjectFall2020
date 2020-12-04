import React from 'react';
import Movie from '../component/Movie';

//TODO: modularize this
class LatestMovies extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            trnd_movies: [],
            location_suggestion: [],
        }
    }

    displaytrending(movie_list) {
        //returning object in js = wrap in parenthesis
        console.log(movie_list)
        return movie_list.map(e =>
            ({
                title: e.original_name || e.original_title,
                poster: 'https://image.tmdb.org/t/p/w200' + e.poster_path,
                genre_nums: e.genre_ids
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

        console.log(this.state)

        var reccNum = 635780;

        fetch(`https://api.themoviedb.org/3/movie/${reccNum}/recommendations?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    location_suggestion: this.displaytrending(json.results)
                })
            })
            .catch(this.handleErr);

        console.log("hello")
    }

    getHeader(movielist_type) {
        switch (movielist_type) {
            case "trending":
                return "World's Top Trending Movies";
            case "west":
                return "West Top Trending Movies";
            case "east":
                return "East Top Trending Movies";
            case "central":
                return "Central Top Trending Movies";
            default:
                return "Chickens"
        }
    }

    render() {
        var { isLoaded, trnd_movies, location_suggestion } = this.state;

        if (!isLoaded) {
            return (
                <div className="feature">
                    loading...
                </div>
            )

        } else {
            console.log(this.state)
            return (
                <div className="featurebox">
                    <p>{this.getHeader(this.props.type)}</p>
                    <div className="feature">
                        {/* once you get the trend movies as an array from compDidMount
                    create a Movie Component */}
                        {trnd_movies.map(movie => (
                            <Movie name={movie.title} poster={movie.poster} genre={movie.genre_nums} />
                        ))}
                    </div>

                    <p>Location Recommendations</p>
                    <div className="feature">
                        {/* once you get the trend movies as an array from compDidMount
                                create a Movie Component */}
                        {location_suggestion.map(movie => (
                            <Movie name={movie.title} poster={movie.poster} genre={movie.genre_nums} />
                        ))}
                    </div>
                </div>

            )
        }

    }

}

export default LatestMovies