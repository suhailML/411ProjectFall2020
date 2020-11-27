import React from 'react';
import '../styles/Movie.css'
/* example of stateless components -> components that are functions (functional),
they take props in a param and then you can access the keys*/
const Movie = (props) => {
    console.log(props)
    return (
            <div>
                {props.items}
            </div>
    );
}

export default Movie
