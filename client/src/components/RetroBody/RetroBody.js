import React, {useState, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Accordion from 'react-bootstrap/Accordion'

const RetroCardRead = (props)=>{
  
  return(
    <Card sm={12}>
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


const RetroVerticalButtonGroup = (props)=>{
  // console.log(props)
  return(
    <ButtonGroup  vertical>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">Session Info</Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <b>Name:</b>{props.session.name}<br/>
              <b>Session ID:</b> {props.session.session}
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="1">
              Click me!
              </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>Hello! I'm another body</Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </ButtonGroup>
  )
}

const RetroCard = (props)=>{
  const [txtBoxValue, setTxtBoxValue] = useState("")
  const add_button=(e)=>{
    e.preventDefault()
    props.set_text([...props.texts, {user:props.session.name, text:txtBoxValue}])
    setTxtBoxValue("")

  }
  const rem_button=(e, id)=>{
    e.preventDefault();
    const retVal = props.texts.filter((x,i)=>i!==id)
    props.set_text(retVal)
  }

  return(
    <Card sm={12}>
    <Card.Body>
      <Card.Header>{props.name}</Card.Header>
      
        <Form.Control as="textarea" onChange={e=>setTxtBoxValue(e.target.value)} value={txtBoxValue} rows="3" />
        <Button variant="primary" onClick={add_button}>Add</Button>
        <Table striped bordered hover>
          <tbody>
          {props.texts.map((text,id)=>
            <tr key={id}>
              <td><Badge variant="info">{text.user}</Badge><br/>{text.text}<Button variant="link" onClick={(e)=>{rem_button(e, id)}}>x</Button></td>
            </tr>)}
          </tbody>
        </Table>
      
      
    </Card.Body>
  </Card>
  )
}



const RetroBody = (props)=> {
  const [retroStart, setRetroStart] = useState([])
  const [retroStop, setRetroStop] = useState([])
  const [retroContinue, setRetroContinue] = useState([])
  const [retroStartRead, setRetroStartRead] = useState([])
  const [retroStopRead, setRetroStopRead] = useState([])
  const [retroContinueRead, setRetroContinueRead] = useState([])
  
  useEffect(()=>{
    const msg = {session:props.session, retroStart, retroStop, retroContinue}
    msg.session.session&&props.setData(msg)
  },[retroStart, retroStop, retroContinue])
  
  return(
  
    <Container><Row>
      <Col sm="3">
        <RetroVerticalButtonGroup session={props.session}/>
      </Col>
      <Col sm="9">
      <Card >
        <h2>Name: {props.session.name} Session ID: {props.session.session}</h2>
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