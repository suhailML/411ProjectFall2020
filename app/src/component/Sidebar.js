import React from 'react';
import User from './User';
import axios from 'axios';
import LogoutHooks from '../component/LogoutHooks';


class Sidebar extends React.Component {
    constructor(props){
        super(props);

        this.state={
            friendExpand: false,
            friends: [],
            userID: this.props.userID,
            userName: "",
            firstName: "",
            lastName: "",
            locality: "",
            year: ""
        };

        this.friends = [
            {
                id: 1,
                username: 'suhailsolomon'
            }, 
            {
                id: 2,
                username: 'jarednuemann'
            }, 
            {
                id: 3,
                username: 'isrealsingh'
            }, 
            {
                id: 4,
                username: 'chinweoparji'
            }, 
            {
                id: 5,
                username: 'suhailmin'
            }, 
        ]

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
        axios.get("http://localhost:4001/movieRouter/fAll")
        .then(response => {
            // Update the books state
            this.setState({
                friends: response.data
            });
            console.log(response);
            console.log(response.data);
          });
    }

    componentDidMount() {
        axios.post("http://localhost:4001/movieRouter/tableSpecificSearch", {
                table: "userInfo",
                column: "id",
                value: this.props.userID
            }) 
            .then(response => {
                var userInfo = response.data[0];
                
                
                this.setState({
                    userName:  userInfo.userName,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    locality:  userInfo.locality,
                    year: userInfo.year
                })
            })

    }

    render() {
        //inline styles can dynamically change styles, bothced example

        const iconSize = 27;

        // this.getFriends();

        const allFriends = this.friends.map(friend => <User userName={friend.username} size={iconSize} self={false}/>);
        // //what to expand friendlist size to 
        const heightFriendsList = {height: 'min(' + parseInt(this.state.friendExpand ? this.friends.length * (iconSize + 25) : (iconSize + 25)) + 'px, 40vh)'};


        return (
            <div className="sidebar">
                <LogoutHooks/>
                <h4> hi {this.state.firstName} </h4>
                {/*style prop takes an object for inline styles in JSX*/}
                <User userID={this.props.userID} size={33} self={true}/>

                <h2> Friends</h2>
                <hr></hr>
                <div>
                    <div className={'friends' + (this.state.friendExpand ? '' : ' collapse' )} style={heightFriendsList}>
                        {allFriends}
                    </div>
                    <button onClick={this.expandlist}> click to {this.state.friendExpand ? 'collapse' : 'expand' }</button>
                </div>

                <h5>&gt;&gt; start a bulletin board chat or something</h5>
                
            </div>
        );
    }
}

export default Sidebar;