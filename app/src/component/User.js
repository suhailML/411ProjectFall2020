import axios from 'axios';
import React from 'react';

class User extends React.Component {

    constructor(props) {
        super(props);

        this.state = ({
            userID: this.props.userID,
            userName: this.props.userName,
            firstName: "",
            lastName: "",
            locality:"",
            year: "",
            showAll: this.props.showAll
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
                    lastName: userInfo.lastName,
                    locality: userInfo.locality,
                    year: userInfo.year,
                    showAll: userInfo.showAll
                })
                }
                catch (err)
                {
                    console.log(err);
                }
            });
    }

    // addFriend(event){
    //     var url = 'http://localhost:4001/movieRouter/';
    //     var {} = this.state;
    //     event.preventDefault();
    //     if (!watched) {
    //         axios
    //         .post('http://localhost:4001/movieRouter/tsCreate', {
                
    //         })
    //         .then(res => {
    //           console.log(res.data);
    //         })
    //         .catch(error => console.error(`didnt work fuck`));
    //     }
    //     this.setState({watched: true});
    // }

    render() {

        var {userID, userName, firstName, lastName, locality, year, showAll} = this.state;

        const style = {
            height: this.props.size,
            width: this.props.size,
            marginRight: 4,
            borderRadius: '100%',
            backgroundColor: this.props.self ? '#b285f9' : '#f9aa41'
        }

        if (showAll) {
            return (<div className="user">
                        <div style={style}></div>
                        <div>
                            <p>{userName}</p>
                            <br></br>
                            <p>{firstName + " " + lastName}</p>
                            <br></br>
                            <p>{locality}</p>
                            <br></br>
                            <p>{year}</p>
                        </div>
                    </div>)
        } else {
            return (<div className="user">
                        <div style={style}></div>
                        <div>
                            <p>{userName}</p>
                        </div>
                    </div>);
        }
    }
}

export default User;