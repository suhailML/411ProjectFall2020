import React from 'react';
import PropTypes from 'prop-types';

class Event extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clubName: this.props.clubName,
            title: this.props.title,
            start_time: PropTypes.string, 
            end_time: PropTypes.string,
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
                    <button onClick={() => this.attending }> RSVP </button>
                    <br></br>
                    {this.props.clubName}
                    <br></br>
                    {this.props.title}
                    <br></br>
                    {this.props.start_time}
                    <br></br>
                    {this.props.end_time}
                </div>
            </div> 
        )   
    }
}

export default Event;