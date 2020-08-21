import React, {useState} from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import Badge from 'react-bootstrap/Badge'

const RetroCard = (props)=>{
  const [txtBoxValue, setTxtBoxValue] = useState("")
  const add_button=(e)=>{
    
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

export default RetroCard