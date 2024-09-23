import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "./style/comments.css";
import Spinner from "react-bootstrap/esm/Spinner";
const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    fetchComments();
  }, []);
  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/comments`,
        {
          params: { postId },
        }
      );
      setComments(response.data);
    } catch (error) {
      console.error("Error loading comments", error);
    }
  };
  return comments.length !== 0 ? (
    <>
      {comments.map((comment) => (
        <div className="comment" key={comment.id}>
          <div className="comment-name">
            <h3>{comment.name}</h3>
            <span>{comment.email}</span>
          </div>
          <div className="commnet-body">
            <p>{comment.body}</p>
          </div>
      
        </div>
      ))}
    </>
  ) : (
    <Spinner />
  );
};

export default Comments;
