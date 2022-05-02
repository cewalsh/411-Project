import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Component, useState } from "react";
import Form from './components/Form'
import './App.css'
import GOOGLE_CLIENT_ID from './data.js'


const data = GOOGLE_CLIENT_ID

class GoogleLoginComponent extends Component {
  constructor() {
    super();
    this.state = {
      isLoggedIn: false,
      userInfo: {
        name: "",
        emailId: "",
},
};
}


// Success Handler
responseGoogleSuccess = (response) => {
console.log();
let userInfo = {
  name: response.profileObj.name,
  emailId: response.profileObj.email,
};
this.setState({ userInfo, isLoggedIn: true });
};

// Error Handler
responseGoogleError = (response) => {
console.log(response);
};

// Logout Session and Update State
logout = (response) => {
console.log(response);
let userInfo = {
  name: "",
  emailId: "",
};
this.setState({ userInfo, isLoggedIn: false });
};

render() {
  return (
    <div className="row mt-5">
      <div className="col-md-12">
        {this.state.isLoggedIn ? (
          <div>
            <h1>Welcome to Weatherway, {this.state.userInfo.name}</h1>
            <h3>where there's a weather, there is a way..</h3>

            <GoogleLogout
              clientId={data}
              buttonText={"Logout"}
              onLogoutSuccess={this.logout}
            ></GoogleLogout>
            <Form/>
          </div>
        ) : (
      <div><h2>Login:</h2>
      <GoogleLogin
      clientId={data}
      buttonText="Sign In with Google"
      onSuccess={this.responseGoogleSuccess}
      onFailure={this.responseGoogleError}
      isSignedIn={true}
      cookiePolicy={"single_host_origin"}
      />
      </div>
      )}
      </div>
      </div>
);
}
}
export default GoogleLoginComponent;