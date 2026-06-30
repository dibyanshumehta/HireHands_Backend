import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import { UserJobPostModel } from "../../modals/jobpost/jobpost.js";

const UserJobPost = async (req, res) => {
  try {
    const {
      name,
      title,
      category,
      salary,
      address,
      startingdate,
      endingdate,
      description,
    } = req.body;
    const userJobPostId = uuid();

    if (
      !name ||
      !title ||
      !category ||
      !salary ||
      !address ||
      !startingdate ||
      !endingdate ||
      !description
    ) {
      return res
        .status(404)
        .json({ message: "Alle fields are necessary for posting a job" });
    }

    const jobPostData = new UserJobPostModel({
      _id: userJobPostId,
      name,
      title,
      category,
      salary,
      address,
      startingdate,
      endingdate,
      description,
    });
    await jobPostData.save();
    const jobToken = jwt.sign(
      {
        id: jobPostData._id,
        name: jobPostData.name,
        title: jobPostData.title,
        category: jobPostData.category,
        salary: jobPostData.salary,
        address: jobPostData.address,
        startingdate: jobPostData.startingdate,
        endingdate: jobPostData.endingdate,
        description: jobPostData.description,
      },
      process.env.JWT_SECRET,
    );
    return res.json({
      message: "Job posted successfully",
      jobToken,
      status: 202,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "An error occured while posting a job",
      error,
    });
  }
};

export default UserJobPost;
