import Sidebar from "./Sidebar"
import Navbar from "./Navbar";
import {React, useState, useEffect} from "react"
import PostCard from "./PostCard";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Cookies from "js-cookie";


export default function FeedPage() {
    console.log("Feedpage")
    const [showSidebar, setShowSidebar] = useState(false);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    // const handleOpen = () => {setShowSidebar(true)};
    const handleClose = () => {setShowSidebar(false)};
    
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_API}/posts/getPosts`,
                    {
                        headers: {
                            "Authorization": `Bearer ${Cookies.get("token")}`
                        },
                    }
                );
                if (response.status === 403) {
                    navigate("/");
                }
                setPosts(response.data || []);
            } catch (error) {
                console.log("Error in Fetching Posts", error);
                if (error.response?.status === 401 || error.response?.status === 403) {
                    navigate("/");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, [navigate]);

    const PostSkeleton = () => (
        <div className="mb-4">
            {/* <Skeleton height={50} /> */}
            <Skeleton height={500} />
            {/* <Skeleton height={100} /> */}
            {/* <Skeleton height={40} width={200} /> */}
        </div>
    );

    return (
        <div>
            <Sidebar show={showSidebar} handleClose={handleClose}/>
            <Container style={{width:"100%"}} className="mt-4">
                <Row style={{width:"100%"}}>
                    <Col lg={3} className="side-feed"></Col>
                    <Col lg={6} className="main-feed">
                        <div>
                            {isLoading ? (
                                <>
                                    <PostSkeleton />
                                    <PostSkeleton />
                                    <PostSkeleton />
                                </>
                            ) : posts.length > 0 ? (
                                posts.map((post, index) => (
                                    <PostCard key={post.id || index} postObject={post} />
                                ))
                            ) : (
                                <p className="text-center">No Posts :(</p>
                            )}
                        </div>
                    </Col>
                    <Col lg={3} className="side-feed"></Col>
                </Row>    
            </Container>  
        </div>
    )
}