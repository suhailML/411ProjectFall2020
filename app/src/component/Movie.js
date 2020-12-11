import React, { useState } from 'react';

/* example of stateless components -> components that are functions (functional),
they take props in a param and then you can access the keys*/
/* TODO:
change this back to a functional component
use a hook to manage the click event
when clicked pass data back up to parent
append a new element which is expanded view of a movie sent
*/

const Movie = (props) => {
    let style;
    let [expand, setExpand] = useState(true);
    console.log(expand)

    // if (expand) {
    //     style = {
    //         width: '50vw',
    //         height: '80vh'
    //     }
    // }
    // else {
    //     style = {
    //         display: 'block'
    //     }
    // }
    return (
        <div>
                <div id={props.id} className="trend-moviebox">
                    <button onClick={setExpand(!expand)}> + </button>
                    
                    <img src={props.poster} alt=""/>
                </div>
                <p>{props.name}</p>
                <p>{props.genre}</p>
            </div>
    )
}
// class Movie extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             expand: false
//         }
//         this.expand = this.expand.bind(this)
//     }

//     expand() {
//         this.setState(prev => ({expand: !prev.expand}))
//     }

//     movieView(){
//         if (this.state.expand) {
//             return ({
//                 width: '50vw',
//                 height: '80vh'

//             })
//         } 
//         return ({
//             display: 'block'
//         })
//     }
//     render() {
//         let style=this.movieView();
    
//         return (
//             <div>
//                 <div id={this.props.id} className="trend-moviebox" style={style}>
//                     <button onClick={this.expand}> + </button>
//                     <img src={this.props.poster} alt=""/>
//                 </div>
//                 <p>{this.props.name}</p>
//                 <p>{this.props.genre}</p>
//             </div>
                
//         );

//     }
// }


export default Movie
