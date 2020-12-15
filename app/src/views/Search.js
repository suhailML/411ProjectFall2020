import React from 'react';
import Movie from '../component/Movie';
import Show from '../component/Show';
import axios from 'axios';
import User from '../component/User';
//import PropTypes from 'prop-types';

class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          query: this.props.match.params.query,
          search_results: [], 
          user_results: [],
          tv_results: [],
          movie_results: [],
        };
    }


    parseSearchResults(search_results) {
        var tv_results = [];
        var user_results = [];
        var movie_results = [];
        console.log(search_results);

        // make getAll call to database to get user info
        axios.get("http://localhost:4001/movieRouter/uSearch",{
                id: this.state.query,
                firstName: this.state.query, 
                lastName: this.state.query, 
                userName: this.state.query
            })
                .then(response => {
                    // Update the books state
                    this.setState({
                        user_results: response.data
                    });
                    console.log(response);
                    console.log(response.data);
                  });

        // Search results can be one of: tv, movie, or person
        search_results.forEach(result => {
            if (result.media_type === 'tv' && result.poster_path !== undefined) {
                tv_results.push(result);

            } else if (result.media_type === 'movie' && result.poster_path !== undefined) {
                movie_results.push(result);
            } 
        });
        this.setState({
            user_results: user_results,
            tv_results: tv_results,
            movie_results: movie_results
        });
    }

    componentDidUpdate(prevProp) {
        if (prevProp.match.params.query !== this.props.match.params.query) {
            fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${this.props.match.params.query}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    search_results: json.results,
                    query: this.props.match.params.query,
                    user_results: [],
                    tv_results: [],
                    movie_results: []
                });
                this.parseSearchResults(json.results);
            })
            .catch(this.handleErr);
        } 
    }

    handleInputChange(input){
        if (input !== this.state.query && input.length > 0) {
            this.setState({
                query: input
            });
        } 
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
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${this.props.match.params.query}`)
        .then(response => response.json())
        .then(json => {
            this.setState({
                isLoaded: true,
                search_results: json.results
            });
            this.parseSearchResults(json.results);
        })
        .catch(this.handleErr);
    }



    render() {
        var { isLoaded, user_results, tv_results, movie_results} = this.state;
        
        if( !isLoaded ) {
            return (
                <div className="feature">
                    loading...
                </div>
            );
            
        } else {
            return (
                <div>
                    <div className="featurebox">
                        <p>Users</p>
                        <div className="feature">
                        {/* once you get the trend movies as an array from compDidMount
                        create a Movie Component */}
                        {user_results.length > 0 ? 
                            user_results.map(user => 
                                <User userID={user.id} userName={user.userName} firstName={user.firstName} lastName={user.lastName} />
                            ) : <p>No Users :(</p>}
                        </div>

                        <h5>Search results for {this.state.query}</h5>
                        <p>Movies</p>
                        <div className="feature">
                        {/* once you get the trend movies as an array from compDidMount
                        create a Movie Component */}
                            { movie_results.length > 0 ? 
                                movie_results.map(movie => 
                                    <Movie id={movie.id} title={movie.title} poster_path={"https://image.tmdb.org/t/p/w200" + movie.poster_path} backdrop_path={"https://image.tmdb.org/t/p/w200"+ movie.backdrop_path} release_date={movie.release_date} overview={movie.overview}/>                            ) : 
                            <p>No movies :(</p>}
                        </div>

                        <p>TV Shows</p>
                        <div className="feature">
                        {/* once you get the trend movies as an array from compDidMount
                        create a Movie Component */}
                        {tv_results.length > 0 ? 
                            tv_results.map(show => 
                                <Show id={show.id} title={show.name} poster_path={"https://image.tmdb.org/t/p/w200" + show.poster_path} backdrop_path={"https://image.tmdb.org/t/p/w200"+ show.backdrop_path} num_seasons={show.num_seasons} num_episodes={show.num_episodes} overview={show.overview}/>
                            ) : <p>No TV Shows :(</p>}
                        </div>
                    </div>
                </div>    
            );
        }   
    }
}


export default Search;