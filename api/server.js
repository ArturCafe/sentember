import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";
import path from "path";
import mongoose from "mongoose";
import { fileURLToPath } from 'url';


//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();
/*
mongoose
  .connect('mongodb://localhost:27017/test')
  .then(() => {
    console.log('MongoDb is connected');
  })
  .catch((err) => {
    console.log(err);
  });
*/
//mongoose.set('strictQuery', false);
//"/api/v1/post/create-post",

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
//api/v1/posts/create-post
//routes



const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use("/public", express.static(path.join(__dirname, "public")));
//
app.use('/avatar', express.static('public/avatar'));
//app.use('/public/photo/', express.static('public/photo/'));
//app.use('./uploads', express.static(path.resolve('uploads')))


app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/posts", postRoutes);
//rest api
app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running  mode on port ${PORT}`.bgCyan
      .white
  );
});
