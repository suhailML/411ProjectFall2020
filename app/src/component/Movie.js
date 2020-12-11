import React from 'react';
import PropTypes from 'prop-types';

class Movie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            key: this.props.key,
            isLoaded: false,
            watched: false,
            name: this.props.name,
            id: this.props.movie.id,
            poster: "",
            runtime: 0,
            info: [],
            expand: false
        };
    }

/* example of stateless components -> components that are functions (functional),
they take props in a param and then you can access the keys*/
    expand() {
        this.setState({
            expand: true
        });
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
        fetch(`https://api.themoviedb.org/3/movie/${this.state.id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&append_to_response=release_date,overview,poster_path,runtime`)
                .then(response => response.json())
                .then(results => {
                    //console.log(results);
                    this.setState({
                        isLoaded: true,
                        watched: false,
                        poster: 'https://image.tmdb.org/t/p/w200' + results.poster_path,
                        backdrop: 'https://image.tmdb.org/t/p/w200' + results.backdrop_path,
                        runtime: results.runtime,
                        release_date: results.release_date,
                        info: results
                    });
                })
                .catch(this.handleErr);
    }

    render() {
        return (
            <div>
                <div className="trend-moviebox">
                    <button onClick={() => this.expand }> + </button>
                    <img src={this.state.poster} alt=""/>
                </div>
                {this.state.name}
                <br></br>
                {`Runtime: ${Math.floor(this.state.runtime/60)} Hours  ${this.state.runtime%60} Minutes`}
                <br></br>
                {`Release Date: ${this.state.release_date}`}
            </div>
        );
    }
}


export default Movie
