import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../Shared/LoadingSpinner";
import Container from "react-bootstrap/esm/Container";
import "./style/postDetails.css";
import { AiFillLike } from "react-icons/ai";
import { FaCommentDots } from "react-icons/fa";
import { BiRepost } from "react-icons/bi";
import { BsSendFill } from "react-icons/bs";
import Comments from "./components/Comments";

const PostDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  useEffect(() => {
    fetchPostDetails();
  }, []);
  const fetchPostDetails = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      setPost(response.data);
    } catch (error) {
      console.error("Error loading post details", error);
    }
  };
  return post ? (
    <section className="post-details">
      <Container>
        <div className="post">
   
          <div className="post-body">
            <h1>{post.title}</h1>
            <p>{post.body}</p>
          </div>
  
          <div className="post-comments">
            <Comments postId={postId} />
          </div>
        </div>
      </Container>
    </section>
  ) : (
    <LoadingSpinner />
  );
};

export default PostDetails;
