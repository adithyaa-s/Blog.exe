import {React} from "react";
import { Offcanvas } from "react-bootstrap";

export default function Sidebar({show, handleClose}){
    return (
        <div>
            <Offcanvas show={show} onHide={handleClose} placement="start">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Sidebar</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <p>Item 1</p>
                <p>Item 2</p>
            </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}
