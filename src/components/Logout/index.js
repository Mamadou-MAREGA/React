import React, {useState, useEffect, useContext} from 'react';
import { FirebaseContext} from '../Firebase';
import ReactTooltip from "react-tooltip";

const Logout = () => {

    const [checked, setChecked] = useState(false);
    
    const firebase = useContext(FirebaseContext);

    useEffect(() => {

        if(checked){
           
            // Déconnexion
            firebase.signoutUser();
        }
    }, [checked,firebase]);

    const handleChange = event =>{
        setChecked(event.target.checked);
    }

    return (

        <div className="logoutContainer">
            <label className="switch">
                <input
                    onChange={handleChange}
                    type="checkbox"
                    checked={checked}
                />
                <span className="slider round" data-tip="Déconnexion"></span>
                <ReactTooltip  place="left" type="dark" effect="solid"/>
            </label>
        </div>
    )
}

export default Logout
