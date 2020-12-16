import { buildQueries } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import { isStringTextContainingNode, isThrowStatement } from 'typescript';

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


    componentDidMount() {
        axios.post("http://localhost:4001/movieRouter/tableSpecificSearch", {
                table: "userInfo",
                column: "id",
                value: this.props.userID
            }) 
            .then(response => {
                var userInfo = response.data[0]
                try
                {
                this.setState({
                    userName:  userInfo.userName,
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName
                })
                }
                catch (err)
                {
                    console.log(err);
                }
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

        return (
            <div className="user">
                <div style={style}></div>
                <div>
                    <p>{this.state.userName}</p>
                </div>
            </div>
            
        );
    }
}

export default User;