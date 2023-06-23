import { ref, get } from "firebase/database"

import { Button } from "react-bootstrap"

import Card from 'react-bootstrap/Card'

import { useState, useEffect } from "react"


const Home = ({auth, db}) => {

    const [events, setEvents] = useState()
    const [bypass, setBypass] = useState(0)

    useEffect(()=>{
        console.log("active")
        get(ref(db, "Events/")).then((snapshot) => {
            console.log(snapshot.val())
            setEvents(snapshot.val())
            setBypass(1)
        }).catch((error)=>{
            console.log(error.message)
        })
    }, [])

    if(bypass === 0){
        return(
            <div>
                <p>There are no events at the momment</p>
            </div>
        )
    }
    else{
        return(
            <div style={{paddingTop: "4%", margin: "2%"}}>
                {
                    Object.keys(events).map((item, index)=>{
                        return(
                            <Card style={{ width: '20rem' }} key={index}>
                                <Card.Img src={events[item].ImgLink} variant="top" alt="stuff" />
                                <Card.Body>
                                    <Card.Title>{events[item].Title}</Card.Title>
                                    <Card.Text>{events[item].Description}</Card.Text>
                                    <Card.Text>{events[item].Category}</Card.Text>
                                    <Card.Text>{events[item].StartDate}</Card.Text>
                                    <Button>Favorite</Button>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </div>
        )
    }
}

export default Home