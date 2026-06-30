import { Router } from "express";
import UserJobPost from "../user-job-post-api.js";
import WorkerJobPost from "../worker-job-post-api.js";

const jobPostRoutes = Router();

jobPostRoutes.post("/postjob", UserJobPost);
jobPostRoutes.post("/workerjobpost", WorkerJobPost );

export default jobPostRoutes;