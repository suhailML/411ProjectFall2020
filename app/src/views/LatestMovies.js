import React from 'react';
import Movie from '../component/Movie';

//TODO: modularize this
//state is for data that can change
class LatestMovies extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            trnd_movies: [],
            location: "trending",
        }
    }

    displaytrending(movie_list) {
        //returning object in js = wrap in parenthesis
        return movie_list.map(e =>
            ({
                title: e.original_name || e.original_title,
                poster: 'https://image.tmdb.org/t/p/w200' + e.poster_path,
                id: e.id,
                genre: e.genre_ids
            })
        );
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
        console.log(this.props.type);

        if (this.props.type === "trending worldwide") {

            fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`)
                .then(response => response.json())
                .then(json => {
                    this.setState({
                        isLoaded: true,
                        trnd_movies: this.displaytrending(json.results)
                    })

                })
                .catch(this.handleErr)

        } else if ((this.props.type === "popular in west")) {

            //some kind of database call to grab popular in some are

            var idksomemovie = 732670;

            fetch(`https://api.themoviedb.org/3/movie/${idksomemovie}/recommendations?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`)
                .then(response => response.json())
                .then(json => {
                    this.setState({
                        isLoaded: true,
                        trnd_movies: this.displaytrending(json.results)
                    })
                })
                .catch(this.handleErr);

        } else {

            var reccNum = 0;
            var arrayRecc = [];

            if ("west" === (this.props.type)) {
                reccNum = 732670;
            } else if ("east" === (this.props.type)) {
                reccNum = 557642;
            } else {
                reccNum = 577922
            }

            var iterat = [732670, 557642, 577922];
            var x;
            var z;

            for (x in iterat) {
                fetch(`https://api.themoviedb.org/3/movie/${iterat[x]}/recommendations?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`)
                    .then(response => response.json())
                    .then(json => {
                        this.setState({
                            isLoaded: true,
                            trnd_movies: this.displaytrending(json.results)
                        })
                    })
                    .catch(this.handleErr);
            }
            console.log(this.trnd_movies)

        }
        console.log(this.trnd_movies)
    }

    getHeader(movielist_type) {
        switch (movielist_type) {
            case "trending":
                return "World's Top Trending Movies";
            default:
                return "Chickens"
        }
    }

    render() {
        var { isLoaded, trnd_movies } = this.state;
        console.log(trnd_movies);
        const movies = trnd_movies.map(movie =>
            <Movie key={movie.id} name={movie.title} poster={movie.poster} />
        );
        if (!isLoaded) {
            return (
                <div className="feature">
                    loading...
                </div>
            )

        } else {
            return (
                <div className="featurebox">
                    <p>{(this.props.type)}</p>
                    <div className="feature">
                        {/* once you get the trend movies as an array from compDidMount
                    create a Movie Component */}
                        {trnd_movies.map(movie =>
                            <Movie key={movie.id} name={movie.title} poster={movie.poster} genre={movie.genre} />
                        )}
                    </div>
                </div>

            )
        }

    }

}

export default LatestMovies