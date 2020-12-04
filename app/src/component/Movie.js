import React from 'react';

/* example of stateless components -> components that are functions (functional),
they take props in a param and then you can access the keys*/

const Movie = (props) => {
    return (
            <div className="trend-moviebox">
                <img src={props.poster} alt=""/>
                {props.name}
                <p> {props.genre} </p>
            </div>
    );
}

export default Movie
