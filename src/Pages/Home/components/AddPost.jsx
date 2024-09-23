import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";

const AddPost = ({ openAdd, setOpenAdd, addNewPost }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({ title: "", body: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setOpenAdd(false);
    setTitle("");
    setBody("");
    setErrors({ title: "", body: "" });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { title: "", body: "" };

    if (title.length < 10 || title.length > 150) {
      newErrors.title = "Title must be between 10 and 150 characters";
      valid = false;
    }

    if (body.length < 50 || body.length > 300) {
      newErrors.body = "Body must be between 50 and 300 characters";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    const userId = Math.floor(Math.random() * 10) + 1;
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title,
          body,
          userId,
        }
      );

      addNewPost(response.data);

      handleClose();
    } catch (error) {
      console.error("Error adding post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = title.length > 0 && body.length > 0;

  return (
    <Modal
      backdrop="static"
      size="lg"
      centered
      show={openAdd}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel
          controlId="floatingInput"
          label="Post Title"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel controlId="floatingPassword" label="Post Body">
          <Form.Control
            as="textarea"
            placeholder="lorem ipsum ..."
            style={{ height: "150px" }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            isInvalid={!!errors.body}
          />
          <Form.Control.Feedback type="invalid">
            {errors.body}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={!isFormValid || isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPost;
