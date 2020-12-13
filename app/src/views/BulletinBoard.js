import React from 'react';
import Event from '../component/Event';
import EventForm from '../component/EventForm';
import axios from 'axios';

class BulletinBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        };
    }

    handleErr(err) {
        console.warn(err);
        let resp = new Response(
          JSON.stringify({
            code: 400,
            message: "Bad Request"
          })
        );
        return resp;
    }

    componentDidMount() {
        axios
            .get('http://localhost:4001/movieRouter/eAll')
            .then(res => {
              this.setState({
                 events: res.data, 
              });
              // Fetch all books to refresh
              // the books on the bookshelf list
            })
            .catch(error => console.error(`could not do search`));
    }

    render() {
        var events = this.state.events;

        return (
            <div className="featurebox">
                <p>Club Events</p>
                <div className="feature">
                
                <EventForm/>
                {/* once you get the trend movies as an array from compDidMount
                create a Movie Component */}
                {events.map(event => 
                    <Event id={event.id} clubName={event.clubName} mediaTitle={event.mediaTitle} mediaID={event.mediaID} date={event.date} time={event.time} eventDescription={event.eventDescription} />
                )}
                </div>
            </div>
        );
    }
}

export default BulletinBoard;