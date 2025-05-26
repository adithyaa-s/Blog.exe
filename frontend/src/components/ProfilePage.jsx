import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./Navbar"
import Sidebar from "./Sidebar";
import CDSpin from "./CDSpin";
import { useState } from "react"
// import './ProfilePage.css';

export default function ProfilePage(){
    console.log("Profile")
    const [showSidebar, setShowSidebar] = useState(false);
    const handleOpen = () => {setShowSidebar(true)}
    const handleClose = () => {setShowSidebar(false)}
    
    return (
        <div>
            <Navbar handleOpen={handleOpen} />
            <Sidebar show={showSidebar} handleClose={handleClose} />

            <Container className="mt-5">
                <Row className="align-items-center">
                    {/* Profile Section */}
                    <Col lg={8} className="d-flex align-items-center">
                        <div className="profile-image-container">
                            <img 
                                src="/profilepic.png" 
                                alt="Profile"
                                className="profile-image"
                            />
                        </div>
                        <div className="profile-info ms-4">
                            <h3>@user</h3>
                            <h5>Followers: 12</h5>
                            <h5>Following: 27</h5>
                            <p className="mt-3">Web Developer | Tea Lover</p>
                        </div>
                    </Col>
                    
                    {/* CD Spin Section */}
                    <Col lg={4} className="d-flex flex-column align-items-center">
                        <CDSpin />
                        <div className="playing-now mt-3">
                            <p className="playing-text">Playing Now</p>
                            <p className="song-name">Your Favorite Song</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}