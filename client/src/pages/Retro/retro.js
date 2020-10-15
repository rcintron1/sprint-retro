import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import io from 'socket.io-client'
import RetroBody from "../../components/RetroBody"


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
const count = {
  count : 0
}

Object.defineProperty(count, "num", {
  get: function() {
      this.count = this.count +1
      return this.count;
  }
});
let socket
const Retro = ()=>{


  const [sessionID, setSessionID] = useState({})
  const [sessionData, setSessionData] = useState([])

  const socket_connect = function (room) {
    return io('localhost:3000', {
        query: 'r_var='+room
    });
  }
   
  
  if (!socket){
    console.log(!socket, sessionID)
    if ("session" in sessionID){
      // socket=io()
      // socket.on('event', (data) => {
      //   console.log("Event", data);
      // })
      socket = socket_connect(sessionID.session);
      socket.on('chat message', (data) =>{
        console.log("Chat", data)
      })
    }
  }

  useEffect(()=>{
    console.log("sessionData=> ",sessionData)
    if ("session" in sessionData){
      socket.emit('chat message', sessionData)
    }
    
  },[sessionData])

  return(
    <React.Fragment>
    {console.log("rerendered: ",count.num) }
    {"session" in sessionID?<RetroBody session={sessionID} data={sessionData} setData={setSessionData}/>:<RetroStartForm setSession={setSessionID}/>}
    
    </React.Fragment>
  )
}

export default Retro;
