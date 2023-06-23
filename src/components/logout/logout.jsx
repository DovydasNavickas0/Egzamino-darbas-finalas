

import { firebaseConfig } from "../../firebase.js";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth"

import "./logout.css"

const Logout = ({userActive}) => {

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    const activate = async() => {
        signOut(auth).then(()=>{
            console.log("Logout succesfull")
        }).catch((error)=>{
            const errorMessage = error.message;
            console.log(errorMessage)
        })
    }

    if(userActive === true){
        return(
            <button className="logoutbtn" onClick={activate}>Logout</button>
        )
    }
    else if(userActive === false){
        
    }
}

export default Logout