import React from 'react';
import axios from 'axios';

class EventForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            clubName: "",
            movieTitle: "",
            movieID: "",
            date: "",
            time: "",
            eventDescription: ""
         });

        this.createNewEvent = this.createNewEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    createNewEvent(event) {
        var {clubName, movieTitle, movieID, date, time, eventDescription} = this.state;
        event.preventDefault();
        axios
            .post('http://localhost:4001/movieRouter/eCreate', {
                clubName: clubName,
                movieTitle: movieTitle,
                movieID: movieID,
                date: date,
                time: time,
                eventDescription: eventDescription
            })
            .then(res => {
              console.log(res.data);
              // Fetch all books to refresh
              // the books on the bookshelf list
            })
            .catch(error => console.error(`Could not add event.`));
    }

    handleChange(event){
        if(event.target.name === "month") {
            this.setState({[this.state.date]: event.target.value});
        } else if (event.target.name === "day") {
            this.setState({[this.state.date]: this.state.date + "/" + event.target.value + "/"});
        } else if (event.target.name === "year") {
            this.setState({[this.state.date]: this.state.date.concat(event.target.value)});
        } else if (event.target.name === "hour") {
            this.setState({[this.state.time]: event.target.value});
        } else if (event.target.name === "minute") {
            this.setState({[this.state.time]: this.state.date.concat(":" + event.target.value)});
        } else {
            this.setState({[event.target.name]: event.target.value});
        }
        console.log(this.state);
    }

    render() {
        return(
            <div class="featurebox">
                    <form onSubmit={this.createNewUser} className={"Event-form"}>
                    <div className="AddEventForm" style={{display:'block'}}>
                        Club name:
                        <input type ="text" name="clubName" value={this.state.clubName}  onChange={this.handleChange}/>
                
                        <br></br>
                        Movie Title:
                        <input type ="text" name="movieTitle" value={this.state.movieTitle}  onChange={this.handleChange}/>

                        <br></br>
                        Date:
                        <br></br>
                        Month:
                        <input type ="text" name="month" value={this.state.date}  onChange={this.handleChange}/>
                        Day:
                        <input type ="text" name="day" value={this.state.date}  onChange={this.handleChange}/>
                        Year:
                        <input type ="text" name="year" value={this.state.date}  onChange={this.handleChange}/>
                        
                        <br></br>
                        Time:
                        <input type ="text" name="hour" value={this.state.time}  onChange={this.handleChange}/>
                        <input type ="text" name="minute" value={this.state.time}  onChange={this.handleChange}/>
                        
                        <br></br>
                        Event Description:
                        <input type ="text" name="eventDescription" value={this.state.eventDescription}  onChange={this.handleChange}/>
                        
                        <br></br>
                        <input type="submit"/>
                    </div>
                </form>
            </div>
            
        );
    }

}

export default EventForm;