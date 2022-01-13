import React, {useContext, useState, useEffect} from "react"
import { useHistory } from "react-router-dom";
import { UserContext } from "../UserContext";

const LayoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
    margin: '0px 0px',
}

const LayoutChildrenStyle = {
    overflowY: 'scroll',
    width: '100%',
    height: '100%'
}


const Layout = (props) => {

    const {user, setUser} = useContext(UserContext);
    const history = useHistory();

    const LogOut = () =>{
        setUser(null);
        history.push("/");
    }

    return(
        <div style={LayoutStyle}>
            <div className="bar topBar">
                <h1>WebThermo</h1>
                {
                    user && 
                    <div className="userContainer">
                        <h3 className="userH3">{user.user}</h3>
                        <button className="logoutButton" onClick={() => LogOut()}>Log Out</button>
                    </div>
                }
            </div>
            <div style={LayoutChildrenStyle}>
                {props.children}
            </div>
            <div className="bar bottomBar">
                <h3>Nanu Robert 2022</h3>
            </div>
        </div>
    );   
}


export default Layout