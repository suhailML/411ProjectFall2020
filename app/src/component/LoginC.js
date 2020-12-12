import React from 'react';
import { GoogleLogin } from 'react-google-login';
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

const responseGoogle = (response) => {
  console.log(response);
}

export function LoginButton() {

    return (
      <div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
          style={{ marginTop: '100px' }}
          isSignedIn={true}
        />
      </div>
    );
  }
  
export default LoginButton