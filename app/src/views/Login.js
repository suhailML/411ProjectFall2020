import { GoogleLogin } from 'react-google-login';
import React from 'react';
import axios from 'axios';
import auth from '../component/LoginC.js'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            isSignedIn: false,
            userID: null
        }
        this.toApp = this.toApp.bind(this);
    }

    toApp = (res) => {
        const id = res.tokenId;
        const { history } = this.props.props;
        console.log(this.props.props);
        axios.post("http://localhost:4001/movieRouter/api/" + id)
            .then(res => {
                auth.setAuthStatus(true)
                if (res.data.info.length == 0) {
                    history.push({
                        pathname: "signup",
                        state: {
                            firstName: res.data.firstName,
                            lastName: res.data.lastName,
                            email: res.data.email
                        }
                    })
                } else {
                    history.push("home/" + res.data.info[0].id);
                }
            })           
        .catch(err => console.log(`Fail with err ${err}`))
        }

    responseGoogle(res){
        console.log(res + "not working ")
    }

    render() {
        return (
            <section>
                <GoogleLogin
                clientId={process.env.REACT_APP_CLIENT_ID}
                buttonText="Login"
                onSuccess={this.toApp}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
                />
            </section>
        )
    }
}
export default Login;