import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Accordion from 'react-bootstrap/Accordion'
import CardDeck from 'react-bootstrap/CardDeck'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'

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

export default  RetroCardRead