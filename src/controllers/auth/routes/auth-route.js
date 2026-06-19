import { Router } from "express";
import WorkerSignup from "../worker/worker-signup-api.js";
import WorkerSignin from "../worker/worker-signin-api.js";
import UserSignup from "../user/user-signup-api.js";
import userSignin from "../user/user-signin-api.js";

const authRoutes = Router();

authRoutes.post("/workersignup", WorkerSignup);
authRoutes.post("workersignin", WorkerSignin);

authRoutes.post("/usersignup", UserSignup);
authRoutes.post("/usersignin", userSignin);

export default authRoutes;