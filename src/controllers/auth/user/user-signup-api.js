import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { UserModel } from "../../../modals/auth/signup.js";
import jwt from "jsonwebtoken";

const UserSignup = async (req, res) => {
  try {
    const { name, username, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuid();

    if (!name || !username || !phone || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required for sign up" });
    }

    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already exists" });
    }

    const userData = new UserModel({
      _id: userId,
      name,
      username,
      phone,
      password: hashedPassword,
    });
    await userData.save();
    const token = jwt.sign(
      {
        id: userData._id,
        username: userData.username,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      },
      process.env.JWT_SECRET,
    );
    return res.json({
      message: "User registered successfully",
      token,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "An error occurred during user registration",
      error,
    });
  }
};

export default UserSignup;
