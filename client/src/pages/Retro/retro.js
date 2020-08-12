import React, { useState } from "react";
import API from "../../utils/API";
import Card from 'react-bootstrap/Card'
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
      <Card.Title>{props.name}</Card.Title>
      
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


const Retro = ()=> {
  const [retroTodo, setRetroTodo] = useState(["It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "])
  const [retroStop, setRetroStop] = useState([])
  const [retroContinue, setRetroContinue] = useState([])


  return(
  
    <Container>
      <Row>
        <Col>{retroCard({name:"To Do", texts:retroTodo, set_text:setRetroTodo})}</Col>
        <Col>{retroCard({name:"Stop Doing", texts:retroStop, set_text:setRetroStop})}</Col>
        <Col>{retroCard({name:"Continue Doing", texts:retroContinue, set_text:setRetroContinue})}</Col>
      </Row>
      <Row>
      <Col>{retroCard({name:"To Do", texts:retroTodo, set_text:setRetroTodo})}</Col>
      <Col>{retroCard({name:"To Do", texts:retroStop, set_text:setRetroStop})}</Col>
      <Col>{retroCard({name:"To Do", texts:retroContinue, set_text:setRetroContinue})}</Col>
      </Row>
    </Container>
  )
}

export default Retro;
