import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
    return(
        <div className="App">
            <div>
                the home page! :D hopefully a lil aniamtion
                <Link to="/login"> Login button</Link>
            </div>
            <div>the sidepart for nagivation</div>
        </div>
    )
}

export default Home