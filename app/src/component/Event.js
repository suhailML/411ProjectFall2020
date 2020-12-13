import React from 'react';
import PropTypes from 'prop-types';

class Event extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clubName: this.props.clubName,
            title: this.props.title,
            start_time: this.props.start_time/60, 
            end_time: this.props.end_time,
            rsvp: false
        };

        this.attending = this.attending.bind(this);
    }

    attending(prevState) {
        this.setState({
            rsvpd: true,
        });
        console.log("RSVPed to event");
    }
    
    render() {
        return(
            <div>   
                <div className="eventbox"> 
                    <button onClick={() => this.expand }> Details </button>
                    <button onClick={() => this.rsvp }> RSVP </button>
                    {this.props.clubName}
                    {this.props.title}
                    {this.props.start_time}
                    {this.props.end_time}
                </div>
            </div> 
        )   
    }
}

export default Event;