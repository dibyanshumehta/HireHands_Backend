import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserModel } from "../../../modals/auth/signup.js";

const userSignin = async (req, res) => {
    try{
        const { username, password } = req.body;
        const newUser = await UserModel.findOne({ username });

        if (!newUser) {
            return res.status(404).json({ message : "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, newUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message : "Invalid Password" });
        }

        const token = jwt.sign(
            { id : newUser._id, username : newUser.username },
            process.env.JWT_SECRET,
        );

        return res.status(201).json({ message : "Details fetched successfully", token, status: 201 });
    } catch (error) {
        console.log(error);
        return res.json({ message : "Something went wrong", error });
    }
};

export default userSignin;