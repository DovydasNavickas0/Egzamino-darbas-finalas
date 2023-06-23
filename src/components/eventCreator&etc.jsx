
import { Form, Button, Card } from "react-bootstrap"
import { useState, useEffect } from "react"

import { push, get, update, remove, ref } from "firebase/database"


const EventCreatorEtc = ({auth, db}) => {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [photo, setPhoto] = useState("")
    const [date, setDate] = useState("")

    const [events, setEvents] = useState({})

    useEffect(()=>{
        console.log("active")
        get(ref(db, "Events/")).then((snapshot) => {
            console.log(snapshot.val())
            setEvents(snapshot.val())
        }).catch((error)=>{
            console.log(error.message)
        })
    }, [])

    const createEvent = async() => {

        const user = auth.currentUser
        const uid = user.uid

        if(title === "" || description === "" || category === "" || photo === "" || date === ""){
            alert("Fill in all the fields")
            return
        }

        push(ref(db, "Events/"),{
            User: uid,
            Title: title,
            Description: description,
            Category: category,
            ImgLink: photo,
            StartDate: date
        }).catch((error)=>{console.log(error.message)});

    }

    const deletion = async(id) =>{

        remove(ref(db, "Events/" + id)).then(alert("Event deleted"))
        
        .catch((error)=>{
            console.log(error.message)
        })
    }

    const updater = async(id) => {

        update(ref(db, "Events/" + id),{
            Title: title,
            Description: description,
            Category: category,
            ImgLink: photo,
            StartDate: date
        }).then(alert("event updated")).catch((error)=>{
            console.log(error.message)
        })
        
    }

    return(
        <div>
             <Form style={{backgroundColor: "#cccac9", width: "80%", margin: "auto", alignItems: "center", textAlign: "center", marginTop: '5%', borderRadius: "10px"}}>
        <Form.Group style={{ textAlign: "center", padding: "20px"}}>
            <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group style={{ textAlign: "center", padding: "20px"}}>
            <Form.Control
            type="textbox"
            placeholder="Enter description"
            value={description}
            onChange={(e)=>{setDescription(e.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group style={{ textAlign: "center", padding: "20px"}}>
            <Form.Control
            type="text"
            placeholder="Enter the category"
            value={category}
            onChange={(e)=>{setCategory(e.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group style={{ textAlign: "center", padding: "20px"}}>
            <Form.Control
            type="text"
            placeholder="Enter image link"
            value={photo}
            onChange={(e)=>{setPhoto(e.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group style={{ textAlign: "center", padding: "20px"}}>
            <Form.Control
            type="date"
            placeholder="Enter the date"
            value={date}
            onChange={(e)=>{setDate(e.target.value)}}></Form.Control>
        </Form.Group>
        <Button variant="outline-dark" style={{margin: "20px"}} onClick={createEvent}>Create</Button>
        </Form>


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
                                    <Button onClick={()=>{deletion(item)}}>Delete</Button>
                                    <Button>Update</Button>
                                </Card.Body>
                            </Card>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default EventCreatorEtc