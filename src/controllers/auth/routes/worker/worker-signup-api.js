import { WorkerModel } from "../../../../modals/auth/signup.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const WorkerSignup = async (req, res) => {
    try{
        const {name, username, email, phone, password, skill, experience, location} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const workerId  = uuid();

        if (!name || !username || !email || !phone || !password || !skill || !experience || !location) {
            return res.status(400). json({message : "All fields are required for sign up"});
        }
        
        const existingWorker = await WorkerModel.findOne({ username});
        if (existingWorker){
            return res.status(409).json({message : "Username already exists"});
        }

        const existingEmail = await WorkerModel.findOne({ email });
        if (existingEmail){
            return res.status(409).json({message : "Email already exists"});
        }

        const workerData = new WorkerModel({
            _id = userId,
            name,
            username,
            email,
            phone,
            password : hashedPassword,
            skill,
            experience,
            location,
        });
        await workerData.save();
        return res.json({message : "Worker registered successfully", status: 201});
        } catch (error){
            console.log(error);
            return res.json({message : "An error occurred during worker registration", status: 500});
    }
}; 

export default WorkerSignup;