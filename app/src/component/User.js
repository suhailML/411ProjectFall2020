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
            marginRight: 10,
            borderRadius: '100%',
            backgroundColor: this.props.self ? '#b285f9' : '#f9aa41'
        }

        var {userID, userName, firstName, lastName} = this.state;
        console.log(this.state);

        return (
            <div>
                <div style={style}>
                    <div className="user">
                        <p>{`@${userName}`}</p>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default User;