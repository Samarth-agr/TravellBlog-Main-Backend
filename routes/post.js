const router = require("express").Router();
const User = require("../models/User");
 const Post=require("../models/Post");
 
//  router.put("/:id/like", async (req, res) => {
//   console.log("Incoming request to like a post");
//   const postId = req.params.id;
//   const userId = req.body.userId;

//   console.log("Post ID: " + postId);
//   console.log("User ID: " + userId);

//   try {
//     // ... your existing code ...
//     const post = await Post.findById(req.params.id);

//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }

//     // Check if the user has already liked the post
//     if (post.likes.includes(req.body.userId)) {
//       return res.status(400).json({ error: "You've already liked this post" });
//     }

//     // Add the user's ID to the list of likes
//     post.likes.push(req.body.userId);

//     // Save the updated post with the new like
//     const updatedPost = await post.save();

//     res.status(200).json(updatedPost);
//   } catch (err) {
//     console.error("Error while liking the post: " + err);
//     res.status(500).json({ error: "Error while liking the post", details: err.message });
//   }
// });
router.put("/:id/like",async (req,res)=>{
  try{
      const post = await Post.findById(req.params.id)
      if(!post.like.includes(req.body.userId)){
          await post.updateOne({$push:{like:req.body.userId}})
          res.status(200).json("you liked the post")
      }else{
          await post.updateOne({$pull:{like:req.body.userId}})
          res.status(200).json("you disliked the post")
      }
  }catch(err){
      res.status(500).json(err)
  }
})
module.exports = router;

router.put("/:id/unlike", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if the user has already liked the post
    if (!post.likes.includes(req.body.userId)) {
      return res.status(400).json({ error: "You haven't liked this post yet" });
    }

    // Remove the user's ID from the list of likes
    post.likes = post.likes.filter((likeId) => likeId.toString() !== req.body.userId);

    // Save the updated post without the user's like
    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json({ error: "Error while unliking the post", details: err.message });
  }
});







 router.post("/", async (req, res) => {
    const newPost = new Post(req.body);
    try {
      const savedPost = await newPost.save(); // Await the save operation
      res.status(200).json(savedPost);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
//UpDate

router.put("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      
      if (!post) {
        return res.status(404).json("Post not found");
      }
      
      if (post.username === req.body.username) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          
          res.status(200).json(updatedPost);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can update only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  //DELETE
  router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json("Post not found");
      }
  
      if (post.username === req.body.username) {
        try {
          // Use await for post.deleteOne() to ensure the operation is awaited
          await post.deleteOne();
  
          res.status(200).json("Post has been deleted");
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(401).json("You can delete only your post!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
  

  
  router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
  
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      // If the post is found, respond with the post data
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json({ error: "Error while retrieving post data", details: err.message });
    }
  });
  //GET ALL Post
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catname = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catname) {
      posts = await Post.find({
        categories: {
          $in: [catname]
        }
      });
    } else {
      // Use await to ensure the query is executed before responding
      posts = await Post.find();
    }

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error while retrieving post data", details: err.message });
  }
});

  
module.exports = router;