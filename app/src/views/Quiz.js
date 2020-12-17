import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import LoginButton from '../component/LoginC';
import { refreshTokenSetup } from '../utils/refreshToken';
import GoogleLogin from 'react-google-login';
import { buildQueries } from '@testing-library/react';
import Auth from '../component/Auth';


class Quiz extends React.Component{
    constructor(props) {
        super(props);

        this.state = ({
            userID: null,
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
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

    componentDidMount(){
        this.prepoulate();
    }

    checkForm() {
        let err = false;
        for (const prop in this.state) {
            if ( this.state[prop] === '' ) {
                let el = document.getElementById(prop);
                el.classList.add('remind')
                err = true
            }
        }
        if (err) {
            throw('incomplete items');
        }

    }

    async createNewUser(event) {
        var {firstName, lastName, userName, email, campusLocation, year} = this.state;
        event.preventDefault();

        try {
            this.checkForm()
            axios
            .post('http://localhost:4001/movieRouter/uCreate', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                userName: userName,
                locality: campusLocation,
                year: year,
                clubAffiliations: "club"
            })
            .then(res => {
                this.props.history.push('/home/' + res.data.id[0]);
            })
            .catch(error => console.error(`could not do search`));

        } catch(e) {
            alert(e)
        }
        
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    prepoulate(){
        try {
            const { firstName, lastName, email } = this.props.location.state;
            this.setState({
                firstName: firstName,
                lastName: lastName,
                email: email
            })
        } catch(e) {
            console.log("no state data")
        }      
    }

    // loginResults(res) {
    //     console.log(res);
    //     this.setState({
    //         firstName: res.profileObj.givenName,
    //         lastName: res.profileObj.familyName,
    //         email: res.profileObj.email
    //     });
    //     console.log(this.state);
    // }

    render() {
        return(
            <div className="App home">

                <form onSubmit={this.createNewUser} className={"quiz-response"}>
                    <div className="Quiz">
                        
                        {/* <div className="option" style={this.color()} onClick={() => this.next}><p>West</p></div>
                        <div className="option" style={this.color()}><p>East</p></div>
                        <div className="option" style={this.color()}><p>South</p></div>
                        <div className="option" style={this.color()}><p>Medical Campus</p></div> */}
                        <label for="firstName">First name<span>*</span></label>
                        <input id="firstName" type ="text" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
                        <br></br>
                        <br></br>
                        <label for="lastname">Last name<span>*</span></label>
                        <input id="lastName" type="text" name="lastName" value={this.state.lastName}  onChange={this.handleChange}/>
                        <br></br>
                        <br></br>
                        <label for="username">Username<span>*</span></label>
                        <input id="userName" type="text" name="userName" value={this.state.userName}  onChange={this.handleChange}/>
                        <br></br>
                        <br></br>
                        <label for="email">Email<span>*</span></label>
                        <input id="email" type ="text" name="email" value={this.state.email}  onChange={this.handleChange}/>
                        <br></br>
                        <br></br>
                        <label for="campuslocation">Campus Location<span>*</span></label>
                        <select id="campusLocation" name="campusLocation" value={this.state.campusLocation} defaultValue="West" onChange={this.handleChange}>
                            <option value="West">West</option>
                            <option value="East">East</option>
                            <option value="Central">Central</option>
                            <option value="South">South</option>
                            <option value="Med">Med</option>
                        </select>
                        <br></br>
                        
                        <br></br>                 
                        <label for="year">Year:</label>
                        <select name="year" value={this.state.year} defaultValue="Freshman" onChange={this.handleChange}>
                            <option value="Freshman">Freshman</option>
                            <option value="Sophomore">Sophomore</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                        </select>
                        <br></br>
                        <br></br>
                        <input className="submit" type="submit"/>
                    </div>
                </form>
            </div>
            
        );
    }
}

export default Quiz;
