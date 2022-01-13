import React, {useContext, useState, useEffect} from "react"
import { UserContext } from "../UserContext"
import { useHistory } from "react-router-dom";
import { useFetch } from '../useFetch'

import Form from '../components/Form'
import SHA256 from 'js-sha256'

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);                    
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}


const Login = (props) =>{

  const [errorMessage, setErrorMessage] = useState(null);
  const {user, setUser} = useContext(UserContext);
  const history = useHistory();

  const SendRequest = (username, pass) =>{
        fetch(`http://localhost:8008/newUser?username=${username}&password=${pass}`, {method: "POST"})
        .then(response => response.json())
        .then(data => {
          data = JSON.parse(data)
          if(data.status){
            setErrorMessage(null);
            setUser({user: username, code:data.code});
            history.push("/dashboard");
          }
          else{
            setErrorMessage("Username already exists!")
          }
        });
  }

  const OnSubmitCallback = data => {
    if(data.username.length < 1){
      setErrorMessage("Please choose a username")
      return;
    }
    
    if(data.password.length < 1){
      setErrorMessage("Please set a password")
      return;
    }

    setErrorMessage("sending...")

    const encrypted = SHA256(data.password)
    
    SendRequest(data.username, encrypted);
  }

  return (
    <div className="formContainer">
        <Form onSubmit={OnSubmitCallback} buttonText="Signup" errorText={{errorMessage, setErrorMessage}}/>
    </div>
  );
}


export default Login;