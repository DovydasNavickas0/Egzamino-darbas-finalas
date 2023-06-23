import { signInWithEmailAndPassword } from "firebase/auth"
import { ref, update } from "firebase/database"

import { Form, Button } from "react-bootstrap"

import { useState } from "react"

import { NavLink } from "react-router-dom"

import { useNavigate } from "react-router-dom"

const Login = ({auth, db}) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const nav = useNavigate()

    const userLogin = async() => {

        if( email === "" || password === "" ){
            alert("Please fill in all the fields")
        }

        signInWithEmailAndPassword(auth, email, password).then((userCredentials) => {
            const user = userCredentials.user
            const loginTime = new Date();

            update(ref(db, "users/" + user.uid),{
                last_login: loginTime
            }).then(
                nav("/")
            )
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
            <Button style={{margin: "20px"}} onClick={userLogin}>Sign In</Button>
            <p style={{paddingBottom: "20px"}}>Don't have an account? You can allways <NavLink to="/register">register</NavLink>.</p>
        </Form>
    )
}

export default Login