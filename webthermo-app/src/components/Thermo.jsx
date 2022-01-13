import React, {useContext, useState, useEffect, useRef} from "react"
import { ThermoContext } from "../ThermoContext"
import { useHistory } from "react-router-dom";
import { FaEdit, FaCheck } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const Thermo = (props) =>{


    const [currentTemp, setTemp] = useState(props.temp)
    const [currentName, setName] = useState(props.name)
    const [editing, setEditing] = useState(false)
    const {thermoArray, setArray} = useContext(ThermoContext);
    const textInput = useRef(null);

    const modTemp = (x) => {
        var newTemp = (parseFloat(currentTemp) + x).toFixed(1)
        setTemp(newTemp);
        
        var newArray = []
        for(var i=0;i<thermoArray.length;i++){
            if(thermoArray[i].name == currentName)
                newArray.push({name:currentName, temp:newTemp});
            else
                newArray.push(thermoArray[i]);
        }
        setArray(newArray);
    }

    const removeThis = () =>{
        setArray(thermoArray.filter(item => (item.name != currentName)));
    }

    const switchEditor = () =>{
        setEditing(!editing);
        

        if(!editing){
            textInput.current.focus();
        }else{
            const oldName = currentName;
            var newArray = [];
            setName(currentName);
            for(var i=0;i<thermoArray.length;i++){
                if(thermoArray[i].name == oldName)
                    newArray.push({name:textInput.current.value, temp:thermoArray[i].temp});
                else
                    newArray.push(thermoArray[i]);
            }
            setArray(newArray);
        }
    }

    const getNewName = () =>{
        var idx = 0;
        while(true){
            idx += 1;
            var broken = false;
            for(var i=0;i<thermoArray.length;i++){
                if(thermoArray[i].name == `Thermostat ${idx}`){
                    broken = true;
                    break;
                }
            }

            if(!broken)
                return `Thermostat ${idx}`;
        }
    }

    const addThermo = () =>{
        setArray([...thermoArray, {name: getNewName(), temp:20}])
    }


    var Buttons = (
            <div className="thermoButtons">
                <button className="thermoButton incButton" onClick={() => modTemp(0.5)}>+</button>    
                <button className="thermoButton decButton" onClick={() => modTemp(-0.5)}>-</button>    
            </div>
    );

    var ToolsButtons = (
        <div className="ToolsButtons">
            {
                !editing?
                <FaEdit className="toolsButton editButton" onClick={() => switchEditor()}/>
                :
                <FaCheck className="toolsButton editButton" onClick={() => switchEditor()}/>
            }
            <MdDeleteForever className="toolsButton deleteButton" onClick={() => removeThis()}/>
        </div>
    );

    
    if(props.newTermo){
        Buttons = (
            <div className="thermoButtons">
                <button className="createThermoButton" onClick={() => addThermo()}>CREATE</button>    
            </div>
        );

        ToolsButtons = null;
    }



    return (
        <div className="thermoContainer">
            <div className="topThermo">
                <input className="topThermoText" type="text" disabled={props.newTermo} defaultValue={props.name} ref={textInput} onBlur={() => switchEditor()} onFocus={() => switchEditor()}/>
                {ToolsButtons}
            </div>

            <div className="tempThermo">
                <p className="thermoText">{currentTemp}</p>
            </div>

            <div className="buttonsThermo">
                {Buttons}
            </div>
        </div>
    );
}

export default Thermo;