import { model, Schema } from "mongoose";

const userJobPost = new Schema({
    _id : String,
    name : String,
    title : String,
    category: String,
    salary : String,
    address : String,
    starting_date : String,
    ending_date : String,
    description : String,
});

const workerJobPost = new Schema({
    _id : String,
    name : String,
    skill : String,
    experience : String,
    phone : String,
    address : String,
})


export const UserJobPostModel = model("userjobpost", userJobPost);
export const WorkerJobPostModel = model("workerjobpost", workerJobPost);

export default { UserJobPostModel, WorkerJobPostModel };