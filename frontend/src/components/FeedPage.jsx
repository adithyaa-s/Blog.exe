import Sidebar from "./Sidebar"
import Navbar from "./Navbar";
import {React, useState} from "react"
import PostCard from "./PostCard";
import { Container, Row, Col } from "react-bootstrap";

export default function FeedPage() {
    const [showSidebar, setShowSidebar] = useState(false);
    const handleOpen = () => {setShowSidebar(true)};
    const handleClose = () => {setShowSidebar(false)};

    return (
        <div>
            {/* <Navbar handleOpen={handleOpen}/> */}
            {/* Bottom Section of Feed */}
            <Sidebar show={showSidebar} handleClose={handleClose}/>
            <Container style={{width:"100%"}} className="mt-4">
                <Row style={{width:"100%"}}>
                    <Col lg={3} className="side-feed"></Col>
                    <Col lg={6} className="main-feed">
                        <div>
                            <PostCard />
                            <PostCard />
                            <PostCard />
                            <PostCard />
                        </div>
                    </Col>
                    <Col lg={3} className="side-feed"></Col>
                </Row>    
            </Container>  
        </div>
    )
}