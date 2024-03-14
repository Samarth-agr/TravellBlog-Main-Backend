const { Timestamp, ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  userId:{
   type:String,
  },
  desc: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    default: "",
  },
  categories: {
    type: Array,
    required: false,
  },
  like:{
    type:Array,
    default:[]
},
}, { timestamps: true });

module.exports = mongoose.model("Post", PostSchema);
