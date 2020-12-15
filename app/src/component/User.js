import React from 'react';
import { isThrowStatement } from 'typescript';

class User extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            userID: this.props.userID,
            userName: this.props.userName,
            firstName: this.props.firstName,
            lastName: this.props.lastName,
        });
    }

    render() {
        const style = {
            height: this.props.size,
            width: this.props.size,
            marginRight: 4,
            borderRadius: '100%',
            backgroundColor: this.props.self ? '#b285f9' : '#f9aa41'
        }

        var {userID, userName, firstName, lastName} = this.state;
        console.log(this.state);

        return (
            <div className="user">
                <div style={style}></div>
                <div>
                    <p>{userName}</p>
                </div>
            </div>
            
        );
    }
}

export default User;