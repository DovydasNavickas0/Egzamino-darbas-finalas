import "./header.css"

import { NavLink } from "react-router-dom"

import Logout from "../logout/logout"

const Header = ({userActive}) => {



    return(
        <nav style={{display: "flex", backgroundColor: "#464646", flexDirection: "row", padding: "5px"}} fixed="top">
            <div  style={{margin: "20px", marginRight: "80.3%",}}> 
                <NavLink to="/" className="navButton title" >Home</NavLink>
                <NavLink to="eventcreator&etc" className="navButton">YourEvents</NavLink>
                <NavLink to="favpage" className="navButton">Favourites</NavLink>
            </div>
            <div style={{margin: "20px", }}>
                <NavLink to="login" className="navButton accountbtn">Login</NavLink>
                <Logout userActive={userActive}/>
            </div>
        </nav>
    )
}

export default Header

//<NavLink to="register" className="navButton accountbtn">Register</NavLink>