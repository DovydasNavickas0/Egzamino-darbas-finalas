import { firebaseConfig } from "./firebase.js";
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth"

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from "react";

import Home from "./components/home.jsx";
import Header from "./components/Header/header.jsx";
import Register from "./components/register.jsx";
import Login from "./components/login.jsx";
import EventCreatorEtc from "./components/eventCreator&etc.jsx";
import FavPage from "./components/favPage.jsx";

function App() {

    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)
    const db = getDatabase(app)

    const [userActive, setUserActive] = useState(false)

    onAuthStateChanged(auth, (user) => {
        if(user){
            console.log("user is active")
            setUserActive(true)
        }
        else{
            console.log("user is inactive")
            setUserActive(false)
        }
    })

  return (
    
    <BrowserRouter>
    <Header userActive={userActive}/>
        <Routes>
            <Route index element={<Home auth={auth} db={db}/>} />
            <Route path="register" element={<Register auth={auth} db={db}/>} />
            <Route path="login" element={<Login auth={auth} db={db}/>} ></Route>
            <Route path="eventcreator&etc" element={<EventCreatorEtc auth={auth} db={db}/>} />
            <Route path="favpage" element={<FavPage auth={auth} db={db}/>} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
