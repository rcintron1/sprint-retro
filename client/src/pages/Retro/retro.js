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

const socket = io()
socket.on('event', (data) => {
  console.log("Event", data);
});
const retroCard = (props)=>{
  const [txtBoxValue, setTxtBoxValue] = useState("")
  const add_button=(e)=>{
    
    props.set_text([...props.texts, txtBoxValue])
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
    { /* <Card.Img variant="top" src="holder.js/100px180" /> */ }
    <Card.Body>
      <Card.Header>{props.name}</Card.Header>
      
        <Form.Control as="textarea" onChange={e=>setTxtBoxValue(e.target.value)} value={txtBoxValue} rows="3" />
        <Button variant="primary" onClick={add_button}>Add</Button>
        <Table striped bordered hover>
          <tbody>
          {props.texts.map((text,id)=>
            <tr key={id}>
              <td>{text}</td>
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
  const buttonClick = (e)=>{
    e.preventDefault()
    console.log(session)
    const tmpSessionId= Date.now()
    e.target.value==="Existing"?props.setSession(session):props.setSession(Date.now(tmpSessionId))
  }
  return(
  <Container sm="4">
    <Form >
      <Row>
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
  const [retroStart, setRetroStart] = useState([])
  const [retroStop, setRetroStop] = useState([])
  const [retroContinue, setRetroContinue] = useState([])
  const [retroStartRead, setRetroStartRead] = useState([])
  const [retroStopRead, setRetroStopRead] = useState([])
  const [retroContinueRead, setRetroContinueRead] = useState([])

  // const socket = io()
  useEffect(()=>{
    socket.emit('chat message',retroStart);
  },[retroStart])

  
  return(
  
    <Container>
      <Card >
        <h1>{props.session}</h1>
        <Card.Header>Unread</Card.Header>        
          <Card.Body>
          <Row>
            <Col>{retroCard({name:"Start Doing", texts:retroStart, set_text:setRetroStart})}</Col>
            <Col>{retroCard({name:"Stop Doing", texts:retroStop, set_text:setRetroStop})}</Col>
            <Col>{retroCard({name:"Continue Doing", texts:retroContinue, set_text:setRetroContinue})}</Col>
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
  const [sessionID, setSessionID] = useState()


  return(
    <React.Fragment>
    {sessionID?<RetroBody session={sessionID} />:<RetroStartForm setSession={setSessionID}/>}
    
    </React.Fragment>
  )
}

export default Retro;
