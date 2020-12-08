import React from 'react';

const Quiz = () => {
    return(
        <form action="" className="quiz-response">
            <div className="Quiz">
                <label for="firstname">First name:</label>
                <input type ="text" className="last-name-response" id="first-name-responose"/>
        
                <label for="lastname">Last name:</label>
                <input type ="text" className="last-name-response" id="last-name-responose"/>
                
                <label for="campuslocation">Location on campus:</label>
                <select className="campus-location" id="campus-location">
                    <option value="West">West</option>
                    <option value="East">East</option>
                    <option value="South">South</option>
                </select>

                
                <button type="submit">Submit</button>
            </div>
        </form>

       
    )
}

export default Quiz