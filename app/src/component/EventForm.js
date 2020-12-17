import React from 'react';
import axios from 'axios';

class EventForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = ({
            clubName: "",
            mediaTitle: "",
            mediaID: "",
            month: "",
            day:"",
            year: "",
            hour: "",
            minute: "",
            eventDescription: ""
         });

        this.createNewEvent = this.createNewEvent.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    createNewEvent(event) {
        var {clubName, mediaTitle, mediaID, month, day, year, hour, minute, eventDescription} = this.state;
        event.preventDefault();
        axios
            .post('http://localhost:4001/movieRouter/eCreate', {
                club_name: clubName,
                mediaTitle: mediaTitle,
                mediaID: mediaID,
                date: month + "/" + day  + "/" + year,
                time: hour + ":" + minute,
                eventDescription: eventDescription
            })
            .then(res => {
              console.log(res.data);
              // Fetch all books to refresh
              // the books on the bookshelf list
            })
            .catch(error => console.error(`Could not add event.`));
    }

    handleChange(event, prevState){
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    }

    render() {
        return(
            <div class="featurebox">
                    <form onSubmit={this.createNewEvent} className={"Event-form"}>
                    <div className="AddEventForm" style={{display:'block'}}>
                        Club name:
                        <input type ="text" name="clubName" value={this.state.clubName}  onChange={this.handleChange}/>
                
                        <br></br>
                        Movie Title:
                        <input type ="text" name="mediaTitle" value={this.state.mediaTitle}  onChange={this.handleChange}/>

                        <br></br>
                        Date:
                        <br></br>
                        Month:
                        <input type ="text" name="month" value={this.state.month}  onChange={this.handleChange}/>
                        Day:
                        <input type ="text" name="day" value={this.state.day}  onChange={this.handleChange}/>
                        Year:
                        <input type ="text" name="year" value={this.state.year}  onChange={this.handleChange}/>
                        
                        <br></br>
                        Time:
                        <input type ="text" name="hour" value={this.state.hour}  onChange={this.handleChange}/>
                        :
                        <input type ="text" name="minute" value={this.state.minute}  onChange={this.handleChange}/>
                        
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