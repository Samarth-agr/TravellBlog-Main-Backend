const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/post");
const categoriesRoute = require("./routes/categories");
const multer = require("multer");
const path = require("path");

// CORS configuration
app.use(cors({
  origin: [
    "http://localhost:3000", 
    "https://uncovertheworld.vercel.app", 
    "https://uncovertheworld-samarth-agrawals-projects-26540647.vercel.app"
  ], 
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed methods
  credentials: true, // Allow credentials like cookies or authorization headers
  allowedHeaders: ["Content-Type", "Authorization"], // Allow headers for requests
}));


app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));

dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("DB connected");
}).catch((err) => {
  console.error(err);
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  }
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/post", postRoute);
app.use("/api/categories", categoriesRoute);

app.listen(5000, () => {
  console.log("Backend is working. Listening on port 5000");
});
