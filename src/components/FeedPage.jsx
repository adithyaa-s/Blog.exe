import Sidebar from "./Sidebar"
import {React, useState} from "react"
import PostCard from "./PostCard";
import { Container, Row, Col } from "react-bootstrap";

export default function FeedPage() {
    const [showSidebar, setShowSidebar] = useState(false);
    const handleOpen = () => {setShowSidebar(true)};
    const handleClose = () => {setShowSidebar(false)};

    return (
        <div>
            <div className="container-fluid py-3 border">
                <div className="row align-items-center">
                    <div className="col-4 text-start">
                        <h1 style={{cursor: "pointer"}} onClick={handleOpen}>More</h1>
                    </div>
                    <div className="col-4 text-center">
                        <h1 className="m-0">Blog.exe</h1>
                    </div>
                    <div className="col-4">
                        <h1 className="px-0 text-end">Your Profile</h1>
                    </div>
                </div>
            </div>
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