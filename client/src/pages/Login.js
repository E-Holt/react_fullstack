import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../helpers/AuthContext'

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const {setAuthState} = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () =>{
    const data = { username: username, password: password }; 
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error){
        alert(response.data.error)
      } else {
        localStorage.setItem("accessToken", response.data);
        setAuthState(true)
        navigate('/');
      }
    });
  };

  return (
    <div className="loginContainer">
      <label>Username: </label>
      <input type="text" onChange={(event) => {
        setUserName(event.target.value);
      }} />
      <label>Password: </label>
      <input type="password" onChange={(event) => {
        setPassword(event.target.value);
      }}/>
      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login