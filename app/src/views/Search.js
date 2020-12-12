import React from 'react';
import Movie from '../component/Movie';
import Show from '../component/Show';
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
          people_results: []
        };
    }

    parseSearchResults(search_results) {
        //console.log(search_results);
        // Search results can be one of: tv, movie, or person
        search_results.forEach(result => {
            if (result.media_type === 'tv') {
                // call get_tv_info function to return an object with more info about the show
                this.setState({
                    tv_results: this.state.tv_results.concat([result]),
                });

            } else if (result.media_type === 'movie') {
                this.setState({
                    movie_results: this.state.movie_results.concat([result])
                });

            } else {
                this.setState({
                    people_results: this.state.person_results.concat([result])
                });
            }
        });
    }

    componentDidUpdate(prevProp) {
        console.log(prevProp.match.query)
        // console.log(this.props.match.query);
        if (prevProp.match.params.query !== this.props.match.params.query) {

            
            fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=${this.props.match.params.query}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    search_results: json.results,
                    query: this.props.match.params.query,
                    search_results: [], 
                    user_results: [],
                    tv_results: [],
                    movie_results: [],
                    people_results: []
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
        console.log(this.props);
        var { isLoaded, search_results, user_results, tv_results, movie_results, people_results} = this.state;

        
        if( !isLoaded ) {
            return (
                <div className="feature">
                    loading...
                </div>
            );
            
        } else {
            return (
                <div>
                    {/* <form className="searchinput" action={this.handleInputChange}>
                        <input
                        placeholder="Search for..."
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                        />
                        <button type="submit">Submit</button>
                    </form> */}
                    
                    <div className="featurebox">
                        <h5>Search results for {this.state.query}</h5>
                        <p>Movies</p>
                        <div className="feature">
                        {/* once you get the trend movies as an array from compDidMount
                        create a Movie Component */}
                            { movie_results.length > 0 ? 
                            movie_results.map(movie => 
                                <Movie key={movie.id} name={movie.title} movie={movie} />
                            ) : 
                            <p>No movies :(</p>}
                        </div>
                        <p>TV Shows</p>
                        <div className="feature">
                        {/* once you get the trend movies as an array from compDidMount
                        create a Movie Component */}
                        {tv_results.length > 0 ? 
                            tv_results.map(show => 
                                <Show key={show.id} show={show}/>
                            ) : <p>No TV Shows :(</p>}
                        </div>
                    </div>
                </div>
                
            )
        }   
    }
}


export default Search