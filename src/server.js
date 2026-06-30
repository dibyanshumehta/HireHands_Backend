import express from "express";
import dbConnection from "./config/db-config.js";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./controllers/auth/routes/auth-route.js";
import jobPostRoutes from "./controllers/user/routes/job-post-routes.js";
dotenv.config();

const app = express();
const port = 9000;

dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/auth", authRoutes);
app.use("/user", jobPostRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});