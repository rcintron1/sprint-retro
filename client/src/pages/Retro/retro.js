import React, { useState } from "react";
import API from "../../utils/API";
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'


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
    {console.log(props)}
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
    {console.log(props)}
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
const Retro = ()=> {
  const [retroStart, setRetroStart] = useState([])
  const [retroStop, setRetroStop] = useState([])
  const [retroContinue, setRetroContinue] = useState([])
  const [retroStartRead, setRetroStartRead] = useState([])
  const [retroStopRead, setRetroStopRead] = useState([])
  const [retroContinueRead, setRetroContinueRead] = useState([])

  return(
  
    <Container>
      <Card >
        <Card.Header>Unread</Card.Header>        
          <Card.Body>
          <Row>
            <Col>{retroCard({name:"Start Doing", texts:retroStart, set_text:setRetroStartRead})}</Col>
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

export default Retro;
