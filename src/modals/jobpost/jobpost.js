import { model, Schema } from "mongoose";

const userJobPost = new Schema({
    _id : String,
    title : String,
    category: String,
    budget : String,
    location : String,
    date : String,
    description : String,
})

export const UserJobPostModel = model("jobpost", userJobPost);


export default UserJobPostModel;