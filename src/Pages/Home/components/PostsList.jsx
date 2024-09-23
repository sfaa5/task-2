import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import "./style/postsList.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";

import axios from "axios";
import AddPost from "./AddPost";
import EditPost from "./EditPost";
const PostsList = ({ posts, setPosts }) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const deletePost = async (postId, posts, setPosts) => {
    try {
      const response = await axios.delete(
        `https://jsonplaceholder.typicode.com/posts/${postId}`
      );
      if (response.status === 200) {
        console.log("Post deleted successfully");
        setPosts(posts.filter((post) => post.id !== postId)); // Update UI
      }
    } catch (error) {
      console.error("Error deleting post", error);
    }
  };
  const addNewPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };
  const updatePostInList = (updatedPost) => {
    setPosts(
      posts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };
  const onEdit = (post) => {
    setCurrentPost(post); 
    setOpenEdit(true); 
  };
  return (
    <section className="posts-section">
      <Container>
        <button onClick={() => setOpenAdd(true)} className="add-post">
          <IoIosAdd />
        </button>
        <div className="posts">
          {posts.map((post) => (
            <Card key={post.id} className="post-card">
              <Card.Body>
                <div className="card-top">

                  <div className="delete-date-edit-container">
                
                    <button
                      className="delete-button"
                      onClick={() => deletePost(post.id, posts, setPosts)}
                    >
                      <MdDelete />
                    </button>
                    <button
                      className="edit-button"
                      onClick={() => {
                        onEdit(post);
                      }}
                    >
                      <MdEdit />
                    </button>
                  </div>
                </div>
                <Card.Title>{post.title}</Card.Title>
                <Card.Text>{post.body}</Card.Text>
                <Link className="post-link" to={`/post/${post.id}`}>
                   Details
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
      <EditPost
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        post={currentPost}
        updatePostInList={updatePostInList}
      />
      <AddPost
        openAdd={openAdd}
        setOpenAdd={setOpenAdd}
        addNewPost={addNewPost}
      />
    </section>
  );
};

export default PostsList;
