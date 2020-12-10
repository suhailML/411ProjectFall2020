import React from 'react';
import Movie from '../component/Movie';
import PropTypes from 'prop-types';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          query: this.props.query,
          user_results: [],
          tv_results: [],
          movie_results: [],
        };
    }

    propTypes = {
      query: PropTypes.string,
    }

    displaysearchresults(search_results) {
      //returning object in js = wrap in parenthesis
      return search_results.map(e => 
          ({
              title: e.original_name || e.original_title,
              poster: 'https://image.tmdb.org/t/p/w200' + e.poster_path,
              id: e.id,
              genres: e.genre_ids
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
          fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${this.state.query}`)
            .then(response => response.json())
            .then(json => {
                console.log(json);
                this.setState({
                    isLoaded: true,
                    search_results: this.displaysearchresults(json.results)
                })
            })
            .catch(this.handleErr);
    }

    render() {
        var { isLoaded, search_results } = this.state;
        
        if( !isLoaded ) {
            return (
                <div className="feature">
                    loading...
                </div>
            )
            
        } else {
            return (
                <div className="featurebox">
                    <p>Search results for {this.state.query}</p>
                    <div className="feature">
                    {/* once you get the trend movies as an array from compDidMount
                    create a Movie Component */}
                    {search_results.map(movie => 
                        <Movie key={movie.id} name={movie.title} poster={movie.poster} />
                    )}
                    </div>
                </div>
                
            )
        }   
    }
  }


export default Search