import React from 'react';
import PropTypes from 'prop-types';

class Event extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            clubName: this.props.clubName,
            title: this.props.title,
            start_time: this.props.start_time, 
            end_time: this.props.end_time,
        }
    }

    expand() {
        console.log("expanded");
    }
    
    rsvp() {
        this.setState({
            rsvp: true,
        })
        console.log("RSVPed to event");
    }
    
    render() {
        return(
            <div>   
                <div className="eventbox">
                    
                    <button onClick={() => this.expand }> Details </button>
                    <button onClick={() => this.rsvp }> RSVP </button>
                </div>
                {this.props.clubName}
                {this.props.title}
                {this.props.start_time}
                {this.props.end_time}
            </div> 
        )   
    }
    
    propTypes = {
        eventid: PropTypes.number,
        clubName: PropTypes.string,
        title: PropTypes.string,
        start_time: PropTypes.number,
        end_time: PropTypes.number,
        rsvp: PropTypes.bool
    }
    
    defaultProps = {
        rsvp: false
    }    
}



export default Event