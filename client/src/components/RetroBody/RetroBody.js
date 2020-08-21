import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import RetroCard from '../RetroCard/RetroCard'
import RetroCardRead from '../RetroCard/RetroCardRead'
import VerticalButtonGroup from '../VerticalButtonGtroup'
import {sendMessage, socket_connect} from '../../utils/Socket'

const RetroBody = (props)=> {

    const [retroStart, setRetroStart] = useState([])
    const [retroStop, setRetroStop] = useState([])
    const [retroContinue, setRetroContinue] = useState([])
    const [retroStartRead, setRetroStartRead] = useState([])
    const [retroStopRead, setRetroStopRead] = useState([])
    const [retroContinueRead, setRetroContinueRead] = useState([])
    const [guestData, setGuestData] = useState([])
    
    useEffect(()=>{
      console.log(msg)
      const msg = {session:props.session, retroStart, retroStop, retroContinue}
      console.log("RetroBody->useEffect",msg)
      msg.session && sendMessage(props.session, msg)
    },[retroStart, retroStop, retroContinue])
    
    return(
    
      <Container><Row>
        <Col sm="3">
          <VerticalButtonGroup session={props.session} user={props.user}/>
        </Col>
        <Col sm="9">
        <Card >
          <Card.Header>Unread</Card.Header>        
            <Card.Body>
            <Row>
              <Col xs={4} id="retroStart">{RetroCard({
                name:"Start Doing",
                texts:retroStart,
                set_text:setRetroStart,
                session:props.session})}</Col>
              <Col xs={4} id="retroStop">{RetroCard({
                name:"Stop Doing",
                texts:retroStop,
                set_text:setRetroStop,
                sesion:props.session})}</Col>
              <Col xs={4} id="retroCont">{RetroCard({
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
            <Col>{RetroCardRead({name:"To Do", texts:retroStartRead, set_text:setRetroStartRead})}</Col>
            <Col>{RetroCardRead({name:"Stop Doing", texts:retroStopRead, set_text:setRetroStopRead})}</Col>
            <Col>{RetroCardRead({name:"Continue Doing", texts:retroContinueRead, set_text:setRetroContinueRead})}</Col>
            </Row>
            </Card.Body>
        </Card>
        </Col>
        </Row>
      </Container>
    )
  }

  export default RetroBody