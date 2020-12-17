import React from 'react';
import { Redirect } from 'react-router-dom';
import Login  from '../views/Login'
import checkauth from '../component/LoginC.js'

function Auth (InnerComponent) {
    return class extends React.Component {
        constructor(){
            super()
            this.state = {
                auth: checkauth.getAuthStatus()
            }
        }
        componentDidUpdate(prevProp, prevState){
            console.log(prevState)
            if (prevState.auth !== checkauth.getAuthStatus()) {
                console.log('get outta here');
                this.setState({
                    auth: !this.state.auth
                })
            }
        }

        render(){
            return (
                this.state.auth ? <InnerComponent/> : <Redirect to='/'/>
            );
        }
    }
}

/*i think HOC's or the export default expects a only a function 
or string to be returned else you get weird error i'm not sure
what the problem is but it can only either return a func or string*/
const functionalAuth = (InnerComponent) => {
    const authComponent = () => {
        /* change auth to really check login status*/
        const auth = checkauth.getAuthStatus();
        console.log(auth)
        return (auth ? <InnerComponent/> : <Redirect to="/login"/>);
    }
    return authComponent;
}

export default Auth;