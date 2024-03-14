import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./singlepost.css";

export default function SinglePost() {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get("/post/" + path);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        setIsLiked(res.data.likes.includes(user._id));
      } catch (err) {
        console.error("Error while fetching the post: ", err);
      }
    };
    getPost();
  }, [path, user._id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/post/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {
      console.error("Error while deleting the post: ", err);
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/post/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {
      console.error("Error while updating the post: ", err);
    }
  };

  const handleLike = async () => {
    try {
      if (isLiked) {
        await axios.put(`/post/${post._id}/unlike`, {
          userId: user._id,
        });
        setIsLiked(false);
      } else {
        await axios.put(`/post/${post._id}/like`, {
          userId: user._id,
        });
        setIsLiked(true);
      }
      // Refresh the page to see the updated like status
      window.location.reload();
    } catch (err) {
      console.error("Error while liking/unliking the post: ", err);
    }
  };

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        <h1 className="singlePostTitle">
          {title}
          {post.username === user?.username && (
            <div className="singlePostEdit">
              {updateMode ? (
                <i
                  className="singlePostIcon far fa-save"
                  onClick={handleUpdate}
                ></i>
              ) : (
                <i
                  className="singlePostIcon far fa-edit"
                  onClick={() => setUpdateMode(true)}
                ></i>
              )}
              <i
                className="singlePostIcon far fa-trash-alt"
                onClick={handleDelete}
              ></i>
            </div>
          )}
              </h1>
              <h1  className="singlePostTitle">

          <i
            className={`like singlePostIcon far fa-heart ${
              isLiked ? "liked" : ""
            }`}
            onClick={handleLike}
            ></i>
            <span>{post.like?.length} Likes</span>
            </h1>
        <div className="singlePostInfo">
          <span className="singlePostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b> {post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">{desc}</p>
        )}
      </div>
    </div>
  );
}
