import React from 'react';
import PropTypes from 'prop-types';
// TODO: make width of text the same as trendbox

class Show extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            key: this.props.key,
            isLoaded: false,
            watched: false,
            name: this.props.show.name,
            id: this.props.show.id,
            poster: "",
            num_seasons: 0,
            num_episodes: 0,
            info: [],
            expanded: false
        };
    }

    expand() {
        this.setState({
            expanded: !this.state.expanded
        });
        console.log(this.state.expanded);
        console.log("expanded");
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
        fetch(`https://api.themoviedb.org/3/tv/${this.state.id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&append_to_response=created_by,first_air_date,genres,id,last_air_date,name,number_of_episodes,number_of_seasons,overview,poster_path`)
                .then(response => response.json())
                .then(results => {
                    this.setState({
                        isLoaded: true,
                        watched: false,
                        poster: 'https://image.tmdb.org/t/p/w200' + results.poster_path,
                        backdrop: 'https://image.tmdb.org/t/p/w200' + results.backdrop_path,
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
                    <button onClick={this.expand.bind(this)}> + </button>
                    <img src={this.state.poster} alt=""/>
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

export default Show
