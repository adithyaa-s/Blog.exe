import {React} from "react";
import { Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CreatePost from "./CreatePost";

export default function Sidebar({show, handleClose}){
    const navigate = useNavigate();
    const handleLogout = () =>{
        Cookies.remove("token");
        navigate("/");
    }
    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement="start">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>More</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <p>Item 1</p>
                <p>Item 2</p>
                <CreatePost />
            </Offcanvas.Body>
            <div className = "d-flex align-items-end">
                <button className="m-3" onClick={handleLogout}>Logout</button>
            </div>
            </Offcanvas>
        </div>
    )
}
