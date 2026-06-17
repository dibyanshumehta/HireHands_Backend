import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { UserModel } from "../../../../modals/auth/signup.js";

const UserSignup = async (req, res) => {
    try {
        const {name, username, email, phone, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const userId  = uuid();

        if(!name || !username || !email || !phone || !password) {
            return res .status(400).json({message : "All fields are required for sign up"});
        }
        
        const existingUser = await UserModel.findOne({ username });
        if (existingUser){
            return res.status(409).json({message : "Username already exists"});
        }
        
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail){
            return res.status(409).json({message : "Email already exists"});
        }

        const userData = new UserModel({
            _id : userId,
            name,
            username,
            email,
            phone,
            password : hashedPassword,
        });
        await userData.save();
        return res.json({message: "User registered successfully", status: 201});

    } catch (error){
        console.log(error);
        return res.json({ message: "An error occurred during user registration", status: 500});
    }
}; 

export default UserSignup;