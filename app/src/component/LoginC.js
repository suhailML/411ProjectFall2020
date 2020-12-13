import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { Redirect } from 'react-router-dom';
// refresh token
import { refreshTokenSetup } from '../utils/refreshToken';

// const sourceFile = require("./Config")
// var clientId = sourceFile.clientId;
// console.log(clientId);

// const onSuccess = (res) => {
//   console.log('Login Success: currentUser:', res.profileObj);
//   alert(
//     `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
//   );
//   refreshTokenSetup(res);
// };

// const onFailure = (res) => {
//   console.log('Login failed: res:', res);
//   alert(
//     `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
//   );
// };


//i think thr problem here is that we want pass in the the vlaue
//signedIn == true to the parent component that called it and the the returning
//of redirect should be in that parent component
const toApp = (res) => {
  console.log(res.profileObj.givenName)
  return (<Redirect to={{
    pathname: "home/" + res.profileObj.givenName,
    state: {refererrer: "hello"} //can be accessed with this.props.location.state.refererrer
  }}/>)
}
const responseGoogle = (response) => {
  console.log(response);
}

export function LoginButton() {

    return (
      <div>
        <GoogleLogin
          clientId={process.env.REACT_APP_CLIENT_ID}
          buttonText="Login"
          onSuccess={toApp}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          style={{ marginTop: '100px' }}
          isSignedIn={true}
        />
      </div>
    );
  }
  
export default LoginButton