import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
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
            
                <Link to="/login"> 
                    <div className="button">Login</div>
                </Link>
            </article>
            
            <div className="">Chicken!</div>
        </section>
    )
}

export default Home