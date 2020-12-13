import React from 'react';
import Movie from '../component/Movie';
import Show from '../component/Show';
import axios from 'axios';

//TODO: modularize this
//state is for data that can change
class LatestMovies extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            isLoaded: false,
            trending_list: []
        };
    }

    displaytrending(trending_results) {
        // console.log(trending_results);
        // return trending_results.map(e => 
        //     ({
        //         title: e.original_name || e.original_title,
        //         id: e.id,
        //         genres: e.genre_ids
        //     })
        // );

        //returning object in js = wrap in parenthesis
        // console.log("HERE");
        // const fetchbooks = async () => {
        //     // Send GET request to 'books/all' endpoint
        //     axios
        //       .get('http://localhost:4001/movieRouter/bAll')
        //       .then(response => {
        //         // Update the books state
        //         console.log(response.data);
        //         console.log(response);
        //       })
        //       .catch(error => console.error(`There was an error retrieving the book list: ${error}`));
        // }   
        // console.log("THERE");
        // const handleBookCreate = () => {
        //     // Send POST request to 'books/create' endpoint
        //     axios
        //       .post('http://localhost:4001/movieRouter/eCreate', {
        //         author: "yard",
        //         title: "jard",
        //         pubDate: "KLARD",
        //         rating: "mard"
        //       })
        //       .then(res => {
        //         console.log(res.data);
        //         // Fetch all books to refresh
        //         // the books on the bookshelf list
        //         fetchbooks();
        //       })
        //       .catch(error => console.error(`There was an error creating the book`));
        //   }
        //   handleBookCreate();
        //   console.log("AIR");

        //   const fetchEvents = async () => {
        //     // Send GET request to 'books/all' endpoint
        //     axios
        //       .get('http://localhost:4001/movieRouter/eAll')
        //       .then(response => {
        //         // Update the books state
        //         console.log(response.data);
        //         console.log(response);
        //       })
        //       .catch(error => console.error(`There was an error retrieving the book list: ${error}`));
        // } 

        // var hello = "hello";
        //   const handleEventCreate = () => {
        //     // Send POST request to 'books/create' endpoint
        //     axios
        //       .post('http://localhost:4001/movieRouter/eCreate', {
        //         clubName: 'chicken appreciation club',
        //         movieTitle: 'chicken run',
        //         movieID: 333,
        //         date: '12/12/12',
        //         time: '12:12',
        //         eventDescription: 'come watch chickens do chicken stuff'
        //       })
        //       .then(res => {
        //         console.log(res.data);
        //         // Fetch all books to refresh
        //         // the books on the bookshelf list
        //         fetchEvents();
        //       })
        //       .catch(error => console.error(`There was an error creating the event`));
        //   }
        //   handleEventCreate();
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

        switch(this.props.type){
            case "east":
            case "west":
            case "med":
            case "south":
                axios.get("http://localhost:4001/movieRouter/mAll")
                .then(response => {
                    // Update the books state
                    this.setState({
                        isLoaded: true,
                        trending_list: response.data
                    });
                    console.log(response);
                  });
                  break;

            default:
                fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`)
                .then(response => response.json())
                .then(json => {
                    console.log(json);
                    this.setState({
                        isLoaded: true,
                        trending_list: json.results
                    });
                })
                .catch(this.handleErr);
        }

        /*THIS IS NOT PRODUCTION SAFE CODE -- THE ONLY SAFE WAY TO HIDE API KEY IS 
        TO CALL IT FROM A BACKEND SERVER; but since this local, it'll do*/
        // fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`)
        //     .then(response => response.json())
        //     .then(json => {
        //         this.setState({
        //             isLoaded: true,
        //             trending_list: json.results,
        //         });
        //         console.log(json.results);
        //     })
        //     .catch(this.handleErr);
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
        // const findSomething = () => {
        //   // Send POST request to 'books/create' endpoint
        //   axios
        //     .post('http://localhost:4001/movieRouter/tableSpecificSearch', {
        //       table: 'events',
        //       column: 'movieTitle',
        //       value: 'pullUP'
        //     })
        //     .then(res => {
        //       console.log(res.data);
        //       // Fetch all books to refresh
        //       // the books on the bookshelf list
        //     })
        //     .catch(error => console.error(`could not do search`));
        // }

        // findSomething();  

        var { isLoaded, trending_list } = this.state;

        if( !isLoaded ) {
            return (
                <div className="feature">
                    loading...
                </div>
            );
            
        } else {
            return (
                <div className="featurebox">
                    <p>{this.getHeader(this.props.type)}</p>
                    <div className="feature">
                        {/* once you get the trend movies as an array from compDidMount
                        create a Movie Component */}
                        {trending_list.map(trending => 
                            {
                                if (trending.media_type === "tv" && trending.poster_path !== null) {
                                    return(<Show id={trending.id} name={trending.name} show={trending}/>);
                                
                                } else if (trending.media_type === "movie" && trending.poster_path !== null) {
                                    return(<Movie id={trending.id} title={trending.title} movie={trending}/>);
                                }
                            }
                        )}
                    </div>
                </div>
            );
        }
        
    }

}

export default LatestMovies;


