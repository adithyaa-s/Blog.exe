import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { React, useState, useEffect } from "react";
import PostCard from "./PostCard";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Cookies from "js-cookie";
import AISidebar from "./AISidebar";
import PaginationBar from "./PaginationBar";

export default function FeedPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5); // Number of posts per page
  const [totalRecords, setTotalRecords] = useState(0);

  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setShowSidebar(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/posts/getPosts`,
          {
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
            params: {
              page: currentPage,
              limit: recordsPerPage,
            },
          }
        );

        if (response.status === 403) {
          navigate("/");
        }

        const { posts, total } = response.data; // Assuming backend sends { posts: [], total: number }

        setPosts(posts || []);
        setTotalRecords(total || 0);
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
  }, [navigate, currentPage, recordsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const PostSkeleton = () => (
    <div className="mb-4">
      <Skeleton height={500} />
    </div>
  );

  return (
    <div>
      <Sidebar show={showSidebar} handleClose={handleClose} />
      <Container style={{ width: "100%" }} className="mt-4">
        <Row style={{ width: "100%" }}>
          <Col lg={8} className="main-feed">
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
                <div className="d-flex justify-content-center align-items-center">
                  <p className="text-center">No Posts :(</p>
                </div>
              )}
            </div>
          </Col>
          {!isMobile && (
            <Col lg={4} className="side-feed">
              <AISidebar />
            </Col>
          )}
        </Row>

        <div className="d-flex justify-content-center">
          <PaginationBar
            totalRecords={totalRecords}
            recordsPerPage={recordsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </Container>
    </div>
  );
}
