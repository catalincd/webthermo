import React, {useContext} from "react"
import Layout from '../components/Layout'
import { UserContext } from "../UserContext"
import Title from 'reactjs-title'
import { useHistory } from "react-router-dom";

const Login = (props) =>{

  const context = useContext(UserContext);
  const {user, setUser} = useContext(UserContext);
  setUser(null);
  const history = useHistory();

  return (
    <div>
        <Title render="Home - WebThermo"/>
        <div className="homeContainer">
          <div className="homeTop">
            <h2 className="welcomeText">
              Welcome to <br/> <span className="boldText">WebThermo</span>
            </h2>
            <img className="tempImg" src={process.env.PUBLIC_URL + `/temp.png`}/>
          </div>
          <div className="homeButtons">
            <button className="homeButton" onClick={() => history.push("/login")}>Login</button>
            <button className="homeButton" onClick={() => history.push("/signup")}>Sign Up</button>
          </div>
        </div>
    </div>
  );
}


export default Login;