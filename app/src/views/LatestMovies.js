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
                break;

            case "west":
                axios.get("http://localhost:4001/movieRouter/twAll")
                .then(response => {
                    // Update the books state
                    this.setState({
                        isLoaded: true,
                        trending_list: response.data
                    });
                    console.log(response.data);
                  });
                  break;

            case "central":
                break;

            case "south":
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
                break;
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

        var { isLoaded, trending_list } = this.state;

        if( !isLoaded ) {
            return (
                <div className="feature">
                    loading...
                </div>
            );
            
        } else {
            if (this.props.type === "global") {
                return (
                    <div className="featurebox">
                        <p>{this.getHeader(this.props.type)}</p>
                        <div className="feature">
                            {/* once you get the trend movies as an array from compDidMount
                            create a Movie Component */}
                            {trending_list.map(trending => 
                                {
                                    if (trending.media_type === "tv" && trending.poster_path !== null) {
                                        return(<Show id={trending.id} title={trending.name} poster_path={"https://image.tmdb.org/t/p/w200"+ trending.poster_path} backdrop_path={"https://image.tmdb.org/t/p/w200" + trending.backdrop_path} overview={trending.overview}/>);
                                    
                                    } else if (trending.media_type === "movie" && trending.poster_path !== null) {
                                        return(<Movie id={trending.id} title={trending.title} poster_path={"https://image.tmdb.org/t/p/w200" + trending.poster_path} backdrop_path={"https://image.tmdb.org/t/p/w200" + trending.backdrop_path} release_date={trending.release_date} overview={trending.overview}/>);
                                    }
                                }
                            )}
                        </div>
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
                                    console.log(trending);
                                    if (trending.type === "tv" && trending.poster_path !== null) {
                                        return(<Show id={trending.id} title={trending.title} poster_path={trending.poster_path} backdrop_path={trending.backdrop_path} num_seasons={trending.num_seasons} num_episodes={trending.num_episodes} overview={trending.overview}/>);
                                    
                                    } else if (trending.type === "movie" && trending.poster_path !== null) {
                                        return(<Movie id={trending.id} title={trending.title} poster_path={trending.poster_path} backdrop_path={trending.backdrop_path} release_date={trending.release_date} overview={trending.overview}/>);
                                    }
                                }
                            )}
                        </div>
                    </div>
                );
            }
            
        }
        
    }

}

export default LatestMovies;


