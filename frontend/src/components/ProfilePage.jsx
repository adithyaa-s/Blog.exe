import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import CDSpin from "./CDSpin";
import { useEffect, useState } from "react";
// import './ProfilePage.css';
import axios from "axios"
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import ProfileImage from "./ProfileImage";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const { id } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const [user, setUser] = useState({username: null, name: null, posts: null, followers: null, following: null, profileImageUrl: null});

  useEffect(() => {
    const getPage = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/user/${id}`
        );
        console.log(response.data.userDetails)
        setUser(response.data.userDetails);
      } catch (error) {
        console.log(error)
      }
    }
    getPage();
  },[]);

  const handleOpen = () => {
    setShowSidebar(true);
  };
  const handleClose = () => {
    setShowSidebar(false);
  };

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <Row style={{ width: "100%" }}>
        <Col md={4} lg={3} className="d-flex flex-column justify-content-center align-items-center gap-3 p-5">
          <ProfileImage profileImageUrl={user.profileImageUrl} />
          <h5>@{user.username}</h5>
        </Col>
        <Col md={4} lg={6} className="align-items-center p-5">
          <div className="d-flex flex-column justify-content-center">
            <div className="text-center">
              <h1>{user.name}</h1>
            </div>
            <div className="d-flex justify-content-around mt-5">
              <h5>Followers: {user.followers?.length || 0}</h5>
              <h5>Following: {user.following?.length || 0}</h5>
            </div>
          </div>
          <div className="mt-5 text-center">
            <p>Interests: Music, Sports, Coding</p>
            <p>Fav Artists: Harris Jayaraj</p>
            <p>Fav Ride: Porsche 911</p>
          </div>
        </Col>
        <Col md={4} lg={3} className="d-flex gap-3 flex-column justify-content-center align-items-center p-5">
          <CDSpin />
          <h5>Playing Now:</h5>
          <i>🎵 Irunga Bhai</i>
        </Col>
      </Row>
    </Container>
  );
  
}
