import React from 'react';
import Event from '../component/Event';
import Events from '../fakedata/events';
import EventForm from '../component/EventForm';

class BulletinBoard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: Events,
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

    render() {
        var { events } = this.state;

        return (
            <div className="featurebox">
                <p>Club Events</p>
                <div className="feature">
                
                <EventForm/>
                {/* once you get the trend movies as an array from compDidMount
                create a Movie Component */}
                {events.map(event => 
                    <Event id={event.eventid} clubName={event.clubName} title={event.title} start_time={event.start_time} end_time={event.end_time} />
                )}
                </div>
            </div>
        );
    }
}

export default BulletinBoard