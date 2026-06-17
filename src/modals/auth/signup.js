import { model, Schema } from "mongoose";

const userSchema = new Schema({
    _id : String,
    name : String,
    username : String,
    email : String,
    phone : String,
    password : String,
});

const workerSchema = new Schema({
    _id : String,
    name : String,
    username : String,
    email : String,
    phone : String,
    password : String,
    skill : String,
    experience : String,
    location : String,
})

export const UserModel = model("users", userSchema);

export const WorkerModel = model("workers", workerSchema);

export default { UserModel, WorkerModel };