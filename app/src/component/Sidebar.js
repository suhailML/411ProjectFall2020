import React from 'react';
import User from './User';
import axios from 'axios';

class Sidebar extends React.Component {
    constructor(props){
        super(props);

        this.state={
            friendExpand: false,
            friends: []
        };

        this.expandlist = this.expandlist.bind(this);
        this.getFriends= this.getFriends.bind(this);
    }

    expandlist() {
        this.setState(prev => 
            ({
                friendExpand: !prev.friendExpand,
            })
        );
    }

    getFriends(){
        axios.get("http://localhost:4001/movieRouter/uAll")
        .then(response => {
            // Update the books state
            this.setState({
                friends: response.data
            });
            console.log(response);
            console.log(response.data);
          });

    }

    render() {
        //inline styles can dynamically change styles, bothced example

        const iconSize = 27;

        //Friend List
        // this.getFriends();
        // const friends = this.state.friends.map(friend => <User userName={friend.userName} size={iconSize} self={false}/>);
        // //what to expand friendlist size to 
        // const heightFriendsList = {height: 'min(' + parseInt(this.state.friendExpand ? this.props.friends.length * (iconSize + 25) : (iconSize + 25)) + 'px, 40vh)'};


        return (
            <div className="sidebar">
                <h4> hi {this.props.name} </h4>
                {/*style prop takes an object for inline styles in JSX*/}
                <User userName={this.props.name} size={33} self={true}/>

                <h2> Friends</h2>
                <hr></hr>
                <div>
                    {/* <div className={'friends' + (this.state.friendExpand ? '' : ' collapse' )} style={heightFriendsList}>
                        {friends}
                    </div>
                    <button onClick={this.expandlist}> click to {this.state.friendExpand ? 'collapse' : 'expand' }</button> */}
                </div>

                <h5>&gt;&gt; start a bulletin board chat or something</h5>
                
            </div>
        );
    }
}

export default Sidebar;