import React from 'react';
import PropTypes from 'prop-types';

class Quiz extends React.Component{
    constructor(props) {
        super(props);

    }

    color(){
        let val = Math.random() *10;
        console.log(val);
        if( val >= 0 && val < 2.5) {
            return ({color: "blue"})
        } else if ( val >= 2.5 && val < 5){
            return ({color: "purple"})
        } else if( val >= 5 && val < 7.5) {
            return ({color: "red"})
        } else {
            return ({color:"yellow"})
        }
    }

    next() {

    }


    render() {

        return(

                <form action="" className="quiz-response">
                    <div className="Quiz">
                        <p>
                            What part of campus are you on
                        </p>

                        <div className="option" style={this.color()} onClick={() => this.next}><p>West</p></div>
                        <div className="option" style={this.color()}><p>East</p></div>
                        <div className="option" style={this.color()}><p>South</p></div>
                        <div className="option" style={this.color()}><p>Medical Campus</p></div>

                        <label for="firstname">Username</label>
                        <input type ="text" className="last-name-response" id="first-name-responose"/>
                
                        <label for="lastname">Last name:</label>
                        <input type ="text" className="last-name-response" id="last-name-responose"/>
                        
                        <label for="campuslocation">Location on campus:</label>
                        <select className="campus-location" id="campus-location">
                            <option value="West">West</option>
                            <option value="East">East</option>
                            <option value="South">South</option>
                        </select>
    
                        <label for="Year">Year:</label>
                        <select className="year" id="year">
                            <option value="Freshman">Freshman</option>
                            <option value="Sophomore">Sophomore</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                        </select>
                        
                        <button type="submit" onClick={() => this.put}>Submit</button>
                    </div>
                </form>
        )
    }
}

export default Quiz