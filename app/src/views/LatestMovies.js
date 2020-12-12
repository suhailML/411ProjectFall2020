import React from 'react';
import Movie from '../component/Movie';
import axios from 'axios';

//TODO: modularize this
//state is for data that can change
class LatestMovies extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isLoaded: false,
            trnd_movies: [],
        }
    }

    displaytrending(movie_list) {
        //returning object in js = wrap in parenthesis

        console.log("HERE")

        console.log("THERE");
        console.log("AIR");

          const fetchEvents = async () => {
            // Send GET request to 'books/all' endpoint
            axios
              .get('http://localhost:4001/movieRouter/eAll')
              .then(response => {
                // Update the books state
                console.log(response.data)
                console.log(response)
              })
              .catch(error => console.error(`There was an error retrieving the book list: ${error}`))
        } 

        var hello = "hello";
          const handleEventCreate = () => {
            // Send POST request to 'books/create' endpoint
            axios
              .post('http://localhost:4001/movieRouter/eCreate', {
                clubName: 'chicken appreciation club',
                movieTitle: 'chicken run',
                movieID: 333,
                date: '12/12/12',
                time: '12:12',
                eventDescription: 'come watch chickens do chicken stuff'
              })
              .then(res => {
                console.log(res.data)
                // Fetch all books to refresh
                // the books on the bookshelf list
                fetchEvents()
              })
              .catch(error => console.error(`There was an error creating the event`))
          }
          handleEventCreate();
    
        return movie_list.map(e => 
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
         fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    trnd_movies: this.displaytrending(json.results)
                })
                
            })
            .catch(this.handleErr);


    }

    getHeader(movielist_type) {
        switch(movielist_type){
            case "east":
                return "Trending in East";

            case "central":
                return "Trending in Central";

            case "west":
                return "Trending in West";

            case "south":
                return "Trending in South";

            case "global":
                return "World's Top Trending Movies";

            default:
                return "World's Top Trending Movies";
        }
    }

    render() {

        var { isLoaded, trnd_movies } = this.state;
        
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
                    {trnd_movies.map(movie => 
                        <Movie key={movie.id} name={movie.title} poster={movie.poster} />
                    )}
                    </div>
                </div>
                
            )
        }
        
    }

}

export default LatestMovies


