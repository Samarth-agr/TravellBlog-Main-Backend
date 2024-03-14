const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
 const Post=require("../models/Post");

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      if (req.body.password) {
        // Hash the new password before updating the user
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      }, { new: true }); // Use { new: true } to return the updated user

      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});
//UpDate
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try{
          const user=await User.findById(req.params.id)
    try {
        await Post.deleteMany({username:user.username})
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been delelted...")
      } catch (err) {
        res.status(500).json(err);
      }
    }catch(err){
       res.status(404).json("User not found!")
    }
    } else {
      res.status(401).json("You can delete only your account!");
    }
  });

 router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json({ error: "Error while retrieving user data", details: err.message });
  }
});

module.exports = router;
