import React from 'react';
import Movie from '../component/Movie';

class LatestMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trnd_movies: ['example', 'of', 'moive', 'titles'],
            isLoaded: false
        }

    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div>
            {/* once you get the trend movies as an array from compDidMount
            create a Movie Component */}
            {this.state.trnd_movies.map(title => (
                <Movie items={title} type="trending"/>
            ))}
            
                <p>trending movies</p>
            </div>
        )
    }

}

export default LatestMovies