import React from 'react';
import Movie from '../component/Movie';

//TODO: modularize this
//state is for data that can change
class Search extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoaded: false,
            search_results: [],
        }
    }

    displaySearchResults(search_results) {
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
         fetch(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=Star Wars`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    search_results: this.displaySearchResults(json.results)
                })
                
            })
            .catch(this.handleErr);


    }

    getHeader(search_list_type) {
        switch(search_list_type){
            default:
                return "Search Results"
        }
    }

    render() {
        var { isLoaded, search_results } = this.state;
        const search_result = search_results.map(movie => 
            <Movie key={movie.id} name={movie.title} poster={movie.poster} genre={movie.genres}/>
        );
        console.log(search_result);
        if( !isLoaded ) {
            return (
                <div className="feature">
                    loading...
                </div>
            )
            
        } else {
            return (
                <div className="featurebox">
                    <p>{this.getHeader(this.props.type)}</p>
                    <div className="feature">
                    {/* once you get the trend movies as an array from compDidMount
                    create a Movie Component */}
                    {search_results.map(movie => 
                        <Movie key={movie.id} name={movie.title} poster={movie.poster} genre={movie.genres}/>
                    )}
                    </div>
                </div>
            )
        }
        
    }

}

export default Search