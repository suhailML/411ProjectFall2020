import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { LanguageServiceMode } from 'typescript';

class Quiz extends React.Component{
    constructor(props) {
        super(props);

        this.state = ({
            firstName: "",
            lastName: "",
            userName: "",
            campusLocation: "",
            year: ""
        });

        this.createNewUser = this.createNewUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // color(){
    //     let val = Math.random() *10;
    //     console.log(val);
    //     if( val >= 0 && val < 2.5) {
    //         return ({color: "blue"});
    //     } else if ( val >= 2.5 && val < 5){
    //         return ({color: "purple"});
    //     } else if( val >= 5 && val < 7.5) {
    //         return ({color: "red"});
    //     } else {
    //         return ({color:"yellow"});
    //     }
    // }

    // next() {

    createNewUser(event) {
        var {firstName, lastName, userName, campusLocation, year} = this.state;
        event.preventDefault();
        axios
            .post('http://localhost:4001/movieRouter/uCreate', {
                firstName: firstName,
                lastName: lastName,
                email: 'email',
                birthdayDate: "DOB",
                userName: userName,
                locality: campusLocation,
                year: year,
                clubAffiliations: "club",
                watchedMovies: "movies"
            })
            .then(res => {
              console.log(res.data);
              // Fetch all books to refresh
              // the books on the bookshelf list
            })
            .catch(error => console.error(`could not do search`));
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return(
            <form onSubmit={this.createNewUser} className={"quiz-response"}>
                <div className="Quiz">
                    
                    {/* <div className="option" style={this.color()} onClick={() => this.next}><p>West</p></div>
                    <div className="option" style={this.color()}><p>East</p></div>
                    <div className="option" style={this.color()}><p>South</p></div>
                    <div className="option" style={this.color()}><p>Medical Campus</p></div> */}
                    <label for="firstName">First name:</label>
                    <input type ="text" name="firstName" value={this.state.firstName}  onChange={this.handleChange}/>
            
                    <label for="lastname">Last name:</label>
                    <input type ="text" name="lastName" value={this.state.lastName}  onChange={this.handleChange}/>

                    <label for="username">Username:</label>
                    <input type ="text" name="userName" value={this.state.userName}  onChange={this.handleChange}/>
                    
                    <label for="campuslocation">Location on Campus:</label>
                    <select name="campusLocation" value={this.state.campusLocation} onChange={this.handleChange}>
                        <option value="West">West</option>
                        <option value="East">East</option>
                        <option value="Central">Central</option>
                        <option value="South">South</option>
                        <option value="Med">Med</option>
                    </select>

                    <label for="year">Year:</label>
                    <select name="year" value={this.state.year} onChange={this.handleChange}>
                        <option value="1">Freshman</option>
                        <option value="2">Sophomore</option>
                        <option value="3">Junior</option>
                        <option value="4">Senior</option>
                    </select>
                    
                    <input type="submit"/>
                </div>
            </form>
        );
    }
}

export default Quiz;