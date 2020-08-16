import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import io from 'socket.io-client'

// const socket = io()
// socket.on('event', (data) => {
//   console.log("Event", data);
// });

const retroCard = (props)=>{
  console.log(props)
  const [txtBoxValue, setTxtBoxValue] = useState("")
  const add_button=(e)=>{
    
    props.set_text([...props.texts, {user:props.session.name, text:txtBoxValue}])
    setTxtBoxValue("")

  }
  const rem_button=(e, id)=>{
    e.preventDefault();
    const retVal = props.texts.filter((x,i)=>i!==id)
    console.log(id)
    props.set_text(retVal)
  }

  return(
    <Card style={{ width: '18rem' }}>
    <Card.Body>
      <Card.Header>{props.name}</Card.Header>
      
        <Form.Control as="textarea" onChange={e=>setTxtBoxValue(e.target.value)} value={txtBoxValue} rows="3" />
        <Button variant="primary" onClick={add_button}>Add</Button>
        <Table striped bordered hover>
          <tbody>
          {props.texts.map((text,id)=>
            <tr key={id}>
              <td>{text.user}</td><td>{text.text}</td>
              <td><Button variant="link" onClick={(e)=>{rem_button(e, id)}}>x</Button></td>
            </tr>)}
          </tbody>
        </Table>
      
      
    </Card.Body>
  </Card>
  )
}

const retroCardRead = (props)=>{
  
  return(
    <Card style={{ width: '18rem' }}>
    { /* <Card.Img variant="top" src="holder.js/100px180" /> */ }
    <Card.Body>
      <Card.Title>{props.name}</Card.Title>
        <Table striped bordered hover>
          <tbody>
          {props.texts.map((text,id)=>
            <tr key={id}>
              <td>{text}</td>
              
            </tr>)}
          </tbody>
        </Table>
      
      
    </Card.Body>
  </Card>
  )
}

const RetroStartForm = (props) =>{
  const [session, setSession] = useState("")
  const [name, setName] = useState("")
  const buttonClick = (e)=>{
    e.preventDefault()
    console.log(session)
    const tmpSessionId= Date.now()
    e.target.value==="Existing"?props.setSession({name, session}):props.setSession({name, session:tmpSessionId})
  }
  return(
  <Container sm="4">
    <Form >
      <Row>
        <Col>
        <FormControl aria-describedby="basic-addon1" value={name}  onChange = {(e)=>setName(e.target.value)} placeholder="Your Name"/>
        </Col>
        <Col>
          <InputGroup  >
            <InputGroup.Prepend>
              <Button value="Existing" variant="secondary" onClick={buttonClick}>Join Session</Button>
            </InputGroup.Prepend>
            <FormControl aria-describedby="basic-addon1" value={session}  onChange = {(e)=>setSession(e.target.value)} placeholder="1234567"/>
          </InputGroup>
        </Col>
        <Col>
          <Button value="New" onClick={buttonClick}>New Session</Button>
        </Col>
      </Row>
      </Form>
  </Container>)
}



const RetroBody = (props)=> {
  const socket = props.messenger
  const [retroStart, setRetroStart] = useState([])
  const [retroStop, setRetroStop] = useState([])
  const [retroContinue, setRetroContinue] = useState([])
  const [retroStartRead, setRetroStartRead] = useState([])
  const [retroStopRead, setRetroStopRead] = useState([])
  const [retroContinueRead, setRetroContinueRead] = useState([])
  const [guestData, setGuestData] = useState([])
  
  useEffect(()=>{
    const msg = {session:props.session, retroStart, retroStop, retroContinue}
    msg.session.session&&props.messenger.emit('chat message', msg)
  },[retroStart, retroStop, retroContinue])
  
  return(
  
    <Container>
      <Card >
        <h2>Name: {props.session.name} Session ID: {props.session.session}</h2>
        <Card.Header>Unread</Card.Header>        
          <Card.Body>
          <Row>
            <Col>{retroCard({
              name:"Start Doing",
              texts:retroStart,
              set_text:setRetroStart,
              session:props.session})}</Col>
            <Col>{retroCard({
              name:"Stop Doing",
              texts:retroStop,
              set_text:setRetroStop,
              sesion:props.session})}</Col>
            <Col>{retroCard({
              name:"Continue Doing",
              texts:retroContinue,
              set_text:setRetroContinue,
              sesion:props.session})}</Col>
          </Row>
        </Card.Body>
      </Card>
      <Card >
        <Card.Header>Read</Card.Header>        
          <Card.Body>
          <Row>
          <Col>{retroCardRead({name:"To Do", texts:retroStartRead, set_text:setRetroStartRead})}</Col>
          <Col>{retroCardRead({name:"Stop Doing", texts:retroStopRead, set_text:setRetroStopRead})}</Col>
          <Col>{retroCardRead({name:"Continue Doing", texts:retroContinueRead, set_text:setRetroContinueRead})}</Col>
          </Row>
          </Card.Body>
      </Card>
    </Container>
  )
}
const Retro = ()=>{

  
  const [sessionID, setSessionID] = useState({})
  
  /**
   * The idea hear is to create 1 socket if you have a session ID
   * First check state for sessionID
   * Then check if socket has been set
   * lastly set an event when data is received
   */

  let socket
  if (!socket){
    console.log(!socket, sessionID)
    if ("session" in sessionID){
      socket=io()
      socket.on('event', (data) => {
        console.log("Event", data);
      })
    }
  }

  return(
    <React.Fragment>
    {console.log(sessionID)}
    {"session" in sessionID?<RetroBody session={sessionID} messenger={socket}/>:<RetroStartForm setSession={setSessionID}/>}
    
    </React.Fragment>
  )
}

export default Retro;
