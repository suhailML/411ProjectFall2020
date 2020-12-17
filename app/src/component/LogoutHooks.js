import React, { useState } from 'react';
import { useGoogleLogout } from 'react-google-login';
import auth from './LoginC';
import { Redirect } from 'react-router-dom';

// const sourceFile = require("./Config")
// var clientId = sourceFile.clientId;



function LogoutHooks() {
  const [ isLogin, setLogin ] = useState(false);


  const onLogoutSuccess = (res) => {
    console.log('Logged out Success');
    auth.setAuthStatus(false);
    console.log(auth.getAuthStatus())
    !auth.getAuthStatus()&&setLogin(!isLogin)
    // setLogin(!isLogin)

  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_CLIENT_ID,
    onLogoutSuccess,
    onFailure,
  })

  return (
    <button onClick={signOut} className="button">
      {isLogin&&<Redirect to="/"/>}
      {/* <img src="icons/google.svg" alt="google login" className="icon"></img> */}
      <span className="buttonText">Sign out</span>
    </button>
  );
}

export default LogoutHooks;