import { Card, Button} from "react-bootstrap";
import { useState } from "react";

export default function PostCard() {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(12);
  const handleLike = () => {
    if(!like){
        setLike(true);
        setLikeCount(likeCount + 1);
    }else{
        setLike(false);
        setLikeCount(likeCount-1);
    }
  };
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Header>
      <div className="d-flex align-items-center justify-content-between">
        <h5 className="mb-0"> Coding Ninja</h5>
        <span className="text-muted">@user</span>
      </div>
      </Card.Header>
      <video
        className="w-100"
        controls
        src="postvid.mp4"
        style={{ maxHeight: "400px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Text>
          Learning to code like a ninja is all about focus and discipline.
        </Card.Text>
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
