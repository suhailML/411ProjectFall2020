import React from 'react'
import { Redirect } from 'react-router-dom';

/*i think HOC's or the export default expects a only a function 
or string to be returned else you get weird error i'm not sure
what the problem is but it can only either return a func or string*/
const Auth = (InnerComponent) => {
    const authComponent = () => {
        /* change auth to really check login status*/
        const auth = false;
        return (auth ? <InnerComponent/> : <Redirect to="/login"/>)
    }
    return authComponent
}

export default Auth