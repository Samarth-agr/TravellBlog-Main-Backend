import { useLocation } from "react-router"
import Header from "../../components/header/header"
import Post from "../../components/post/Post"
import Sidebar from "../../components/sidebar/Sidebar"
import "./home.css"
import axios from "axios"
import React, { useState, useEffect } from 'react';
export default function Home() {
  const[posts,setPosts]=useState([]);
  const {search}=useLocation() 

  useEffect(()=>{
     const fetchPosts=async()=>{
      const res= await axios.get("/post"+search)
      setPosts(res.data)
     }
     fetchPosts()
  },[search])
  return (
    <>
    <Header/>
   <div className="home">
   <Post posts={posts}/>
    <Sidebar/>
    </div>
    </>
    
  )
}
