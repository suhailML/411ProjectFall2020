import React from 'react';
/* example of stateless components -> components that are functions (functional),
they take props in a param and then you can access */
const Movie = (props) => {
    console.log(props)
    return (
            <div>
                {props.items}
            </div>
    );
}

export default Movie
