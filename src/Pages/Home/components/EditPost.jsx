import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";

const EditPost = ({ openEdit, setOpenEdit, post, updatePostInList }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({ title: "", body: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
    }
  }, [post]);

  const handleClose = () => {
    setOpenEdit(false);
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

    try {
      setIsSubmitting(true);
      const response = await axios.patch(
        `https://jsonplaceholder.typicode.com/posts/${post.id}`,
        {
          title,
          body,
        }
      );

      updatePostInList(response.data);

      handleClose();
    } catch (error) {
      console.error("Error updating post:", error);
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
      show={openEdit}
      onHide={handleClose}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
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
            disabled={!post}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </FloatingLabel>

        <FloatingLabel controlId="floatingBody" label="Post Body">
          <Form.Control
            as="textarea"
            placeholder="lorem ipsum ..."
            style={{ height: "150px" }}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            isInvalid={!!errors.body}
            disabled={!post}
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
          disabled={!isFormValid || isSubmitting || !post}
        >
          {isSubmitting ? "Updating..." : "Update"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditPost;
