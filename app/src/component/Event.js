import React from 'react';

class Event extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.id,
            clubName: this.props.clubName,
            mediaTitle: this.props.mediaTitle,
            mediaID: this.props.mediaID,
            date: this.props.date,
            time: this.props.time,
            rsvp: false
        };

        this.attending = this.attending.bind(this);
    }

    attending() {
        this.setState({
            rsvp: true,
        });
        console.log("rsvp:" + this.state.rsvp);
    }
    
    render() {
        return(
            <div>   
                <div className="eventbox">
                    <br></br>
                    {this.props.clubName}
                    <br></br>
                    {this.props.mediaTitle}
                    <br></br>
                    {this.props.time}
                    <br></br>
                    {this.props.date}
                    <br></br>
                    {this.props.eventDescription}
                </div>
            </div> 
        )   
    }
}

export default Event;