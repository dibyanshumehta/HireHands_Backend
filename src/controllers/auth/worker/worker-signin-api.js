import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { WorkerModel } from "../../../modals/auth/signup.js";

const WorkerSignin = async (req, res) => {
    try{
        const { username, password } = req.body;
        const newWorker = await WorkerModel.findOne({ username });

        if (!newWorker) {
            return res.status(404).json({ message : "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, newWorker.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message : "Invalid Password" });
        }

        const token = jwt.sign(
            { id : newWorker._id, username : newWorker.username, name : newWorker.name },
            process.env.JWT_SECRET,
        );

        return res.status(200).json({ message : "Details fetched successfully", token, status: 201 });
    } catch (error) {
        console.log(error);
        return res.json({ message : "Something went wrong", error });
    }
};

export default WorkerSignin;