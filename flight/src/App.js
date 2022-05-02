import React from "react";
import Form from './components/Form'
import './App.css'
import GoogleLoginComponent from "./googlebutton.component";


function App() {

  return (
    <div className="App">
        <h2>Login:</h2>
        <GoogleLoginComponent />
        <Form/>
    </div>
    );
}

export default App;


