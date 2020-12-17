import React from 'react';
import axios from 'axios';

// TODO: make width of text the same as trendbox
// TODO: style for onclick changes on function return, not let

class Movie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoaded: false,
            watched: false,
            id: this.props.id,
            title: this.props.title,
            backdrop_path: this.props.backdrop_path,
            poster_path: this.props.poster_path,
            overview: this.props.overview,
            release_date: this.props.release_date
        };

        this.isWatched = this.isWatched.bind(this);
    }

    isWatched(event){
        console.log(this.props.userid);
        var local = axios.post("http://localhost:4001/movieRouter/tableSpecificSearch", {
            table: "userInfo",
            column: "id",
            value: this.props.userid
        }) 
        .then(response => {return response});
        
        console.log(local);

        var {watched, title, id, backdrop_path, poster_path, overview, release_date} = this.state;
        event.preventDefault();
        if (!watched) {
            axios
            .post('http://localhost:4001/movieRouter/tsCreate', {
                id: id,
                title: title,
                type: 'movie',
                backdrop_path: backdrop_path,
                poster_path: poster_path,
                release_date: release_date,
                overview: overview
            })
            .then(res => {
              console.log(res.data);
            })
            .catch(error => console.error(`didnt work`));
        }
        this.setState({watched: true});
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
        console.log(this.props.userid);
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
 