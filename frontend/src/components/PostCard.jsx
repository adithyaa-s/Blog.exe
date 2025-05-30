import { Card, Button } from "react-bootstrap";
import { useState } from "react";

export default function PostCard({
  heading,
  username,
  content,
  imageUrl,
  likes,
}) {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(parseInt(likes));
  const handleLike = () => {
    if (!like) {
      setLike(true);
      setLikeCount((prev) => prev + 1);
    } else {
      setLike(false);
      setLikeCount((prev) => prev - 1);
    }
  };
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header>
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="mb-0">{heading}</h5>
          <span className="text-muted">@{username}</span>
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
