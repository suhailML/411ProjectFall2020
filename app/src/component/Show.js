import React from 'react';
import PropTypes from 'prop-types';
// TODO: make width of text the same as trendbox

class Show extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            watched: false,
            name: this.props.name,
            id: this.props.show.id,
            backdrop_path: "https://image.tmdb.org/t/p/w200" + this.props.show.backdrop_path,
            poster_path: "https://image.tmdb.org/t/p/w200" + this.props.show.poster_path,
            num_seasons: PropTypes.Number,
            num_episodes: PropTypes.Number,
            overview: this.props.show.overview,
            info: [],
        };

        // this.isWatched = this.isWatched.bind(this);
    }

    
    // isWatched - make call to db to indicate if movie has been watched or not
    // isWatched(prevState) {
    //     console.log("Show watched");
    // }

    handleErr(err) {
        console.warn(err);
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
        fetch(`https://api.themoviedb.org/3/tv/${this.state.id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&append_to_response=created_by,first_air_date,genres,id,last_air_date,name,number_of_episodes,number_of_seasons,overview,poster_path`)
                .then(response => response.json())
                .then(results => {
                    this.setState({
                        isLoaded: true,
                        num_seasons: results.number_of_seasons,
                        num_episodes: results.number_of_episodes,
                        info: results
                    });
                })
                .catch(this.handleErr);
    }

    render() {
        return (
            <div>
                <div className="showbox">
                    <button> + </button> 
                    <img src={this.state.poster_path} alt=""/>
                </div>

                {this.state.name}
                <br></br>
                {`Seasons: ${this.state.num_seasons}`}
                <br></br>
                {`Episodes: ${this.state.num_episodes}`}
            </div>      
        );
    }
}

export default Show;
