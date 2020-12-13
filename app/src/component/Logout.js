import React from 'react';
import { GoogleLogout } from 'react-google-login';

// const sourceFile = require("./Config")
// var clientId = sourceFile.clientId;

function LogoutButton() {
  const onSuccess = () => {
    console.log('Logout made successfully');
    alert('Logout made successfully ✌');
  };

  return (
    <div>
      <GoogleLogout
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      ></GoogleLogout>
    </div>
  );
}

export default LogoutButton;