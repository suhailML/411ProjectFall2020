import LoginButton from '../component/LoginC.js';
import { GoogleLogin } from 'react-google-login';
import React from 'react';
import { Redirect } from 'react-router-dom';

import LogoutButton from '../component/Logout.js';
import axios from 'axios';
import auth from '../component/LoginC.js'



class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state= {
            isSignedIn: false

        }
        this.toApp.bind(this)
        // this.authorize.bind(this)
        // this.nextPath.bind(this)
    }

    nextPath(){

    }

    toApp = (res) => {
        const id = res.tokenId;
        const { history } = this.props
        axios.post("http://localhost:4001/movieRouter/api/" + id)
            .then(res => {
                console.log(res)
                this.setState({
                    isSignedIn: true
                })
                if (res.data.info.length == 0) {
                    console.log("huh?")
                    history.push({
                        pathname: "/signup",
                        state: {
                            firstName: res.data.firstName,
                            lastName: res.data.lastName,
                            email: res.data.email
                        }
                    })
                } else {
                    history.push("/home/" + res.data.firstName)
                }
            })           
        .catch(err => console.log(`Fail with err ${err}`))
        // console.log('id is ' + id)
        // auth.checkToken(id, auth.getUserInfo)
        // this.setState({
        //     isSignedIn: true
        // })
    }

    // authorize(){
    //     const { history } = this.props
    //     const state  = auth.getUserInfo();
    //     const { id } = auth.getUserInfo();
    //     const path = auth.getPath();
    //     console.log(state)
    //     console.log(id)
    //     console.log(path)

    //     if (path === 'signup'){
    //         history.push({
    //             location: "/signup",
    //             state: state
    //         })
    //     } else if (path=='home'){
    //         history.push("/home/" + id)
    //     } else {
    //         console.log('stay here')
    //     } 
    // }

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