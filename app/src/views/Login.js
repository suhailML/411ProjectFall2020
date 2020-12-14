import LoginButton from '../component/LoginC.js';
import { GoogleLogin } from 'react-google-login';
import React from 'react';
import { Redirect } from 'react-router-dom';

import LogoutButton from '../component/Logout.js';
import axios from 'axios';



class Login extends React.Component {
    constructor() {
        super()
        this.state= {
        }
    }

    toApp(res) {
        const id = parseInt(res.googleId);
        console.log("your id is " + id);
        console.log(res);

        axios.get("http://localhost:4001/movieRouter/" + id)
            .then(res => {

                console.log(res)
                if (res.data.length == 0){
                    console.log("chinyy")
                    // this.setState({
                    //     id: id,
                    //     auth: true,
                    //     newUser: true
                    // })
                } else {
                    // this.setState({
                    //     id: id,
                    //     auth: true,
                    //     newUser: false
                    // })
                }
            })
            .catch(err => console.log(`Fail with err ${err}`))
    }

    responseGoogle(res){
        console.log(res + "not working ")
    }

    render() {
        const { auth } = this.state
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


            {/* {this.state.auth && this.state.newUser ? <Redirect to="/signup"/> : <Redirect to={"/home/" + this.state.id}/>} */}

            </section>

        )
    }
}

// const Loginfunc = () => {
//     return(
//         <div>
//             <GoogleLogin
//             clientId={process.env.REACT_APP_CLIENT_ID}
//             buttonText="Login"
//             onSuccess={check}
//             onFailure={responseGoogle}
//             cookiePolicy={'single_host_origin'}
//             style={{ marginTop: '100px' }}
//             isSignedIn={true}
//             />
//             <LoginButton/>
//             <LogoutButton/>
//         </div>
//     )
// }

export default Login