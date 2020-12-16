import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login.js';
class Home extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        console.log(this.props);
        return(
            <section className="App home">
                <article>
                <header>
                <h1> Does West have better taste than East?</h1>
                <h3> BUWatchesWhat shows you what's trending on Boston
                    University's campus, and gives you recommendations
                    on what to watch.
                </h3>
                </header>
                <Login props={this.props}/>
                </article>
            </section>
        )
    }  
}

export default Home;