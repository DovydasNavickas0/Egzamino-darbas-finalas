import { createUserWithEmailAndPassword } from "firebase/auth"
import { ref, set } from "firebase/database"

import { useState } from "react"

import { Form, Button } from "react-bootstrap"

import { NavLink } from "react-router-dom"

import { useNavigate } from "react-router-dom"

const Register = ({auth, db}) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [username, setUsername] = useState()

    const nav = useNavigate()

    const userRegister = async() => {


        if( email === "" || password === "" || username === "" || password > 6){
            alert("Please fill in all the fields")
        }

        createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            const user = userCredentials.user
            const loginTime = new Date();

            set(ref(db, "users/" + user.uid),{
                user_email: email,
                username: username,
                roll: "user",
                last_login: loginTime
            }).then(nav("/"))
            .catch((error)=>{
                console.log(error.message)
            })

        }).catch((error)=>{
            console.log(error.message)
        })

    }

    return(
        <Form style={{backgroundColor: "#cccac9", width: "40%", margin: "auto", alignItems: "center", textAlign: "center", marginTop: '20%', borderRadius: "10px"}}>
        <Form.Group style={{ textAlign: "center", padding: "20px"}}>
            <Form.Control
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group style={{ textAlign: "center", padding: "20px"}}>
            <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group style={{ textAlign: "center", padding: "20px"}}>
            <Form.Control
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}></Form.Control>
        </Form.Group>
        <Button variant="outline-dark" style={{margin: "20px"}} onClick={userRegister}>Register</Button>
        <p style={{paddingBottom: "20px"}}>If you already have an account <NavLink to="/Login">click here</NavLink>.</p>
    </Form>
    )
}

export default Register