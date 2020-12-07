import React from 'react';

/* example of stateless components -> components that are functions (functional),
they take props in a param and then you can access the keys*/
function expand() {
    console.log("chicken");

}

const Movie = (props) => {
    return (
        <div>
            <div className="trend-moviebox">
                <button onClick={() => expand }> + </button>
                <img src={props.poster} alt=""/>
            </div>
            {props.name}
                <p>movie genre here</p>
        </div>
            
    );
}

export default Movie
