import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";
import axios from "axios";

export default function FormInput({handleReply, input, setInput}) {
//   const handleAddTask = async (description) =>{
//     try {
//       const response = await axios.post(
//         "http://localhost:8000/addTask",
//         {description}
//       );
//     } catch (error) {
//       console.log("Error");
//     }
//   }
  return (
    <>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="How may I help You"
          aria-label="Ask"
          aria-describedby="basic-addon2"
          value={input}
          onChange={((e)=>{
            setInput(e.target.value);
          })}
        />
        <Button className=" " variant="outline-secondary" id="button-addon2" 
        onClick={()=>{
            console.log("Clicked");
          handleReply()
        //   addtask((task)=>[...task, input])
        }}
        >
          Ask
        </Button>
      </InputGroup>
    </>
  );
}
