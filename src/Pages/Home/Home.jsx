import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import PostsList from "./components/PostsList";
import LoadingSpinner from "../../Shared/LoadingSpinner";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      setPosts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error loading posts", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <PostsList setPosts={setPosts} posts={posts} />
      )}
    </div>
  );
};

export default Home;
