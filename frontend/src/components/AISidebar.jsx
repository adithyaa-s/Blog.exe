import Card from "react-bootstrap/Card";
import FormInput from "./FormInput";
import { useState } from "react";
import axios from "axios";

export default function AISidebar() {
    const [reply,showReply] = useState("");
    const [input, setInput] = useState();
    const handleReply = async () =>{
        try {
            console.log("input: ",input)
            const response = await axios.post(
                `${import.meta.env.VITE_AI_API}/ask`,
                {question: input},
            )
            console.log(response.data);
            showReply(response);
        } catch (error) {
            console.log(error)
        }
    }
    return (
    <Card style={{ width: "50vh", height: "82vh", position: "fixed"}}>
      <Card.Body>
        <Card.Title className="text-center">Ask Sam</Card.Title>
        <br />
        <Card.Subtitle className="mb-2 mt-2 text-muted text-center">
          Feel free to ask Sam, about anything!{" "}
        </Card.Subtitle>
        <br />
        <div style={{overflowY:"auto", height:"50vh", textAlign:"center"}}>
            {reply?.data}
        </div>
      </Card.Body>
      <Card.Footer>
        <FormInput handleReply={handleReply} input={input} setInput={setInput}/>
      </Card.Footer>
    </Card>
  );
}
