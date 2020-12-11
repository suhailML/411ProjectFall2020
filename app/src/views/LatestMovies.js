import React from 'react';
import Movie from '../component/Movie';
import Show from '../component/Show';

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
        /*THIS IS NOT PRODUCTION SAFE CODE -- THE ONLY SAFE WAY TO HIDE API KEY IS 
        TO CALL IT FROM A BACKEND SERVER; but since this local, it'll do*/
        fetch(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    isLoaded: true,
                    trending_list: json.results
                });
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
        var { isLoaded, trending_list } = this.state;

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
                        {trending_list.map(trending => 
                            {
                                if (trending.media_type === "tv") {
                                    return(<Show key={trending.id} show={trending}/>);
                                } else {
                                    return(<Movie key={trending.id} name={trending.title} movie={trending}/>);
                                }
                            }
                        )}
                    </div>
                </div>
            )
        }
        
    }

}

export default LatestMovies