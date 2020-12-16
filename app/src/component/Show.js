import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
// TODO: make width of text the same as trendbox

class Show extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            watched: false,
            title: this.props.title,
            id: this.props.id,
            backdrop_path: this.props.backdrop_path,
            poster_path: this.props.poster_path,
            num_seasons: PropTypes.Number,
            num_episodes: PropTypes.Number,
            overview: this.props.overview,
        };

        this.isWatched = this.isWatched.bind(this);
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

    isWatched(event){
        var {watched, title, id, backdrop_path, number_seasons, number_episodes, poster_path, overview} = this.state;
        event.preventDefault();
        if (!watched) {
            axios
            .post('http://localhost:4001/movieRouter/tsCreate', {
                id: id,
                title: title,
                type: 'tv',
                backdrop_path: backdrop_path,
                poster_path: poster_path,
                overview: overview,
                num_seasons: number_seasons,
                num_episodes: number_episodes,
            })
            .then(res => {
              console.log(res.data);
              // Fetch all books to refresh
              // the books on the bookshelf list
            })
            .catch(error => console.error(`didnt work fuck`));
        }
        this.setState({watched: true});
    }
    
    
    componentDidMount() {
        fetch(`https://api.themoviedb.org/3/tv/${this.state.id}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&append_to_response=created_by,first_air_date,genres,id,last_air_date,name,number_of_episodes,number_of_seasons,overview,poster_path`)
                .then(response => response.json())
                .then(results => {
                    this.setState({
                        isLoaded: true,
                        num_seasons: results.number_of_seasons,
                        num_episodes: results.number_of_episodes
                    });
                })
                .catch(this.handleErr);
    }

    render() {
        return (
            <div>
                <div className="showbox">
                    <button onClick={this.isWatched}> + </button> 
                    <img src={this.state.poster_path} alt=""/>
                </div>

                {this.state.title}
                <br></br>
                {`Seasons: ${this.state.num_seasons}`}
                <br></br>
                {`Episodes: ${this.state.num_episodes}`}
            </div>      
        );
    }
}

export default Show;
