import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { WorkerModel } from "../../../modals/auth/signup.js";
import jwt from "jsonwebtoken";

const WorkerSignup = async (req, res) => {
  try {
    const { name, username, phone, password, skill, experience, location } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const workerId = uuid();

    if (
      !name ||
      !username ||
      !phone ||
      !password ||
      !skill ||
      !experience ||
      !location
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required for sign up" });
    }

    const existingWorker = await WorkerModel.findOne({ username });
    if (existingWorker) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const workerData = new WorkerModel({
      _id: workerId,
      name,
      username,
      phone,
      password: hashedPassword,
      skill,
      experience,
      location,
    });
    await workerData.save();
    const token = jwt.sign(
      {
        id: workerData._id,
        username: workerData.username,
        name: workerData.name,
        phone: workerData.phone,
        skill: workerData.skill,
        experience: workerData.experience,
        location: workerData.location,
      },
      process.env.JWT_SECRET,
    );
    return res.json({
      message: "Worker registered successfully",
      token,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "An error occurred during worker registration",
      error,
    });
  }
};

export default WorkerSignup;
