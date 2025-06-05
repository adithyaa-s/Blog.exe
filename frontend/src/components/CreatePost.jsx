import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import ToastMessage from "./ToastMessage";

function MyVerticallyCenteredModal(props) {
  const navigate = useNavigate();
  const { showToast, setShowToast } = props;
  const [formData, setFormData] = useState({
    heading: "",
    content: "",
    image: null,
  });

  const handleFormData = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handlePost = async () => {
    const token = Cookies.get("token");
    if (!token) {
      navigate("/");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("heading", formData.heading);
    formDataToSend.append("content", formData.content);
    formDataToSend.append("image", formData.image);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/posts/createPost`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      props.onHide();
      setShowToast(true);
    } catch (error) {
      console.error(
        "Post creation failed:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create your own Post
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Title for Your Post</Form.Label>
            <Form.Control
              name="heading"
              type="text"
              placeholder="Title"
              value={formData.heading}
              onChange={handleFormData}
            />
            <br />
            <Form.Label>Message for your Post</Form.Label>
            <Form.Control
              name="content"
              type="text"
              placeholder="Message"
              value={formData.content}
              onChange={handleFormData}
            />
            <br />
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Select your File</Form.Label>
              <Form.Control
                type="file"
                name="image"
                onChange={handleFileChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handlePost}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function App() {
  const [modalShow, setModalShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  return (
    <>
      <p
        style={{ cursor: "pointer" }}
        variant="secondary"
        onClick={() => setModalShow(true)}
      >
        Create a Post
      </p>

      <MyVerticallyCenteredModal
        show={modalShow}
        showToast={showToast}
        setShowToast={setShowToast}
        onHide={() => setModalShow(false)}
      />
      {showToast && (
        <ToastMessage
          message={{ header: "Post Created", content: "Successfully Posted" }}
          placement="top-center"
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
