import {React} from "react";
import { Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CreatePost from "./CreatePost";
import { useState, useEffect } from "react";
import AISidebar from "./AISidebar";

export default function Sidebar({show, handleClose}){
    const [isMobile, setIsMobile] = useState(false);

    useEffect(()=>{
        const handleResize = () =>{
            setIsMobile(window.innerWidth<768)
        };
        handleResize();
        window.addEventListener("resize",handleResize);
        return () => window.removeEventListener("resize", handleResize);
    },[]);

    const navigate = useNavigate();
    const handleLogout = () =>{
        Cookies.remove("token");
        navigate("/");
    }
    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement="start" className={isMobile ? "sidebar-mobile" : "sidebar-desktop"}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>More</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <p>Item 1</p>
                <CreatePost />
                {isMobile && <AISidebar />}

            </Offcanvas.Body>
            <div className = "d-flex align-items-end">
                <button className="m-3" onClick={handleLogout}>Logout</button>
            </div>
            </Offcanvas>
        </div>
    )
}
