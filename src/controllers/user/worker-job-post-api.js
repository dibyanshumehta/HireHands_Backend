import { WorkerJobPostModel } from "../../modals/jobpost/jobpost.js";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

const WorkerJobPost = async (req, res) => {
  try {
    const { name, skill, experience, phone, address } = req.body;
    const workerJobPostId = uuid();

    if (!name || !skill || !experience || !phone || !address) {
      return res
        .status(405)
        .json({ message: "All fields are necessary for posting for job" });
    }

    const workerJobPostData = new WorkerJobPostModel({
      _id: workerJobPostId,
      name,
      skill,
      experience,
      phone,
      address,
    });
    await workerJobPostData.save();
    const workerJobToken = JsonWebTokenError.sign(
      {
        id: workerJobPostData._id,
        name: workerJobPostData.name,
        skill: workerJobPostData.skill,
        experience: workerJobPostData.experience,
        phone: workerJobPostData.phone,
        address: workerJobPostData.address,
      },
      process.env.JWT_SECRET,
    );
    return res.json({
      message: "Job posted successfully",
      workerJobToken,
      status: 203,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "An error occured while posting for the job",
      error,
    });
  }
};

export default WorkerJobPost;
