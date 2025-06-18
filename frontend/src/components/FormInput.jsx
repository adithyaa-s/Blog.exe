import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useState } from "react";

export default function FormInput({ handleReply, input, setInput }) {
    const handleSubmit = () => {
        if (input.trim()) {
            handleReply(input);
            setTimeout(()=>{setInput("")},2000); // Clear input after submission
        } else {
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="How may I help You"
                    aria-label="Ask"
                    aria-describedby="basic-addon2"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value);
                    }}
                    onKeyPress={handleKeyPress}
                />
                <Button 
                    className=" " 
                    variant="outline-secondary" 
                    id="button-addon2" 
                    onClick={handleSubmit}
                >
                    Ask
                </Button>
            </InputGroup>
        </>
    );
}
