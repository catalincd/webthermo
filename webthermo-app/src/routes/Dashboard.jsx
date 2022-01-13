import React, {useContext, useState, useEffect} from "react"
import { UserContext } from "../UserContext"
import { ThermoContext } from "../ThermoContext"
import { useHistory } from "react-router-dom";
import Thermo from "../components/Thermo"
import Title from 'reactjs-title'
import '../index.css'

var CNT = 0;

const Dashboard = (props) => {
  const {user, setUser} = useContext(UserContext);
  const [thermoArray, setArray] = useState([]);
  const [failsafe, setFailsafe] = useState(false);


  const history = useHistory();

  if(user == null || user === null){
    history.push("/");
  }


  useEffect(() => {
    if(user !== null){
    fetch(`http://localhost:8008/getThermos?username=${user.user}&code=${user.code}`, {method: "POST"})
        .then(response => response.json())
        .then(data => {
          data = JSON.parse(data)
          console.log(data);
          if(data.status){
            if(data.thermos.length !== undefined)
              setArray(data.thermos);
          }
          else{
            console.log("didnt find thermos");
          }
        });
    }
  }, [])
  

  


  useEffect( () => {
    if(thermoArray.length > 0 && user !== null){

      const thisBody = JSON.stringify(thermoArray);

      fetch(`http://localhost:8008/setThermos?username=${user.user}&code=${user.code}`, {method: "POST", headers: {'Content-Type': 'application/json'}, body: thisBody})
        .then(response => response.json())
        .then(data => {
          
          console.log(data);
          
        });
    }
    
  }, [thermoArray])

  return (
    <ThermoContext.Provider value={{thermoArray, setArray}}>
      <Title render="Dashboard - WebThermo"/>
      <div className="allThemosContainer">
        {
          thermoArray.map((item) => <Thermo key={item.name} name={item.name} temp={item.temp}/>)
        }
        <Thermo name="New Thermo..." temp={88.8} newTermo={true} rem={()=>{}}/>
      </div>
    </ThermoContext.Provider>
  );
}


export default Dashboard;