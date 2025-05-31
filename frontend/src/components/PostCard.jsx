import { Card, Button } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
export default function PostCard({ postObject }) {
  const { id, heading, author, content, imageUrl, likes } = postObject;
  console.log(id, heading, author, content, imageUrl, likes)
  // console.log(postObject)
  const [like, setLike] = useState(postObject.likedByCurrentUser);
  const [likeCount, setLikeCount] = useState(parseInt(likes.length));
  const handleLike = async () => {
    if (!like) {
      setLike(true);
      setLikeCount((prev) => prev + 1);
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/posts/${id}/like`,
        {},
        {
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
    } else {
      setLike(false);
      setLikeCount((prev) => prev - 1);
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/posts/${id}/like`,
        {
          headers:{
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
    }
  };
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header>
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="mb-0">{heading}</h5>
          <span className="text-muted">@{author.username}</span>
        </div>
      </Card.Header>
      {imageUrl?.match(/\.(mp4|webm|ogg)$/i) ? (
        <video
          className="w-100"
          controls
          src={imageUrl}
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      ) : (
        <img
          src={imageUrl}
          alt="Post media"
          className="w-100"
          style={{ maxHeight: "400px", objectFit: "cover" }}
        />
      )}

      <Card.Body>
        <Card.Text>{content}</Card.Text>
        <div className="d-flex justify-content-between">
          {" "}
          <Button
            variant={like ? "danger" : "outline-danger"}
            onClick={handleLike}
          >
            Like : {likeCount}
          </Button>{" "}
          <Button variant="outline-secondary">Comment</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
