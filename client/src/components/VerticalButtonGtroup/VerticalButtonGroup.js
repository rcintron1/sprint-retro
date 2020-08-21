import React, {useState, useEffect} from 'react'
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
import RetroCard from '../RetroCard'

const VerticalButtonGroup = (props)=>{
  return(
    <ButtonGroup  vertical>
      <Accordion defaultActiveKey="0">
        <Card>
          <Card.Header>
            <Accordion.Toggle as={Button} variant="link" eventKey="0">Session Info</Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <b>Name:</b> {props.user}<br/>
              <b>Session ID:</b> {props.session}
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
export default VerticalButtonGroup