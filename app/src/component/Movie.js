import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

// TODO: make width of text the same as trendbox
// TODO: style for onclick changes on function return, not let

class Movie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            watched: false,
            title: this.props.title,
            id: this.props.id,
            backdrop_path:"https://image.tmdb.org/t/p/w200" + this.props.movie.backdrop_path,
            poster_path: "https://image.tmdb.org/t/p/w200" + this.props.movie.poster_path,
            info: this.props.movie.overview,
            release_date: this.props.movie.release_date
        };

        this.isWatched = this.isWatched.bind(this);
    }

    isWatched(event){
        var {watched, title, id, backdrop_path, poster_path, info, release_date} = this.state;
        event.preventDefault();
        if (!watched) {
            axios
            .post('http://localhost:4001/movieRouter/twCreate', {
                mediaID: id,
                mediaTitle: title,
                mediaType: 'movie',
                backdropPath: backdrop_path,
                posterPath: poster_path,
                releaseDate: release_date,
                overview: info
            })
            .then(res => {
              console.log(res.data);
              // Fetch all books to refresh
              // the books on the bookshelf list
            })
            .catch(error => console.error(`didnt work fuck`));
        }
        this.setState({watched: true})
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

    // componentDidMount() {
    //     fetch(`https://api.themoviedb.org/3/movie/${this.state.id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&append_to_response=release_date,overview,poster_path,runtime`)
    //             .then(response => response.json())
    //             .then(results => {
    //                 //console.log(results);
    //                 this.setState({
    //                     isLoaded: true,
    //                     watched: false,
    //                     runtime: results.runtime,
    //                     release_date: results.release_date,
    //                     info: results
    //                 });
    //             })
    //             .catch(this.handleErr);
    // }

    render() {
        return(
            <div>
            <div className="trend-moviebox">
                <button onClick={this.isWatched}> + </button>
                <img src={this.state.poster_path} alt=""/>
            </div>
            {this.state.title}
            <br></br>
            {`Release Date: ${this.state.release_date}`}
        </div>)
    }
}
export default Movie;
 