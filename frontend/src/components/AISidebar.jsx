import Card from "react-bootstrap/Card";
import FormInput from "./FormInput";
import { useState } from "react";
import axios from "axios";

export default function AISidebar() {
    const [reply, setReply] = useState("");
    const [input, setInput] = useState("");
    
    const handleReply = async (input) => {
        try {
            console.log("=== AI SIDEBAR DEBUG ===");
            console.log("input: ", input);
            console.log("API URL:", `${import.meta.env.VITE_AI_API}/ask`);
            console.log("Environment variable value:", import.meta.env.VITE_AI_API);
            
            if (!input.trim()) {
                console.log("No input provided");
                return;
            }
            
            console.log("Making axios request...");
            const response = await axios.post(
                `${import.meta.env.VITE_AI_API}/ask`,
                { question: input },
            );
            console.log("Response received:", response.data);
            setReply(response.data);
        } catch (error) {
            console.log("=== ERROR DETAILS ===");
            console.log("Error object:", error);
            console.log("Error message:", error.message);
            console.log("Error response:", error.response);
            console.log("Error status:", error.response?.status);
            console.log("Error data:", error.response?.data);
            console.log("Network error:", error.code);
            
            if (error.code === 'NETWORK_ERROR') {
                setReply("Network error - please check your connection");
            } else if (error.response?.status === 404) {
                setReply("Service not found - check if AI service is running");
            } else if (error.response?.status === 500) {
                setReply("Server error - please try again later");
            } else {
                setReply("Sorry, I couldn't process your request.");
            }
        }
    };
    
    return (
        <Card className="ai-sidebar">
            <Card.Body>
                <Card.Title className="text-center">Ask Sam</Card.Title>
                <br />
                <Card.Subtitle className="mb-2 mt-2 text-muted text-center">
                    Feel free to ask Sam, about anything!{" "}
                </Card.Subtitle>
                <br />
                <div className="ai-reply-box">
                    {reply}
                </div>
            </Card.Body>
            <Card.Footer>
                <FormInput 
                    handleReply={handleReply} 
                    input={input} 
                    setInput={setInput}
                />
            </Card.Footer>
        </Card>
    );
}
