import Sidebar from "./Sidebar"
import Navbar from "./Navbar";
import {React, useState, useEffect} from "react"
import PostCard from "./PostCard";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FeedPage() {
    console.log("Feedpage")
    const [showSidebar, setShowSidebar] = useState(false);
    const [posts,setPosts] = useState([]);
    const navigate = useNavigate();
    // const handleOpen = () => {setShowSidebar(true)};
    const handleClose = () => {setShowSidebar(false)};
    
    useEffect(()=>{
        const fetchPosts = async () =>{
            try{
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_API}/posts/getPosts`,
                {
                    headers:{
                        "Authorization":`Bearer ${localStorage.getItem("token")}`
                    },
                }
            );
            if(response.status == 403){
                navigate("/");
            }
            console.log(response)
           setPosts(response.data || []);
        }catch(error){
        console.log("Error in Fetching Posts", error);
    };
}
    fetchPosts();
    },[])

    return (
        <div>
            <Sidebar show={showSidebar} handleClose={handleClose}/>
            <Container style={{width:"100%"}} className="mt-4">
                <Row style={{width:"100%"}}>
                    <Col lg={3} className="side-feed"></Col>
                    <Col lg={6} className="main-feed">
                        <div>
                            {posts.length>0 ? (
                                posts.map((post,index)=>(
                                    // const postObject = {}
                                    <PostCard key={index} postObject={post} />
                                ))
                            ):<p className="justify-content-center">No Posts :{`(`}</p>}
                        </div>
                    </Col>
                    <Col lg={3} className="side-feed"></Col>
                </Row>    
            </Container>  
        </div>
    )
}