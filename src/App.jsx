import React from "react";
import { Routes, Route } from "react-router-dom"; 
import Home from "./Pages/Home/Home";
import NavBar from "./Shared/NavBar";
import PostDetails from "./Pages/PostDetails/PostDetails"; 
// import AddPost from "./Pages/AddPost/AddPost"; 
// import NotFound from "./Pages/NotFound/NotFound"; 

const App = () => {
  return (
    <>
      <NavBar /> 
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/post/:postId" element={<PostDetails />} />{" "}

        {/* <Route path="/add-post" element={<AddPost />} /> 
        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default App;
